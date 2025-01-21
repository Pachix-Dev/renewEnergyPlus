import { useState } from 'react'
import { useRegisterForm } from '../../store/register-form.js'

export function Upgrade({ translates }) {
  console.log(translates)
  const {
    email,
    setEmail,
    setName,
    setPaternSurname,
    setMaternSurname,
    setPhone,
    setCompany,
    setPosition,
    setIdUser,
    setUuid,
    clear,
  } = useRegisterForm()

  const [message, setMessage] = useState('')
  const [user, setUser] = useState(false)

  const urlbase = import.meta.env.DEV
    ? 'http://localhost:3010/'
    : 'https://re-plus-mexico.com.mx/server/'

  const verifyUser = async () => {
    const response = await fetch(urlbase + 'get-user-by-email?email=' + email)
    const data = await response.json()
    if (data.status) {
      setUser(true)
      setEmail(data.email)
      setName(data.name)
      setPaternSurname(data.paternSurname)
      setMaternSurname(data.maternSurname)
      setPhone(data.phone)
      setIdUser(data.id)
      setUuid(data.uuid)
      setCompany(data.company)
      setPosition(data.position)
      window.location.href = '/programa-premium-checkout'
    } else {
      setUser(false)
      setMessage(data.error)
    }
  }

  const handleEmail = (e) => {
    setUser(false)
    setEmail(e)
  }

  return (
    <>
      <div className='flex flex-col gap-1 md:block md:relative lg:mx-auto lg:w-2/3 xl:w-1/2 mt-5 md:mt-20'>
        <label
          htmlFor='email'
          className='md:text-left w-fit md:absolute bg-black md:-top-6 md:left-2 md:px-3 py-2 text-white rounded-lg'
        >
          {translates.text_2}
        </label>
        <input
          className={`bg-transparent w-full ring-1 rounded-lg ${
            user ? 'ring-emerald-700' : 'ring-[#ED6E0B]'
          } ring-offset-2 ring-offset-transparent px-4 py-3 md:py-5 md:text-xl focus:outline-none`}
          type='email'
          name='email'
          placeholder='tucorreo@hola.com'
          onChange={(e) => handleEmail(e.target.value)}
        />
        <button
          className={`md:absolute md:right-3 ${
            user ? 'bg-emerald-700' : 'bg-[#ED6E0B]'
          } px-4 py-2 mt-3 md:mb-3 rounded-md disabled:cursor-not-allowed w-full md:w-auto text-white`}
          onClick={verifyUser}
          disabled={user}
        >
          {translates.text_3}
        </button>
        {message && (
          <p className='text-red-600 font-bold text-center pt-5 text-xl'>
            {message}
          </p>
        )}
      </div>

      <p className='mt-5 text-center'>
        {translates.text_5}
        {' -> '}
        <a
          href='/registro'
          className='px-3 py-2 bg-[#ED6E0B] hover:bg-red-700 font-bold rounded-2xl text-white  mt-5  gap-2'
        >
          {translates.text_4}
        </a>
      </p>
    </>
  )
}
