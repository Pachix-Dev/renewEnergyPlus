import { useRegisterForm } from '../../store/register-form.js'

export function AddEnergyNight({ item, translate }) {
  const { addToCart } = useRegisterForm()
  const handleAddToCart = () => {
    addToCart(item)
    window.location.href = '/programa-premium-productos'
  }
  return (
    <div className='flex flex-col items-center'>
      <button
        onClick={() => handleAddToCart()}
        className='mt-5 text-black hover:text-white font-bold p-2 bg-[#A399C7] rounded-lg uppercase'
      >
        {translate.addtocart}
      </button>
    </div>
  )
}
