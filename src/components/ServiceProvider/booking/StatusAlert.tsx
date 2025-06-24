
import React from "react";

interface StatusAlertProps {
  status: string;
  cancellationReason?: string;
}

const StatusAlert: React.FC<StatusAlertProps> = ({ status, cancellationReason }) => {
  const getStatusClass = () => {
    switch (status.toLowerCase()) {
      case "pending":
        return "alert-warning";
      case "confirmed":
      case "inprogress":
        return "alert-info";
      case "paymentrequested":
      case "completed":
        return "alert-success";
      case "cancelled":
        return "alert-error";
      default:
        return "";
    }
  };

  const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <div className={`alert ${getStatusClass()} mb-4`}>
      <div className="flex items-start gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0 w-6 h-6 mt-1 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div>
          <span className="font-bold">Status: {formattedStatus}</span>
          {status.toLowerCase() === "cancelled" && cancellationReason && (
            <span> - Reason: {cancellationReason}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusAlert;
