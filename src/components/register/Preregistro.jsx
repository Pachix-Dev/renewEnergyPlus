import { useRegisterForm } from '../../store/register-form'
import { useCallback } from 'react'
import debounce from 'lodash/debounce'

export function Preregistro() {
  const {
    uuid,
    setUuid,
    name,
    setName,
    paternSurname,
    setPaternSurname,
    maternSurname,
    setMaternSurname,
    company,
    setCompany,
    position,
    setPosition,
    clear,
  } = useRegisterForm()

  const urlbase = import.meta.env.DEV
    ? 'http://localhost:3010/'
    : 'https://re-plus-mexico.com.mx/server/'

  const handleChange = async (event) => {
    const response = await fetch(
      urlbase + 'search-user?uuid=' + event.target.value
    )
    const data = await response.json()
    console.log(data)
    if (data.status) {
      setUuid(data.user.uuid)
      setName(data.user.name)
      setPaternSurname(data.user.paternSurname)
      setMaternSurname(data.user.maternSurname)
      setCompany(data.user.company)
      setPosition(data.user.position)
    } else {
      clear()
      alert('Error al buscar el usuario')
      return
    }
  }

  return (
    <div className='relative w-3/5 mx-auto'>
      <label htmlFor='Search' className='sr-only'>
        {' '}
        Search{' '}
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
  )
}
