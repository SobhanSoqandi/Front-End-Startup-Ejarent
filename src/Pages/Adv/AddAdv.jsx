import React, { useEffect, useMemo } from "react";
import Input from "../../UI/Input";
import RHFSelect from "../../UI/RHFSelect";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { addAdvertisementApi, editAdvertisementApi } from "../../services/advService";
import useGetCategories from "../../features/Advertisement/useGetCategories";
import { useLocation, useNavigate } from "react-router-dom";

// ================== ATTRIBUTE CONFIG ==================

const CATEGORY_ATTRIBUTES = {
  1: [
    { id: 1, title: "رنگ" },
    { id: 2, title: "مدل" },
  ],
  2: [
    { id: 3, title: "متراژ (متر مربع)" },
    { id: 4, title: "تعداد اتاق" },
  ],
  3: [
    { id: 5, title: "برند" },
    { id: 6, title: "وضعیت" },
  ],
};

// =====================================================

function AddAdv() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const adv = state?.adv;
  const isEditMode = Boolean(adv?.id);

  const { categories } = useGetCategories();

  const categoryOptions =
    categories?.map((category) => ({
      value: category.id.toString(),
      label: category.name,
    })) || [];

  const selectOptions = [
    { value: "", label: "لطفا دسته‌بندی را انتخاب کنید" },
    ...categoryOptions,
  ];

  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {
      title: adv?.title || "",
      description: adv?.description || "",
      price: adv?.price || "",
      Id_category: adv?.categoryId?.toString() || "",
      attributes: [],
    },
  });

  const selectedCategory = useWatch({
    control,
    name: "Id_category",
  });

  const attributes = useMemo(() => {
    return CATEGORY_ATTRIBUTES[selectedCategory] || [];
  }, [selectedCategory]);

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
      const payload = {
        title: data.title,
        description: data.description,
        price: data.price,
        Id_category: data.Id_category,
        attributes: attributes.map((attr, index) => ({
          id: attr.id,
          value: data.attributes?.[index]?.value || "",
        })),
      };

      const { message } = await mutateAsync(payload);
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

        {attributes.length > 0 && (
          <div className="w-full mt-8">
            <h3 className="font-bold mb-4">ویژگی‌ها</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {attributes.map((attr, index) => (
                <Input
                  key={attr.id}
                  register={register}
                  name={`attributes.${index}.value`}
                  label={attr.title}
                  type="text"
                  placeholder={`مقدار ${attr.title} را وارد کنید`}
                />
              ))}
            </div>
          </div>
        )}

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
