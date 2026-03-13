import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { PonenteModal } from './PonenteModal'
import type { Ponente } from './PonenteModal'

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

const typeColors: Record<string, string> = {
  keynote: 'from-[#00B4FF] to-[#7B6FA8]',
  panel: 'from-[#F2B705] to-[#5E5884]',
  workshop: 'from-[#5F0F99] to-[#7B6FA8]',
  networking: 'from-[#F6E27A] to-[#14b8a6]',
  conference: 'from-[#7B6FA8] to-[#5E5884]',
  conferencia: 'from-[#7B6FA8] to-[#5E5884]',
  default: 'from-[#334155] to-[#475569]'
}

const typeLabels: Record<string, string> = {
  keynote: 'Keynote',
  panel: 'Panel',
  workshop: 'Workshop',
  networking: 'Networking',
  conference: 'Conferencia',
  default: 'Sesión'
}

const dayMap: Record<string, { es: string; en: string }> = {
  martes: { es: 'Martes', en: 'Tuesday' },
  miercoles: { es: 'Miércoles', en: 'Wednesday' },
  jueves: { es: 'Jueves', en: 'Thursday' },
  tuesday: { es: 'Martes', en: 'Tuesday' },
  wednesday: { es: 'Miércoles', en: 'Wednesday' },
  thursday: { es: 'Jueves', en: 'Thursday' }
}

function getTypeColor(type?: string) {
  if (!type) return typeColors.default
  const normalizedType = String(type).trim().toLowerCase()
  return typeColors[normalizedType] || typeColors.default
}

function getTypeLabel(type?: string) {
  if (!type) return typeLabels.default
  const normalizedType = String(type).trim()
  return normalizedType || typeLabels.default
}

const companyLogo = (apiUrl: string, logo?: string) => {
  if (!logo) return null
  return `${apiUrl}/logos/${logo}`
}

interface ConferenceCardProps {
  conf: EscenarioDiaConferencia
  confIndex: number
  language: string
  apiUrl: string
  showCompanyLogo: boolean
  onOpenPonente: (ponente: Ponente) => void
}

