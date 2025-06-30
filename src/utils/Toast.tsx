import React from 'react';
import { toast } from 'react-toastify';
 

interface CustomToastProps {
  message?: string;
  subMessage?: string;
  onAccept: () => void;
  onReject: () => void;
  onAcceptMessage: string | boolean;
  onRejectMessage: string | boolean;
  buttonText?: string;
}

const CustomToast: React.FC<CustomToastProps> = ({
  message = "Notification",
  subMessage,
  onAcceptMessage = "Accept",
  onRejectMessage = "Reject",
  onAccept,
  onReject,
  buttonText = "Show Toast"
}) => {
  const showToast = () => {
    const theme=localStorage.getItem("theme")
    toast(
      <div className="p-5 rounded-lg shadow-lg ">
        <p className="mb-2 text-sm  text-base-content">{message}</p>
        {subMessage && (
          <p className="mb-4 text-sm text-base-content opacity-80">{subMessage}</p>
        )}
        <div className="flex justify-end gap-4 mt-4">
          {onAcceptMessage !== false && (
            <button
              className="px-6 py-2 font-medium transition-colors duration-200 rounded-md shadow-sm bg-primary hover:bg-primary-focus text-primary-content"
              onClick={() => {
                onAccept();
                toast.dismiss();
              }}
            >
              {onAcceptMessage}
            </button>
          )}
          {onRejectMessage !== false && (
            <button
              className="px-6 py-2 font-medium text-white transition-colors duration-200 bg-red-500 rounded-md shadow-sm hover:bg-red-600"
              onClick={() => {
                onReject();
                toast.dismiss();
              }}
            >
              {onRejectMessage}
            </button>
          )}
        </div>
      </div>,
      {
        position: "top-right",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        className: "custom-toast-container",
        theme : 'dark'
      }
    );
  };

  return (
    <button 
      className="px-6 py-3 font-medium transition-colors duration-200 border rounded-lg shadow-sm bg-base-100 text-base-content border-base-300 hover:bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
      onClick={showToast}
    >
      {buttonText}
    </button>
  );
};

export default CustomToast;