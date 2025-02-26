import { useState } from 'react'
import { useForm } from 'react-hook-form'

export function Suscribe({ t }) {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [processing, setProcessing] = useState()
  const [message, setMessage] = useState()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({})

  const url = import.meta.env.DEV
    ? 'http://localhost:3010/'
    : 'https://re-plus-mexico.com.mx/'

  const handleSuscriber = async () => {
    setProcessing(true)
    const response = await fetch(url + 'susbribe-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
      }),
    })
    const orderData = await response.json()
    if (orderData?.status) {
      setProcessing(false)
      setMessage('Gracias por suscribirte a nuestro boletin..')
    } else {
      setProcessing(false)
      setMessage(orderData?.message)
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }
  return (
    <>
      <form id='form-newsletter' className='mx-auto'>
        <div className=''>
          <p className='form-label'>{t.name}</p>
          <input
            type='text'
            {...register('name', {
              required: 'Este campo es requerido',
              onChange: (e) => setName(e.target.value),
            })}
            name='name'
            id='name'
            className='bg-[#F4F4F4] border-[#DEE2E6] rounded-md'
            autoComplete='name'
            defaultValue={name}
          />
          {errors.name && (
            <p className='text-red-600 font-light'>* {errors.name.message}</p>
          )}
        </div>
        <div className='mb-3'>
          <p className='form-label my-3'>{t.email}</p>
          <input
            type='email'
            {...register('email', {
              required: 'Ingresa una dirección de correo valido',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'correo invalido',
              },
              onChange: (e) => setEmail(e.target.value),
            })}
            name='email'
            id='email'
            className='bg-[#F4F4F4] border-[#DEE2E6] rounded-md'
            autoComplete='email'
            defaultValue={email}
          />
          {errors.email && (
            <p className='text-red-600 font-light'>* {errors.email.message}</p>
          )}
        </div>
        {processing ? 'Procesando...' : ''}
        {message ? (
          message
        ) : (
          <button
            onClick={handleSubmit(handleSuscriber)}
            className='mt-3 bg-black text-white p-2 rounded-md'
          >
            {t.subscription}
          </button>
        )}
      </form>
    </>
  )
}
