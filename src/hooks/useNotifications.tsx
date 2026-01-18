// import { useEffect } from "react";
// import { getSocket } from "../utils/socket";
// export const useNotifications = (userId: string, onNotify: (notification: any) => void) => {
//   useEffect(() => {
//     if (!userId) return;
//    let socket=getSocket()
//     socket.emit("join_notification", { userId });

//     socket.on("receive_notification", onNotify);

//     return () => {
//       socket.off("receive_notification", onNotify);
//     };
//   }, [userId, onNotify]);
// };

import { useEffect } from 'react';
import { connectSocket, isSocketConnected } from '../utils/socket'; // Assuming socket utilities are defined here

interface NotificationPayload {
  title: string;
  body: string;
  from: string;
  roomId: string;
  createdAt: string;
}

export const useSocketNotifications = (userId: string, onNotify: (notification: NotificationPayload) => void) => {
  useEffect(() => {
    const socket = connectSocket();

    if (isSocketConnected()) {
      socket.emit('join_notification', { userId });
      socket.on('receive_notification', onNotify);
    } else {
      socket.once('connect', () => {
        socket.emit('join_notification', { userId });
        socket.on('receive_notification', onNotify);
      });
    }

    // Cleanup the socket listener on unmount
    return () => {
      socket.off('receive_notification', onNotify);
    };
  }, [userId, onNotify]);
};
