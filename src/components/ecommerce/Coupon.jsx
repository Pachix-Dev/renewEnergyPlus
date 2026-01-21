import { useState } from 'react'
import { useRegisterForm } from '../../store/register-form.js'

export function Coupon({ text1, text2 }) {
  const [couponCode, setCouponCode] = useState('')
  const [couponStatus, setCouponStatus] = useState('')
  const [isValidCoupon, setIsValidCoupon] = useState(null)

  const { addDiscount, items } = useRegisterForm()

  const handleCouponChange = (e) => {
    setCouponCode(e.target.value)
    setIsValidCoupon(null)
    setCouponStatus('')
  }

  const checkCoupon = async () => {
    if (couponCode === 'REPLUSMEXICO700') {
      if (!items.find((item) => item.id === 1)) {
        setCouponStatus(text1)
        setIsValidCoupon(false)
        setTimeout(() => setCouponStatus(''), 3000)
        setCouponCode('')
        return
      }
      setCouponStatus(text2)
      setIsValidCoupon(true)
      setCouponCode('')
      addDiscount(
        {
          id: 99,
          name: 'Cupon de descuento',
          name_en: 'Discount Coupon',
          price: -700,
        },
        'GENERAL'
      )
    } else {
      setCouponStatus('Invalid coupon...')
      setTimeout(() => setCouponStatus(''), 3000)
      setCouponCode('')
      return
    }
  }

  // Determine button classes based on whether the input is empty
  const buttonClasses = couponCode.trim()
    ? 'bg-[#941E81] text-white font-bold p-2 rounded-xl'
    : 'bg-gray-400 text-white font-bold p-2 rounded-xl'

  // Determine status message class based on validation result
  const statusMessageClasses = isValidCoupon
    ? 'text-green-600 font-bold'
    : 'text-red-600 font-bold'

  return (
    <>
      <div className='flex gap-4 justify-between pt-5'>
        <input
          type='text'
          className='w-full border-2 border-gray-300 rounded-lg px-2 py-1 focus:border-[#941E81] focus: focus:ring-[#941E81]'
          placeholder='Código de descuento'
          value={couponCode}
          onChange={handleCouponChange}
        />
        <button
          className={buttonClasses}
          onClick={checkCoupon}
          disabled={!couponCode.trim()}
        >
          Aplicar
        </button>
      </div>
      {couponStatus && (
        <p className={isValidCoupon !== null ? statusMessageClasses : ''}>
          {couponStatus}
        </p>
      )}
    </>
  )
}
