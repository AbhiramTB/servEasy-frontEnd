// src/pages/VideoCall.tsx
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useVideoCall } from "../../hooks/useVideoCall";
import { RootState } from "../../redux/store"; // adjust if needed

function VideoCall() {
  const { userId: oppositeUserId } = useParams(); // from URL
  const currentUserId = useSelector((state: RootState) => state.user._id);

  const [callStarted, setCallStarted] = useState(false);

  const roomId = [currentUserId, oppositeUserId].sort().join("-"); // consistent room ID

  const { localVideoRef, remoteVideoRef } = useVideoCall(callStarted ? roomId : "");

  const handleStartCall = () => {
    setCallStarted(true);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      {!callStarted ? (
        <button
          onClick={handleStartCall}
          className="px-6 py-2 text-white bg-green-600 rounded hover:bg-green-700"
        >
          Start Video Call
        </button>
      ) : (
        <div className="flex justify-center w-full gap-4">
          <video ref={localVideoRef} autoPlay muted className="w-1/2 rounded shadow" />
          <video ref={remoteVideoRef} autoPlay className="w-1/2 rounded shadow" />
        </div>
      )}
    </div>
  );
}

export default VideoCall;
