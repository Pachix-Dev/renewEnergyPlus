import { useState } from 'react'
export function Program({ conferences, translate, language }) {
  const [day, setDay] = useState(conferences.day_1)
  return (
    <>
      <div className='text-white flex flex-wrap gap-10 mt-20'>
        <button
          onClick={() => setDay(conferences.day_1)}
          className='bg-[#A9001B] rounded-md hover:bg-[#C64E08] hover:scale-105 ease-in-out duration-300 p-5'
        >
          <span className='text-white z-10 font-extrabold text-xl'>
            {translate.day_1}
          </span>
        </button>
        <button
          onClick={() => setDay(conferences.day_2)}
          className='bg-[#A9001B] rounded-md hover:bg-[#C64E08] hover:scale-105 ease-in-out duration-300 p-5'
        >
          <span className='text-white z-10 font-extrabold text-xl'>
            {translate.day_2}
          </span>
        </button>
        <button
          onClick={() => setDay(conferences.day_3)}
          className='bg-[#A9001B] rounded-md hover:bg-[#C64E08] hover:scale-105 ease-in-out duration-300 p-5'
        >
          <span className='text-white z-10 font-extrabold text-xl'>
            {translate.day_3}
          </span>
        </button>
      </div>
      {day.map((conference, index) => {
        return (
          <div
            key={index}
            className='flex gap-20 text-white my-10 bg-black/50 shadow-md p-6 rounded-md'
          >
            <div className='flex gap-2 items-center'>
              {' '}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                />
              </svg>
              {conference.hour}
            </div>
            <div className=''>
              <p className='pb-5 text-2xl font-bold'>
                {language === 'es' ? conference.title : conference.title_en}{' '}
              </p>
              <span className='bg-green-700 p-1 rounded-md italic'>
                {language === 'es' ? conference.tag : conference?.tag_en}
              </span>
            </div>
          </div>
        )
      })}
    </>
  )
}
