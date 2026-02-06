import React, { useEffect, useState, useCallback } from 'react'
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
}

interface EscenarioDia {
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

export const ProgramaEscenarioClient: React.FC<Props> = ({ apiUrl, language, escenarioIndex = 0 }) => {
  const [escenarios, setEscenarios] = useState<Escenario[]|null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string|null>(null)
  const [selectedPonente, setSelectedPonente] = useState<Ponente|null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${apiUrl}/api/programa/completo`, { cache: 'no-store' })
      if(!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      const data = Array.isArray(json?.data) ? json.data : []
      setEscenarios(data)
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
      <div className='container mx-auto px-4 py-16 text-center text-white/70'>
        <div className='inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10'>
          <span className='animate-pulse w-3 h-3 rounded-full bg-[#7B6FA8]' />
          {language === 'es' ? 'Cargando programa...' : 'Loading program...'}
        </div>
      </div>
    )
  }
  if (error) {
    return (
      <div className='container mx-auto px-4 py-16 text-center'>
        <p className='text-red-400 font-semibold mb-4'>
          {language === 'es' ? 'Error al cargar el programa' : 'Failed to load program'}
        </p>
        <button onClick={fetchData} className='px-5 py-2 bg-gradient-to-r from-[#5E5884] to-[#7B6FA8] text-white rounded-lg font-medium hover:opacity-90 transition'>
          {language === 'es' ? 'Reintentar' : 'Retry'}
        </button>
      </div>
    )
  }
  if(!escenarios || escenarios.length === 0){
    return <div className='container mx-auto px-4 py-16 text-center text-black text-2xl font-bold'>{language==='es'?'Programa aún no disponible...':'Program not available yet...'}</div>
  }

  const escenario = escenarios[Math.min(escenarioIndex, escenarios.length - 1)]

  return (
    <section className='relative overflow-hidden bg-gradient-to-b from-[#0B1224] via-[#0f172a] to-[#1E293B] text-white py-16 sm:py-20 px-4 sm:px-6'>
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute -top-24 -left-16 w-72 h-72 bg-[#5E5884]/30 blur-3xl rounded-full' />
        <div className='absolute bottom-0 right-0 w-96 h-96 bg-[#0ea5e9]/20 blur-3xl rounded-full' />
        <div className='absolute top-1/3 right-1/4 w-48 h-48 bg-[#7B6FA8]/20 blur-2xl rounded-full' />
      </div>
      <div className='relative max-w-7xl mx-auto space-y-12'>
        <div className='bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur-xl'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6'>
            <div className='flex-1 space-y-4'>
              <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-xs font-semibold uppercase tracking-[0.25em]'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='size-6'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z' />
                </svg>
                <span>{language==='es'?'Escenario':'Stage'}</span>
              </div>
              <h2 className='text-3xl md:text-5xl font-black leading-tight drop-shadow-lg'>{escenario.name}</h2>
              {escenario.description && (
                <p className='text-lg text-white/80 leading-relaxed'>{escenario.description}</p>
              )}
            </div>
            {(escenario.location) && (
              <div className='flex flex-col gap-3 md:items-end text-sm text-white/80'>
                {escenario.location && (
                  <div className='flex items-center gap-3 bg-white/10 border border-white/10 backdrop-blur-sm px-5 py-3 rounded-xl shadow-md'>
                    <svg className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z' />
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 22s8-4.5 8-12a8 8 0 10-16 0c0 7.5 8 12 8 12z' />
                    </svg>
                    <span className='font-semibold'>{escenario.location}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className='space-y-12'>
          {escenario.dias && escenario.dias.length > 0 ? (
            escenario.dias.map((dia, diaIndex) => (
              <div className='dia-container relative' key={diaIndex}>
                <div className='sticky top-4 z-10'>
                  <div className='flex items-center gap-4 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl px-6 py-4 shadow-lg'>
                    <div className='w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#5E5884] to-[#7B6FA8] rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-lg'>
                      {new Date(dia.date).getDate()}
                    </div>
                    <div>
                      <h3 className='text-xl sm:text-2xl font-bold capitalize'>
                        {new Date(dia.date).toLocaleDateString(language==='es'?'es-ES':'en-US',{ weekday:'long'})}
                      </h3>
                      <p className='text-sm text-white/70'>
                        {new Date(dia.date).toLocaleDateString(language==='es'?'es-ES':'en-US',{ day:'numeric', month:'long', year:'numeric'})}
                      </p>
                    </div>
                    <div className='ml-auto hidden md:flex items-center gap-2 bg-white/10 border border-white/10 px-4 py-2 rounded-full text-xs font-semibold text-white/80'>
                      <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8v4l3 3' />
                        <circle cx='12' cy='12' r='9' stroke='currentColor' strokeWidth='2' />
                      </svg>
                      <span>{dia.conferencias?.length || 0} {dia.conferencias?.length===1?(language==='es'?'sesión':'session'):(language==='es'?'sesiones':'sessions')}</span>
                    </div>
                  </div>
                </div>

                {dia.conferencias && dia.conferencias.length > 0 ? (
                  <div className='relative pt-6 md:pt-10'>
                    <div className='absolute left-6 md:left-24 top-0 bottom-0 w-px bg-gradient-to-b from-[#7B6FA8] via-[#5E5884] to-transparent opacity-60' />
                    <div className='space-y-10'>
                      {dia.conferencias
                        .slice()
                        .sort((a,b)=> a.start_time.localeCompare(b.start_time))
                        .map((conf, confIndex) => {
                          const tags = parseTags(conf.tags)
                          const ponentes = Array.isArray(conf.ponentes)? conf.ponentes: []
                          return (
                            <article className='relative pl-14 md:pl-32 group' key={conf.id || confIndex}>
                              <div className='absolute left-0 top-0 flex flex-col items-center md:items-start gap-3'>
                                <div className='absolute left-6 md:left-24 w-4 h-4 bg-white border-4 border-[#7B6FA8] rounded-full shadow-lg transform -translate-x-1/2 group-hover:scale-125 transition-transform duration-300' />
                                <time className='flex flex-col items-center md:items-start bg-white/10 border border-white/10 text-white px-3 py-4 md:py-2 rounded-xl shadow-lg font-semibold text-xs sm:text-sm md:min-w-[110px]'>
                                  <span className='text-[10px] uppercase tracking-wide text-white/60'>{language==='es'?'Inicio':'Start'}</span>
                                  <span>{conf.start_time.slice(0,5)}</span>
                                </time>
                                <time className='flex flex-col items-center md:items-start bg-white/5 border border-white/10 text-white px-3 py-2 rounded-xl shadow-lg font-semibold text-xs sm:text-sm md:min-w-[110px]'>
                                  <span className='text-[10px] uppercase tracking-wide text-white/60'>{language==='es'?'Fin':'End'}</span>
                                  <span>{conf.end_time.slice(0,5)}</span>
                                </time>
                              </div>
                              <div className='bg-white/5 border border-white/10 rounded-2xl shadow-xl overflow-hidden backdrop-blur-xl transition-all duration-300 transform group-hover:-translate-y-1 group-hover:shadow-2xl'>
                                <div className={`bg-gradient-to-r ${getTypeColor(conf.type)} px-6 py-3 border-b border-white/10`}>
                                  <div className='flex items-center justify-between gap-3'>
                                    <span className='inline-block text-white font-bold text-sm uppercase tracking-wide drop-shadow'>{getTypeLabel(conf.type)}</span>
                                    {conf.room && (
                                      <span className='inline-flex items-center gap-2 text-white/90 text-xs bg-white/15 border border-white/20 px-3 py-1 rounded-full'>
                                        <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 7h18M3 12h18M3 17h18' />
                                        </svg>
                                        <span>{conf.room}</span>
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className='p-6 space-y-4'>
                                  <h4 className='text-xl sm:text-2xl font-bold leading-tight text-white'>{language==='es'? conf.title : conf.title_en}</h4>
                                  {conf.description && (
                                    <p className='text-white/80 leading-relaxed'>{language==='es'? conf.description : conf.description_en}</p>
                                  )}
                                  {ponentes.length > 0 && (
                                    <div className='border-t border-white/10 pt-4 space-y-3'>
                                      <div className='flex items-center gap-2 text-white'>
                                        <svg className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z' />
                                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6.5 20a5.5 5.5 0 1111 0' />
                                        </svg>
                                        <h5 className='font-bold'>{language==='es'? (ponentes.length>1?'Ponentes':'Ponente') : (ponentes.length>1?'Speakers':'Speaker')}</h5>
                                      </div>
                                      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                                        {ponentes.map(p => (
                                          <button
                                            type='button'
                                            key={p.id}
                                            onClick={()=>openPonente(p)}
                                            className='text-left flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors duration-200 cursor-pointer'
                                          >
                                            {p.photo ? (
                                              <img
                                                src={p.photo.startsWith('http') ? p.photo : `${apiUrl}/ponentes/${String(p.photo).replace(/^\//, '')}`}
                                                alt={p.name}
                                                className='w-14 h-14 rounded-full object-cover border-2 border-[#7B6FA8] shadow-md'
                                                loading='lazy'
                                                width={56}
                                                height={56}
                                              />
                                            ) : (
                                              <div className='w-14 h-14 rounded-full bg-gradient-to-br from-[#5E5884] to-[#7B6FA8] flex items-center justify-center text-white font-bold text-lg border-2 border-white shadow-md'>
                                                {p.name?.charAt(0) || '?'}
                                              </div>
                                            )}
                                            <div className='flex-1 min-w-0'>
                                              <strong className='block text-white font-semibold truncate'>{p.name}</strong>
                                              {p.position && (
                                                <span className='block text-sm text-white/70 truncate'>{p.position}</span>
                                              )}
                                              {p.company && (
                                                <span className='block text-xs text-white/60 truncate'>{p.company}</span>
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
                          )
                        })}
                    </div>
                  </div>
                ) : (
                  <div className='text-center py-12 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl'>
                    <p className='text-white/70'>{language==='es'?'No hay conferencias programadas para este día':'No sessions scheduled for this day'}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className='text-center py-20 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl'>
              <div className='inline-block p-8 bg-white/5 border border-white/10 rounded-full mb-6'>
                <svg className='w-16 h-16 text-white/40' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8v4l3 3' />
                  <circle cx='12' cy='12' r='9' stroke='currentColor' strokeWidth='2' />
                </svg>
              </div>
              <h3 className='text-2xl font-bold text-white mb-2'>{language==='es'?'No hay conferencias programadas':'No sessions available'}</h3>
              <p className='text-white/70'>{language==='es'?'El programa estará disponible próximamente':'Program will be available soon'}</p>
            </div>
          )}
        </div>
      </div>
      <PonenteModal ponente={selectedPonente} isOpen={modalOpen} onClose={closeModal} language={language} apiUrl={apiUrl} />
    </section>
  )
}
