import React, { useState } from 'react';
interface RejectionReasonModalProps {
  onSubmit: (reason: string) => void;
}
const RejectionReasonModal: React.FC<RejectionReasonModalProps> = ({onSubmit}) => {
  const [reason, setReason] = useState('');

  return (
    <dialog id="reason_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="mb-4 text-lg font-bold">Rejection Reason</h3>

        {/* Textarea for entering reason */}
        <textarea
          className="w-full textarea textarea-bordered"
          placeholder="Enter rejection reason..."
          value={reason}
          onChange={e => setReason(e.target.value)}
        ></textarea>

        <div className="modal-action">
          <form method="dialog" className="flex gap-2">
            {/* Close button */}
            <button className="btn">Cancel</button>
            {/* Submit button */}
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                onSubmit(reason)
               
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default RejectionReasonModal;

