import { useState } from 'react'

export default function Reimpresion({ translates }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [pdfUrl, setPdfUrl] = useState('')

  const urlbase = import.meta.env.DEV
    ? 'http://localhost:3010/'
    : 'https://re-plus-mexico.com.mx/server/'

  const validateEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')
    setPdfUrl('')

    if (!validateEmail(email)) {
      setError(
        translates?.error_invalid || 'Ingresa un correo electrónico válido.'
      )
      return
    }

    try {
      setLoading(true)

      const res = await fetch(`${urlbase}get-badge-to-print?email=${email}`)

      if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new Error(
          text ||
            translates?.error_service ||
            'No se pudo consultar el servicio'
        )
      }

      const data = await res.json()

      if (!data?.status || !data?.user?.uuid) {
        const apiMsg =
          data?.error ||
          data?.message ||
          translates?.not_found ||
          'No se encontró el usuario'
        throw new Error(apiMsg)
      }

      const uuid = data.user.uuid
      const url = `https://re-plus-mexico.com.mx/invoices/${uuid}.pdf`
      setPdfUrl(url)
      setMessage(translates?.success || 'Gafete listo. Abriendo tu PDF…')

      // Abre en nueva pestaña para no perder el contexto
      window.open(url, '_blank', 'noopener')
    } catch (err) {
      setError(
        err.message ||
          translates?.error_generic ||
          'Ocurrió un error. Intenta nuevamente.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='max-w-xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8'>
      <h2 className='text-2xl font-bold text-gray-800 mb-2'>
        {translates?.title || 'Reimprime tu gafete'}
      </h2>
      <p className='text-gray-600 mb-6'>
        {translates?.description ||
          'Ingresa el correo con el que te registraste y abriremos tu PDF.'}
      </p>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            {translates?.email_label || 'Correo electrónico'}
          </label>
          <input
            id='email'
            type='email'
            className={`w-full rounded-xl border-2 px-4 py-3 focus:outline-none transition-colors ${
              error
                ? 'border-red-500 bg-red-50'
                : 'border-gray-300 bg-gray-50 focus:border-[#565078] focus:bg-white'
            }`}
            placeholder='email@ejemplo.com'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (error) setError('')
              if (message) setMessage('')
            }}
            disabled={loading}
            required
          />
        </div>

        <button
          type='submit'
          disabled={loading}
          className='w-full inline-flex items-center justify-center rounded-xl bg-[#565078] text-white font-semibold py-3 px-4 hover:bg-[#49426a] disabled:opacity-60'
        >
          {loading
            ? translates?.loading || 'Buscando…'
            : translates?.submit || 'Mostrar gafete'}
        </button>
      </form>

      {message && (
        <div className='mt-4 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg p-3'>
          {message}
          {pdfUrl && (
            <div className='mt-2'>
              <a
                className='text-emerald-800 underline'
                href={pdfUrl}
                target='_blank'
                rel='noreferrer noopener'
              >
                {translates?.open_again || 'Abrir PDF nuevamente'}
              </a>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className='mt-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3'>
          {error}
        </div>
      )}

      <p className='mt-6 text-xs text-gray-500'>
        {translates?.tip ||
          'Consejo: revisa tu carpeta de Descargas si el navegador abre el PDF directamente.'}
      </p>
    </div>
  )
}
