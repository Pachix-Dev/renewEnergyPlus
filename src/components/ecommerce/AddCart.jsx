import { useRegisterForm } from '../../store/register-form.js'
import { useState } from 'react'

export function AddCart({ item, translate, language }) {
  const { addToCart } = useRegisterForm()
  const [selectedDay, setSelectedDay] = useState('')
  const isDayRequired = Boolean(item?.requiresDaySelection && item?.days?.length)
  const isEs = language === 'es'

  const handleAddToCart = () => {
    if (isDayRequired && !selectedDay) {
      return
    }

    const selectedOption = item?.days?.find((day) => day.value === selectedDay)
    const selectedLabel = selectedOption
      ? (isEs ? selectedOption.label_es : selectedOption.label_en)
      : ''

    const nameSuffix = selectedLabel ? ` - ${selectedLabel}` : ''

    // Mapear el día seleccionado al ID correspondiente en la BD
    let mappedId = item.id
    if (item.requiresDaySelection && selectedDay) {
      const dayIdMap = {
        '2026-04-14': 3,  // Martes 14 de abril
        '2026-04-15': 4,  // Miércoles 15 de abril
        '2026-04-16': 5,  // Jueves 16 de abril
      }
      mappedId = dayIdMap[selectedDay] || item.id
    }

    addToCart({
      ...item,
      id: mappedId,
      selectedDay: selectedDay || null,
      selectedDayLabel: selectedLabel || null,
      name: `${item.name}${nameSuffix}`,
      name_en: `${item.name_en}${nameSuffix}`,
    })
  }

  return (
    <>
      {isDayRequired && (
        <div className='mb-4 text-left'>
          <label className='block text-sm font-semibold text-gray-700 mb-2'>
            {isEs ? item.dayLabel_es : item.dayLabel_en}
          </label>
          <select
            value={selectedDay}
            onChange={(event) => setSelectedDay(event.target.value)}
            className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700'
          >
            <option value=''>
              {isEs ? item.dayPlaceholder_es : item.dayPlaceholder_en}
            </option>
            {item.days.map((day) => (
              <option key={day.value} value={day.value}>
                {isEs ? day.label_es : day.label_en}
              </option>
            ))}
          </select>
        </div>
      )}
      <button
        onClick={handleAddToCart}
        disabled={isDayRequired && !selectedDay}
        className={`text-white font-bold p-2 rounded-lg ${
          isDayRequired && !selectedDay
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-[#4E549F] hover:bg-[#3a3f79]'
        }`}
      >
        {translate.addtocart}
      </button>
    </>
  )
}
