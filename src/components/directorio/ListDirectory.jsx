import React, { useState } from 'react'

const ListDirectory = ({ currentLanguage, listExhibitor }) => {
  const [directorioDigital, setDirectorioDigital] = useState(listExhibitor)
  const [filter, setFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const maxSize = 20
  const pagesSize = Math.ceil(directorioDigital.length / maxSize)

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
      pages.push(i)
    }
    return pages.map((page, index) => {
      return (
        <button
          key={index}
          onClick={() => handleChangePage(page)}
          className={`inline-flex items-center px-3.5 py-2 text-sm font-semibold rounded-lg border transition-colors duration-200 focus:z-20 focus:outline-none focus:ring-2 focus:ring-amber-300 ${
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

  return (
    <div className='flex flex-col gap-6'>
      <div className='w-full my-2'>
        <label
          htmlFor='default-search'
          className='mb-2 text-sm font-medium text-gray-900 sr-only'
        >
          Search
        </label>
        <div className='relative md:mx-20'>
          <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
            <svg
              className='w-4 h-4 text-gray-500'
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
            className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-200 rounded-xl bg-white shadow-sm focus:ring-0 focus:border-[#bc0100]'
            placeholder={
              currentLanguage === 'en' ? 'Search exhibitor' : 'Buscar expositor'
            }
            value={filter}
            onChange={handleFilter}
          />
          <button
            type='submit'
            className='absolute end-2.5 bottom-2.5 bg-gradient-to-r from-[#bc0100] to-[#d86a03] text-white hover:brightness-[105%] focus:ring-2 focus:outline-none focus:ring-[#d86a03] font-medium rounded-lg text-sm px-5 py-2'
          >
            {currentLanguage === 'en' ? 'Search' : 'Buscar'}
          </button>
        </div>
      </div>

      {/* Pagination handlers */}
      <div className='flex flex-col align-middle items-center gap-2'>
        <div className='isolate inline-flex items-center gap-1 rounded-2xl bg-white p-1.5 shadow-sm border border-gray-200'>
          <button
            type='button'
            className='bg-gray-900 text-white relative inline-flex items-center rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed'
            onClick={() => previousPage()}
            disabled={currentPage === 1}
          >
            <span className='sr-only'>Previous</span>
            <svg
              className='size-5'
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
            className='bg-gray-900 text-white relative inline-flex items-center rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed'
            onClick={nextPage}
            disabled={currentPage === pagesSize || pagesSize === 0}
          >
            <span className='sr-only'>Previous</span>
            <svg
              className='size-5  rotate-180'
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

      {directorioDigital.length > 0 ? (
        directorioDigital
          .slice((currentPage - 1) * maxSize, currentPage * maxSize)
          .map((item, index) => {
            return (
              <div
                className='bg-white text-gray-800 flex flex-col md:flex-row align-middle items-center gap-5 mx-auto rounded-2xl p-4 w-full md:w-11/12 border border-gray-200 shadow-sm'
                key={index}
              >
                <div className='rounded-xl z-10 bg-gray-100 w-3/5 md:w-1/4 border border-gray-200 p-3'>
                  <img
                    src={item.logotipo}
                    alt={item.nombreComercial}
                    className='w-40 h-32 md:w-64 md:h-64 object-contain m-auto rounded-md'
                  />
                </div>
                <div className='mx-4 md:ml-0 md:w-3/4 z-10'>
                  <span className='inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700'>
                    Stand: {item.stand}
                  </span>
                  <h2 className='text-2xl font-bold mt-3 text-gray-900'>
                    {item.nombreComercial}
                  </h2>
                  <p className='text-base mt-2 text-justify text-gray-700 leading-relaxed'>
                    {currentLanguage === 'en'
                      ? item.descripcion_en
                      : item.descripcion_es}
                  </p>
                  <div className='mt-4 text-base flex flex-row items-center gap-2 text-gray-600'>
                    {item.direccion ? (
                      <span>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth='1.5'
                          stroke='currentColor'
                          className='w-6 h-6'
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
                    {item.direccion !== '' ? item.direccion + ', ' : ''}
                    {item.cp !== '' ? item.cp + '. ' : ' '}
                    {item.Ciudad !== '' ? item.Ciudad + ', ' : ' '}
                    {item.Estado !== '' ? item.Estado + '. ' : ' '}
                    {item.País !== '' ? item.País : ' '}
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

      {/* Pagination handlers */}
      <div className='flex flex-col align-middle items-center gap-2 mb-8'>
        <div className='isolate inline-flex items-center gap-1 rounded-2xl bg-white p-1.5 shadow-sm border border-gray-200'>
          <button
            type='button'
            className='bg-gray-900 text-white relative inline-flex items-center rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed'
            onClick={() => previousPage()}
            disabled={currentPage === 1}
          >
            <span className='sr-only'>Previous</span>
            <svg
              className='size-5'
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
            className='bg-gray-900 text-white relative inline-flex items-center rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed'
            onClick={nextPage}
            disabled={currentPage === pagesSize || pagesSize === 0}
          >
            <span className='sr-only'>Previous</span>
            <svg
              className='size-5  rotate-180'
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
    </div>
  )
}

export default ListDirectory
