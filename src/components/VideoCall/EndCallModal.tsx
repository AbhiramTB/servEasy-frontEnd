import React from "react";
interface rejectPros {
  handleEndCall: () => void;
  userName?: "string";
}
const EndCallModal: React.FC<rejectPros> = ({ handleEndCall, userName }) => {
  return (
    <div>
    <dialog id="rejected_modal" className="modal">
      <div className="bg-gray-800 border border-gray-600 shadow-2xl modal-box animate__animated animate__fadeInDown">
        <div className="space-y-6 text-center">
          {/* Icon with subtle animation */}
          <div className="flex justify-center">
            <div className="text-red-500 text-7xl animate-pulse">
              <i className="fa-solid fa-circle-xmark drop-shadow-lg"></i>
            </div>
          </div>
  
          {/* Clean typography */}
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-white">
              Call Rejected
            </h3>
            <p className="text-lg text-gray-300">
              by {userName || "opponent"}
            </p>
          </div>
  
          <p className="leading-relaxed text-gray-400">
            The service provider declined your call.
          </p>
  
          {/* Simple enhanced button */}
          <div className="pt-4">
            <button
              className="font-semibold transition-all duration-200 shadow-lg btn btn-error btn-wide hover:scale-105 hover:shadow-xl"
              onClick={handleEndCall}
            >
              <i className="mr-2 fa-solid fa-phone-slash"></i>
              End Call
            </button>
          </div>
        </div>
      </div>
    </dialog>
  </div>
  );
};

export default EndCallModal;
