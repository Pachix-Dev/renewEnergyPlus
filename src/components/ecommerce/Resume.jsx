import { useRegisterForm } from '../../store/register-form'

export function Resume({ currentLanguage }) {
  const { items } = useRegisterForm()

  function formatAmountMXN(amount) {
    const formattedAmount = new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
    }).format(amount)

    return formattedAmount
  }

  return (
    <div className='grid gap-6'>
      {items.map((item) => (
        <div
          key={item.id}
          className='flex justify-between items-center gap-5 p-4 bg-white relative'
        >
          <div>
            <h3 className='text-md'>
              {currentLanguage === 'es' ? item.name : item.name_en}
            </h3>
          </div>
          <p className='text-3xl'>{formatAmountMXN(item.price)}</p>
        </div>
      ))}
    </div>
  )
}
