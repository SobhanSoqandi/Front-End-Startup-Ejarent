import { useMutation } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { CompleteProfile } from '../../services/authService';
import toast from 'react-hot-toast';
import Loading from '../../UI/Loading';
import Input from '../../UI/Input';
import RadioInputGroup from '../../UI/RadioInputGroup';
import { IoCameraReverseOutline } from "react-icons/io5";
import useUser from '../../features/User/useUser';

function CompleteProfileForm() {

    const phoneNumber = localStorage.getItem("userphoneNumber");

    const { isLoading, user } = useUser();
    console.log(user);

    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const { handleSubmit, register, watch, setValue, formState: { errors } } = useForm();

    
    useEffect(() => {
        if (user) {
            setValue('name', user.name || '');
            setValue('national_code', user.national_code || '');
            setValue('gender', user.gender || '');
        }
    }, [user, setValue]);

    
    useEffect(() => {
        if (user?.profile_image) {
            setImagePreview(`http://localhost:8000/${user.profile_image}`);
        }
    }, [user]);

    const { isPending: isCompleting, mutateAsync } = useMutation({
        mutationFn: CompleteProfile,
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                toast.error("حجم عکس باید کمتر از ۲ مگابایت باشد");
                return;
            }

            if (!file.type.startsWith('image/')) {
                toast.error("لطفاً یک فایل تصویری انتخاب کنید");
                return;
            }

            setProfileImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const CompleteProfileHandler = async (data) => {
        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('national_code', data.national_code);
        formData.append('gender', data.gender);
        formData.append('phoneNumber', phoneNumber);

        if (profileImage) {
            formData.append('profile_image', profileImage);
        }

        try {
            const response = await mutateAsync(formData);
            toast.success(response.message);

            if (response.user?.profile_image) {
                setImagePreview(`http://localhost:8000/${response.user.profile_image}`);
            }
            
            setProfileImage(null);

        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
        }
    }

    return (
        <div className="shadow-sm w-96 mx-auto p-6 rounded-xl">
            <form onSubmit={handleSubmit(CompleteProfileHandler)}>
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <img
                            src={imagePreview || "https://via.placeholder.com/150"}
                            alt="profile"
                            className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
                        />

                        <input
                            type="file"
                            id="profile_image"
                            name="profile_image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />

                        <label
                            htmlFor="profile_image"
                            className="absolute bottom-5 right-0 bg-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-gray-100 transition-colors"
                        >
                            <IoCameraReverseOutline className="w-5 h-5" />
                        </label>
                    </div>
                </div>

                <div>
                    <Input
                        register={register}
                        name="name"
                        label="نام و نام خانوادگی :"
                        type="text"
                        placeholder="نام خود را وارد کنید"
                        validationSchema={{
                            required: "وارد کردن نام ضروری است"
                        }}
                        errors={errors}
                    />

                    <Input
                        register={register}
                        name="national_code"
                        label="کد ملی : "
                        type="text"
                        placeholder="کد ملی خود را وارد کنید"
                        validationSchema={{
                            required: "وارد کردن کد ملی ضروری است",
                            minLength: {
                                value: 10,
                                message: "کد ملی باید ۱۰ رقم باشد"
                            },
                            maxLength: {
                                value: 10,
                                message: "کد ملی باید ۱۰ رقم باشد"
                            },
                            pattern: {
                                value: /^[0-9]+$/,
                                message: "کد ملی باید فقط شامل اعداد باشد"
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
                                { value: "male", label: "مرد" },
                                { value: "female", label: "زن" },
                            ],
                        }}
                    />
                </div>

                {isCompleting ? (
                    <Loading />
                ) : (
                    <button type="submit" className="btn w-full mt-5">
                        ثبت اطلاعات
                    </button>
                )}
            </form>
        </div>
    )
}

export default CompleteProfileForm;