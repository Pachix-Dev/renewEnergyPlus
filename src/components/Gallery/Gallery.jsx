import lightGallery from "lightgallery";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import { useState, useRef, useEffect } from "react";

export function Gallery({ year }) {
  const itemsPerPage = 12;
  const galleryRef = useRef(null);
  const [activePage, setActivePage] = useState(1);
  const totalPages = Math.ceil(year?.length / itemsPerPage);
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = year?.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    if (galleryRef.current) {
      const gallery = lightGallery(galleryRef.current, {
        speed: 500,
        download: false,
        counter: false,
      });

      return () => {
        gallery.destroy();
      };
    }
  }, [currentItems]);

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const PaginationButton = ({ onClick, disabled, children }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-1 mx-1 rounded ${
        disabled
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-cyan-eco text-white hover:bg-blue-eco"
      }`}
    >
      {children}
    </button>
  );

  return (
    <>
      <section className="mt-5 flex flex-col items-center w-[95%] max-w-7xl mx-auto">
        <div
          ref={galleryRef}
          className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4"
        >
          {currentItems.map((img, index) => (
            <a
              href={img}
              key={index}
              className="gallery-item"
              data-src={img}
              data-sub-html={`<h4>Image ${index + 1}</h4>`}
              aria-label={`Gallery image ${index + 1}`}
              rel="nofollow"
            >
              <img
                src={img}
                alt={`Gallery image ${index + 1}`}
                className="w-[150px] h-[80px] sm:w-[450px] sm:h-[200px] object-cover rounded-lg shadow-md"
                loading="lazy"
              />
            </a>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex flex-wrap justify-center items-center">
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= activePage - 1 && pageNumber <= activePage + 1)
              ) {
                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-3 py-1 mx-1 my-1 rounded w-[35px] h-[35px] text-center${
                      activePage === pageNumber
                        ? " bg-purple-600 text-white"
                        : " bg-blue-200 text-green-eco-dark hover:bg-gray-300"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              } else if (
                pageNumber === activePage - 2 ||
                pageNumber === activePage + 2
              ) {
                return (
                  <span key={pageNumber} className="mx-1">
                    ...
                  </span>
                );
              }
              return null;
            })}

            {/* <PaginationButton
              onClick={() => handlePageChange(activePage + 1)}
              disabled={activePage === totalPages}
            >
              Next
            </PaginationButton>
            <PaginationButton
              onClick={() => handlePageChange(totalPages)}
              disabled={activePage === totalPages}
            >
              Last
            </PaginationButton> */}
          </div>
        )}
      </section>
    </>
  );
}
