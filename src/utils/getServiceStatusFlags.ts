export interface ServiceStatusFlags {
  isPending: boolean;
  isConfirmed: boolean;
  isInProgress: boolean;
  isCompleted: boolean;
  isCancelled: boolean;
  isPaymentRequested: boolean;
}

export function getServiceStatusFlags(status: string): ServiceStatusFlags {
  const lowerStatus = status.toLowerCase();
  return {
    isPending: lowerStatus === "pending",
    isConfirmed: lowerStatus === "confirmed",
    isInProgress: lowerStatus === "inprogress",
    isCompleted: lowerStatus === "completed",
    isCancelled: lowerStatus === "cancelled",
    isPaymentRequested: lowerStatus === "requested",
  };
}
