function ConfirmDelete({ resourceName, onClose, disabled, onConfirm }) {
  return (
    <div>
      <h2 className="font-bold text-base mb-8 text-secondary-700">
        آیا از حذف {resourceName} مطمین هستید؟
      </h2>
      <div className="flex justify-between items-center gap-x-8">
        <button
          className="btn btn--light w-full"
          onClick={onClose}
          disabled={disabled}
        >
          لغو
        </button>
        <button
          onClick={onConfirm}
          disabled={disabled}
          className="btn btn--danger w-full"
        >
          تایید
        </button>
      </div>
    </div>
  );
}
export default ConfirmDelete;
