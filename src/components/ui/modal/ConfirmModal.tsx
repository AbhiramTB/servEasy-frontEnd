import React from 'react';

type ConfirmModalProps = {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  icon?: React.ReactNode;
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title = 'Are you sure?',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isOpen,
  onClose,
  onConfirm,
  icon,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 ">
      <div className="bg-base-300 p-6 rounded-xl shadow-lg w-[90%] max-w-md">
        <div className="flex items-center gap-3 mb-4">
          {icon&&icon}
          <h2 className="text-lg font-semibold text-base-content">{title}</h2>
        </div>

        <p className="text-sm text-base-content/80">{message}</p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            className="text-gray-700 bg-gray-200 btn btn-sm hover:bg-gray-300 dark:bg-base-100 dark:text-base-content"
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button
            className="text-white bg-red-600 btn btn-sm hover:bg-red-700"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
