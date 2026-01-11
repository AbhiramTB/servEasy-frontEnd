import { toast } from 'react-hot-toast';
import { IChatNotification, IVideoCallNotification } from './types/INotification';
import InitialAvatar from './ui/InitialAvatar';
import { Bell } from 'lucide-react';
import dayjs from 'dayjs';

export function HotToastError(message: string, title?: string) {
  toast.custom(t => (
    <div
      className={`${
        t.visible ? 'animate-custom-enter' : 'animate-custom-leave'
      } max-w-sm w-full bg-gradient-to-bl from-base-100 to-base-300 rounded-2xl shadow-lg pointer-events-auto flex ring-1 ring-primary ring-opacity-60 border border-primary/40 overflow-hidden`}
    >
      {/* Success Icon */}
      <div className="flex items-center justify-center p-3 bg-error/50 text-error-content ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      {/* Message Content */}
      <div className="flex-1 p-4">
        <p className="text-sm font-semibold text-primary">{message}</p>
        {title && <p className="mt-1 text-sm text-base-content/70">{title}</p>}
      </div>

      {/* Close Button */}
      <button
        onClick={() => toast.dismiss(t.id)}
        className="flex items-center justify-center px-4 text-sm font-medium transition text-base-content hover:text-primary"
      >
        ✕
      </button>
    </div>
  ));
}

// export function HotToastSuccess(message: string, title?: string) {

//   toast.custom(t => (
//     <div
//       className={` ${
//         t.visible ? 'animate-custom-enter' : 'animate-custom-leave'
//       } max-w-md w-full shadow-lg  bg-base-100 rounded-lg pointer-events-auto flex ring-1 ring-primary ring-opacity-5 border-solid-1px border-primary`}
//     >
//   <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="flex-shrink-0 w-6 h-6 stroke-current"
//           fill="none"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//           />
//         </svg>

//       <div className="flex-1 w-0 p-4">
//         <div className="flex items-start">
//           <div className="flex-1 ml-3">
//             <p className="text-sm font-medium text-primary">{message} </p>
//             {title && <p className="mt-1 text-sm text-gray-500">{title}</p>}{' '}
//           </div>
//         </div>
//       </div>
//       <div className="flex border-l border-primary" onClick={() => toast.dismiss(t.id)}>
//         <button

//           className="flex items-center justify-center w-full p-4 text-sm font-medium text-indigo-600 border border-transparent rounded-none rounded-r-lg hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   ));
// }

export function HotToastSuccess(message: string, title?: string) {
  toast.custom(t => (
    <div
      className={`${
        t.visible ? 'animate-custom-enter' : 'animate-custom-leave'
      } max-w-sm w-full bg-gradient-to-bl from-base-100 to-base-300 rounded-2xl shadow-lg pointer-events-auto flex ring-1 ring-primary ring-opacity-60 border border-primary/40 overflow-hidden`}
    >
      {/* Success Icon */}
      <div className="flex items-center justify-center p-3 bg-success/50 text-success ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      {/* Message Content */}
      <div className="flex-1 p-4">
        <p className="text-sm font-semibold text-primary">{message}</p>
        {title && <p className="mt-1 text-sm text-base-content/70">{title}</p>}
      </div>

      {/* Close Button */}
      <button
        onClick={() => toast.dismiss(t.id)}
        className="flex items-center justify-center px-4 text-sm font-medium transition text-base-content hover:text-primary"
      >
        ✕
      </button>
    </div>
  ));
}

