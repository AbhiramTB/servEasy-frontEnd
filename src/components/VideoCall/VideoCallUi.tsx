import React, { RefObject } from 'react';

interface VideoCallUIProps {
  localVideoRef: RefObject<HTMLVideoElement | null>;
  remoteVideoRef: RefObject<HTMLVideoElement | null>;
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
  firstLetter = 'U',
}) => {
  return (
    <div className="relative w-full overflow-hidden h-full">
      {/* Main Remote Video Container */}
      <div className="relative w-full h-full">
        <video ref={remoteVideoRef} autoPlay playsInline className="object-cover w-full h-full" />

        {/* Remote Placeholder / Loading State */}
        {!isRemoteStreamAvailable && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900">
            <div className="flex items-center justify-center w-20 h-20 text-3xl font-bold text-white bg-indigo-600 rounded-full shadow-lg md:w-24 md:h-24 md:text-4xl">
              {firstLetter}
            </div>
            <p className="mt-6 text-lg font-medium text-white md:text-xl">Connecting...</p>
            <span className="mt-4 loading loading-spinner loading-lg"></span>
          </div>
        )}
      </div>

      {/* Local Video (Floating UI) */}
      {/* Adjusted: Smaller on mobile (w-1/3), larger on desktop (w-1/4). Max height for mobile. */}
      <div className="absolute z-10 overflow-hidden border-2 border-white rounded-lg shadow-xl top-4 right-4 w-1/3 md:w-1/4 lg:w-1/5 aspect-[3/4] md:h-auto max-h-[200px] md:max-h-none">
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          className={`object-cover w-full h-full ${isCameraOff ? 'hidden' : 'block'}`}
        />
        {isCameraOff && (
          <div className="flex items-center justify-center w-full h-full text-xl font-bold text-white bg-gray-800">
            {firstLetter}
          </div>
        )}
      </div>

      {/* Status Badge */}
      <div
        className={`absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-xs md:text-sm font-medium ${
          isRemoteStreamAvailable ? 'bg-green-500/80' : 'bg-yellow-500/80 animate-pulse'
        } text-white backdrop-blur-md`}
      >
        {isRemoteStreamAvailable ? 'Connected' : 'Connecting...'}
      </div>

      {/* Controls Layer */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-4 md:p-8">
        {/* Gradient Overlay for better button visibility */}
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none bg-gradient-to-t from-black/80 to-transparent"></div>

        <div className="relative flex flex-wrap justify-center gap-3 md:gap-6">
          <button
            onClick={toggleMic}
            className={`p-4 rounded-full transition-all transform hover:scale-105 ${
              isMicMuted ? 'bg-red-600' : 'bg-gray-700/80 hover:bg-gray-600'
            } text-white shadow-xl`}
            title={isMicMuted ? 'Unmute' : 'Mute'}
          >
            {/* Using text for now, but icons (Heroicons/Lucide) are recommended for mobile */}
            <span className="text-xs font-bold md:text-base">{isMicMuted ? 'MIC OFF' : 'MIC ON'}</span>
          </button>

          <button
            onClick={toggleCamera}
            className={`p-4 rounded-full transition-all transform hover:scale-105 ${
              isCameraOff ? 'bg-red-600' : 'bg-gray-700/80 hover:bg-gray-600'
            } text-white shadow-xl`}
          >
            <span className="text-xs font-bold md:text-base">{isCameraOff ? 'CAM OFF' : 'CAM ON'}</span>
          </button>

          <button
            onClick={handleEndCall}
            className="p-4 px-6 text-xs font-bold text-white transition-all transform bg-red-600 rounded-full shadow-xl md:px-8 md:text-base hover:bg-red-700 hover:scale-105"
          >
            END
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCallUI;
