import { useState } from 'react'
import { countrycodes } from '../../lib/countrycodes'
import { useZustandStore } from '../../store/form-store'

export function ContactForm({ language }) {
  const [selectedCountryCode, setSelectedCountryCode] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const [response, setResponse] = useState('')
  const [sendStatus, setSendStatus] = useState(false)

  const handleCountryCodeChange = (event) => {
    setSelectedCountryCode(event.target.value)
  }

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = Object.fromEntries(new window.FormData(event.target))
    const leadData = {
      ...formData,
      phone: `${formData.countrycodes} ${formData.phone}`.trim(),
    }
    delete leadData.countrycodes

    const leadRequestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
    }

    try {
      setSendStatus(true)

      // Guardar datos en la base de datos
      const res = await fetch('https://re-plus-mexico.com.mx/expositor-landing-email',
        leadRequestOptions
      )
      const contentType = res.headers.get('content-type') ?? ''
      if (!contentType.includes('application/json')) {
        throw new Error('La respuesta del servidor no es JSON')
      }
      const data = await res.json()

      if (data.status) {
        useZustandStore.setState({ zustandState: true })
        document.getElementById('form-contact')?.reset()
        setSelectedCountryCode('52')
        setPhoneNumber('')
        window.location.href =  language === 'es' ? '/gracias-por-contactarnos' : '/en/gracias-por-contactarnos'

      } else {
        setSendStatus(false)
        setResponse(
          'Lo sentimos en este momento no es posible enviar tu información...'
        )
      }
    } catch (error) {
      console.log(error)
      setSendStatus(false)
      setResponse(
        'Lo sentimos en este momento no es posible enviar tu información...'
      )
    }
  }

  return (
    <>
      {/*
        Formulario de contacto para expositores.
        Campos solicitados:
        - Empresa: Nombre de la empresa que desea participar. Obligatorio.
        - Sector: Sector industrial al que pertenece la empresa. Obligatorio. Opciones predefinidas.
        - Nombre: Nombre completo de la persona de contacto. Obligatorio.
        - Email: Correo electrónico de contacto. Obligatorio.
        - Código de país: Selección del código internacional del país para el teléfono. Obligatorio.
        - Teléfono: Número de teléfono de contacto. Obligatorio.
        - Mensaje: Mensaje o motivo de contacto. Obligatorio.
      */}
      
      <form
        id='form-contact'
        className='mt-10 space-y-6  mx-auto border border-[#10ba8c]/30 bg-gradient-to-br from-[#f3fbf7] via-white to-[#e7f7f1] text-[#01513b] backdrop-blur rounded-lg p-6 md:p-8 shadow-[0_18px_45px_rgba(1,81,59,0.12)]'
        onSubmit={handleSubmit}
        aria-labelledby='contact-form-title'
      >
        <div className='mb-2'>
          <h2 id='contact-form-title' className='text-xl md:text-2xl font-bold mb-10 text-center font-n27'>
           {language === 'es' ? 'Completa el formulario y nos pondremos en contacto contigo.' : 'Complete the form and we will get in touch with you.'}
          </h2>
        </div>
        {/* Empresa: Nombre de la empresa que desea participar. Obligatorio. */}
        <div>
          <label
            htmlFor='company'
            className='flex items-center gap-1 mb-1 text-sm font-semibold text-[#01513b] font-n27'
          >
            <span>{language === 'es' ? 'Empresa' : 'Company'}</span>
            <span className='text-[#0d803a]' aria-hidden='true'>*</span>
          </label>
          <input
            type='text'
            id='company'
            name='company'
            className='shadow-sm bg-white border border-[#858C7E]/40 text-gray-900 text-sm rounded-lg focus:ring-[#1F5E00] focus:border-[#1F5E00] block w-full p-3'
            placeholder='Empresa S.A. de C.V.'
            required
            autoComplete='organization'
            aria-required='true'
          />
        </div>
        {/* Sector: Sector industrial al que pertenece la empresa. Obligatorio. */}
        <div>
          <label
            htmlFor='sector'
            className='flex items-center gap-1 mb-1 text-sm font-semibold text-[#01513b] font-n27'
          >
            <span>{language === 'es' ? 'Sector' : 'Industry Sector'}</span>
            <span className='text-[#0d803a]' aria-hidden='true'>*</span>
          </label>
          <select
            id='sector'
            name='sector'
            className='bg-white border border-[#858C7E]/40 text-gray-900 text-sm rounded-lg focus:ring-[#1F5E00] focus:border-[#1F5E00] block w-full p-3'
            required
            aria-required='true'
          >
            <option value='' defaultValue>
              {language === 'es' ? 'Elige una opción' : 'Choose an option'}
            </option>
            <option value='Monitoreo y tratamiento del agua / Water Monitoring and Treatment'>
              {language === 'es' ? 'Monitoreo y tratamiento del agua' : 'Water Monitoring and Treatment'}
            </option>
            <option value='Valorización de residuos y economía circular / Waste Valorization and Circular Economy'>
              {language === 'es' ? 'Valorización de residuos y economía circular' : 'Waste Valorization and Circular Economy'}
            </option>
            <option value='Bioeconomía y aprovechamiento de recursos naturales / Bioeconomy and Natural Resource Utilization'>
              {language === 'es' ? 'Bioeconomía y aprovechamiento de recursos naturales' : 'Bioeconomy and Natural Resource Utilization'}
            </option>
            <option value='Infraestructura y ciudades sostenibles / Sustainable Infrastructure and Cities'>
              {language === 'es' ? 'Infraestructura y ciudades sostenibles' : 'Sustainable Infrastructure and Cities'}
            </option>
          </select>
        </div>
        {/* Nombre: Nombre completo de la persona de contacto. Obligatorio. */}
        <div>
          <label
            htmlFor='name'
            className='flex items-center gap-1 mb-1 text-sm font-semibold text-[#01513b] font-n27'
          >
            <span>{language === 'es' ? 'Nombre' : 'Name'}</span>
            <span className='text-[#0d803a]' aria-hidden='true'>*</span>
          </label>
          <input
            type='text'
            id='name'
            name='name'
            className='shadow-sm bg-white border border-[#858C7E]/40 text-gray-900 text-sm rounded-lg focus:ring-[#1F5E00] focus:border-[#1F5E00] block w-full p-3'
            placeholder={language === 'es' ? 'Juan Pérez' : 'John Doe'}
            required
            autoComplete='name'
            aria-required='true'
          />
        </div>
        {/* Email: Correo electrónico de contacto. Obligatorio. */}
        <div>
          <label
            htmlFor='email'
            className='flex items-center gap-1 mb-1 text-sm font-semibold text-[#01513b] font-n27'
          >
            <span>Email</span>
            <span className='text-[#0d803a]' aria-hidden='true'>*</span>
          </label>
          <input
            type='email'
            id='email'
            name='email'
            className='shadow-sm bg-white border border-[#858C7E]/40 text-gray-900 text-sm rounded-lg focus:ring-[#1F5E00] focus:border-[#1F5E00] block w-full p-3'
            placeholder={language === 'es' ? 'correo@ejemplo.com' : 'name@flowbite.com'}
            required
            autoComplete='email'
            aria-required='true'
          />
        </div>
        {/* Código de país y teléfono: Selección del código internacional y número de teléfono. Ambos obligatorios. */}
        <div>
          <label
            htmlFor='countrycodes'
            className='block mb-1 text-sm font-semibold text-[#01513b] font-n27'
          >
            {language === 'es' ? 'Código de país + número de teléfono' : 'Country code + phone number'}
          </label>
          <div className='w-full rounded-lg flex flex-col md:flex-row gap-3' role='group' aria-labelledby='countrycodes'>
            <div className='w-52'>
              {/* Código de país: Selección del código internacional. Obligatorio. */}
              <select
                className='block w-full mt-1 p-3 text-gray-700 border border-[#858C7E]/40 rounded-md focus:outline-none focus:ring-[#1F5E00] focus:border-[#1F5E00] bg-white font-n27'
                value={selectedCountryCode}
                onChange={handleCountryCodeChange}
                required
                id='countrycodes'
                name='countrycodes'
                aria-required='true'
              >
                <option value='52' defaultValue={52}>
                  MX 52
                </option>
                {countrycodes.map((country, index) => (
                  <option key={index} value={country.code}>
                    {`${country.iso} (${country.code})`}
                  </option>
                ))}
              </select>
            </div>
            <div className='w-full'>
              {/* Teléfono: Número de teléfono de contacto. Obligatorio. */}
              <input
                className='block w-full mt-1 p-3 text-gray-700 border border-[#858C7E]/40 rounded-md focus:outline-none focus:ring-[#1F5E00] focus:border-[#1F5E00] bg-white'
                type='number'
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                placeholder='Enter phone number'
                required
                id='phone'
                name='phone'
                autoComplete='phone'
                aria-required='true'
              />
            </div>
          </div>
        </div>
        {/* Mensaje: Mensaje o motivo de contacto. Obligatorio. */}
        <div className='sm:col-span-2'>
          <label
            htmlFor='message'
            className='flex items-center gap-1 mb-1 text-sm font-semibold text-[#01513b] font-n27'
          >
            <span>{language === 'es' ? 'Mensaje' : 'Message'}</span>
            <span className='text-[#0d803a]' aria-hidden='true'>*</span>
          </label>
          <textarea
            id='message'
            rows='6'
            name='message'
            className='block p-3 w-full text-sm text-gray-900 bg-white border border-[#858C7E]/40 rounded-lg shadow-sm focus:ring-[#1F5E00] focus:border-[#1F5E00] font-n27'
            placeholder={language === 'es' ? 'Déjanos saber cómo podemos ayudarte...' : 'Let us know how we can help you...'}
            required
            aria-required='true'
          ></textarea>
          <p className='mt-1 text-xs text-[#0d803a] font-n27'>{language === 'es' ? 'Sé específico para que podamos ayudarte mejor.' : 'Be specific so we can help you better.'}</p>
        </div>
        {sendStatus ? (
          <span className='text-[#01513b] flex items-center font-n27' aria-live='polite'>
            <svg
              className='animate-spin -ml-1 mr-3 h-5 w-5 text-[#10ba8c]'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              ></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              ></path>
            </svg>
            {language === 'es' ? 'Enviando ...' : 'Sending ...'}
          </span>
        ) : (
          <>
          <button
                type='submit'
                className='inline-flex items-center justify-center gap-2 text-white bg-[#0d803a] hover:bg-[#01513b] focus:ring-4 focus:outline-none focus:ring-[#10ba8c]/30 font-semibold rounded-lg w-full sm:w-auto px-5 py-2.5 text-center shadow-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-ellipsis text-sm sm:text-base'
                disabled={sendStatus}
                aria-disabled={sendStatus}
              >
                {sendStatus ? (
                  <svg className='animate-spin h-4 w-4' viewBox='0 0 24 24'>
                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                  </svg>
                ) : null}
                {language === 'es' ? 'Enviar' : 'Send'}
                <svg
                  className='w-4 h-4 ml-2'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 14 10'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M1 5h12m0 0L9 1m4 4L9 9'
                  />
                </svg>
              </button>
              <span className='text-[#01513b] font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mt-4 text-center font-n27'>
                {response}
              </span>
          </>
        )}
      </form>
    </>
  )
}
