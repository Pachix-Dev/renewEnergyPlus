import { useState } from 'react'
export function Program({conferences, translate, language }) {
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
            <div className="flex items-center space-x-4">
            <div className="flex-1">
              <p className="pb-5 text-4xl font-bold">
                {language === 'es' ? conference.title : conference.title_en}{' '}
              </p>
              <p className="pb-5 text-xl ">
                {language === 'es' ? conference.resume : conference.resume_en}{' '}
              </p>
              <span className="bg-green-700 p-1 rounded-md italic">
                {language === 'es' ? conference.tag : conference?.tag_en}
              </span>
            </div>
            {conference.speakers?.some(speaker => speaker.name !== "") && (
            <div className="flex flex-col bg-custom-orange p-4 rounded-lg shadow-lg">
              {conference.speakers.map((speaker, index) => (
                speaker.name !== "" && (
                  
                  <h1 key={index} className="text-white text-lg font-semibold mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 mr-2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                  {speaker.name}
                </h1>
                
      )
    ))}
  </div>
)}

              

            </div>

          </div>
        )
      })}
    </>
  )
}
