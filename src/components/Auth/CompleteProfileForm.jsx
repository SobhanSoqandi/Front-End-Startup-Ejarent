import { useMutation } from '@tanstack/react-query';
import React from 'react'
import { useForm } from 'react-hook-form';
import { CompleteProfile } from '../../services/authService';
import toast from 'react-hot-toast';
import Loading from '../../UI/Loading';
import Input from '../../UI/Input';
import RadioInputGroup from '../../UI/RadioInputGroup';
import { IoCameraReverseOutline } from "react-icons/io5";

function CompleteProfileForm() {

    const phoneNumber = localStorage.getItem("userphoneNumber");


    const { handleSubmit, register, watch, formState: { errors } } = useForm();

    const { isPending: isCompleting, mutateAsync } = useMutation({
        mutationFn: CompleteProfile,
    });

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
        <div className="shadow-sm w-96 mx-auto mt-20 p-6 rounded-xl" >


            <form onSubmit={handleSubmit(CompleteProfileHandler)} >

                <div className="flex justify-center mb-6">
                    <div className="relative">

                        <img
                            src="https://via.placeholder.com/150"
                            alt="profile"
                            className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
                        />

                        <button
                            type="button"
                            className="absolute bottom-5 rounded-full"
                        >
                            <IoCameraReverseOutline className="w-8 h-8" />
                        </button>

                    </div>
                </div>


                <div >
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

                    <RadioInputGroup
                        label="جنسیت :"
                        errors={errors}
                        watch={watch}
                        register={register}
                        configs={{
                            name: "gender",
                            options: [
                                {
                                    value: "male",
                                    label: " مرد ",
                                },
                                { value: "female", label: " زن " },
                            ],
                        }}
                    />  

                </div>

                {
                    isCompleting ? <Loading /> :
                        <button className="btn w-full mt-5" >
                               ثبت اطلاعات
                        </button>
                }

            </form>
        </div>
    )


}

export default CompleteProfileForm;