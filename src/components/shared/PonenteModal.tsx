import React, { useEffect } from 'react'

export interface Ponente {
  id: number
  name: string
  position?: string
  company?: string
  photo?: string
  bio_esp?: string
  bio_eng?: string
  linkedin?: string
  twitter?: string
  email?: string
}

interface PonenteModalProps {
  ponente: Ponente | null
  isOpen: boolean
  onClose: () => void
  language: string
  apiUrl: string
}

export const PonenteModal: React.FC<PonenteModalProps> = ({
  ponente,
  isOpen,
  onClose,
  language,
  apiUrl,
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !ponente) return null

  const bio = language === 'es' ? ponente.bio_esp : ponente.bio_eng
  
  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn'
      onClick={onClose}
    >
      <div
        className='relative w-full max-w-3xl bg-gradient-to-br from-[#1E293B] via-[#374151] to-[#1E293B] rounded-3xl shadow-2xl overflow-hidden border-2 border-white/10 animate-scaleIn'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className='relative bg-gradient-to-r from-[#5E5884] via-[#7B6FA8] to-[#5E5884] px-6 md:px-8 py-6'>
          {/* Elementos decorativos */}
          <div className='pointer-events-none absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl z-0'></div>
          <div className='pointer-events-none absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl z-0'></div>

          {/* Botón cerrar */}
          <button
            type='button'
            onClick={onClose}
            className='absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-300 border border-white/20 group pointer-events-auto z-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50'
            aria-label='Cerrar modal'
          >
            <svg
              className='w-5 h-5 text-white rotate-0 group-hover:rotate-90 transition-transform duration-300 transform-gpu will-change-transform'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>

          {/* Contenido del header */}
          <div className='relative z-10 flex flex-col md:flex-row items-center gap-6'>
            {/* Avatar */}
            <div className='relative'>
              {ponente.photo ? (
                <img
                  src={ponente.photo.startsWith('http') ? ponente.photo : `${apiUrl}${ponente.photo}`}
                  alt={ponente.name}
                  className='w-32 h-32 rounded-2xl object-cover border-4 border-white/20 shadow-2xl'
                />
              ) : (
                <div className='w-32 h-32 rounded-2xl bg-gradient-to-br from-white/20 to-white/10 border-4 border-white/20 flex items-center justify-center text-white font-black text-5xl shadow-2xl'>
                  {ponente.name?.charAt(0) || '?'}
                </div>
              )}
              {/* Badge decorativo */}
              <div className='absolute -bottom-3 -right-3 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg'>
                <svg
                  className='w-6 h-6 text-[#5E5884]'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z' />
                </svg>
              </div>
            </div>

            {/* Información */}
            <div className='flex-1 text-center md:text-left'>
              <h2 className='text-2xl md:text-3xl font-black text-white mb-2 leading-tight'>
                {ponente.name}
              </h2>
              {ponente.position && (
                <p className='text-lg text-white/90 font-semibold mb-1'>
                  {ponente.position}
                </p>
              )}
              {ponente.company && (
                <div className='inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mt-2'>
                  <svg
                    className='w-4 h-4 text-white/80'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <span className='text-sm font-semibold text-white'>
                    {ponente.company}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Body con scroll */}
        <div className='px-6 md:px-8 py-8 max-h-[60vh] overflow-y-auto custom-scrollbar'>
          {/* Biografía */}
          {bio ? (
            <div className='space-y-4'>
              <div className='flex items-center gap-3 mb-6'>
                <div className='w-10 h-10 bg-gradient-to-br from-[#5E5884] to-[#7B6FA8] rounded-xl flex items-center justify-center'>
                  <svg
                    className='w-5 h-5 text-white'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <h3 className='text-xl font-bold text-white'>
                  {language === 'es' ? 'Biografía' : 'Biography'}
                </h3>
              </div>

              <div className='prose prose-invert max-w-none'>
                <p className='text-white/80 leading-relaxed text-base whitespace-pre-line'>
                  {bio}
                </p>
              </div>
            </div>
          ) : (
            <div className='text-center py-8'>
              <svg
                className='w-16 h-16 text-white/20 mx-auto mb-4'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                  clipRule='evenodd'
                />
              </svg>
              <p className='text-white/50 text-sm'>
                {language === 'es'
                  ? 'No hay biografía disponible'
                  : 'No biography available'}
              </p>
            </div>
          )}

          {/* Redes sociales */}
          {(ponente.linkedin || ponente.twitter || ponente.email) && (
            <div className='mt-8 pt-6 border-t border-white/10'>
              <h4 className='text-sm font-bold text-white/70 uppercase tracking-wider mb-4'>
                {language === 'es' ? 'Conectar' : 'Connect'}
              </h4>
              <div className='flex flex-wrap gap-3'>
                {ponente.linkedin && (
                  <a
                    href={ponente.linkedin}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-3 rounded-xl transition-all duration-300 group'
                  >
                    <svg
                      className='w-5 h-5 text-white/80 group-hover:text-white'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
                    </svg>
                    <span className='text-sm font-semibold text-white/80 group-hover:text-white'>
                      LinkedIn
                    </span>
                  </a>
                )}
                {ponente.twitter && (
                  <a
                    href={ponente.twitter}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-3 rounded-xl transition-all duration-300 group'
                  >
                    <svg
                      className='w-5 h-5 text-white/80 group-hover:text-white'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z' />
                    </svg>
                    <span className='text-sm font-semibold text-white/80 group-hover:text-white'>
                      Twitter
                    </span>
                  </a>
                )}
                {ponente.email && (
                  <a
                    href={`mailto:${ponente.email}`}
                    className='inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-3 rounded-xl transition-all duration-300 group'
                  >
                    <svg
                      className='w-5 h-5 text-white/80 group-hover:text-white'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
                      <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
                    </svg>
                    <span className='text-sm font-semibold text-white/80 group-hover:text-white'>
                      Email
                    </span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className='px-6 md:px-8 py-5 bg-white/5 border-t border-white/10'>
          <button
            onClick={onClose}
            className='w-full bg-gradient-to-r from-[#5E5884] to-[#7B6FA8] hover:from-[#7B6FA8] hover:to-[#5E5884] text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg'
          >
            {language === 'es' ? 'Cerrar' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  )
}
