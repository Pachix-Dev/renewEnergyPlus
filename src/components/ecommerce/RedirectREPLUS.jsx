import { useRegisterForm } from '../../store/register-form.js'
import { useEffect } from 'react'

export function RedirectREPLUS() {
  const { name, email, idUser } = useRegisterForm()

  useEffect(() => {
    if (name === '' || email === '' || idUser === '') {
      window.location.href = '/programa-premium-productos'
    }
  }, [name, email, idUser])

  return <></>
}
