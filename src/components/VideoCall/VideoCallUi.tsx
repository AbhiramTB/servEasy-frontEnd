import React,{ RefObject } from "react";


interface VideoCallUIProps {
    localVideoRef: RefObject<HTMLVideoElement|null>;
    remoteVideoRef: RefObject<HTMLVideoElement|null>;
    isMicMuted: boolean;
    isCameraOff: boolean;
    isRemoteStreamAvailable: boolean;
    toggleMic: () => void;
    toggleCamera: () => void;
    handleEndCall: () => void;
    firstLetter?: string;
  }

const VideoCallUI: React.FC<VideoCallUIProps> = ({
  localVideoRef,
  remoteVideoRef,
  isMicMuted,
  isCameraOff,
  isRemoteStreamAvailable,
  toggleMic,
  toggleCamera,
  handleEndCall,
  firstLetter = "U", 
}) => {
  return (
    <div>
      <div className="relative w-full h-full bg-black">
        <video
          ref={remoteVideoRef}
          autoPlay
          className="object-cover w-full h-full"
        />

        {!isRemoteStreamAvailable && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900">
            <div className="flex items-center justify-center w-24 h-24 text-4xl font-bold text-white bg-indigo-600 rounded-full shadow-lg">
              {firstLetter}
            </div>
            <p className="mt-6 text-xl font-medium text-white">Connecting...</p>
            <div className="flex">
              <span className="loading loading-spinner loading-xl"></span>
            </div>
          </div>
        )}
      </div>

      <div className="absolute z-10 w-2/6 overflow-hidden border-2 border-white rounded-lg shadow-lg top-2 right-4 h-80">
        <video
          ref={localVideoRef}
          autoPlay
          muted
          className={`object-cover w-full h-full ${isCameraOff ? "invisible" : "visible"}`}
        />
        {isCameraOff && (
          <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white bg-gray-800">
            {firstLetter}
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>

        <div className="relative flex justify-center gap-4">
          <button
            onClick={toggleMic}
            className={`px-5 py-3 rounded-full ${isMicMuted ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"} text-white font-medium shadow-lg transition-all transform hover:scale-105`}
          >
            {isMicMuted ? "Unmute" : "Mute"}
          </button>

          <button
            onClick={toggleCamera}
            className={`px-5 py-3 rounded-full ${isCameraOff ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"} text-white font-medium shadow-lg transition-all transform hover:scale-105`}
          >
            {isCameraOff ? "Camera On" : "Camera Off"}
          </button>

          <button
            onClick={handleEndCall}
            className="px-5 py-3 font-medium text-white transition-all transform bg-red-600 rounded-full shadow-lg hover:bg-red-700 hover:scale-105"
          >
            End Call
          </button>
        </div>
      </div>

      <div
        className={`absolute top-4 left-4 z-20 px-3 py-1 rounded-full ${isRemoteStreamAvailable ? "bg-green-500" : "bg-yellow-500 animate-pulse"} text-white text-sm`}
      >
        {isRemoteStreamAvailable ? "Connected" : "Connecting..."}
      </div>
    </div>
  );
};

export default VideoCallUI;