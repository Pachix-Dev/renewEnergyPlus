import { useRegisterForm } from '../../store/register-form'
import { StepOne } from './StepOne'
import { StepThree } from './StepThree'
import { StepTwo } from './StepTwo'
import { Stepper } from './Stepper'

export function RegisterForm({ translates, currentLanguage }) {
  const { step } = useRegisterForm()

  return (
    <section className='py-5'>
      <Stepper translates={translates} />
      <form className='mx-auto'>
        {step === 0 && <StepOne translates={translates} />}
        {step === 1 && <StepTwo translates={translates} />}
        {step === 2 && (
          <StepThree
            translates={translates}
            currentLanguage={currentLanguage}
          />
        )}
      </form>
    </section>
  )
}
