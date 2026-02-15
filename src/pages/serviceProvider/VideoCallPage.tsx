import { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useVideoCall } from '../../hooks/useVideoCall';
import { RootState } from '../../redux/store';
import EndCallModal from '../../components/VideoCall/EndCallModal';
import VideoCallUI from '../../components/VideoCall/VideoCallUi';
import ErrorModal from '../../components/VideoCall/ErrorModal';
interface Prop {
  firstLetter?: string;
}

const ServiceProviderVideoCall: React.FC<Prop> = ({ firstLetter = ' ' }) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const currentUser = useSelector((state: RootState) => state.serviceProvider);

  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isRemoteStreamAvailable, setIsRemoteStreamAvailable] = useState(false);
  const [videoCallErrorMessage, setVideoCallErrorMessage] = useState<{ message: string; title: string }>({
    message: '',
    title: '',
  });

  const handleEndCall = () => {
    endCall();
    navigate('/service-provider/dashboard');
    window.location.reload();
  };

  const openRejectedModal = () => {
    const modal = document.getElementById('rejected_modal') as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  const openErrorModal = (message: string, title: string) => {
    setVideoCallErrorMessage({ message, title });

    const modal = document.getElementById('error_modal') as HTMLDialogElement;
    modal?.showModal();
  };

  const closeErrorModal = () => {
    const modal = document.getElementById('error_modal') as HTMLDialogElement;
    modal?.close();
  };

  const { localStream, endCall } = useVideoCall(
    currentUser.userId + '',
    userId!,
    'USER',
    true,
    currentUser.serviceProviderName,
    currentUser.profileImage,
    localVideoRef,
    remoteVideoRef,
    openRejectedModal,
    openErrorModal
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
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMicMuted(prev => !prev);
    }
  };

  const toggleCamera = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsCameraOff(prev => !prev);
    }
  };

  return (
    <div className="relative w-full  overflow-hidden bg-gray-900">
      <EndCallModal handleEndCall={handleEndCall} />

      <ErrorModal
        onClose={closeErrorModal}
        message={videoCallErrorMessage.message}
        title={videoCallErrorMessage.title}
      />
      <div className="h-[calc(100dvh-64px-25px)] bg-base-300   md:h-[100vh]">
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
    </div>
  );
};

export default ServiceProviderVideoCall;
