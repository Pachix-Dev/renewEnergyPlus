import { useRegisterForm } from '../../store/register-form'
import { useCallback, useState } from 'react'
import debounce from 'lodash/debounce'
import QRCode from 'react-qr-code'

export function Preregistro() {
  const {
    uuid,
    name,
    paternSurname,
    company,
    position,
    setUuid,
    setName,
    setPaternSurname,
    setMaternSurname,
    setCompany,
    setPosition,
    clear,
  } = useRegisterForm()
  const [message, setMessage] = useState('')
  const urlbase = import.meta.env.DEV
    ? 'http://localhost:3010/'
    : 'https://re-plus-mexico.com.mx/server/'

  // Debounced function to avoid multiple API calls
  const fetchUser = useCallback(
    debounce(async (uuid) => {
      if (!uuid) return // Prevent API call if input is empty

      try {
        const response = await fetch(urlbase + 'search-user?uuid=' + uuid)
        const data = await response.json()

        if (data.status) {
          setUuid(data.user.uuid)
          setName(data.user.name)
          setPaternSurname(data.user.paternSurname)
          setMaternSurname(data.user.maternSurname)
          setCompany(data.user.company)
          setPosition(data.user.position)
        } else {
          clear()
          setMessage('No se encuentra al usuario....')
          setTimeout(() => {
            setMessage('')
          }, 3000)
        }
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }, 500), // 500ms debounce delay
    []
  )

  const handleChange = (event) => {
    fetchUser(event.target.value)
  }

  const handlePrint = async () => {
    const updatePrintUser = await fetch(urlbase + 'update-print-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uuid }),
    })

    const response = await updatePrintUser.json()
    if (!response.success) {
      setMessage('Error al actualizar el usuario')
      setTimeout(() => {
        setMessage('')
      }, 3000)
      return
    }

    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <html>
        <head>
          <title>Print QR Code</title>
          <style>
            body { text-align: center; padding: 20px; }
            svg { max-width: 100%; height: auto; }
            p {font-weight: bold;}
          </style>
        </head>
        <body>
          
          <div id="qr-code-container">
            ${document.getElementById('qr-code').outerHTML}
          </div>
          <h1>${name} ${paternSurname}</h1> 
          <p>${position} <br />${company}</p>          
          <script>
            window.onload = function() {
              window.print();
              setTimeout(() => window.close(), 1000);
            };
          </script>
        </body>
      </html>
    `)
    printWindow.document.close()
    clear()
    document.getElementById('Search').value = ''
  }

  return (
    <>
      <div className='relative w-3/5 mx-auto'>
        <label htmlFor='Search' className='sr-only'>
          Search
        </label>

        <input
          type='text'
          id='Search'
          placeholder='Search for...'
          onChange={handleChange}
          className='w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm'
        />

        <span className='absolute inset-y-0 end-0 grid w-10 place-content-center'>
          <button type='button' className='text-gray-600 hover:text-gray-700'>
            <span className='sr-only'>Search</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='size-4'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
              />
            </svg>
          </button>
        </span>
      </div>
      {message && <p className='mt-10 font-bold text-center'>{message}</p>}
      {uuid && (
        <div className='mt-3 flex flex-col items-center  p-4 border rounded-lg shadow-md'>
          <div id='qr-code'>
            <QRCode value={uuid} size={200} />
          </div>
          <p className='mt-5 text-2xl font-bold'>
            {name} {paternSurname}
          </p>
          <p className='text-xl font-bold text-center'>
            {position} <br />
            {company}
          </p>
          <button
            onClick={handlePrint}
            className='mt-5 bg-blue-500 text-white p-4 rounded-lg shadow-md font-bold hover:bg-blue-700'
          >
            Print QR Code
          </button>
        </div>
      )}
    </>
  )
}
