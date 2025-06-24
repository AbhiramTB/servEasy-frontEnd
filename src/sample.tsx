import { useState } from "react";
import RescheduleBookingModal from "./components/ServiceProvider/booking/rescheduleBooking";

const ParentComponent = () => {
  const [showAcceptModal, setShowAcceptModal] = useState(true);
  const [estimatedTime, setEstimatedTime] = useState('');
  const [reason, setReason] = useState('');
  const handleAcceptBooking = () => {
    // Your booking logic
  };

  return (
    <>
      {showAcceptModal && (
        <RescheduleBookingModal
          estimatedTime={estimatedTime}
          setEstimatedTime={setEstimatedTime}
          setShowAcceptModal={setShowAcceptModal}
          handleAcceptBooking={handleAcceptBooking}
          reason={reason}
          setReason={setReason}
        />
      )}
    </>
  );
};

export default ParentComponent;