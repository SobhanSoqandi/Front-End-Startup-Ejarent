import React, { useEffect } from "react";
import Input from "../../UI/Input";
import RHFSelect from "../../UI/RHFSelect";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { addAdvertisementApi, editAdvertisementApi } from "../../services/advService";
import useGetCategories from "../../features/Advertisement/useGetCategories";
import { useLocation, useNavigate } from "react-router-dom";

function AddAdv() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const adv = state?.adv; // 👈 اگر بود یعنی edit
  const isEditMode = Boolean(adv?.id);

  const { isLoading: isFetchingCategories, categories } = useGetCategories();

  const categoryOptions =
    categories?.map((category) => ({
      value: category.id.toString(),
      label: category.name,
    })) || [];

  const selectOptions = [
    { value: "", label: "لطفا دسته‌بندی را انتخاب کنید" },
    ...categoryOptions,
  ];

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: adv?.title || "",
      description: adv?.description || "",
      price: adv?.price || "",
      Id_category: adv?.categoryId?.toString() || "",
    },
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data) =>
      isEditMode
        ? editAdvertisementApi({ id: adv.id, data })
        : addAdvertisementApi(data),
  });

  useEffect(() => {
    if (adv) {
      reset({
        title: adv.title,
        description: adv.description,
        price: adv.price,
        Id_category: adv.categoryId?.toString(),
      });
    }
  }, [adv, reset]);

  const onSubmit = async (data) => {
    try {
      const { message } = await mutateAsync(data);
      toast.success(message);
      navigate("/myadv");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 mt-20 shadow rounded-lg">
      <h1 className="text-xl font-bold mb-6">
        {isEditMode ? "ویرایش آگهی" : "ثبت آگهی جدید"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-around flex-wrap gap-4">
          <Input
            register={register}
            name="title"
            label="عنوان آگهی:"
            type="text"
            placeholder="عنوان آگهی را وارد کنید"
          />

          <Input
            register={register}
            name="description"
            label="توضیحات:"
            type="text"
            placeholder="توضیحات آگهی را وارد کنید"
          />

          <Input
            register={register}
            name="price"
            label="قیمت:"
            type="number"
            placeholder="قیمت را وارد کنید"
          />

          <RHFSelect
            label="دسته‌بندی:"
            required
            name="Id_category"
            register={register}
            options={selectOptions}
          />
        </div>

        <button className="btn btn--primary mt-6" disabled={isPending}>
          {isPending
            ? "در حال ذخیره..."
            : isEditMode
            ? "ذخیره تغییرات"
            : "ثبت آگهی"}
        </button>
      </form>
    </div>
  );
}

export default AddAdv;
