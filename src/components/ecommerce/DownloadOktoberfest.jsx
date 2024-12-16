import { useOktoberfest } from '../../store/oktoberfest-cart'

export function DownloadOktoberfest({ text }) {
  const { invoiceDownToLoad } = useOktoberfest()
  return (
    <>
      <a
        href={`/invoices/${invoiceDownToLoad}`}
        target='_blank'
        className='mt-10 text-white px-4 py-2 rounded-md font-bold bg-red-600 hover:bg-red-700 transition duration-300 ease-in-out'
      >
        {text}
      </a>
    </>
  )
}
