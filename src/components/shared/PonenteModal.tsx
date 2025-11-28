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
