import React from 'react';

interface BookingStepperProps {
  status: string;
  cancellationReason?: string;
}

const BookingStepper: React.FC<BookingStepperProps> = ({ status, cancellationReason }) => {
  const lowerStatus = status.toLowerCase();

  const isPending = lowerStatus === 'pending';
  const isConfirmed = lowerStatus === 'confirmed';
  const isInProgress = lowerStatus === 'inprogress';
  const isPaymentRequested = lowerStatus === 'requested';
  const isCompleted = lowerStatus === 'completed';
  const isCancelled = lowerStatus === 'cancelled';

  const steps = [
    { label: 'Pending', active: isPending || isConfirmed || isInProgress || isPaymentRequested || isCompleted },
    { label: 'Confirmed', active: isConfirmed || isInProgress || isPaymentRequested || isCompleted },
    { label: 'In Progress', active: isInProgress || isPaymentRequested || isCompleted },
    { label: 'Payment Requested', active: isPaymentRequested || isCompleted },
    { label: 'Completed', active: isCompleted },
  ];
  return (
    <div className="mb-4">
      <h3 className="mb-2 font-medium">Booking Status</h3>
      {isCancelled ? (
        <div className="text-error">{cancellationReason ? cancellationReason : 'Service has been cancelled'} </div>
      ) : (
        <ul className="w-full steps steps-horizontal">
          {steps.map((step, idx) => (
            <li key={idx} className={`step ${step.active ? 'step-primary' : ''}`}>
              {step.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingStepper;
