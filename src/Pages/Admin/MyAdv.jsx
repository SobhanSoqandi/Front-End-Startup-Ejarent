import React, { useState } from "react";
import useGetMyAdv from "../../features/Advertisement/useGetMyAdv";
import AlertModal from "../../UI/AlertModal";
import ConfirmDelete from "../../UI/ConfirmDelete";
import useDeleteMyAdv from "../../features/Advertisement/useDeleteMyAdv";
import { useNavigate } from "react-router-dom";

function MyAdv() {
    const navigate = useNavigate();
    const { isLoading, myadvertisements } = useGetMyAdv();
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedAdv, setSelectedAdv] = useState(null);

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
        <div className="space-y-4">
    {myadvertisements.map((adv) => {
        const firstImage =
            adv?.images?.[0]?.image_path || "/images/defualt-image.jpg";

        return (
            <div
                key={adv.id}
                className="flex bg-white rounded-2xl shadow hover:shadow-md transition overflow-hidden"
            >
                {/* Image */}
                <div className="w-44 h-32 flex-shrink-0 relative overflow-hidden bg-gray-100">
                    <img
                        src={
                            firstImage.startsWith("http")
                                ? firstImage
                                : `http://localhost:8000/${firstImage}`
                        }
                        className="w-full h-full object-cover"
                        alt={adv.title}
                        onError={(e) => {
                            e.target.src = "/images/defualt-image.jpg";
                        }}
                    />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between flex-1 p-4">
                    <div>
                        <h2 className="font-bold text-gray-800 line-clamp-1">
                            {adv.title}
                        </h2>

                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {adv.description}
                        </p>
                    </div>

                    <div className="flex justify-end gap-2 mt-3">
                        <button
                            className="btn btn--primary bg-emerald-500 px-4"
                            onClick={() =>
                                navigate("/panel/editmyadv", { state: { adv } })
                            }
                        >
                            ویرایش
                        </button>

                        <button
                            className="btn btn--danger px-4"
                            onClick={() => {
                                setSelectedAdv(adv);
                                setIsDeleteOpen(true);
                            }}
                        >
                            حذف
                        </button>
                    </div>
                </div>
            </div>
        );
    })}
</div>

    );
}

export default MyAdv;
