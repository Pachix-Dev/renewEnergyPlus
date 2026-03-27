import React, { useState } from 'react'

const ListDirectory = ({ currentLanguage, listExhibitor }) => {
  const [directorioDigital, setDirectorioDigital] = useState(listExhibitor)
  const [filter, setFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [invalidLogos, setInvalidLogos] = useState({})
  const maxSize = 20
  const pagesSize = Math.ceil(directorioDigital.length / maxSize)

  const getLogoKey = (item, index) => {
    return `${item.nombreComercial || 'exhibitor'}-${item.stand || index}`
  }

  const hasValidLogoPath = (logoPath) => {
    if (typeof logoPath !== 'string') return false

    const normalizedPath = logoPath.trim()

    return normalizedPath !== '' && !normalizedPath.endsWith('/')
  }

  const handleLogoError = (item, index) => {
    const logoKey = getLogoKey(item, index)

    setInvalidLogos((currentInvalidLogos) => {
      if (currentInvalidLogos[logoKey]) {
        return currentInvalidLogos
      }

      return {
        ...currentInvalidLogos,
        [logoKey]: true,
      }
    })
  }

  const phoneFormat = (itemPhone) => {
    let phones = itemPhone.split('\n')
    let out = ''
    phones.map((phone, index) => {
      let phoneOut = phone.replace(/\D/g, '').toString()

      out +=
        phone.length >= 11
          ? `${index >= 1 ? `\n` : ''}+${phoneOut.slice(0, 2)} ${phoneOut.slice(
              2,
              5
            )} ${phoneOut.slice(5, 8)} ${phoneOut.slice(8, phone.length)} `
          : `${index >= 1 ? `\n` : ''}+${phoneOut.slice(0, 3)} ${phoneOut.slice(
              3,
              6
            )} ${phoneOut.slice(6, phone.length)} `
    })

    return out
  }

  const addLineBreak = (str) => {
    let newString = str.split('\n')

    return newString.map((subStr, index) => {
      return (
        <React.Fragment key={index}>
          {subStr}
          <br />
        </React.Fragment>
      )
    })
  }

  const handleFilter = (e) => {
    const searchText = e.target.value
    const normalizedSearch = searchText.toLowerCase()

    setFilter(searchText)
    setCurrentPage(1)

    searchText !== ''
      ? setDirectorioDigital(
          listExhibitor.filter(
            (item) =>
              (item.nombreComercial || '')
                .toLowerCase()
                .includes(normalizedSearch) ||
              (item.nombreContacto || '')
                .toLowerCase()
                .includes(normalizedSearch) ||
              (item.Puesto || '').toLowerCase().includes(normalizedSearch) ||
              (item.Correo || '').toLowerCase().includes(normalizedSearch) ||
              (item.paginaWeb || '')
                .toLowerCase()
                .includes(normalizedSearch) ||
              (item.stand || '').toLowerCase().includes(normalizedSearch) ||
              (item.descripcion_es || '')
                .toLowerCase()
                .includes(normalizedSearch) ||
              (item.descripcion_en || '')
                .toLowerCase()
                .includes(normalizedSearch)
          )
        )
      : setDirectorioDigital(listExhibitor)
  }

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage)
  }

  const createpageButtons = () => {
    let pages = []
    for (let i = 1; i <= pagesSize; i++) {
      const isEdgePage = i === 1 || i === pagesSize
      const isCurrentWindow = Math.abs(i - currentPage) <= 1

      if (isEdgePage || isCurrentWindow) {
        pages.push(i)
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...')
      }
    }
    return pages.map((page, index) => {
      if (page === '...') {
        return (
          <span
            key={`ellipsis-${index}`}
            className='inline-flex min-w-8 items-center justify-center px-1.5 py-2 text-sm font-semibold text-gray-400 sm:min-w-10'
          >
            ...
          </span>
        )
      }

      return (
        <button
          key={index}
          onClick={() => handleChangePage(page)}
          className={`inline-flex min-w-8 items-center justify-center rounded-lg border px-2.5 py-2 text-xs font-semibold transition-colors duration-200 focus:z-20 focus:outline-none focus:ring-2 focus:ring-amber-300 sm:min-w-10 sm:px-3.5 sm:text-sm ${
            currentPage === page
              ? 'bg-amber-500 border-amber-500 text-white shadow-sm'
              : 'bg-white border-gray-200 text-gray-700 hover:bg-amber-50 hover:border-amber-300'
          }`}
        >
          {page}
        </button>
      )
    })
  }

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const nextPage = () => {
    if (currentPage < pagesSize) {
      setCurrentPage(currentPage + 1)
    }
  }

  const renderPagination = () => {
    if (pagesSize <= 1) {
      return null
    }

    return (
      <div className='flex flex-col items-center gap-2'>
        <span className='text-xs font-medium text-gray-500 sm:text-sm'>
          {currentLanguage === 'en'
            ? `Page ${currentPage} of ${pagesSize}`
            : `Pagina ${currentPage} de ${pagesSize}`}
        </span>
        <div className='isolate inline-flex max-w-full flex-wrap items-center justify-center gap-1 rounded-2xl border border-gray-200 bg-white p-1.5 shadow-sm'>
          <button
            type='button'
            className='relative inline-flex items-center rounded-lg bg-gray-900 px-2.5 py-2 text-white transition-colors duration-200 hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 sm:px-3'
            onClick={previousPage}
            disabled={currentPage === 1}
          >
            <span className='sr-only'>Previous</span>
            <svg
              className='size-4 sm:size-5'
              viewBox='0 0 20 20'
              fill='currentColor'
              aria-hidden='true'
            >
              <path
                fillRule='evenodd'
                d='M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z'
                clipRule='evenodd'
              />
            </svg>
          </button>
          {createpageButtons()}
          <button
            type='button'
            className='relative inline-flex items-center rounded-lg bg-gray-900 px-2.5 py-2 text-white transition-colors duration-200 hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 sm:px-3'
            onClick={nextPage}
            disabled={currentPage === pagesSize || pagesSize === 0}
          >
            <span className='sr-only'>Next</span>
            <svg
              className='size-4 rotate-180 sm:size-5'
              viewBox='0 0 20 20'
              fill='currentColor'
              aria-hidden='true'
            >
              <path
                fillRule='evenodd'
                d='M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='w-full my-2'>
        <label
          htmlFor='default-search'
          className='mb-2 text-sm font-medium text-gray-900 sr-only'
        >
          {currentLanguage === 'en' ? 'Search' : 'Buscar'}
        </label>
        <div className='relative md:mx-20'>
          <div className='absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none'>
            <svg
              className='h-4 w-4 text-gray-500'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 20 20'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
              />
            </svg>
          </div>
          <input
            type='search'
            id='default-search'
            className='block w-full rounded-xl border border-gray-200 bg-white p-3.5 ps-12 pe-28 text-sm text-gray-900 shadow-sm focus:ring-0 focus:border-[#bc0100] md:p-4 md:ps-12 md:pe-32'
            placeholder={
              currentLanguage === 'en' ? 'Search exhibitor' : 'Buscar expositor'
            }
            value={filter}
            onChange={handleFilter}
          />
          <button
            type='submit'
            className='absolute end-2 bottom-2 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#bc0100] to-[#d86a03] px-4 py-2 text-sm font-medium text-white hover:brightness-[105%] focus:ring-2 focus:outline-none focus:ring-[#d86a03] md:end-2.5 md:bottom-2.5 md:px-5'
          >
            {currentLanguage === 'en' ? 'Search' : 'Buscar'}
          </button>
        </div>
      </div>

      {renderPagination()}

      {directorioDigital.length > 0 ? (
        directorioDigital
          .slice((currentPage - 1) * maxSize, currentPage * maxSize)
          .map((item, index) => {
            const logoKey = getLogoKey(item, index)
            const showLogo =  hasValidLogoPath(item.logotipo) && !invalidLogos[logoKey]

            return (
              <div
                className='bg-white text-gray-800 flex flex-col md:flex-row align-middle items-stretch gap-4 mx-auto rounded-2xl p-3 sm:p-4 w-full md:w-11/12 border border-gray-200 shadow-sm'
                key={index}
              >
                <div className='rounded-xl z-10 bg-gray-100 w-full max-w-[18rem] self-center md:self-auto md:max-w-none md:w-1/4 border border-gray-200 p-2.5 sm:p-3'>
                  {showLogo ? (
                    <div className='flex min-h-[8.5rem] sm:min-h-[10rem] md:min-h-[16rem] items-center justify-center rounded-lg bg-white p-2 sm:p-3'>
                      <img
                        src={item.logotipo}
                        alt={item.nombreComercial}
                        className='m-auto h-24 w-full max-w-[12rem] object-contain rounded-md sm:h-32 sm:max-w-[14rem] md:h-64 md:max-w-[16rem]'
                        onError={() => handleLogoError(item, index)}
                      />
                    </div>
                  ) : (
                    <div className='flex min-h-[8.5rem] sm:min-h-[10rem] md:min-h-[16rem] flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white px-4 text-center'>
                      <span className='text-xs font-medium leading-5 text-gray-500 sm:text-sm'>
                        {currentLanguage === 'en'
                          ? 'Logo not available'
                          : 'Logotipo no disponible'}
                      </span>
                    </div>
                  )}
                </div>
                <div className='w-full px-1 sm:px-2 md:px-0 md:w-3/4 z-10'>
                  <span className='inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 sm:text-sm'>
                    Stand: {item.stand}
                  </span>
                  <h2 className='mt-3 text-xl font-bold leading-tight text-gray-900 sm:text-2xl'>
                    {item.nombreComercial}
                  </h2>
                  <p className='mt-2 text-sm text-left text-gray-700 leading-6 sm:text-base sm:text-justify sm:leading-relaxed'>
                    {currentLanguage === 'en'
                      ? item.descripcion_en
                      : item.descripcion_es}
                  </p>
                  <div className='mt-4 flex flex-row items-start gap-2 text-sm leading-6 text-gray-600 sm:text-base'>
                    {item.direccion ? (
                      <span>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth='1.5'
                          stroke='currentColor'
                          className='h-5 w-5 sm:h-6 sm:w-6'
                        >
                          <>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                            />
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z'
                            />
                          </>
                        </svg>
                      </span>
                    ) : (
                      ''
                    )}
                    <span>
                      {item.direccion !== '' ? item.direccion + ', ' : ''}
                      {item.cp !== '' ? item.cp + '. ' : ' '}
                      {item.Ciudad !== '' ? item.Ciudad + ', ' : ' '}
                      {item.Estado !== '' ? item.Estado + '. ' : ' '}
                      {item.País !== '' ? item.País : ' '}
                    </span>
                  </div>
                </div>
              </div>
            )
          })
      ) : (
        //"Sin resultados"
        <h1 className='p-6 rounded-xl bg-gray-100 border border-gray-200 my-8 text-gray-800 text-2xl font-bold text-center'>
          No hay resultados
        </h1>
      )}

      <div className='mb-8'>{renderPagination()}</div>
    </div>
  )
}

export default ListDirectory
