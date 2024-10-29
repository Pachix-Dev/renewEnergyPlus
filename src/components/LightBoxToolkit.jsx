import { useState, useEffect } from 'react'

export default function LightGallery({ images }) {
  const [isOpen, setIsOpen] = useState(false)

  const [currentImage, setCurrentImage] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const imagesPerPage = 8

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeLightbox()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const openLightbox = (index) => {
    setCurrentImage(index)
    setIsOpen(true)
  }

  const closeLightbox = () => {
    setCurrentImage(null)
    setIsOpen(false)
  }

  // const nextImage = () => {
  //   setCurrentImage((prevIndex) => (prevIndex + 1) % images.length)
  // }

  // const prevImage = () => {
  //   setCurrentImage(
  //     (prevIndex) => (prevIndex - 1 + images.length) % images.length
  //   )
  // }

  const handleThumbnailClick = (index) => {
    setCurrentImage(index)
  }

  const handlePageClick = (page) => {
    if (page < 1 || page > Math.ceil(images.length / imagesPerPage)) return
    setCurrentPage(page)
  }

  const getPaginatedImages = () => {
    const startIndex = (currentPage - 1) * imagesPerPage
    const endIndex = startIndex + imagesPerPage
    return images.slice(startIndex, endIndex)
  }

  return (
    <div className='mt-10 grid gap-4'>
      <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
        {getPaginatedImages().map((image, index) => (
          <div key={index} className='cursor-pointer'>
            <img
              className='h-auto w-full object-cover rounded-lg'
              src={image.src}
              alt={image.alt}
              onClick={() => openLightbox(image.id)}
            />
            <p className='text-center font-bold text-xl'>{image.title}</p>
          </div>
        ))}
      </div>

      {isOpen && (
        <div className='fixed top-0 z-50 left-0 w-full h-full bg-black bg-opacity-90 grid place-content-center'>
          <div className='w-full md:w-11/12 mx-auto'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-9 absolute font-extrabold top-2 right-12 text-white cursor-pointer'
              onClick={closeLightbox}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <a
              href={images[currentImage].src}
              download
              target='_blank'
              rel='noopener'
              aria-label='Download'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-9 text-white absolute top-[10px] right-24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
                />
              </svg>
            </a>
            <img
              className='h-auto w-full'
              src={images[currentImage].src}
              alt={images[currentImage].alt}
            />
          </div>
          <div className='grid grid-cols-4 gap-4 sm:grid-cols-8 md:flex justify-center mt-4 mb-4'>
            {getPaginatedImages().map((thumb, index) => (
              <div
                key={index}
                className={`cursor-pointer w-20 h-20 mx-1 ${
                  index === currentImage ? 'border-2 border-blue-500' : ''
                }`}
                onClick={() => handleThumbnailClick(thumb.id)}
              >
                <img
                  className='w-full h-full rounded object-cover'
                  src={thumb.src}
                  alt={thumb.alt}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {images.length > imagesPerPage && (
        <nav aria-label='Page navigation gallery' className='mt-5 text-center'>
          <ul className='inline-flex -space-x-px text-base h-10'>
            <li>
              <button
                onClick={() => handlePageClick(currentPage - 1)}
                className='flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700'
              >
                Previous
              </button>
            </li>
            {Array.from(
              { length: Math.ceil(images.length / imagesPerPage) },
              (_, index) => (
                <li key={index}>
                  <button
                    onClick={() => handlePageClick(index + 1)}
                    className={`flex items-center justify-center px-4 h-10 leading-tight ${
                      currentPage === index + 1
                        ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 '
                        : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                    }`}
                  >
                    {index + 1}
                  </button>
                </li>
              )
            )}
            <li>
              <button
                onClick={() => handlePageClick(currentPage + 1)}
                className='flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700'
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  )
}
