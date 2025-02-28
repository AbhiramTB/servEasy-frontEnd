import React from 'react';
import { toast } from 'react-toastify';
import { darkTheme } from "./constant";
 

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
      <div className=" p-5 rounded-lg shadow-lg ">
        <p className=" text-sm mb-2 text-base-content ">{message}</p>
        {subMessage && (
          <p className="text-sm mb-4 text-base-content opacity-80">{subMessage}</p>
        )}
        <div className="flex gap-4 mt-4 justify-end">
          {onAcceptMessage !== false && (
            <button
              className="bg-primary hover:bg-primary-focus text-primary-content px-6 py-2 rounded-md transition-colors duration-200 font-medium shadow-sm"
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
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition-colors duration-200 font-medium shadow-sm"
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
        theme : theme===darkTheme ? "dark":"light"
      }
    );
  };

  return (
    <button 
      className="bg-base-100 text-base-content px-6 py-3 rounded-lg border border-base-300 hover:bg-base-200 transition-colors duration-200 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
      onClick={showToast}
    >
      {buttonText}
    </button>
  );
};

export default CustomToast;