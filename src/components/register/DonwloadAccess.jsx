import { useRegisterForm } from '../../store/register-form'
import './Form.css'
export function DonwloadAccess({ text }) {
  const { invoiceDownToLoad } = useRegisterForm()
  return (
    <>
      <a
        href={`/invoices/${invoiceDownToLoad}`}
        target='_blank'
        className='mt-5 button'
      >
        {text}
      </a>
    </>
  )
}
