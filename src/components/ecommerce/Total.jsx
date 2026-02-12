import { useRegisterForm } from '../../store/register-form'

export function Total() {
  const { total } = useRegisterForm()

  function formatAmountMXN(amount) {
    const formattedAmount = new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
    }).format(amount)

    return formattedAmount
  }

  return (
    <div className='mt-2 grid gap-2 items-center bg-white p-4 rounded-xl shadow-md'>
      <div className='flex justify-between'>
        <p className='text-xl'>Subtotal</p>
        <p className='text-xl'>{formatAmountMXN(total)}</p>
      </div>
      <div className='flex justify-between'>
        <h2 className='text-4xl font-extrabold'>Total</h2>
        <p className='text-4xl font-extrabold'>{formatAmountMXN(total)}</p>
      </div>
    </div>
  )
}
