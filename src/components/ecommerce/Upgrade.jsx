import { useState } from 'react'
import { useRegisterForm } from '../../store/register-form.js'

export function Upgrade({ translates }) {
  const {
    email,
    setEmail,
    setName,
    setPaternSurname,
    setMaternSurname,
    setPhone,
    setCompany,
    setPosition,
    setIdUser,
    setUuid,
    clear_info_verify,
  } = useRegisterForm()

  const [message, setMessage] = useState('')
  const [user, setUser] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const urlbase = import.meta.env.DEV
    ? 'http://localhost:3010/'
    : 'https://re-plus-mexico.com.mx/server/'

  const verifyUser = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(urlbase + 'get-user-by-email?email=' + email)
      const data = await response.json()

      if (data.status) {
        setUser(true)
        setEmail(data.email)
        setName(data.name)
        setPaternSurname(data.paternSurname)
        setMaternSurname(data.maternSurname)
        setPhone(data.phone)
        setIdUser(data.id)
        setUuid(data.uuid)
        setCompany(data.company)
        setPosition(data.position)
      } else {
        clear_info_verify()
        setUser(false)
        setMessage(data.error)
        setTimeout(() => {
          setMessage('')
        }, 3000)
      }
    } catch (error) {
      setMessage('Error de conexión. Por favor intenta nuevamente.')
      setTimeout(() => {
        setMessage('')
      }, 3000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmail = (e) => {
    setUser(false)
    setEmail(e)
    setMessage('')
  }

  return (
    <div className='space-y-10'>
      {/* Header */}
      <div className='text-center'>
        <h2 className='text-2xl lg:text-3xl font-bold text-gray-800 mb-3'>
          {translates.verify_user}
        </h2>
        <p className='text-gray-600 max-w-md mx-auto'>
          {translates.verify_text}
        </p>
      </div>

      {/* Email Verification Card */}
      <div className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden  mx-auto'>
        <div className='p-4 lg:p-8'>
          {/* Email Input Section */}
          <div className='relative'>
            <label
              htmlFor='email'
              className='absolute -top-3 left-4 bg-gradient-to-r from-[#565078] to-[#766EA6] text-white px-3 py-1 rounded-lg text-xs md:text-sm font-medium z-10'
            >
              {translates.text_2}
            </label>

            <div className='relative flex items-center'>
              <div className='absolute left-4 z-10'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2}
                  stroke='currentColor'
                  className={`w-5 h-5 ${
                    user ? 'text-emerald-600' : 'text-gray-400'
                  }`}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75'
                  />
                </svg>
              </div>

              <input
                className={`w-full pl-12 pr-20 md:pr-32 py-4 text-lg border-2 rounded-xl transition-all duration-300 focus:outline-none ${
                  user
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                    : 'border-gray-300 bg-gray-50 focus:border-[#565078] focus:bg-white'
                } ${message ? 'border-red-500 bg-red-50' : ''}`}
                type='email'
                name='email'
                placeholder='email@example.com'
                value={email}
                onChange={(e) => handleEmail(e.target.value)}
                disabled={isLoading}
              />

              <button
                className={`absolute right-2 px-6 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                  user
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-gradient-to-r from-[#565078] to-[#766EA6] hover:from-[#4a4a6a] hover:to-[#6a5f98] text-white shadow-lg hover:shadow-xl'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                onClick={verifyUser}
                disabled={user || isLoading || !email.trim()}
              >
                {isLoading ? (
                  <>
                    <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                    <span className='hidden sm:inline'>Verificando...</span>
                  </>
                ) : user ? (
                  <>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={2}
                      stroke='currentColor'
                      className='w-4 h-4'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                    <span className='hidden sm:inline'>Verificado</span>
                  </>
                ) : (
                  <>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={2}
                      stroke='currentColor'
                      className='w-4 h-4'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                      />
                    </svg>
                    <span className='hidden sm:inline'>
                      {translates.text_3}
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* Status Messages */}
            {message && (
              <div className='mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2}
                  stroke='currentColor'
                  className='w-5 h-5 text-red-600 flex-shrink-0'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z'
                  />
                </svg>
                <p className='text-red-700 font-medium'>{message}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Registration CTA */}
      <div className='bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 lg:p-8 text-center border border-gray-200 mx-auto'>
        <div className='flex items-center justify-center gap-4 mb-4'>
          <div className='w-12 h-12 bg-gradient-to-r from-[#565078] to-[#8075c0] rounded-full flex items-center justify-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke='currentColor'
              className='w-6 h-6 text-white'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z'
              />
            </svg>
          </div>
          <div>
            <h3 className='text-xl font-bold text-gray-800'>
              {translates.first_time}
            </h3>
            <p className='text-gray-600'>{translates.dontworries}</p>
          </div>
        </div>

        <p className='text-gray-700 mb-6'>{translates.text_5}</p>

        <a
          href='/registro'
          target='_blank'
          className='inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#565078] to-[#363250] hover:from-[#5d5394] hover:to-[#352d63] text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={2}
            stroke='currentColor'
            className='w-5 h-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z'
            />
          </svg>
          {translates.text_4}
        </a>
      </div>
    </div>
  )
}
