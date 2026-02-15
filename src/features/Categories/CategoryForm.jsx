import { useState, useEffect } from "react";
// import { useCategories } from "../hooks/useCategories";
import Modal from "../../UI/Modal";
import { useCategories } from "./useCategories";

export default function CategoryForm({ isOpen, onClose, categoryToEdit = null }) {
  const [name, setName] = useState("");
  const { createCategory, isCreating } = useCategories("create");
  const { updateCategory, isUpdating } = useCategories("update");

  const isEditing = !!categoryToEdit;
  const isLoading = isCreating || isUpdating;

  useEffect(() => {
    if (categoryToEdit) {
      setName(categoryToEdit.name);
    } else {
      setName("");
    }
  }, [categoryToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (isEditing) {
      updateCategory(
        { id: categoryToEdit.id, name },
        {
          onSuccess: () => {
            onClose();
            setName("");
          },
        }
      );
    } else {
      createCategory(
        { name },
        {
          onSuccess: () => {
            onClose();
            setName("");
          },
        }
      );
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} title={isEditing ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی جدید"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            نام دسته‌بندی
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="مثال: مسکن، خودرو، خدمات ..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            autoFocus
            disabled={isLoading}
          />
        </div>

        <div className="flex gap-2 justify-end pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            disabled={isLoading}
          >
            انصراف
          </button>
          <button
            type="submit"
            disabled={!name.trim() || isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                {isEditing ? "در حال ویرایش..." : "در حال افزودن..."}
              </span>
            ) : (
              isEditing ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}