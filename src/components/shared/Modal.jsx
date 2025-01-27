const Modal = ({ isOpen, onClose, speaker, language }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60 p-4">
      <div className="bg-gradient-to-t from-white to-gray-100 p-6 md:p-8 rounded-3xl shadow-xl 
                      w-full max-w-xs sm:max-w-md md:max-w-3xl lg:max-w-4xl 
                      overflow-y-auto max-h-screen">
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-custom-orange focus:outline-none transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
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

          <div className="flex flex-col sm:flex-row gap-8">
            <img
              src={speaker.imagenes}
              alt={speaker.name}
              className="object-cover h-full w-[150px] md:w-[350px] rounded-xl shadow-md mx-auto"
            />
           
    {speaker.nameem === ""
              ? 
                ''
              :  <div className="absolute bottom-0 left-0 bg-custom-orange text-white text-center font-semibold px-4 py-2 rounded-tr-xl">
      {speaker.nameem}
    </div>
              
               
            }



          <div className="flex flex-col justify-center items-center sm:items-start text-center sm:text-left">
            <h3 className="text-4xl font-semibold text-custom-orange">{speaker.name}</h3>
            <p className="underline text-gray-500 mt-2 text-lg">{language === 'es' ? speaker.position : speaker.position_en}</p>

            <p className="text-gray-700 text-base mt-3 text-justify">{language === 'es' ? speaker.bio : speaker.bio_en}</p>
         
            <div className="mt-4 space-y-2">
              {speaker.email === ""
               ? 
                ''
                :
              <p className="text-gray-600 text-sm flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                {speaker.email}
              </p>
                 }     
              {speaker.phone === ""
                            ? 
                              ''
                              :
                            <p className="text-gray-600 text-sm flex items-center gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                              </svg>
                              {speaker.phone}
                            </p>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
