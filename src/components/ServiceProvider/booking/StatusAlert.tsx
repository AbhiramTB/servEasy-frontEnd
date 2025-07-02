import React from 'react';

interface StatusAlertProps {
  status: string;
  cancellationReason?: string;
}

const StatusAlert: React.FC<StatusAlertProps> = ({ status, cancellationReason }) => {
  const getStatusClass = () => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'badge-warning';
      case 'confirmed':
      case 'inprogress':
        return 'badge-info';
      case 'paymentrequested':
        return 'badge-warning';
      case 'completed':
        return 'badge-success';
      case 'cancelled':
        return 'badge-error';
      default:
        return 'badge-warning';
    }
  };

  const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <div className={`  mb-2  badge ${getStatusClass()}`}>
      <div>
        <span className="font-bold">Status: {formattedStatus}</span>
        {status.toLowerCase() === 'cancelled' && cancellationReason && <span> - Reason: {cancellationReason}</span>}
      </div>
    </div>
  );
};

export default StatusAlert;
