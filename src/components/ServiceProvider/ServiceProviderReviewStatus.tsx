import React from 'react';

type ProviderStatus = 'pending' | 'rejected' | 'approved';

export interface IProviderStatus {
  hasProvider: boolean;
  status: ProviderStatus;
}

interface ServiceProviderStatusCardProps {
  status: IProviderStatus;
  mode?: 'info' | 'action';

  onRejectedAction?: () => void;

  rejectedActionText?: string;

  showLoader?: boolean;
}

const ServiceProviderStatusCard: React.FC<ServiceProviderStatusCardProps> = ({
  status,
  mode = 'info',
  onRejectedAction,
  rejectedActionText = 'Re-Apply',
  showLoader = true,
}) => {
  if (!status?.hasProvider) return null;

  if (status.status === 'pending') {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <div className="alert alert-info shadow mb-6">
          <span className="font-semibold">Registration Under Review</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">Your request is pending</h1>

        <p className="text-base-content opacity-70 leading-relaxed">
          Our admin team is reviewing your service provider application. You will be notified once the process is
          completed.
        </p>

        {showLoader && (
          <div className="mt-8 flex justify-center">
            <span className="loading loading-spinner loading-lg text-info"></span>
          </div>
        )}
      </div>
    );
  }

  if (status.status === 'rejected') {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <div className="alert alert-error shadow mb-6">
          <span className="font-semibold">Registration Rejected</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">Your request was rejected</h1>

        <p className="text-base-content opacity-70 mb-8 leading-relaxed">
          Your service provider registration was rejected by the admin. You can review and submit your request again.
        </p>

        {mode === 'action' && onRejectedAction && (
          <button onClick={onRejectedAction} className="btn btn-primary btn-wide">
            {rejectedActionText}
          </button>
        )}
      </div>
    );
  }

  return null;
};

export default ServiceProviderStatusCard;
