import React, { useState, useEffect } from 'react'
import { PonenteModal } from './PonenteModal'
import type { Ponente } from './PonenteModal'

interface Props {
  apiUrl: string
  currentLanguage: string
}

export const ProgramaModalWrapper: React.FC<Props> = ({ apiUrl, currentLanguage }) => {
  const [selectedPonente, setSelectedPonente] = useState<Ponente | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const handlePonenteClick = (event: Event) => {
      const target = event.target as HTMLElement
      const card = target.closest('[data-action="open-modal"]')
      
      if (card) {
        const ponenteData = card.getAttribute('data-ponente')
        if (ponenteData) {
          try {
            const ponente = JSON.parse(ponenteData)
            setSelectedPonente(ponente)
            setIsModalOpen(true)
          } catch (error) {
            console.error('Error parsing ponente data:', error)
          }
        }
      }
    }

    document.addEventListener('click', handlePonenteClick)

    return () => {
      document.removeEventListener('click', handlePonenteClick)
    }
  }, [])

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedPonente(null), 300) // Wait for animation
  }

  if (!selectedPonente) return null

  return (
    <PonenteModal
      ponente={selectedPonente}
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      language={currentLanguage}
      apiUrl={apiUrl}
    />
  )
}
