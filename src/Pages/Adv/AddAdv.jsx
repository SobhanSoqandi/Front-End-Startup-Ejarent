import React from 'react'
import Input from '../../UI/Input'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { addAdvertisementApi } from '../../services/advService';
import useGetCategories from '../../features/Advertisement/useGetCategories';
import RHFSelect from "../../UI/RHFSelect";

function AddAdv() {

    const { isLoading: isFetchingCategories, categories } = useGetCategories();
    console.log(categories);
    const categoryOptions = categories?.map(category => ({
        value: category.id.toString(), // تبدیل id به string
        label: category.name // استفاده از فیلد name
    })) || [];

    // اضافه کردن گزینه اول (پیشفرض)
    const selectOptions = [
        { value: "", label: "لطفا دسته‌بندی را انتخاب کنید" },
        ...categoryOptions
    ];


    const { register, handleSubmit } = useForm();

    const { isPending: isAdding, mutateAsync } = useMutation({
        mutationFn: addAdvertisementApi,
    });

    const AddAdvertisementHandler = async (data) => {
        try {
            const { message } = await mutateAsync(data);
            toast.success(message);
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }

    return (
        <div className="max-w-3xl mx-auto p-4 mt-20 shadow rounded-lg" >
            <form onSubmit={handleSubmit(AddAdvertisementHandler)} >
                <div className="flex justify-around" >
                    <Input
                        register={register}
                        name="title"
                        label=" عنوان آگهی  :"
                        type="text"
                        placeholder=" عنوان آگهی را وارد کنید   "
                    />
                    <Input
                        register={register}
                        name="description"
                        label=" عنوان آگهی  :"
                        type="text"
                        placeholder=" عنوان آگهی را وارد کنید   "
                    />

                    <Input
                        register={register}
                        name="price"
                        label="قیمت:"
                        type="number"
                        placeholder="قیمت را وارد کنید"
                        required
                    />

                    <RHFSelect
                        label="دسته‌بندی:"
                        required={true}
                        name="Id_category" // نام باید دقیقا این باشه
                        register={register}
                        options={selectOptions}
                    />

                </div>

                <button className="btn btn--primary" >
                    onsubmit
                </button>

            </form>
        </div>
    )
}

export default AddAdv