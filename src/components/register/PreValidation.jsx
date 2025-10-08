import { useState } from 'react'
import { useRegisterForm } from '../../store/register-form'

export function PreValidation({ translates, currentLanguage }) {
  const [correo, setCorreo] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const {
    setName,
    setPaternSurname,
    setMaternSurname,
    setEmail,
    setPhone,
    setTypeRegister,
    setGenre,
    setNacionality,
    setCodeInvitation,

    setCompany,
    setIndustry,
    setPosition,
    setArea,
    setCountry,
    setMunicipality,
    setState,
    setCity,
    setAddress,
    setColonia,
    setColonias,
    setPostalCode,
    setWebPage,
    setPhoneCompany,

    setEventKnowledge,
    setProductInterest,
    setLevelInfluence,
    setWannaBeExhibitor,
    setAlreadyVisited,
  } = useRegisterForm()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const urlbase = import.meta.env.DEV
      ? 'http://localhost:3010/'
      : 'https://re-plus-mexico.com.mx/server/'

    try {
      const response = await fetch(
        `${urlbase}check-user-visit?email=${correo}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      const data = await response.json()
      console.log(data)

      if (data.status) {
        setName(data.name)
        setPaternSurname(data.paternSurname)
        setMaternSurname(data.maternSurname)
        setEmail(data.email)
        setPhone(data.phone)
        setTypeRegister(data.typeRegister)
        setGenre(data.genre)
        setNacionality(data.nacionality)
        setCodeInvitation(data.code_invitation)
        setCompany(data.company)
        setIndustry(data.industry)
        setPosition(data.position)
        setArea(data.area)
        setCountry(data.country)
        setMunicipality(data.municipality)
        setState(data.state)
        setCity(data.city)
        setAddress(data.address)
        setColonia(data.colonia)
        setColonias(data.colonias || [])
        setPostalCode(data.postalCode)
        setWebPage(data.webPage)
        setPhoneCompany(data.phoneCompany)
        setEventKnowledge(data.eventKnowledge)
        setProductInterest(data.productInterest)
        setLevelInfluence(data.levelInfluence)
        setWannaBeExhibitor(data.wannaBeExhibitor)
        setAlreadyVisited(data.alreadyVisited)
        currentLanguage === 'es'
          ? (window.location.href = '/confirma-tus-datos')
          : (window.location.href = '/en/confirma-tus-datos')
      } else {
        setError(
          currentLanguage === 'es'
            ? 'No se encontró el usuario.'
            : 'User not found.'
        )
      }
    } catch (err) {
      setError('Error de conexión. Intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='mt-10 space-y-6'>
        {/* Campo Email */}

        <div>
          <label
            htmlFor='email'
            className='block  text-gray-700 mb-2 font-bold'
          >
            {translates.already_account}
          </label>
          <input
            type='email'
            id='email'
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a244e] focus:border-transparent text-sm'
            placeholder='hello@example.com'
            required
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className='p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm'>
            {error}
          </div>
        )}

        {/* Botón Submit */}
        <button
          type='submit'
          disabled={loading || !correo}
          className='w-full bg-[#6B6497] text-white py-3 px-4 rounded-md font-medium hover:bg-[#2a244e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
        >
          {loading ? (
            <div className='flex items-center justify-center'>
              <svg
                className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                ></path>
              </svg>
              {translates.update_info}
            </div>
          ) : (
            <>{translates.update_info}</>
          )}
        </button>
      </form>
    </div>
  )
}
