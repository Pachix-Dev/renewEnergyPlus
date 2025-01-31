import { useState } from 'react'
import { Speaker } from '../program-free/Speaker'

export function Program({ conferences, translate, language }) {
  const [day, setDay] = useState(conferences.day_1)

  return (
    <>
      <div className='text-white flex flex-wrap justify-center gap-2 md:gap-1 mt-1 px-0'>
        {['day_1', 'day_2', 'day_3'].map((dayKey, index) => (
          <button
            key={index}
            onClick={() => setDay(conferences[dayKey])}
            className='bg-[#A9001B] rounded-md hover:bg-[#C64E08] hover:scale-105 transition-transform duration-300 p-3 md:p-5 text-white font-bold  max-w-xs sm:max-w-md  text-sm md:text-xl w-full md:w-auto'
          >
            {translate[dayKey]}
          </button>
        ))}
      </div>

      <div className='mt-5 px-6'>
        {day.map((conference, index) => (
          <div
            key={index}
            className='flex flex-col md:flex-row gap-4 md:gap-6 text-white my-5 bg-black/60 shadow-lg p-6 rounded-lg'
          >
            <div className='flex items-center gap-2 p-3 text-sm md:text-lg'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6 md:size-8'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                />
              </svg>
              {conference.hour}
              <p className='flex-1'>{conference.duración}</p>
            </div>
            <div className='flex flex-col md:flex-row md:items-center md:space-x-4 w-full'>
              <div className='flex-1 gap-2 p-3'>
                <p className='pb-3 text-lg md:text-2xl font-bold text-center md:text-left'>
                  {language === 'es' ? conference.title : conference.title_en}
                </p>
                <p className='pb-3 text-sm md:text-lg text-justify'>
                  {language === 'es' ? conference.resume : conference.resume_en}
                </p>
                <span className='bg-green-700 p-1 rounded-md italic text-xs md:text-sm'>
                  {language === 'es' ? conference.tag : conference?.tag_en}
                </span>
              </div>
              <div className='gap-10 p-3'>
                {conference.speakers?.map(
                  (speaker, index) =>
                    speaker.name && (
                      <div
                        key={index}
                        className='flex items-center justify-center'
                      >
                        <div className='mr-6 w-50 h-32 items-center'>
                          <Speaker speaker={speaker} language={language} />
                        </div>

                        <h1 className='text-white text-sm md:text-lg font-semibold mt-2 flex items-center p-1 bg-custom-orange rounded-lg w-60 h-13'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='size-4 md:size-5 mr-2'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
                            />
                          </svg>
                          {speaker.name}
                        </h1>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
