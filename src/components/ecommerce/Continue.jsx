import { useRegisterForm } from '../../store/register-form'

export function Continue({ translate, base }) {
  const { items } = useRegisterForm()
  const isDisabled = items.length === 0
  return (
    <>
      <a
        href={`${base}/acceso-programa-vip`}
        className={`bg-black p-4 text-white text-4xl flex rounded-xl justify-center items-center w-full mt-5 ${
          isDisabled
            ? 'cursor-not-allowed opacity-50 pointer-events-none'
            : 'hover:bg-gray-800'
        }`}
        aria-disabled={isDisabled}
      >
        {translate}
      </a>
    </>
  )
}
