import { useEffect } from "react";
import { toast } from "react-toastify";
import { connectSocket } from "../utils/socket";

interface NotificationPayload {
  title: string;
  body: string;
  from: string;
  roomId: string;
  createdAt: string;
}

export const useSocketNotifications = () => {
  useEffect(() => {
    const socket = connectSocket(); // ✅ define here

    const handleNotification = (data: NotificationPayload) => {
      console.log("Notification received:", data);
      alert('notification')
      toast.info(`${data.title}: ${data.body}`, {
        position: "top-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
      });
    };

    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification); // ✅ cleanup
    };
  }, []); // ✅ only once on mount
};
