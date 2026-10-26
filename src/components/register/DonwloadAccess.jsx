import { useRegisterForm } from '../../store/register-form'
import './Form.css'

export function DonwloadAccess({ text, variant = 'default', fallbackHref = '/reimprimir-gafete' }) {
  const { invoiceDownToLoad } = useRegisterForm()
  const isRegistration = variant === 'registration'

  return (
    <>
      <a
        href={invoiceDownToLoad ? `/invoices/${invoiceDownToLoad}` : fallbackHref}
        target='_blank'
        rel='noopener noreferrer'
        className={isRegistration
          ? 'mt-4 inline-flex min-h-12 w-auto max-w-full items-center justify-center gap-2 rounded-full bg-[#2110c7] p-1 pr-4 text-center text-base font-extrabold uppercase leading-5 tracking-wide text-white transition-colors duration-150 hover:bg-[#ff0066] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-[#003366] motion-reduce:transition-none lg:mt-[2.15rem] lg:gap-[0.9rem] lg:py-[0.3rem] lg:pl-[0.3rem] lg:pr-6 lg:text-[clamp(1rem,1.5vw,1.36rem)] lg:leading-[1.2] lg:tracking-[0.06em]'
          : 'mt-5 button'}
      >
        {isRegistration && (
          <span className='flex size-10 shrink-0 items-center justify-center rounded-full bg-[#ff0066] lg:size-[2.8rem]' aria-hidden='true'>
            <svg className='size-7 lg:size-8' viewBox='0 0 32 32' fill='none' stroke='currentColor' strokeWidth='3.5' strokeLinecap='round' strokeLinejoin='round'>
              <path d='M5 16h22M17 6l10 10-10 10' />
            </svg>
          </span>
        )}
        <span>{text}</span>
      </a>
    </>
  )
}
