import React, { useEffect } from 'react';

interface StatusUpdateModalProps {
  show: boolean;
  onClose: () => void;
  onUpdate: () => void;
  statusList: string[];
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
}

const StatusUpdateModal: React.FC<StatusUpdateModalProps> = ({
  show,
  onClose,
  onUpdate,
  statusList,
  selectedStatus,
  setSelectedStatus,
}) => {
  useEffect(() => {
    if (show && statusList.length === 1 && !selectedStatus) {
      setSelectedStatus(statusList[0]);
    }
  }, [show, statusList, selectedStatus, setSelectedStatus]);

  if (!show) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="text-lg font-bold">Update Service Status</h3>

        <div className="mb-4 form-control">
          <label className="label">
            <span className="label-text">Select New Status</span>
          </label>
          <select
            className="select select-bordered"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="" disabled>
              -- Select New Status --
            </option>
            {statusList.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={onUpdate}
            disabled={!selectedStatus}
          >
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusUpdateModal;
