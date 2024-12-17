import { useRegisterForm } from '../../store/register-form'

export function Items({ currentLanguage }) {
  const { items, removeToCart } = useRegisterForm()

  function formatAmountMXN(amount) {
    const formattedAmount = new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
    }).format(amount)

    return formattedAmount
  }

  return (
    <div className='grid gap-6 '>
      {items?.map((item) => (
        <div
          key={item.id}
          className='grid md:flex justify-between items-end gap-5 rounded-xl shadow-md p-5 bg-white relative'
        >
          <div className='absolute right-1 top-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={3}
              stroke='currentColor'
              className='size-6 cursor-pointer'
              onClick={() => removeToCart(item.id)}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18 18 6M6 6l12 12'
              />
            </svg>
          </div>
          <p className='text-md'>
            {currentLanguage === 'es' ? item.name : item.name_en}
          </p>
          <p className='text-3xl'>{formatAmountMXN(item.price)}</p>
        </div>
      ))}
    </div>
  )
}
