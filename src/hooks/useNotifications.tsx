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

import { useEffect } from "react";
import { toast } from "react-toastify";
import { connectSocket, isSocketConnected } from "../utils/socket"; // Assuming socket utilities are defined here

interface NotificationPayload {
  title: string;
  body: string;
  from: string;
  roomId: string;
  createdAt: string;
}

export const useSocketNotifications = (userId: string, onNotify: (notification: NotificationPayload) => void) => {
  useEffect(() => {
    const socket = connectSocket(); // Establish a socket connection when the component mounts

    // Ensure the socket is connected and join a specific room for the user
    if (isSocketConnected()) {
      socket.emit("join_notification", { userId }); // Join the user-specific room
      socket.on("receive_notification", onNotify); // Listen for notifications

    } else {
      socket.once("connect", () => {
        socket.emit("join_notification", { userId }); // Join the user-specific room once connected
        socket.on("receive_notification", onNotify); // Listen for notifications after connection
      });
    }

    // Cleanup the socket listener on unmount
    return () => {
      socket.off("receive_notification", onNotify);
    };
  }, [userId, onNotify]); // Re-run the effect when userId or onNotify changes
};
