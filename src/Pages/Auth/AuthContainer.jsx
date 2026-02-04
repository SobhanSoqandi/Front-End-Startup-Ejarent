
import { useState } from 'react';
import SendOtp from '../../components/Auth/SendOtp';
import CheckOtp from '../../components/Auth/CheckOtp';
import { useForm } from 'react-hook-form';

function AuthContainer() {


  const [step, setStep] = useState(1);


  const { handleSubmit, register, getValues } = useForm();


  const renderStep = () => {
    switch (step) {
      case 1:
        return <SendOtp
          handleSubmit={handleSubmit}
          register={register}
          setStep={setStep}
        />
      case 2:
        return <CheckOtp
          onBack={() => setStep((s) => s - 1)}
            phoneNumber={getValues("phoneNumber")}
        />
      default: return null;
    }
  }

  return (
    <>
      {renderStep()}
    </>
  )
}

export default AuthContainer;