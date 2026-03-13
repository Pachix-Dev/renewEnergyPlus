import React, { useEffect, useState, useCallback } from 'react'
import { PonenteModal } from './PonenteModal'
import type { Ponente } from './PonenteModal'
import { KeynoteSpeakersCarousel } from '../programa2026/KeynoteSpeakersCarousel.jsx'

interface EscenarioDiaConferencia {
  id: number
  title: string
  title_en?: string
  description?: string
  description_en?: string
  start_time: string
  end_time: string
  type?: string
  room?: string
  tags?: string[] | string
  ponentes?: Ponente[]
  company_logo?: string
  company?: string
}

interface EscenarioDia {
  id?: number
  name?: string
  date: string
  conferencias?: EscenarioDiaConferencia[]
}

interface Escenario {
  id: number
  name: string
  description?: string
  location?: string
  capacity?: number
  dias?: EscenarioDia[]
}

interface Props {
  apiUrl: string
  language: string
  escenarioIndex?: number
  showCompanyLogo?: boolean
}

const typeColors: Record<string,string> = {
  keynote: 'from-[#5E5884] to-[#7B6FA8]',
  panel: 'from-[#1E293B] to-[#5E5884]',
  workshop: 'from-[#0ea5e9] to-[#7B6FA8]',
  networking: 'from-[#5E5884] to-[#14b8a6]',
  default: 'from-[#334155] to-[#475569]'
}

const typeLabels: Record<string,string> = {
  keynote: 'Keynote',
  panel: 'Panel',
  workshop: 'Workshop',
  networking: 'Networking',
  default: 'Sesión'
}

function getTypeColor(type?: string){
  if(!type) return typeColors.default
  return typeColors[type] || typeColors.default
}
function getTypeLabel(type?: string){
  if(!type) return typeLabels.default
  return typeLabels[type] || typeLabels.default
}

function parseTags(tags: any): string[] {
  if(!tags) return []
  if(Array.isArray(tags)) return tags
  if(typeof tags === 'string') {
    try { const parsed = JSON.parse(tags); return Array.isArray(parsed)? parsed: [tags] } catch { return tags.split(',').map(t=>t.trim()) }
  }
  return []
}

const companyLogo = (apiUrl: string, logo?: string) => {
  if (!logo) return null
  return `${apiUrl}/logos/${logo}`
}

