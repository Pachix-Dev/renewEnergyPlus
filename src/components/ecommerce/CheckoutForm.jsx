import { useRegisterForm } from '../../store/register-form'
import { useState, useEffect } from 'react'
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js'
import { Upgrade } from './Upgrade'
import { Infouser } from './Infouser'

export function CheckoutForm({ currentLanguage, translates }) {
  const lang = currentLanguage === 'es' ? '' : '/en'
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

  const [message, setMessage] = useState('')
  const [processing, setProcessing] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState('')

  if (items.length === 0) {
    return (
      <div className='flex-1 flex flex-col justify-center items-center h-full min-h-[400px] bg-gray-50 rounded-2xl'>
        <div className='text-center p-8'>
          <svg
            className='w-16 h-16 text-gray-400 mx-auto mb-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M3 3h2L7 13h10l4-8H9L6 3z'
            />
          </svg>
          <p className='text-2xl font-bold text-gray-700 mb-4'>
            {translates.empty_cart || 'Tu carrito está vacío'}
          </p>
          <a
            href={`${lang}/programa-premium-productos`}
            className='inline-flex items-center gap-2 bg-[#4e549f] hover:bg-[#1f2937] text-white rounded-lg px-6 py-3 font-semibold transition-colors'
          >
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M7 16l-4-4m0 0l4-4m-4 4h18'
              />
            </svg>
            {translates.back_to_shop || 'Volver a la tienda'}
          </a>
        </div>
      </div>
    )
  }

  const urlbase = import.meta.env.DEV
    ? 'http://localhost:3010/'
    : 'https://re-plus-mexico.com.mx/server/'

  // Client ID corregido
  const client_id = import.meta.env.DEV
    ? 'ATiUATgSHsCqGLn3AboCziXwPiGRjdJKYCam-fHR5pumV11OEBsffTTMLGD4AD9Auy2aG3nsKhj28YOF'
    : 'Aa0JkMqk88tZqD7QkKtNEt2pArR0ExXwTP-nwSB6_S_RBBsFOe6EXPntvAvjP2hhXNBpBF9IYwiLOBgB'

  // Configuración simplificada como en el ejemplo
  const style = { layout: 'vertical' }

  const initialOptions = {
    clientId: client_id,
    currency: 'MXN',
    intent: 'capture',
    locale: currentLanguage === 'es' ? 'es_MX' : 'en_US',
    components: 'buttons', // Añadido como en el ejemplo
  }

  const [copied, setCopied] = useState(false)
  const textToCopy = '030225900038362623'

  const handleCopy = async (event) => {
    event.preventDefault()
    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Error copying to clipboard:', err)
    }
  }

  async function createOrder() {
    const response = await fetch(urlbase + 'create-order-replus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items,
        total: total,
      }),
    })
    const order = await response.json()
    if (order.id) {
      return order.id
    } else {
      setProcessing(false)
      setMessage(order?.message)
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }

  async function onApprove(data) {
    setProcessing(true)
    const response = await fetch(urlbase + 'complete-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderID: data.orderID,
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
    const orderData = await response.json()
    if (orderData.status) {
      clear()
      setCompleteRegister(true)
      setInvoiceDownToLoad(orderData?.invoice)
      currentLanguage === 'es'
        ? (window.location.href = '/gracias-por-tu-compra')
        : (window.location.href = '/en/gracias-por-tu-compra')
    } else {
      setProcessing(false)
      setMessage(orderData?.message)
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }

  // ButtonWrapper simplificado como en el ejemplo
  const ButtonWrapper = ({ showSpinner }) => {
    const [{ isPending, isRejected }] = usePayPalScriptReducer()

    // Manejo de errores simplificado
    if (isRejected) {
      return (
        <div className='bg-red-50 border border-red-200 rounded-lg p-4 text-center'>
          <div className='flex items-center justify-center gap-2 text-red-600 mb-2'>
            <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
              <path
                fillRule='evenodd'
                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                clipRule='evenodd'
              />
            </svg>
            <span className='font-semibold'>{translates.error_payment}</span>
          </div>
          <p className='text-sm text-red-600 mb-3'>{translates.try_spei}</p>
          <button
            onClick={() => window.location.reload()}
            className='text-sm bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors'
          >
            Reintentar
          </button>
        </div>
      )
    }

    return (
      <>
        {showSpinner && isPending && (
          <div className='flex justify-center py-4'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
          </div>
        )}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[style]}
          fundingSource={undefined}
          createOrder={createOrder}
          onApprove={onApprove}
          onError={(err) => {
            console.error('PayPal Button Error:', err)
            setMessage(
              'Error en PayPal. Por favor, intenta nuevamente o usa transferencia bancaria.'
            )
            setTimeout(() => setMessage(''), 5000)
          }}
        />
      </>
    )
  }

  return (
    <>
      {uuid ? (
        <Infouser translates={translates} />
      ) : (
        <Upgrade translates={translates} />
      )}

      {uuid && (
        <div className='mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden'>
          <div className='bg-gradient-to-r from-gray-50 to-slate-50 px-6 py-4 border-b border-gray-200'>
            <h3 className='font-bold text-xl text-gray-900 flex items-center gap-3'>
              <div className='w-8 h-8 bg-gradient-to-r from-[#5E5884] to-[#7B6FA8] rounded-full flex items-center justify-center'>
                <svg
                  className='w-4 h-4 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
                  />
                </svg>
              </div>
              {translates.method_payment || 'Método de Pago'}
            </h3>
          </div>

          <div className='p-6'>
            {/* Tarjeta de Crédito/Débito */}
            <div className='rounded-xl border-2 p-4 bg-white hover:border-blue-300 transition-colors'>
              <div className='flex justify-between items-center'>
                <div className='flex gap-3 items-center'>
                  <input
                    type='radio'
                    name='payment'
                    id='credit_card'
                    value='credit_card'
                    checked={selectedPayment === 'credit_card'}
                    onChange={() => setSelectedPayment('credit_card')}
                    className='w-4 h-4 text-blue-600'
                  />
                  <label
                    htmlFor='credit_card'
                    className='font-semibold text-gray-800 cursor-pointer'
                  >
                    {translates.credit_debit_card ||
                      'Tarjeta de Crédito o Débito'}
                  </label>
                </div>
                <div className='flex flex-wrap justify-center items-center gap-2'>
                  <img
                    src='/visa.webp'
                    alt='Visa'
                    width={40}
                    className='rounded'
                  />
                  <img
                    src='/mastercard.webp'
                    alt='Mastercard'
                    width={40}
                    className='rounded'
                  />
                  <img
                    src='/amex.png'
                    alt='Amex'
                    width={40}
                    className='rounded'
                  />
                  <img
                    src='/paypal.png'
                    alt='PayPal'
                    width={40}
                    className='rounded'
                  />
                </div>
              </div>

              {selectedPayment === 'credit_card' && (
                <div className='mt-4 p-4 bg-gray-50 rounded-lg'>
                  <PayPalScriptProvider options={initialOptions}>
                    <ButtonWrapper showSpinner={true} />
                  </PayPalScriptProvider>
                </div>
              )}
            </div>

            {/* Transferencia Bancaria */}
            <div className='rounded-xl border-2 p-4 mt-4 bg-white hover:border-green-300 transition-colors'>
              <div className='flex justify-between items-center'>
                <div className='flex gap-3 items-center'>
                  <input
                    type='radio'
                    name='payment'
                    id='bank_transfer'
                    value='bank_transfer'
                    checked={selectedPayment === 'bank_transfer'}
                    onChange={() => setSelectedPayment('bank_transfer')}
                    className='w-4 h-4 text-green-600'
                  />
                  <label
                    htmlFor='bank_transfer'
                    className='font-semibold text-gray-800 cursor-pointer'
                  >
                    {translates.spei_transfer || 'Transferencia SPEI'}
                  </label>
                </div>
                <img
                  src='/spei.webp'
                  alt='SPEI'
                  width={80}
                  className='rounded'
                />
              </div>

              {selectedPayment === 'bank_transfer' && (
                <div className='mt-4 '>
                  <div className='mb-4'>
                    <div className='flex justify-between items-center gap-3 p-3 bg-white rounded-lg border'>
                      <div className='flex gap-3 items-center'>
                        <div className='w-10 h-10 bg-green-500 rounded-full flex items-center justify-center'>
                          <svg
                            className='w-5 h-5 text-white'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v7.5M12 12.75l3 3m0 0l-3 3m3-3H3'
                            />
                          </svg>
                        </div>
                        <div>
                          <p className='font-bold text-gray-800'>
                            {translates.account || 'Cuenta CLABE'}
                          </p>
                          <p className='font-mono text-lg font-bold text-green-700'>
                            {textToCopy}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={handleCopy}
                        className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2'
                      >
                        {copied ? (
                          <>
                            <svg
                              className='w-4 h-4'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                            >
                              <path
                                fillRule='evenodd'
                                d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                                clipRule='evenodd'
                              />
                            </svg>
                            {translates.copy_success || '¡Copiado!'}
                          </>
                        ) : (
                          <>
                            <svg
                              className='w-4 h-4'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
                              />
                            </svg>
                            {translates.copy || 'Copiar'}
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className='space-y-3 text-sm text-gray-700'>
                    <div className='bg-white p-3 rounded-lg border'>
                      <p className='font-bold text-gray-800 mb-2'>
                        {translates.instructions || 'Instrucciones'}
                      </p>
                      <p className='mt-2'>{translates.instructions_text}</p>
                      <p
                        className='mt-2'
                        dangerouslySetInnerHTML={{
                          __html: translates.instructions_text_2,
                        }}
                      />
                      <p
                        className='mt-2'
                        dangerouslySetInnerHTML={{
                          __html: translates.instructions_text_3,
                        }}
                      />
                      <p
                        className='mt-2'
                        dangerouslySetInnerHTML={{
                          __html: translates.instructions_text_4,
                        }}
                      />
                      <p
                        className='mt-2'
                        dangerouslySetInnerHTML={{
                          __html: translates.instructions_text_5,
                        }}
                      />
                    </div>

                    <div
                      className='bg-green-100 border border-green-300 text-green-800 rounded-lg p-3'
                      dangerouslySetInnerHTML={{
                        __html:
                          translates.instructions_text_6 ||
                          '<strong>Importante:</strong> Envía el comprobante de pago a info@re-mexico.com para confirmar tu registro.',
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {message && (
            <div className='mx-6 mb-6 p-4 bg-red-50 border border-red-200 rounded-lg'>
              <p className='text-red-600 font-semibold text-center flex items-center justify-center gap-2'>
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                    clipRule='evenodd'
                  />
                </svg>
                {message}
              </p>
            </div>
          )}
        </div>
      )}

      {processing && (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-[999] flex items-center justify-center'>
          <div className='bg-white rounded-2xl p-8 max-w-md mx-4 text-center'>
            <div className='flex justify-center mb-4'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
            </div>
            <p className='text-lg font-semibold text-gray-800 mb-2'>
              {translates.processing || 'Procesando pago...'}
            </p>
            <p className='text-sm text-gray-600'>
              {translates.processing_description ||
                'Por favor espera mientras procesamos tu información.'}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
