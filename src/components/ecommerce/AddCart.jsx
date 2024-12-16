import { useRegisterForm } from '../../store/register-form.js'

export function AddCart({ item, translate }) {
  const { addToCart } = useRegisterForm()

  return (
    <>
      <button
        onClick={() => addToCart(item)}
        className='text-white font-bold p-2 bg-gray-700 rounded-lg'
      >
        {translate.addtocart}
      </button>
    </>
  )
}
