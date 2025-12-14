import { useMutation } from '@tanstack/react-query';
import React from 'react'
import { useForm } from 'react-hook-form';
import { CompleteProfile } from '../../services/authService';
import toast from 'react-hot-toast';
import Loading from '../../UI/Loading';
import Input from '../../UI/Input';

function CompleteProfileForm() {

    const phoneNumber = localStorage.getItem("userphoneNumber");


    const { handleSubmit, register, formState: { errors } } = useForm();

    const { isPending: isCompleting, mutateAsync } = useMutation({
        mutationFn: CompleteProfile,
    })

    const CompleteProfileHandler = async (data) => {

        const FormData = {
            ...data,
            phoneNumber: phoneNumber
        }

        try {
            const { message } = await mutateAsync(FormData);
            toast.success(message);

        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }

    return (
        <div className="shadow w-96 mx-auto p-3 rounded-xl" >


            <form onSubmit={handleSubmit(CompleteProfileHandler)} >

                {/* <Input
                    register={register}
                    name="phoneNumber"
                    label="phone"
                    type="number"
                    placeholder="number خودرا وارد کنید"
                /> */}

                <Input
                    register={register}
                    name="name"
                    label="نام و نام خانوادگی :"
                    type="text"
                    placeholder="نام خودرا وارد کنید"
                />

                <Input
                    register={register}
                    name="national_code"
                    label="کد ملی : "
                    type="number"
                    placeholder="کد ملی خودرا وارد کنید"
                    validationSchema={{
                        required: " وارد کردن کدملی ضروری است ",
                        minLength: {
                            value: 5,
                            message: "کد ملی باید حداقل ۵ رقم باشد"
                        },
                        maxLength: {
                            value: 10,
                            message: " کد ملی باید از 10 رقم بیشتر نباشد "
                        }
                    }}
                    errors={errors}
                />
                {
                    isCompleting ? <Loading /> :
                        <button className="btn w-full mt-3" >
                            ثبت اطلاعات
                        </button>
                }
            </form>
        </div>
    )


}

export default CompleteProfileForm;