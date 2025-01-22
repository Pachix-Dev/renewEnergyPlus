import { useState } from "react";
import Modal from '../../components/shared/Modal.jsx'

export function Speaker({speaker, language}){
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    return(
        <>
            <img onClick={handleOpenModal} src={speaker.imagenes} className="rounded-full h-[80px] object-cover object-top w-full cursor-pointer" />
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} speaker={speaker} language={language} />
        </>
    )
}