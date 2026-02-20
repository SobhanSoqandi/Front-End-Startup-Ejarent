import { useState } from "react";
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus } from "react-icons/hi";
import { useAttributes } from "../../features/Attributes/useAttributes";
import AttributeForm from "../../features/Attributes/AttributeForm";
import DeleteConfirmModal from "../../UI/Panel/DeleteConfirmModal";

export default function AttributeList() {
    const { attributes, isLoading } = useAttributes("get");
    const { deleteAttribute, isDeleting } = useAttributes("delete");

    const [isOpen, setIsOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [deleting, setDeleting] = useState(null);

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">مدیریت ویژگی‌ها</h1>
                <button
                    onClick={() => { setEditing(null); setIsOpen(true); }}
                    className="btn bg-blue-600 text-white flex items-center gap-2"
                >
                    <HiOutlinePlus /> افزودن ویژگی
                </button>
            </div>

            <div className="bg-white rounded-lg shadow border">
                {attributes.map((attr, index) => (
                    <div key={attr.id} className="flex justify-between items-center p-4 border-b hover:bg-gray-50">
                        <div className="flex items-center gap-4">
                            <span className="w-7 h-7 bg-gray-100 flex items-center justify-center rounded-full">
                                {index + 1}
                            </span>
                            <div>
                                <p className="font-semibold">{attr.name}</p>
                                <p className="text-xs text-gray-500">
                                    دسته: {attr.category?.name} | نوع: {attr.type}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => { setEditing(attr); setIsOpen(true); }}
                                className="icon-btn text-yellow-600"
                            >
                                <HiOutlinePencil />
                            </button>
                            <button
                                onClick={() => setDeleting(attr)}
                                className="icon-btn text-red-600"
                            >
                                <HiOutlineTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <AttributeForm
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                attributeToEdit={editing}
            />

            <DeleteConfirmModal
                isOpen={!!deleting}
                onClose={() => setDeleting(null)}
                onConfirm={() =>
                    deleteAttribute(deleting.id, {
                        onSuccess: () => setDeleting(null),
                    })
                }
                categoryName={deleting?.name}
                isDeleting={isDeleting}
            />
        </div>
    );
}
