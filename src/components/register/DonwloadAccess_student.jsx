import { useRegisterStudent } from '../../store/register-student'
import './Form.css'
export function DonwloadAccess_student({ text }) {
  const { invoiceDownToLoad } = useRegisterStudent()
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