export const ProgramaEscenarioClient: React.FC<Props> = ({ apiUrl, language, escenarioIndex = 0, showCompanyLogo = false }) => {
  const [escenarios, setEscenarios] = useState<Escenario[]|null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string|null>(null)
  const [activeDayKey, setActiveDayKey] = useState<string | null>(null)
  const [selectedPonente, setSelectedPonente] = useState<Ponente|null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const keynoteSpeakersSection = <KeynoteSpeakersCarousel language={language} />

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${apiUrl}/api/programa/completo`, { cache: 'no-store' })
      if(!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      const data = Array.isArray(json?.data) ? json.data : []
      setEscenarios(data)
      const escenario = data[Math.min(escenarioIndex, Math.max(data.length - 1, 0))]
      const dias = Array.isArray(escenario?.dias) ? escenario.dias : []
      const firstDay = dias
        .slice()
        .sort((a: EscenarioDia, b: EscenarioDia) => String(a.date || '').localeCompare(String(b.date || '')))[0]
      if (firstDay?.date) {
        setActiveDayKey(String(firstDay.date))
      }
      // setEscenarios(null)
    } catch(e:any){
      setError(e.message || 'Error')
    } finally {
      setLoading(false)
    }
  }, [apiUrl])

  useEffect(() => {
    // Solo se carga una vez al montar (navegar a la página)
    fetchData()
  }, [fetchData])

  const openPonente = (p: Ponente) => { setSelectedPonente(p); setModalOpen(true) }
  const closeModal = () => { setModalOpen(false); setSelectedPonente(null) }

  if (loading) {
    return (
      <section className='relative overflow-hidden bg-gradient-to-b from-[#0B1224] via-[#0f172a] to-[#1E293B] text-white py-6 sm:py-20 px-4 sm:px-6'>
        <div className='relative max-w-7xl mx-auto space-y-12'>
          {keynoteSpeakersSection}
          <div className='container mx-auto px-4 py-16 text-center text-white/70'>
            <div className='inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10'>
              <span className='animate-pulse w-3 h-3 rounded-full bg-[#7B6FA8]' />
              {language === 'es' ? 'Cargando programa...' : 'Loading program...'}
            </div>
          </div>
        </div>
      </section>
    )
  }
  if (error) {
    return (
      <section className='relative overflow-hidden bg-gradient-to-b from-[#0B1224] via-[#0f172a] to-[#1E293B] text-white py-6 sm:py-20 px-4 sm:px-6'>
        <div className='relative max-w-7xl mx-auto space-y-12'>
          {keynoteSpeakersSection}
          <div className='container mx-auto px-4 py-16 text-center'>
            <p className='text-red-400 font-semibold mb-4'>
              {language === 'es' ? 'Error al cargar el programa' : 'Failed to load program'}
            </p>
            <button onClick={fetchData} className='px-5 py-2 bg-gradient-to-r from-[#5E5884] to-[#7B6FA8] text-white rounded-lg font-medium hover:opacity-90 transition'>
              {language === 'es' ? 'Reintentar' : 'Retry'}
            </button>
          </div>
        </div>
      </section>
    )
  }
  if(!escenarios || escenarios.length === 0){
    return (
      <section className='relative overflow-hidden bg-gradient-to-b from-[#0B1224] via-[#0f172a] to-[#1E293B] text-white py-6 sm:py-20 px-4 sm:px-6'>
        <div className='relative max-w-7xl mx-auto space-y-12'>
          {keynoteSpeakersSection}
          <div className='container mx-auto px-4 py-16 text-center text-2xl font-bold text-white'>
            {language==='es'?'Programa aún no disponible...':'Program not available yet...'}
          </div>
        </div>
      </section>
    )
  }

  const escenario = escenarios[Math.min(escenarioIndex, escenarios.length - 1)]
  const days = (escenario?.dias || [])
    .slice()
    .sort((a, b) => String(a.date || '').localeCompare(String(b.date || '')))
  const selectedDay =
    days.find((day) => String(day.date) === String(activeDayKey)) ||
    days[0] ||
    null
  const selectedDayConferencias = (selectedDay?.conferencias || [])
    .slice()
    .sort((a, b) => String(a.start_time || '').localeCompare(String(b.start_time || '')))

  const formatDayLabel = (date: string) => {
    const parsed = new Date(date)
    if (Number.isNaN(parsed.getTime())) return date
    return parsed.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    })
  }

  const translateDayName = (name?: string) => {
    if (!name) return ''

    const normalized = name
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')

    const dayMap: Record<string, { es: string; en: string }> = {
      martes: { es: 'Martes', en: 'Tuesday' },
      miercoles: { es: 'Miércoles', en: 'Wednesday' },
      jueves: { es: 'Jueves', en: 'Thursday' },
      tuesday: { es: 'Martes', en: 'Tuesday' },
      wednesday: { es: 'Miércoles', en: 'Wednesday' },
      thursday: { es: 'Jueves', en: 'Thursday' }
    }

    const translated = dayMap[normalized]
    if (!translated) return name
    return language === 'es' ? translated.es : translated.en
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0B1224] via-[#0f172a] to-[#1E293B] text-white py-6 sm:py-20 px-4 sm:px-6">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-16 w-72 h-72 bg-[#5E5884]/30 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0ea5e9]/20 blur-3xl rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-[#7B6FA8]/20 blur-2xl rounded-full" />
      </div>
      <div className="relative max-w-7xl mx-auto space-y-12">
        {/* Header de programa */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
          {/* Descripción del escenario - ocupa 3 columnas */}
          <div className="lg:col-span-3 bg-white/5 border-2 border-[#7B6FA8]/40 rounded-3xl p-8 md:p-12 shadow-[0_30px_120px_rgba(94,88,132,0.25)] backdrop-blur-xl relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#7B6FA8]/20 blur-3xl rounded-full pointer-events-none" />
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6 h-full">
              <div className="flex-1 space-y-5">
                {/* Badge Escenario */}
                <div className="flex justify-center sm:justify-start">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#7B6FA8]/20 to-[#5E5884]/20 border border-[#7B6FA8]/30 text-xs font-bold uppercase tracking-[0.2em] text-[#c4bde0]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
                      />
                    </svg>
                    <span>{language === "es" ? "Escenario" : "Stage"}</span>
                  </div>
                </div>

                {/* Título del escenario */}
                <h2 className="text-4xl md:text-4xl lg:text-5xl font-black leading-none tracking-tight text-center md:text-left">
                  <span className="bg-gradient-to-r from-white via-white to-[#c4bde0] bg-clip-text text-transparent drop-shadow-lg">
                    {escenario.name}
                  </span>
                </h2>

                {/* Fecha y Lugar */}
                <div className="flex flex-col sm:flex-row flex-wrap justify-center md:justify-start gap-3 items-center">
                  {/* Fecha */}
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500/10 to-amber-400/5 border border-amber-400/30 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-lg">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-400/20">
                      <svg
                        className="w-5 h-5 text-amber-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-wider text-amber-400/80 font-semibold">
                        {language === "es" ? "Fecha" : "Date"}
                      </span>
                      <span className="text-sm font-bold text-white">
                        {language === "es"
                          ? "14 – 16 Abril, 2026"
                          : "April 14 – 16, 2026"}
                      </span>
                    </div>
                  </div>

                  {/* Lugar */}
                  {escenario.location && (
                    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#7B6FA8]/10 to-[#5E5884]/5 border border-[#7B6FA8]/30 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-lg">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#7B6FA8]/20">
                        <svg
                          className="w-5 h-5 text-[#b4abe0]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-[#b4abe0]/80 font-semibold">
                          {language === "es" ? "Ubicación" : "Location"}
                        </span>
                        <span className="text-sm font-bold text-white uppercase">
                          {escenario.location} | Expo Guadalajara
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {escenario.description && (
                  <p className="text-lg text-white/80 leading-relaxed text-justify">
                    {escenario.description}
                  </p>
                )}
                {/* <p className='inline-flex items-center gap-2 rounded-xl border border-amber-300/40 bg-amber-400/10 px-4 py-3 text-sm md:text-base font-semibold text-amber-100 shadow-sm'>
                <svg className='w-5 h-5 shrink-0 text-amber-200' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 9v2m0 4h.01M10.29 3.86l-8.08 13.99A2 2 0 003.92 21h16.16a2 2 0 001.71-3.15L13.71 3.86a2 2 0 00-3.42 0z' />
                </svg>
                <span> { language === 'es'?'Mantente atento: pronto anunciaremos a más speakers.' : 'Stay tuned: more speakers coming soon' }</span>
              </p> */}
              </div>
            </div>
          </div>

          {/* Premium Pass CTA - ocupa 2 columnas */}
          <div className="lg:col-span-2 relative rounded-3xl overflow-hidden shadow-[0_30px_120px_rgba(0,0,0,0.35)] border border-white/10">
            {/* Background image */}
            <div className="absolute inset-0 bg-cover bg-center"/>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1224]/95 via-[#0f172a]/85 to-[#1E293B]/75" />

            <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-center">
              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-white tracking-tight">
                  {language === "es"
                    ? "COMPRA TU PASE PREMIUM"
                    : "BUY YOUR PREMIUM PASS"}
                </h3>

                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                    {language === "es" ? "Incluye" : "Includes"}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-3 py-1.5 bg-white/10 border border-white/20 text-white text-xs font-semibold rounded-lg backdrop-blur-sm">
                      {language === "es"
                        ? "CONFERENCIAS PREMIUM"
                        : "PREMIUM CONFERENCES"}
                    </span>
                    <span className="px-3 py-1.5 bg-white/10 border border-white/20 text-white text-xs font-semibold rounded-lg backdrop-blur-sm">
                      ENERGY NIGHT
                    </span>
                    <span className="px-3 py-1.5 bg-white/10 border border-white/20 text-white text-xs font-semibold rounded-lg backdrop-blur-sm">
                      SUNSET COCKTAIL
                    </span>
                    <span className="px-3 py-1.5 bg-white/10 border border-white/20 text-white text-xs font-semibold rounded-lg backdrop-blur-sm">
                      NETWORKING AREA
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-center sm:items-start justify-between gap-4 pt-2">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/60">
                      {language === "es"
                        ? "Precio especial de preventa"
                        : "Special pre-sale price"}
                    </p>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-2xl md:text-5xl font-black text-amber-400">
                        $7,000
                      </span>
                      <span className="text-sm md:text-2xl font-bold text-white/80">
                        MXN
                      </span>
                    </div>
                  </div>
                  <a
                    href={
                      language === "es"
                        ? "/programa-premium-productos"
                        : "/en/programa-premium-productos"
                    }
                    className="group inline-flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-900 font-bold text-sm rounded-xl shadow-lg shadow-amber-500/30 hover:shadow-amber-400/40 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <span className="font-extrabold">
                      {language === "es" ? "COMPRAR ACCESO" : "BUY ACCESS"}
                    </span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Keynote Speakers Carousel */}
        <div className='flex justify-center items-center'>
          <KeynoteSpeakersCarousel language={language} />
        </div>
        
        {/* Body program */}
        <div className="space-y-12">
          {days.length > 0 ? (
            <>
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
                  {language === "es" ? "Selecciona el día" : "Select day"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {days.map((day, dayIndex) => {
                    const isActive =
                      String(day.date) === String(selectedDay?.date);
                    return (
                      <button
                        type="button"
                        key={`${day.date}-${dayIndex}`}
                        onClick={() => setActiveDayKey(String(day.date))}
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                          isActive
                            ? "bg-gradient-to-br from-[#5E5884] to-[#7B6FA8] text-white border-transparent shadow-lg shadow-[#5E5884]/30"
                            : "bg-white text-slate-700 border-slate-200 hover:border-[#5E5884] hover:shadow-md"
                        }`}
                      >
                        <span className="capitalize">
                          {translateDayName(day.name) ||
                            formatDayLabel(day.date)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedDay && (
                <div className="dia-container relative">
                  <div className="sticky top-4 z-10">
                    <div className="flex items-center gap-4 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl px-6 py-4 shadow-lg">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#5E5884] to-[#7B6FA8] rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-lg">
                        {new Date(selectedDay.date).getDate()}
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold capitalize">
                          {new Date(selectedDay.date).toLocaleDateString(
                            language === "es" ? "es-ES" : "en-US",
                            { weekday: "long" },
                          )}
                        </h3>
                        <p className="text-sm text-white/70">
                          {new Date(selectedDay.date).toLocaleDateString(
                            language === "es" ? "es-ES" : "en-US",
                            { day: "numeric", month: "long", year: "numeric" },
                          )}
                        </p>
                      </div>
                      <div className="ml-auto hidden md:flex items-center gap-2 bg-white/10 border border-white/10 px-4 py-2 rounded-full text-xs font-semibold text-white/80">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3"
                          />
                          <circle
                            cx="12"
                            cy="12"
                            r="9"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                        </svg>
                        <span>
                          {selectedDayConferencias.length}{" "}
                          {selectedDayConferencias.length === 1
                            ? language === "es"
                              ? "sesión"
                              : "session"
                            : language === "es"
                              ? "sesiones"
                              : "sessions"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {selectedDayConferencias.length > 0 ? (
                    <div className="relative pt-6 md:pt-10">
                      <div className="absolute left-6 md:left-24 top-0 bottom-0 w-px bg-gradient-to-b from-[#7B6FA8] via-[#5E5884] to-transparent opacity-60" />
                      <div className="space-y-10">
                        {selectedDayConferencias.map((conf, confIndex) => {
                          const tags = parseTags(conf.tags);
                          const ponentes = Array.isArray(conf.ponentes)
                            ? conf.ponentes
                            : [];
                          return (
                            <article
                              className="relative pl-14 md:pl-32 group"
                              key={conf.id || confIndex}
                            >
                              <div className="absolute left-0 top-0 flex flex-col items-center md:items-start gap-3">
                                <div className="absolute left-6 md:left-24 w-4 h-4 bg-white border-4 border-[#7B6FA8] rounded-full shadow-lg transform -translate-x-1/2 group-hover:scale-125 transition-transform duration-300" />
                                <time className="flex flex-col items-center md:items-start bg-white/10 border border-white/10 text-white px-3 py-4 md:py-2 rounded-xl shadow-lg font-semibold text-xs sm:text-sm md:min-w-[110px]">
                                  <span className="text-[10px] uppercase tracking-wide text-white/60">
                                    {language === "es" ? "Inicio" : "Start"}
                                  </span>
                                  <span>{conf.start_time.slice(0, 5)}</span>
                                </time>
                                <time className="flex flex-col items-center md:items-start bg-white/5 border border-white/10 text-white px-3 py-2 rounded-xl shadow-lg font-semibold text-xs sm:text-sm md:min-w-[110px]">
                                  <span className="text-[10px] uppercase tracking-wide text-white/60">
                                    {language === "es" ? "Fin" : "End"}
                                  </span>
                                  <span>{conf.end_time.slice(0, 5)}</span>
                                </time>
                              </div>
                              <div className="bg-white/5 border border-white/10 rounded-2xl shadow-xl overflow-hidden backdrop-blur-xl transition-all duration-300 transform group-hover:-translate-y-1 group-hover:shadow-2xl">
                                <div
                                  className={`bg-gradient-to-r ${getTypeColor(conf.type)} px-6 py-3 border-b border-white/10`}
                                >
                                  <div className="flex items-center justify-between gap-3">
                                    <span className="inline-block text-white font-bold text-sm uppercase tracking-wide drop-shadow">
                                      {getTypeLabel(conf.type)}
                                    </span>
                                    {conf.room && (
                                      <span className="inline-flex items-center gap-2 text-white/90 text-xs bg-white/15 border border-white/20 px-3 py-1 rounded-full">
                                        <svg
                                          className="w-4 h-4"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 7h18M3 12h18M3 17h18"
                                          />
                                        </svg>
                                        <span>{conf.room}</span>
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="p-6 space-y-4">
                                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                    <h4 className="text-xl sm:text-2xl font-bold leading-tight text-white flex-1">
                                      {language === "es"
                                        ? conf.title
                                        : conf.title_en}
                                    </h4>
                                    {showCompanyLogo &&
                                      companyLogo(
                                        apiUrl,
                                        conf.company_logo,
                                      ) && (
                                        <div className="flex flex-col items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 flex-shrink-0">
                                          <span className="text-xs font-medium text-white/80 whitespace-nowrap">
                                            Powered by
                                          </span>
                                          <img
                                            src={
                                              companyLogo(
                                                apiUrl,
                                                conf.company_logo,
                                              )!
                                            }
                                            alt={conf.company || "Empresa"}
                                            className="h-12 w-28 sm:h-14 sm:w-32 rounded-lg bg-white object-contain p-2 border border-white/20 shadow-sm"
                                            loading="lazy"
                                          />
                                        </div>
                                      )}
                                  </div>
                                  {conf.description && (
                                    <p className="text-white/80 leading-relaxed">
                                      {language === "es"
                                        ? conf.description
                                        : conf.description_en}
                                    </p>
                                  )}
                                  {ponentes.length > 0 && (
                                    <div className="border-t border-white/10 pt-4 space-y-3">
                                      <div className="flex items-center gap-2 text-white">
                                        <svg
                                          className="w-5 h-5"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"
                                          />
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6.5 20a5.5 5.5 0 1111 0"
                                          />
                                        </svg>
                                        <h5 className="font-bold">
                                          {language === "es"
                                            ? ponentes.length > 1
                                              ? "Ponentes"
                                              : "Ponente"
                                            : ponentes.length > 1
                                              ? "Speakers"
                                              : "Speaker"}
                                        </h5>
                                      </div>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {ponentes.map((p) => (
                                          <button
                                            type="button"
                                            key={p.id}
                                            onClick={() => openPonente(p)}
                                            className="text-left flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors duration-200 cursor-pointer"
                                          >
                                            {p.photo ? (
                                              <img
                                                src={
                                                  p.photo.startsWith("http")
                                                    ? p.photo
                                                    : `${apiUrl}/ponentes/${String(p.photo).replace(/^\//, "")}`
                                                }
                                                alt={p.name}
                                                className="w-14 h-14 rounded-full object-cover border-2 border-[#7B6FA8] shadow-md"
                                                loading="lazy"
                                                width={56}
                                                height={56}
                                              />
                                            ) : (
                                              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#5E5884] to-[#7B6FA8] flex items-center justify-center text-white font-bold text-lg border-2 border-white shadow-md">
                                                {p.name?.charAt(0) || "?"}
                                              </div>
                                            )}
                                            <div className="flex-1 min-w-0">
                                              <strong className="block text-white font-semibold truncate">
                                                {p.name}
                                              </strong>
                                              {p.position && (
                                                <span className="block text-sm text-white/70 truncate">
                                                  {p.position}
                                                </span>
                                              )}
                                              {p.company && (
                                                <span className="block text-xs text-white/60 truncate">
                                                  {p.company}
                                                </span>
                                              )}
                                            </div>
                                          </button>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                  {/*tags.length > 0 && (
                                    <div className='flex flex-wrap gap-2'>
                                      {tags.map(tag => (
                                        <span key={tag} className='px-3 py-1 bg-white/10 border border-white/10 text-white/80 text-xs font-semibold rounded-full'>#{tag}</span>
                                      ))}
                                    </div>
                                  )*/}
                                </div>
                              </div>
                            </article>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
                      <p className="text-white/70">
                        {language === "es"
                          ? "No hay conferencias programadas para este día"
                          : "No sessions scheduled for this day"}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
              <div className="inline-block p-8 bg-white/5 border border-white/10 rounded-full mb-6">
                <svg
                  className="w-16 h-16 text-white/40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {language === "es"
                  ? "No hay conferencias programadas"
                  : "No sessions available"}
              </h3>
              <p className="text-white/70">
                {language === "es"
                  ? "El programa estará disponible próximamente"
                  : "Program will be available soon"}
              </p>
            </div>
          )}
        </div>
      </div>
      <PonenteModal
        ponente={selectedPonente}
        isOpen={modalOpen}
        onClose={closeModal}
        language={language}
        apiUrl={apiUrl}
      />
    </section>
  );
}
