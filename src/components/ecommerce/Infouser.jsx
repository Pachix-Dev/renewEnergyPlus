import { useRegisterForm } from '../../store/register-form'

export function Infouser() {
  const { email, name, paternSurname, phone, company, clear_info_verify } =
    useRegisterForm()

  const handleClearInfo = () => {
    clear_info_verify()
  }

  return (
    <div className='bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100 overflow-hidden'>
      {/* Header */}
      <div className='bg-gradient-to-r from-[#565078] to-[#766EA6] px-6 py-4'>
        <div className='flex items-center gap-3'>
          <div className='w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm'>
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
                d='M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0z'
              />
            </svg>
          </div>
          <div>
            <h3 className='text-xl font-bold text-white'>
              Información Personal
            </h3>
            <p className='text-white/80 text-sm'>
              Verifica que los datos sean correctos
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='p-6'>
        <div className='grid sm:grid-cols-2 gap-6'>
          {/* Nombre */}
          <div className='group relative bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-300 border border-gray-200 hover:border-[#565078]/30'>
            <div className='flex items-center gap-4'>
              <div className='w-10 h-10 bg-gradient-to-br from-[#565078] to-[#766EA6] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2}
                  stroke='currentColor'
                  className='w-5 h-5 text-white'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                  />
                </svg>
              </div>
              <div className='flex-1'>
                <p className='text-xs text-gray-500 uppercase tracking-wider font-medium mb-1'>
                  Nombre Completo
                </p>
                <p className='font-bold text-gray-800 text-lg'>
                  {name} {paternSurname}
                </p>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className='group relative bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-300 border border-gray-200 hover:border-[#BC0100]/30'>
            <div className='flex items-center gap-4'>
              <div className='w-10 h-10 bg-gradient-to-br from-[#BC0100] to-[#D76901] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2}
                  stroke='currentColor'
                  className='w-5 h-5 text-white'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75'
                  />
                </svg>
              </div>
              <div className='flex-1'>
                <p className='text-xs text-gray-500 uppercase tracking-wider font-medium mb-1'>
                  Correo Electrónico
                </p>
                <p className='font-bold text-gray-800 text-sm break-all'>
                  {email}
                </p>
              </div>
            </div>
          </div>

          {/* Teléfono */}
          <div className='group relative bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-300 border border-gray-200 hover:border-[#D76901]/30'>
            <div className='flex items-center gap-4'>
              <div className='w-10 h-10 bg-gradient-to-br from-[#D76901] to-[#BC0100] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2}
                  stroke='currentColor'
                  className='w-5 h-5 text-white'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3'
                  />
                </svg>
              </div>
              <div className='flex-1'>
                <p className='text-xs text-gray-500 uppercase tracking-wider font-medium mb-1'>
                  Teléfono
                </p>
                <p className='font-bold text-gray-800 text-lg'>{phone}</p>
              </div>
            </div>
          </div>

          {/* Empresa */}
          <div className='group relative bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-300 border border-gray-200 hover:border-[#766EA6]/30'>
            <div className='flex items-center gap-4'>
              <div className='w-10 h-10 bg-gradient-to-br from-[#766EA6] to-[#565078] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2}
                  stroke='currentColor'
                  className='w-5 h-5 text-white'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21'
                  />
                </svg>
              </div>
              <div className='flex-1'>
                <p className='text-xs text-gray-500 uppercase tracking-wider font-medium mb-1'>
                  Empresa
                </p>
                <p className='font-bold text-gray-800 text-lg'>{company}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer con botón */}
        <div className='mt-8 pt-6 border-t border-gray-200'>
          <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
            <div className='flex items-center gap-3 text-sm text-gray-600'>
              <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
              <span>Información verificada automáticamente</span>
            </div>

            <button
              onClick={handleClearInfo}
              className='group relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-red-50 hover:to-red-100 text-gray-700 hover:text-red-700 rounded-xl font-medium transition-all duration-300 border border-gray-300 hover:border-red-300 shadow-sm hover:shadow-md'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='w-4 h-4 group-hover:rotate-180 transition-transform duration-300'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99'
                />
              </svg>
              <span>¿No eres esta persona?</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
