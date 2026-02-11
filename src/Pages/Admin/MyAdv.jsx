import React, { useState } from "react";
import useGetMyAdv from "../../features/Advertisement/useGetMyAdv";
import Modal from "../../UI/Modal";
import AlertModal from "../../UI/AlertModal";
import ConfirmDelete from "../../UI/ConfirmDelete";
import useDeleteMyAdv from "../../features/Advertisement/useDeleteMyAdv";
import { useNavigate } from "react-router-dom";

function MyAdv() {


    const navigate = useNavigate();

    const { isLoading, myadvertisements } = useGetMyAdv();

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const { isDeleting, deleteAdv } = useDeleteMyAdv();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-pulse text-blue-600 text-lg">
                    در حال بارگذاری آگهی‌ها...
                </div>
            </div>
        );
    }

    if (!myadvertisements || myadvertisements.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-gray-500">
                <p className="text-xl mb-2">هنوز آگهی ثبت نکردی</p>
                <p className="text-sm">اولین آگهی‌ت رو بساز 🚀</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6">
            {/* Header */}
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                آگهی‌های من
            </h1>

            {/* Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {myadvertisements.map((adv) => (
                    <div
                        key={adv.id}
                        className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
                    >
                        {/* Image placeholder */}
                        <div className="h-40 bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                            تصویر آگهی
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            <h2 className="font-semibold text-lg text-gray-800 line-clamp-1">
                                {adv.title}
                            </h2>

                            <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                                {adv.description}
                            </p>

                            <div className="flex justify-between items-center gap-x-2 mt-4">
                                <button
                                    className="btn btn--primary bg-emerald-500 w-full"
                                    onClick={() =>
                                        navigate("/panel/editmyadv", {
                                            state: { adv },
                                        })
                                    }
                                >
                                    ویرایش
                                </button>

                                <button className="btn btn--danger w-full"
                                    onClick={() => setIsDeleteOpen(true)}
                                >
                                    حذف آگهی
                                </button>


                                <AlertModal
                                    title={`حذف ${adv.title}`}
                                    open={isDeleteOpen}
                                    onClose={() => setIsDeleteOpen(false)}
                                >
                                    <ConfirmDelete
                                        resourceName={adv.title}
                                        onClose={() => setIsDeleteOpen(false)}
                                        onConfirm={() =>
                                            deleteAdv(adv.id, {
                                                onSuccess: () => setIsDeleteOpen(false),
                                            })
                                        }
                                        disabled={false}
                                    />
                                </AlertModal>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyAdv;
