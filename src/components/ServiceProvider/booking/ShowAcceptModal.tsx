import React from 'react';

interface AcceptServiceModalProps {
  show: boolean;
  estimatedTime: string;
  setEstimatedTime: (value: string) => void;
  setShow: (value: boolean) => void;
  handleAcceptBooking: () => void;
  min: string;
  max: string;
}

const AcceptServiceModal: React.FC<AcceptServiceModalProps> = ({
  show,
  estimatedTime,
  setEstimatedTime,
  setShow,
  handleAcceptBooking,
  min,
  max
}) => {
  if (!show) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="text-lg font-bold">Accept Booking</h3>
        <p className="py-4">Please provide an estimated service time:</p>

        <div className="mb-4 form-control">
          <label className="label">
            <span className="label-text">Estimated Service Date and Time</span>
          </label>
          <input
            type="datetime-local"
            className="input input-bordered"
            min={min}
            max={max}
            value={estimatedTime}
            onChange={(e) => setEstimatedTime(e.target.value)}
          />
        </div>

        <div className="modal-action">
          <button className="btn" onClick={() => setShow(false)}>
            Cancel
          </button>
          <button className="btn btn-success" onClick={handleAcceptBooking}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcceptServiceModal;
