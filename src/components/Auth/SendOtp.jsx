
import { useMutation } from '@tanstack/react-query';
import Input from '../../UI/Input';
import { getOtp } from '../../services/authService';
import toast from 'react-hot-toast';
import Loading from '../../UI/Loading';
import { useForm } from 'react-hook-form';

function SendOtp() {

    const { isPending: isSendingOtp, mutateAsync } = useMutation({
        mutationFn: getOtp,
    })

    const { handleSubmit, register } = useForm();

    const SendOtphandler = async (data) => {

        try {
            const { message } = await mutateAsync(data);
            toast.success(message);

        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    return (

        <div className="flex flex-row-reverse min-h-screen select-none" >
            <div className="hidden lg:flex w-1/2 items-center justify-center">
                <img
                    src="images\login-image.svg"
                    alt="ورود"
                    className=" mx-auto w-[700px]"
                />
            </div>


            <div className="w-full lg:w-1/2 flex items-center justify-center px-4">
                <div className="max-w-sm w-full md:shadow-md p-8 rounded-xl">
                    <div className="text-center mb-4">
                        <a className="font-bold text-orange-500 text-2xl">اجارنت</a>
                    </div>
                    <h2 className="text-lg uppercase font-semibold py-5">
                        ورود | ثبت‌نام
                    </h2>

                    <form onSubmit={handleSubmit(SendOtphandler)} >
                        <Input
                            register={register}
                            name="phoneNumber"
                            type="text"
                            label="لطفاً شماره موبایل خود را وارد کنید"
                        />
                        {
                            isSendingOtp ? <Loading size='Medium' />
                                : <button
                                    type='submit'
                                    className="btn w-full my-6"> ورود </button>
                        }


                    </form>
                </div>
            </div>

        </div>

    )
}

export default SendOtp;