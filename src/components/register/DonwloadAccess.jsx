import { useRegisterForm } from '../../store/register-form'

export function DonwloadAccess({ text }) {
  const { invoiceDownToLoad } = useRegisterForm()
  return (
    <>
      {/*<a
        href={`/invoices/${invoiceDownToLoad}`}
        target='_blank'
        className='mt-10 text-white px-4 py-2 rounded-md font-bold bg-red-600 hover:bg-red-700 transition duration-300 ease-in-out'
      >
        {text}
      </a>*/}
      <p className='font-extrabold text-3xl'>{invoiceDownToLoad}</p>
    </>
  )
}
