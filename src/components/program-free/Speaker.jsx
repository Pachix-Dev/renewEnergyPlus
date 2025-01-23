import { useState } from "react";
import Modal from '../../components/shared/Modal.jsx'

export function Speaker({speaker, language}){
    const [isModalOpen, setIsModalOpen] = useState(false);
console.log(speaker)
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    return(
        <>
            {speaker.imagenes === ""
              ? 
                ''
              : 
              <>
                <img onClick={handleOpenModal} src={speaker.imagenes} className="rounded-full h-[80px] object-cover object-top w-full cursor-pointer transform transition-transform duration-300 hover:scale-110"/>
                <Modal isOpen={isModalOpen} onClose={handleCloseModal} speaker={speaker} language={language} />
                </>
            }
            
        </>
    )
}