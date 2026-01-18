import React from 'react';

interface ScheduleAndPaymentInfoProps {
  bookedDate: string;
  serviceDate: string;
  serviceTime?: string;
  isPending: boolean;
  estimatedServiceTime?: string;
  paymentStatus: 'paid' | 'requested' | string;
  paymentType: string;
}

const ScheduleAndPaymentInfo: React.FC<ScheduleAndPaymentInfoProps> = ({
  bookedDate,
  serviceDate,
  serviceTime,
  isPending,
  estimatedServiceTime,
  paymentStatus,
  paymentType,
}) => {
  const getPaymentStatusClass = () => {
    switch (paymentStatus.toLowerCase()) {
      case 'paid':
        return 'text-success';
      case 'requested':
        return 'text-warning';
      case 'refunded':
        return 'text-error';
      default:
        return '';
    }
  };

  const capitalizedStatus = paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1);

  return (
    <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2">
      {/* Schedule Card */}
      <div className="p-3 bg-base-200 rounded-box">
        <h3 className="mb-2 font-medium">Schedule</h3>
        <div className="text-sm">
          <p>Booked on : {bookedDate}</p>
          <div className="divider"></div>

          <p>Service slot: {serviceDate}</p>
          <p> {serviceTime && ` at ${serviceTime}`}</p>

          {!estimatedServiceTime && isPending && <p className="text-warning">*Accept booking to set service time</p>}
        </div>
      </div>

      {/* Payment Card */}
      <div className="p-3 bg-base-200 rounded-box">
        <h3 className="mb-2 font-medium">Payment</h3>
        <div className="text-sm">
          <p>
            Status: <span className={getPaymentStatusClass()}>{capitalizedStatus}</span>
          </p>
          <p>Method: {paymentType}</p>
        </div>
      </div>
    </div>
  );
};

export default ScheduleAndPaymentInfo;
