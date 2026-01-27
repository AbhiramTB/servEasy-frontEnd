import { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useVideoCall } from '../../hooks/useVideoCall';
import { RootState } from '../../redux/store';
import { Toaster } from 'react-hot-toast';
import VideoCallUI from './VideoCallUi';
import { ROUTES } from '../../utils/constants/routes';

interface Prop {
  firstLetter?: string;
}

const VideoCall: React.FC<Prop> = ({ firstLetter = ' ' }) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const currentUser = useSelector((state: RootState) => state.user);

  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isRemoteStreamAvailable, setIsRemoteStreamAvailable] = useState(false);
  const handleEndCall = () => {
    endCall();
    navigate(ROUTES.USER.HOME);
    window.location.reload();
  };

  const openRejectedModal = () => {
    const modal = document.getElementById('rejected_modal') as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  const { localStream, endCall } = useVideoCall(
    currentUser._id + '',
    userId!,
    'SERVICE_PROVIDER',
    true,
    currentUser.userName,
    currentUser.profileImage + '',
    localVideoRef,
    remoteVideoRef,
    openRejectedModal
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
    <div className="relative w-full  overflow-hidden bg-gray-900 ">
      <Toaster />

      <dialog id="rejected_modal" className="modal">
        <div className="space-y-4 text-center modal-box animate__animated animate__fadeInDown">
          <div className="flex justify-center text-6xl text-red-500">
            <i className="fa-solid fa-circle-xmark drop-shadow-md"></i>
          </div>

          <h3 className="text-xl font-bold text-red">The other user has hung up the call</h3>
          <p className="text-sm text-yellow-400">The other user has hung up the call</p>

          <div className="pt-4">
            <button
              className="transition-transform duration-200 btn btn-error btn-wide hover:scale-105"
              onClick={handleEndCall}
            >
              End Call
            </button>
          </div>
        </div>
      </dialog>
      <div className="h-[calc(100dvh-64px-130px)] bg-base-300   md:h-[100vh]">
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

export default VideoCall;
