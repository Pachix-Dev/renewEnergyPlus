const Modal = ({ isOpen, onClose, speaker, language }) => {
    // Condicional para renderizar el modal solo si `isOpen` es true
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-70">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full  md:w-5/6 lg:w-3/4">
          <div className="flex justify-end mb-4">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
  
          <div className="flex flex-col sm:flex-row gap-6">
            
              <img
                src={speaker.imagenes}
                alt={speaker.name}
                className="object-cover h-full w-[250px] md:w-[350px] mx-auto"
              />
            
  
            
            <div className="flex flex-col justify-center items-center sm:items-start text-center sm:text-left">
              <h3 className="text-5xl font-semibold text-custom-orange text-bold">{speaker.name}</h3>
              <p className="underline text-gray-500 mt-1">{speaker.position}</p>

              <p className="text-gray-600 text-sm sm:text-base mt-2 text-justify">
                {language === 'es' ? speaker.bio : speaker.bio_en}
              </p>
             
              <p className="text-gray-600 text-sm mt-2 flex p-1 gap-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                {speaker.email}</p>
             

              <p className="text-gray-600 text-sm flex gap-2"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>{speaker.phone}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Modal;
  