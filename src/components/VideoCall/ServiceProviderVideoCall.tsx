import { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useVideoCall } from "../../hooks/useVideoCall";
import { RootState } from "../../redux/store";
import VideoCallUI from "./VideoCallUI";
import EndCallModal from "./EndCallModal";

interface Prop {
  firstLetter?: string;
}

const ServiceProviderVideoCall: React.FC<Prop> = ({ firstLetter = " " }) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const currentUser = useSelector((state: RootState) => state.serviceProvider);

  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isRemoteStreamAvailable, setIsRemoteStreamAvailable] = useState(false);

  const handleEndCall = () => {
    endCall();
    navigate("/service-provider/dashboard");
    window.location.reload();
  };

  const openRejectedModal = () => {
    const modal = document.getElementById(
      "rejected_modal"
    ) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  const { localStream, endCall } = useVideoCall(
    currentUser.userId + "",
    userId!,
    true,
    currentUser.serviceProviderName,
    currentUser.profileImage,
    localVideoRef,
    remoteVideoRef,
    openRejectedModal,
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (remoteVideoRef.current?.srcObject) {
        setIsRemoteStreamAvailable(true);
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const toggleMic = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMicMuted((prev) => !prev);
    }
  };

  const toggleCamera = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsCameraOff((prev) => !prev);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">

<EndCallModal handleEndCall={handleEndCall} />



      <VideoCallUI
        localVideoRef={localVideoRef}
        remoteVideoRef={remoteVideoRef}
        isMicMuted={isMicMuted}
        isCameraOff={isCameraOff}
        isRemoteStreamAvailable={isRemoteStreamAvailable}
        toggleMic={toggleMic}
        toggleCamera={toggleCamera}
        handleEndCall={handleEndCall}
        firstLetter={firstLetter}
      />
    </div>
  );
};

export default ServiceProviderVideoCall;
