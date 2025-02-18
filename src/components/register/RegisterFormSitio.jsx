import { useRegisterForm } from '../../store/register-form'
import { StepOne } from './StepOne'
import { StepTwo } from './StepTwo'
import { StepThreeSitio } from './StepThreeSitio'
import { Stepper } from './Stepper'

export function RegisterFormSitio({ translates, currentLanguage }) {
  const { step } = useRegisterForm()

  return (
    <section className='py-5'>
      <Stepper translates={translates} />
      <form className='mx-auto'>
        {step === 0 && <StepOne translates={translates} />}
        {step === 1 && <StepTwo translates={translates} />}
        {step === 2 && (
          <StepThreeSitio
            translates={translates}
            currentLanguage={currentLanguage}
          />
        )}
      </form>
    </section>
  )
}