export function HotTostVideoCall(
  videoCallNotification: IVideoCallNotification,
  acceptFn: () => void,
  rejectFn: () => void
) {
  toast.custom(
    (t: { id: string; visible: boolean }) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-base-200 shadow-lg rounded-lg pointer-events-auto flex flex-col ring-1 ring-black ring-opacity-5 overflow-hidden`}
      >
        <div className="flex items-center p-4 bg-primary text-primary-content">
          <div className="flex-shrink-0">
            {videoCallNotification.callerProfile ? (
              <img
                className="w-12 h-12 border-2 rounded-full border-primary-content/30"
                src={videoCallNotification.callerProfile || import.meta.env.VITE_IMAGE_PLACEHOLDER}
                alt={videoCallNotification.callerName}
              />
            ) : (
              <InitialAvatar name={videoCallNotification.callerName} />
            )}
          </div>
          <div className="ml-3">
            <p className="text-lg font-semibold">{videoCallNotification.callerName}</p>
            <p className="text-sm opacity-90">Incoming video call</p>
          </div>
          <div className="flex-shrink-0 ml-auto">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent text-accent-content animate-pulse">
              <span className="w-2 h-2 mr-1 rounded-full bg-accent-content"></span>
              Live
            </span>
          </div>
        </div>

        {/* Call ringing animation with DaisyUI loading components */}
        <div className="px-4 py-3 bg-base-100">
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
        <div className="flex border-t border-base-300">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              rejectFn();
            }}
            className="flex items-center justify-center w-1/2 p-4 text-sm font-medium transition-colors duration-150 border-r text-error border-base-300 hover:bg-error hover:bg-opacity-10 focus:outline-none"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
            </svg>
            Decline
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              acceptFn();
            }}
            className="flex items-center justify-center w-1/2 p-4 text-sm font-medium transition-colors duration-150 text-success hover:bg-success hover:bg-opacity-10 focus:outline-none"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
            </svg>
            Accept
          </button>
        </div>
      </div>
    ),
    { duration: 20000 }
  );
}

export function HotToastChatNotification(chatNotification: IChatNotification, navigate: (path: string) => void) {
  interface ToastInstance {
    id: string;
    visible: boolean;
  }

  toast.custom((t: ToastInstance) => (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full bg-base-100 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-base-300`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            {chatNotification.senderProfile ? (
              <img
                className="w-10 h-10 border rounded-full border-base-300"
                src={chatNotification.senderProfile}
                alt={chatNotification.senderName}
              />
            ) : (
              <div className="flex items-center justify-center w-10 h-10 font-medium rounded-full bg-primary text-primary-content">
                {chatNotification.senderName.substring(0, 2).toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex-1 ml-3">
            <p className="text-sm font-medium">{chatNotification.senderName}</p>
            <p className="mt-1 text-sm text-base-content opacity-70">{chatNotification.content}</p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-base-300">
        <button
          onClick={() => {
            toast.dismiss(t.id);
            navigate(`/chat/${chatNotification.senderId}`);
          }}
          className="flex items-center justify-center w-full p-4 text-sm font-medium border border-transparent rounded-none rounded-r-lg text-primary hover:bg-primary hover:bg-opacity-10 focus:outline-none"
        >
          Reply
        </button>
      </div>
    </div>
  ));
}

export function HotToastSystemNotification(notification: { content: string; timestamp: Date }) {
  interface ToastInstance {
    id: string;
    visible: boolean;
  }

  toast.custom(
    (t: ToastInstance) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-base-300 shadow-lg rounded-lg  border border-primary pointer-events-auto flex ring-1 ring-base-300`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary bg-opacity-20">
                <Bell className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="flex-1 ml-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-base-content">System Notification</p>
                <span className="text-xs text-base-content opacity-70">{dayjs(notification.timestamp).fromNow()}</span>
              </div>
              <p className="mt-1 text-sm text-base-content opacity-80">{notification.content}</p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-base-300">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="flex items-center justify-center w-full p-4 text-sm font-medium border border-transparent rounded-none rounded-r-lg text-primary hover:bg-primary hover:bg-opacity-10 focus:outline-none"
          >
            Dismiss
          </button>
        </div>
      </div>
    ),
    { duration: 20000 }
  );
}

type ToastPromiseMessages = {
  loading: string;
  success: string;
  error: string;
};

type ApiResponse = {
  status: number;
};

export async function HotToastPromise<T extends ApiResponse>(
  promise: Promise<T>,
  messages: ToastPromiseMessages
): Promise<T> {
  return toast.promise(
    promise.then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error(`Request failed with status ${res.status}`);
      }
      return res; // ✅ full response returned
    }),
    {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
    }
  );
}