const ConferenceCard = memo(function ConferenceCard({
  conf,
  confIndex,
  language,
  apiUrl,
  showCompanyLogo,
  onOpenPonente
}: ConferenceCardProps) {
  const ponentes = Array.isArray(conf.ponentes) ? conf.ponentes : []
  const logoSrc = showCompanyLogo ? companyLogo(apiUrl, conf.company_logo) : null
  const title = language === 'es' ? conf.title : conf.title_en || conf.title
  const description = language === 'es'
    ? conf.description
    : conf.description_en || conf.description

  return (
    <article
      className="relative pl-14 md:pl-32 group"
      key={conf.id || confIndex}
    >
      <div className="absolute left-0 top-0 flex flex-col items-center md:items-start gap-3">
        <div className="absolute left-6 md:left-24 w-4 h-4 bg-white border-4 border-[#7B6FA8] rounded-full shadow-lg transform -translate-x-1/2 group-hover:scale-125 transition-transform duration-300" />
        <time className="flex flex-col items-center md:items-start bg-white/10 border border-white/10 text-white px-3 py-4 md:py-2 rounded-xl shadow-lg font-semibold text-xs sm:text-sm md:min-w-[110px]">
          <span className="text-[10px] uppercase tracking-wide text-white/60">
            {language === 'es' ? 'Inicio' : 'Start'}
          </span>
          <span>{conf.start_time.slice(0, 5)}</span>
        </time>
        <time className="flex flex-col items-center md:items-start bg-white/5 border border-white/10 text-white px-3 py-2 rounded-xl shadow-lg font-semibold text-xs sm:text-sm md:min-w-[110px]">
          <span className="text-[10px] uppercase tracking-wide text-white/60">
            {language === 'es' ? 'Fin' : 'End'}
          </span>
          <span>{conf.end_time.slice(0, 5)}</span>
        </time>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-2xl shadow-xl overflow-hidden backdrop-blur-xl transition-all duration-300 transform group-hover:-translate-y-1 group-hover:shadow-2xl">
        <div
          className={`bg-gradient-to-r ${getTypeColor(conf.type)} px-6 py-3 border-b border-white/10`}
        >
          <div className="flex items-center justify-between gap-3">
            <span className="inline-block text-white font-bold text-sm tracking-wide drop-shadow uppercase">
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
              {title}
            </h4>
            {logoSrc && (
              <div className="flex flex-col items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 flex-shrink-0">
                <span className="text-xs font-medium text-white/80 whitespace-nowrap">
                  Powered by
                </span>
                <img
                  src={logoSrc}
                  alt={conf.company || 'Empresa'}
                  className="h-12 w-28 sm:h-14 sm:w-32 rounded-lg bg-white object-contain p-2 border border-white/20 shadow-sm"
                  loading="lazy"
                />
              </div>
            )}
          </div>
          {description && (
            <p className="text-white/80 leading-relaxed">{description}</p>
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
                  {language === 'es'
                    ? ponentes.length > 1
                      ? 'Ponentes'
                      : 'Ponente'
                    : ponentes.length > 1
                      ? 'Speakers'
                      : 'Speaker'}
                </h5>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ponentes.map((ponente) => (
                  <button
                    type="button"
                    key={ponente.id}
                    onClick={() => onOpenPonente(ponente)}
                    className="text-left flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors duration-200 cursor-pointer"
                  >
                    {ponente.photo ? (
                      <img
                        src={
                          ponente.photo.startsWith('http')
                            ? ponente.photo
                            : `${apiUrl}/ponentes/${String(ponente.photo).replace(/^\//, '')}`
                        }
                        alt={ponente.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-[#7B6FA8] shadow-md"
                        loading="lazy"
                        width={56}
                        height={56}
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#5E5884] to-[#7B6FA8] flex items-center justify-center text-white font-bold text-lg border-2 border-white shadow-md">
                        {ponente.name?.charAt(0) || '?'}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <strong className="block text-white font-semibold truncate">
                        {ponente.name}
                      </strong>
                      {ponente.position && (
                        <span className="block text-sm text-white/70 truncate">
                          {ponente.position}
                        </span>
                      )}
                      {ponente.company && (
                        <span className="block text-xs text-white/60 truncate">
                          {ponente.company}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  )
})

export const ProgramaEscenarioClient: React.FC<Props> = ({ apiUrl, language, escenarioIndex = 0, showCompanyLogo = false }) => {
  const [escenarios, setEscenarios] = useState<Escenario[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeDayKey, setActiveDayKey] = useState<string | null>(null)
  const [selectedPonente, setSelectedPonente] = useState<Ponente | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const locale = language === 'es' ? 'es-ES' : 'en-US'

  const shortDayFormatter = useMemo(() => {
    return new Intl.DateTimeFormat(locale, {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    })
  }, [locale])

  const weekdayFormatter = useMemo(() => {
    return new Intl.DateTimeFormat(locale, { weekday: 'long' })
  }, [locale])

  const fullDateFormatter = useMemo(() => {
    return new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }, [locale])

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${apiUrl}/api/programa/completo`, { cache: 'no-store' })
      if(!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      const data = Array.isArray(json?.data) ? json.data : []
      setEscenarios(data)
    } catch (e: any) {
      setError(e.message || 'Error')
    } finally {
      setLoading(false)
    }
  }, [apiUrl])

  useEffect(() => {
    // Solo se carga una vez al montar (navegar a la página)
    fetchData()
  }, [fetchData])

  const escenario = useMemo(() => {
    if (!escenarios || escenarios.length === 0) return null
    return escenarios[Math.min(escenarioIndex, escenarios.length - 1)]
  }, [escenarioIndex, escenarios])

  const days = useMemo(() => {
    return (escenario?.dias || [])
      .slice()
      .sort((a, b) => String(a.date || '').localeCompare(String(b.date || '')))
  }, [escenario])

  useEffect(() => {
    if (days.length === 0) {
      if (activeDayKey !== null) {
        setActiveDayKey(null)
      }
      return
    }

    const hasActiveDay = days.some((day) => String(day.date) === String(activeDayKey))
    if (!hasActiveDay) {
      setActiveDayKey(String(days[0].date))
    }
  }, [activeDayKey, days])

  const selectedDay = useMemo(() => {
    return days.find((day) => String(day.date) === String(activeDayKey)) || days[0] || null
  }, [activeDayKey, days])

  const selectedDayConferencias = useMemo(() => {
    return (selectedDay?.conferencias || [])
      .slice()
      .sort((a, b) => String(a.start_time || '').localeCompare(String(b.start_time || '')))
  }, [selectedDay])

  const selectedDayDate = useMemo(() => {
    if (!selectedDay?.date) return null
    const parsed = new Date(selectedDay.date)
    return Number.isNaN(parsed.getTime()) ? null : parsed
  }, [selectedDay?.date])

  const openPonente = useCallback((ponente: Ponente) => {
    setSelectedPonente(ponente)
    setModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setModalOpen(false)
    setSelectedPonente(null)
  }, [])

  const formatDayLabel = useCallback((date: string) => {
    const parsed = new Date(date)
    if (Number.isNaN(parsed.getTime())) return date
    return shortDayFormatter.format(parsed)
  }, [shortDayFormatter])

  const translateDayName = useCallback((name?: string) => {
    if (!name) return ''

    const normalized = name
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')

    const translated = dayMap[normalized]
    if (!translated) return name
    return language === 'es' ? translated.es : translated.en
  }, [language])

  if (loading) {
    return (
      <section className='relative overflow-hidden bg-gradient-to-b from-[#0B1224] via-[#0f172a] to-[#1E293B] text-white py-6 sm:py-20 px-4 sm:px-6'>
        <div className='relative max-w-7xl mx-auto space-y-12'>
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
          <div className='container mx-auto px-4 py-16 text-center text-2xl font-bold text-white'>
            {language==='es'?'Programa aún no disponible...':'Program not available yet...'}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0B1224] via-[#0f172a] to-[#1E293B] text-white py-6 sm:py-20 px-4 sm:px-6">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-16 w-72 h-72 bg-[#5E5884]/30 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0ea5e9]/20 blur-3xl rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-[#7B6FA8]/20 blur-2xl rounded-full" />
      </div>
      <div className="relative max-w-7xl mx-auto space-y-12"> 
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
                        {selectedDayDate?.getDate() || '--'}
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold capitalize">
                          {selectedDayDate ? weekdayFormatter.format(selectedDayDate) : selectedDay.date}
                        </h3>
                        <p className="text-sm text-white/70">
                          {selectedDayDate ? fullDateFormatter.format(selectedDayDate) : selectedDay.date}
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
                        {selectedDayConferencias.map((conf, confIndex) => (
                          <ConferenceCard
                            key={conf.id || confIndex}
                            conf={conf}
                            confIndex={confIndex}
                            language={language}
                            apiUrl={apiUrl}
                            showCompanyLogo={showCompanyLogo}
                            onOpenPonente={openPonente}
                          />
                        ))}
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
