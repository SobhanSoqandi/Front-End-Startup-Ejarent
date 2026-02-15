import { useState } from "react";
import { useUsers } from "./useUsers";
import DeleteConfirmModal from "../../UI/Panel/DeleteConfirmModal";
import { FaTrashAlt } from "react-icons/fa";


export default function UserItem({ user }) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const { deleteUser, isDeleting } = useUsers("delete");

    const handleDelete = () => {
        deleteUser(user.id, {
            onSuccess: () => {
                setIsDeleteModalOpen(false);
            }
        });
    };

    const getGenderLabel = (gender) => {
        const genders = {
            male: "مرد",
            female: "زن",
        };
        return genders[gender] || "تعیین نشده";
    };

    const formatDate = (dateString) => {
        if (!dateString) return " . . .";
        return new Date(dateString).toLocaleDateString("fa-IR");
    };

    const getInitials = (name) => {
        if (!name) return "?";
        return name.charAt(0);
    };

    return (
        <>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors gap-4">
                {/* آواتار + نام - همیشه کنار هم */}
                <div className="flex items-center gap-3">
                    {/* آواتار */}
                    <div className="flex-shrink-0">
                        {user.profile_image ? (
                            <img
                                src={user.profile_image}
                                alt={user.name}
                                className="w-10 lg:w-12 h-10 lg:h-12 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-10 lg:w-12 h-10 lg:h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm lg:text-base">
                                {getInitials(user.name)}
                            </div>
                        )}
                    </div>

                    <div className="lg:hidden">
                        <p className="font-medium text-gray-900">{user.name || "-"}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 flex-1">

                    <div className="hidden lg:block">
                        <p className="text-md text-gray-500">نام</p>
                        <p className="font-medium text-gray-900">{user.name || "بدون نام"}</p>
                    </div>

                    <div>
                        <p className="text-md text-center text-gray-500">شماره موبایل</p>
                        <p className="font-medium text-gray-900 text-center text-sm lg:text-base" dir="ltr">{user.phoneNumber}</p>
                    </div>

                    <div>
                        <p className="text-md text-gray-500">کد ملی</p>
                        <p className="font-medium text-gray-900 text-sm lg:text-base">{user.national_code || "- - -"}</p>
                    </div>

                    <div>
                        <p className="text-md text-gray-500">جنسیت</p>
                        <p className="font-medium text-gray-900 text-sm lg:text-base">{getGenderLabel(user.gender)}</p>
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                        <p className="text-md text-gray-500">تاریخ عضویت</p>
                        <p className="text-sm lg:text-base text-gray-700">{formatDate(user.created_at)}</p>
                    </div>
                </div>

                {/* دکمه حذف - سایز کوچکتر تو موبایل */}
                <button
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="p-2 text-red-600 hover:bg-red-50 text-xl rounded-lg transition-colors self-end lg:self-center"
                    title="حذف کاربر"
                    disabled={isDeleting}
                >
                    <FaTrashAlt />
                </button>
            </div>

            {/* مودال تأیید حذف */}
            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                title="حذف کاربر"
                message={`آیا از حذف کاربر "${user.name}" مطمئن هستید؟`}
                confirmText="بله، حذف شود"
                cancelText="انصراف"
                isLoading={isDeleting}
            />

        </>
    );
}