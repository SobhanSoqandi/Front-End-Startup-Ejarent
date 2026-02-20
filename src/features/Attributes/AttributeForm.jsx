import { useState, useEffect } from "react";
import Modal from "../../UI/Modal";
import { useAttributes } from "./useAttributes";
import { useCategories } from "../Categories/useCategories";

export default function AttributeForm({ isOpen, onClose, attributeToEdit = null }) {
    const [name, setName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [type, setType] = useState("bool");

    const { categories } = useCategories("get");
    const { createAttribute, isCreating } = useAttributes("create");
    const { updateAttribute, isUpdating } = useAttributes("update");

    const isEditing = !!attributeToEdit;
    const isLoading = isCreating || isUpdating;

    useEffect(() => {
        if (attributeToEdit) {
            setName(attributeToEdit.name);
            setCategoryId(attributeToEdit.category_id);
            setType(attributeToEdit.type);
        } else {
            setName("");
            setCategoryId("");
            setType("bool");
        }
    }, [attributeToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            name,
            category_id: categoryId,
            type,
        };

        if (isEditing) {
            updateAttribute(
                { id: attributeToEdit.id, ...payload },
                { onSuccess: onClose }
            );
        } else {
            createAttribute(payload, { onSuccess: onClose });
        }
    };

    return (
        <Modal open={isOpen} onClose={onClose} title={isEditing ? "ویرایش ویژگی" : "افزودن ویژگی"}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="نام ویژگی"
                    className="input"
                />

                <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="input"
                >
                    <option value="">انتخاب دسته‌بندی</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>

                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="input"
                >
                    <option value="bool">بولی</option>
                    <option value="text">متنی</option>
                    <option value="number">عددی</option>
                    <option value="select">انتخابی</option>
                </select>

                <div className="flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="btn bg-gray-200">
                        انصراف
                    </button>
                    <button disabled={isLoading} className="btn bg-blue-600 text-white">
                        {isEditing ? "ویرایش" : "ثبت"}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
