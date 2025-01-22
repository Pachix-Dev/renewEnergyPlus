
const Modal = ({ isOpen, onClose, speaker, language }) => {
  // Conditional rendering of the modal content based on `isOpen` prop
  if (!isOpen) return null; // Return null if modal is not open
 
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-4/5 ">
            <div className="flex justify-end mb-4">
                <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
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
            <div className="flex items-center gap-5">
                <img
                    src={speaker.imagenes}
                    alt={speaker.name}
                    className="object-cover"
                    width={200}
                />
                <div>
                    <h3 className="text-xl font-semibold text-black">{speaker.name}</h3>
                    <p className="text-gray-600">
                        {language === 'es' ? speaker.bio : speaker.bio_en}
                    </p>
                </div>
            </div>
        
      </div>
    </div>
  );
};

export default Modal;
