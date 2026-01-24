import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const connectSocket = (): Socket => {
  if (!socket) {
    socket = io(import.meta.env.VITE_BACKEND_URL, {
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      console.log('Socket connected ✅:', socket?.id);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected ❌');
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = (): Socket => {
  if (!socket) {
    throw new Error('Socket not connected yet. Call connectSocket() first.');
  }
  return socket;
};

export const isSocketConnected = (): boolean => {
  return socket?.connected ?? false;
};
