import QRCode from 'react-qr-code'
import { useRegisterForm } from '../../store/register-form'

export default function QRCodePrinter({ base, translate }) {
  const { uuid, name, paternSurname, company, position, clear } =
    useRegisterForm()

  const urlbase = import.meta.env.DEV
    ? 'http://localhost:3010/'
    : 'https://re-plus-mexico.com.mx/server/'

  const handlePrint = async () => {
    const updatePrintUser = await fetch(urlbase + 'update-print-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uuid }),
    })

    const response = await updatePrintUser.json()
    if (!response.success) {
      alert('Error al actualizar el usuario')
      return
    }

    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <html>
        <head>
          <title>Print QR Code</title>
          <style>
            body { text-align: center; padding: 20px; }
            svg { max-width: 100%; height: auto; }
            p {font-weight: bold;}
          </style>
        </head>
        <body>
          
          <div id="qr-code-container">
            ${document.getElementById('qr-code').outerHTML}
          </div>
          <h1>${name} ${paternSurname}</h1> 
          <p>${position} <br />${company}</p>          
          <script>
            window.onload = function() {
              window.print();
              setTimeout(() => window.close(), 1000);
            };
          </script>
        </body>
      </html>
    `)
    printWindow.document.close()
  }

  const handleRestart = () => {
    clear()
    window.location.href = `${base}/registro-en-sitio`
  }

  return (
    <div className='mt-3 flex flex-col items-center space-y-10 p-4 border rounded-lg shadow-md'>
      <div id='qr-code'>
        <QRCode value={uuid} size={110} />
      </div>
      <button
        onClick={handlePrint}
        className='bg-blue-500 text-white p-4 rounded-lg shadow-md font-bold hover:bg-blue-700'
      >
        Print QR Code
      </button>
      <button
        onClick={handleRestart}
        className='mt-20 bg-blue-500 text-white p-4 rounded-lg shadow-md flex items-center space-x-4 hover:bg-blue-700'
      >
        <span className='z-10 font-extrabold text-lg'>{translate}</span>
      </button>
    </div>
  )
}
