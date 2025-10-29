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
      if (event.key === 'ArrowRight') {
        nextImage()
      }
      if (event.key === 'ArrowLeft') {
        prevImage()
      }
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, currentImage])

  const openLightbox = (imageId) => {
    const index = images.findIndex((img) => img.id === imageId)
    setCurrentImage(index)
    setIsOpen(true)
  }

  const closeLightbox = () => {
    setIsOpen(false)
    setCurrentImage(0)
  }

  const nextImage = () => {
    setCurrentImage((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    )
  }

  const handleThumbnailClick = (imageId) => {
    const index = images.findIndex((img) => img.id === imageId)
    setCurrentImage(index)
  }

  const handlePageClick = (page) => {
    const totalPages = Math.ceil(images.length / imagesPerPage)
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }

  const getPaginatedImages = () => {
    const startIndex = (currentPage - 1) * imagesPerPage
    const endIndex = startIndex + imagesPerPage
    return images.slice(startIndex, endIndex)
  }

  const totalPages = Math.ceil(images.length / imagesPerPage)

  return (
    <div className='mt-10'>
      {/* Gallery Grid */}
      <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {getPaginatedImages().map((image, index) => (
          <div
            key={image.id}
            className='group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105'
            onClick={() => openLightbox(image.id)}
          >
            <div className='aspect-square overflow-hidden'>
              <img
                className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
                src={image.src}
                alt={image.alt}
                loading='lazy'
              />
            </div>
            <div className='p-4 bg-white'>
              <p className='text-center font-semibold text-gray-800 text-sm line-clamp-2'>
                {image.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div className='fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4'>
          {/* Header Controls */}
          <div className='absolute top-4 right-4 z-10 flex gap-3'>
            <a
              href={images[currentImage].src}
              download={images[currentImage].title}
              target='_blank'
              rel='noopener noreferrer'
              className='p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75 transition-all duration-200'
              aria-label='Download image'
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                />
              </svg>
            </a>
            <button
              onClick={closeLightbox}
              className='p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75 transition-all duration-200'
              aria-label='Close lightbox'
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className='absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75 transition-all duration-200 z-10'
            aria-label='Previous image'
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </button>

          <button
            onClick={nextImage}
            className='absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75 transition-all duration-200 z-10'
            aria-label='Next image'
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5l7 7-7 7'
              />
            </svg>
          </button>

          {/* Main Image Container */}
          <div className='w-full max-w-4xl mx-auto'>
            <div className='relative'>
              <img
                className='w-full h-auto max-h-[70vh] object-contain rounded-lg'
                src={images[currentImage].src}
                alt={images[currentImage].alt}
              />

              {/* Image Counter */}
              <div className='absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm'>
                {currentImage + 1} / {images.length}
              </div>
            </div>

            {/* Image Title */}
            <div className='text-center mt-4'>
              <h3 className='text-white text-lg font-semibold'>
                {images[currentImage].title}
              </h3>
            </div>

            {/* Thumbnails */}
            <div className='flex justify-center mt-6 gap-2 overflow-x-auto pb-2 max-w-full'>
              {images
                .slice(Math.max(0, currentImage - 4), currentImage + 5)
                .map((thumb, index) => {
                  const actualIndex = Math.max(0, currentImage - 4) + index
                  return (
                    <div
                      key={thumb.id}
                      className={`flex-shrink-0 cursor-pointer w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        actualIndex === currentImage
                          ? 'border-blue-500 scale-110'
                          : 'border-transparent hover:border-gray-400'
                      }`}
                      onClick={() => handleThumbnailClick(thumb.id)}
                    >
                      <img
                        className='w-full h-full object-cover'
                        src={thumb.src}
                        alt={thumb.alt}
                      />
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          aria-label='Gallery pagination'
          className='mt-8 flex justify-center'
        >
          <div className='flex items-center space-x-1'>
            <button
              onClick={() => handlePageClick(currentPage - 1)}
              disabled={currentPage === 1}
              className='px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200'
            >
              <svg
                className='w-4 h-4 mr-1'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 19l-7-7 7-7'
                />
              </svg>
              Anterior
            </button>

            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1
              return (
                <button
                  key={page}
                  onClick={() => handlePageClick(page)}
                  className={`px-3 py-2 text-sm font-medium border transition-colors duration-200 ${
                    currentPage === page
                      ? 'text-blue-600 bg-blue-50 border-blue-500'
                      : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                  }`}
                >
                  {page}
                </button>
              )
            })}

            <button
              onClick={() => handlePageClick(currentPage + 1)}
              disabled={currentPage === totalPages}
              className='px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200'
            >
              Siguiente
              <svg
                className='w-4 h-4 ml-1'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </button>
          </div>
        </nav>
      )}
    </div>
  )
}
