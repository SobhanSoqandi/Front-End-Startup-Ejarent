import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import Modal from "../Modal";

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "تأیید عملیات",
  message = "آیا مطمئن هستید؟",
  confirmText = "تأیید",
  cancelText = "لغو",
  isLoading = false,
}) {
  return (
    <Modal open={isOpen} onClose={onClose} title={title}>
      <div className="text-center py-4">
        <HiOutlineExclamationTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />

        <p className="text-gray-700 mb-6">{message}</p>

        <div className="flex gap-2 justify-center">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? "در حال انجام..." : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
