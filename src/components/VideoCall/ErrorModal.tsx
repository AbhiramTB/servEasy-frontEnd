type ErrorModalProps = {
  message: string;
  onClose: () => void;
  title?: string;
};

const ErrorModal: React.FC<ErrorModalProps> = ({ message, onClose, title = 'Something went wrong' }) => {
  return (
    <dialog id="error_modal" className="modal">
      <div className="bg-base-300 border border-base-content shadow-2xl modal-box animate__animated animate__fadeInDown">
        <div className="space-y-6 text-center">
          <div className="flex justify-center">
            <div className="text-red-500 text-7xl animate-pulse">
              <i className="fa-solid fa-triangle-exclamation drop-shadow-lg"></i>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-base-content">{title}</h3>
            <p className="text-lg text-base-content">{message}</p>
          </div>

          <div className="pt-4">
            <button
              className="font-semibold transition-all duration-200 shadow-lg btn btn-error btn-wide hover:scale-105 hover:shadow-xl"
              onClick={onClose}
            >
              <i className="mr-2 fa-solid fa-phone-slash"></i>
              Close
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default ErrorModal;
