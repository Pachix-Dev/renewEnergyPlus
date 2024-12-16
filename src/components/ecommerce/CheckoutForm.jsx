import { useRegisterForm } from '../../store/register-form'
import { useState } from 'react'

import { initMercadoPago, CardPayment } from '@mercadopago/sdk-react'
initMercadoPago('TEST-095f1368-d3e7-4f78-988b-f86fe5867695')

export function CheckoutForm({ currentLanguage, translate }) {
  const {
    items,
    idUser,
    uuid,
    name,
    paternSurname,
    email,
    phone,
    company,
    position,
    setCompleteRegister,
    setInvoiceDownToLoad,
    total,
    clear,
  } = useRegisterForm()

  const [processing, setProcessing] = useState(false)
  const [message, setMessage] = useState('')

  if (items.length === 0) {
    return (
      <div className='flex-1 flex flex-col justify-center items-center h-screen'>
        <p className='text-2xl font-bold'>{translate.empty_cart}</p>
        <a
          href='/programa-premium-productos'
          className='bg-[#002C5B] hover:bg-[#941E81] text-white rounded-lg p-4 mt-5'
        >
          {translate.back_to_shop}
        </a>
      </div>
    )
  }

  const urlbase = import.meta.env.DEV
    ? 'http://localhost:3010/'
    : 'https://re-plus-mexico.com.mx/server/'

  const initialization = {
    amount: total,
  }

  const handlePaymentSubmit = async (paymentData) => {
    setProcessing(true)
    const response = await fetch(urlbase + 'create-order-replus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentData,
        idUser,
        uuid,
        items,
        email,
        name,
        paternSurname,
        phone,
        company,
        position,
        currentLanguage,
        total: total,
      }),
    })

    const order = await response.json()
    if (order?.status) {
      clear()
      setCompleteRegister(true)
      setInvoiceDownToLoad(order?.invoice)
      currentLanguage === 'es'
        ? (window.location.href = '/gracias-por-tu-compra')
        : (window.location.href = '/en/gracias-por-tu-compra')
    } else {
      setProcessing(false)
      setMessage(order?.message)
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }

    return order.id
  }

  const onError = async (error) => {
    // callback llamado para todos los casos de error de Brick
    console.log(error)
  }

  const onReady = async () => {
    /*
      Callback llamado cuando Brick está listo.
      Aquí puedes ocultar cargamentos de su sitio, por ejemplo.
    */
  }
  return (
    <>
      <div className='px-4 py-7 sm:px-6 lg:px-8 border rounded-2xl shadow-lg'>
        <div className='flex justify-between'>
          <p className='font-bold text-2xl'>{translate.register_data}</p>
        </div>
        <div className='mt-4 grid sm:grid-cols-2 gap-5'>
          <div className='flex gap-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
              />
            </svg>
            <div className='font-bold'>{name}</div>
          </div>

          <div className='flex gap-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75'
              />
            </svg>
            <div className='font-bold'>{email}</div>
          </div>

          <div className='flex gap-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3'
              />
            </svg>

            <div className='font-bold'>{phone}</div>
          </div>

          <div className='flex gap-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21'
              />
            </svg>
            <div className='font-bold'>{company}</div>
          </div>
        </div>
      </div>
      <div className='mt-5 px-7 py-7 mx-auto border rounded-2xl shadow-lg'>
        <p className='font-bold text-2xl'>{translate.method_payment}</p>
        <CardPayment
          initialization={initialization}
          onSubmit={handlePaymentSubmit}
          onReady={onReady}
          onError={onError}
        />
        <p className='text-red-600 font-bold text-center'>{message}</p>
      </div>
      {processing && (
        <div className='absolute top-0 left-0 bg-gray-400 bg-opacity-85 z-[999] w-full h-screen'>
          <div role='status' className='grid place-items-center w-full h-full'>
            <p className='text-center flex gap-2'>
              <svg
                aria-hidden='true'
                className='w-8 h-8 text-gray-200 animate-spin fill-blue-600'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                  fill='currentColor'
                />
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='currentFill'
                />
              </svg>
              <span className='font-bold text-white text-2xl'>
                Estamos procesando la información por favor espere...
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  )
}
