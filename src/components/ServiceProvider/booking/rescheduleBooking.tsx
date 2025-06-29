import React from 'react';
import { getMinMaxDateTime } from '../../../utils/getMinMaxDateTime';

interface RescheduleBookingModalProps {
  estimatedTime: string;
  setEstimatedTime: (value: string) => void;
  setShowAcceptModal: (value: boolean) => void;
  handleAcceptBooking: () => void;
  reason: string;
  setReason: (value: string) => void;
  show:boolean,
}

const suggestedReasons = [
  'Health emergency',
  'Technical issue',
  'Previous booking delay',
  'Personal reasons',
  'Weather conditions'
];

const RescheduleBookingModal: React.FC<RescheduleBookingModalProps> = ({
  estimatedTime,
  setEstimatedTime,
  setShowAcceptModal,
  handleAcceptBooking,
  reason,
  setReason,
  show,
}) => {
  const { min, max } = getMinMaxDateTime(2);

  if(!show){
    return
  }
  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="text-lg font-bold">Reschedule Booking</h3>
        <p className="py-2">Please provide a new estimated service time and a reason:</p>

        {/* Date and Time Picker */}
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

        {/* Reason Input Field */}
        <div className="mb-2 form-control">
          <label className="label">
            <span className="label-text">Reason for Rescheduling</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            placeholder="Enter your reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>

        {/* Suggested Reasons (Clickable) */}
        <div className="mb-4 text-sm ">
          <div className="mb-1">Suggestions:</div>
          {suggestedReasons.map((r, idx) => (
            <button
              type="button"
              key={idx}
              onClick={() => setReason(r)}
              className="inline-block px-3 py-1 mb-2 mr-2 text-sm transition border rounded-full border-accent text-primary bg-base-300 hover:bg-base-100"
            >
              {r}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="modal-action">
          <button className="btn" onClick={() => setShowAcceptModal(false)} >
            Cancel
          </button>
          <button className="btn btn-success" onClick={handleAcceptBooking}   disabled={!estimatedTime || !reason}
>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default RescheduleBookingModal;
