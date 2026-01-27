import React from 'react'
import InitialAvatar from './InitialAvatar' // Adjust the path based on your project structure

interface IVideoCallNotification {
  callerName: string
  callerProfile?: string
}

interface Props {
  videoCallNotification: IVideoCallNotification
  onAccept: () => void
  onReject: () => void
  onClose: () => void // For manual dismissal (e.g., after timeout or button)
}

const VideoCallNotification: React.FC<Props> = ({
  videoCallNotification,
  onAccept,
  onReject,
  onClose,
}) => {
  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal container */}
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
        <div className="w-full max-w-md mx-2 overflow-hidden transition-all duration-300 transform scale-100 shadow-2xl rounded-2xl bg-base-200 ring-1 ring-black ring-opacity-5 animate-enter">
          
          {/* Header with caller info */}
          <div className="flex items-center p-6 bg-primary text-primary-content">
            <div className="flex-shrink-0">
              {videoCallNotification.callerProfile ? (
                <img
                  className="w-16 h-16 rounded-full shadow-lg border-3 border-primary-content/30"
                  src={
                    videoCallNotification.callerProfile ||
                    import.meta.env.VITE_IMAGE_PLACEHOLDER
                  }
                  alt={videoCallNotification.callerName}
                />
              ) : (
                <div className="w-16 h-16">
                  <InitialAvatar name={videoCallNotification.callerName} />
                </div>
              )}
            </div>
            <div className="flex-1 ml-4">
              <p className="text-xl font-semibold truncate">{videoCallNotification.callerName}</p>
              <p className="text-sm opacity-90">Incoming video call</p>
            </div>
            <div className="flex-shrink-0">
              <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full shadow-sm bg-accent text-accent-content animate-pulse">
                <span className="w-2 h-2 mr-2 rounded-full bg-accent-content animate-ping"></span>
                Live
              </span>
            </div>
          </div>

          {/* Call ringing animation section */}
          <div className="px-6 py-6 bg-base-100">
            <div className="mb-4 text-center">
              <p className="text-sm font-medium text-base-content/70">Incoming call...</p>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="loading loading-ball loading-xs text-primary"></span>
              <span className="loading loading-ball loading-sm text-primary"></span>
              <span className="loading loading-ball loading-md text-primary"></span>
              <span className="loading loading-ball loading-lg text-primary"></span>
              <span className="loading loading-ball loading-md text-primary"></span>
              <span className="loading loading-ball loading-sm text-primary"></span>
              <span className="loading loading-ball loading-xs text-primary"></span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex border-t border-base-300 bg-base-100">
            <button
              onClick={() => {
                onReject()
                onClose()
              }}
              className="flex items-center justify-center w-1/2 p-5 text-base font-medium transition-all duration-200 border-r text-error border-base-300 hover:bg-error hover:bg-opacity-15 focus:outline-none focus:bg-error focus:bg-opacity-10 active:scale-95"
            >
              <svg
                className="w-6 h-6 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
              </svg>
              Decline
            </button>
            <button
              onClick={() => {
                onAccept()
                onClose()
              }}
              className="flex items-center justify-center w-1/2 p-5 text-base font-medium transition-all duration-200 text-success hover:bg-success hover:bg-opacity-15 focus:outline-none focus:bg-success focus:bg-opacity-10 active:scale-95"
            >
              <svg
                className="w-6 h-6 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
              </svg>
              Accept
            </button>
          </div>
          
          {/* <button
            onClick={onClose}
            className="absolute p-2 transition-colors duration-200 rounded-full top-4 right-4 text-primary-content/70 hover:text-primary-content hover:bg-primary-content/10"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
            </svg>
          </button> */}
        </div>
      </div>
    </>
  )
}

export default VideoCallNotification