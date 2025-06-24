import React from 'react';

interface CancelBookingModalProps {
  show: boolean;
  cancelReason: string;
  setCancelReason: (value: string) => void;
  setShow: (value: boolean) => void;
  handleCancelBooking: () => void;
}

const CancelBookingModal: React.FC<CancelBookingModalProps> = ({
  show,
  cancelReason,
  setCancelReason,
  setShow,
  handleCancelBooking
}) => {
  if (!show) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="text-lg font-bold">Cancel Booking</h3>
        <p className="py-4">Please provide a reason for cancellation:</p>

        <div className="mb-4 form-control">
          <label className="label">
            <span className="label-text">Cancellation Reason</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            rows={3}
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
          ></textarea>
        </div>

        <div className="modal-action">
          <button className="btn" onClick={() => setShow(false)}>
            Back
          </button>
          <button className="btn btn-error" onClick={handleCancelBooking}>
            Cancel Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelBookingModal;
