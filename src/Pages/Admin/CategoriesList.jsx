import { useState } from "react";
import { useCategories } from "../../features/Categories/useCategories";
// import CategoryForm from "./CategoryForm";
// import DeleteConfirmModal from "./DeleteConfirmModal";
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus } from "react-icons/hi";
import Modal from "../../UI/Modal";
import DeleteConfirmModal from "../../UI/Panel/DeleteConfirmModal";
import CategoryForm from "../../features/Categories/CategoryForm";

export default function CategoriesList() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deletingCategory, setDeletingCategory] = useState(null);

  const { categories, isLoading, isError, error, refetch } = useCategories("get");
  const { deleteCategory, isDeleting } = useCategories("delete");

  const handleEdit = (category) => {
    setEditingCategory(category);
    setIsAddModalOpen(true);
  };

  const handleDelete = () => {
    if (deletingCategory) {
      deleteCategory(deletingCategory.id, {
        onSuccess: () => {
          setDeletingCategory(null);
        },
      });
    }
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setEditingCategory(null);
  };

  if (isError) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-red-600 mb-2">خطا در دریافت اطلاعات</p>
          <p className="text-sm text-red-500 mb-4">{error?.response?.data?.message || error.message}</p>
          <button
            onClick={refetch}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* هدر */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">مدیریت دسته‌بندی‌ها</h1>
          <p className="text-sm text-gray-500 mt-1">
            {categories?.length || 0} دسته‌بندی در سیستم وجود دارد
          </p>
        </div>
        
        <button
          onClick={() => {
            setEditingCategory(null);
            setIsAddModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <HiOutlinePlus className="w-5 h-5" />
          <span>افزودن دسته‌بندی</span>
        </button>
      </div>

      {/* لیست دسته‌بندی‌ها */}
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-16 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">هیچ دسته‌بندی‌ای یافت نشد</p>
          <button
            onClick={() => {
              setEditingCategory(null);
              setIsAddModalOpen(true);
            }}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            + اولین دسته‌بندی را ایجاد کنید
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="divide-y divide-gray-200">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center text-sm text-gray-500 bg-gray-100 rounded-full">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 font-medium">{category.name}</span>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                    ID: {category.id}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(category)}
                    className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                    title="ویرایش"
                  >
                    <HiOutlinePencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setDeletingCategory(category)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="حذف"
                  >
                    <HiOutlineTrash className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* مودال افزودن/ویرایش */}
      <CategoryForm
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        categoryToEdit={editingCategory}
      /> 

      <DeleteConfirmModal
        isOpen={!!deletingCategory}
        onClose={() => setDeletingCategory(null)}
        onConfirm={handleDelete}
        categoryName={deletingCategory?.name}
        isDeleting={isDeleting}
      />
    </div>
  );
}