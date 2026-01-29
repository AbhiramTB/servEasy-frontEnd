import { useEffect, useRef, useState } from 'react';
import { getSocket } from '../utils/socket';
import { HotToastError } from '../utils/notificationToast';

export const useVideoCall = (
  user1: string,
  user2: string,
  targetRole: 'SERVICE_PROVIDER' | 'USER',
  user: boolean,
  callerName: string,
  callerProfile: string,
  localVideoRef: React.RefObject<HTMLVideoElement | null>,
  remoteVideoRef: React.RefObject<HTMLVideoElement | null>,
  openModal: () => void,
  openErrorModal: (message: string, title: string) => void
) => {
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const socketRef = useRef<ReturnType<typeof getSocket> | null>(null);

  useEffect(() => {
    if (!user1 || !user2) return;

    try {
      socketRef.current = getSocket();
    } catch (error) {
      console.error('Socket not connected yet. Cannot initialize video call.');
      return;
    }

    const socket = socketRef.current;

    const init = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        peerConnection.current = new RTCPeerConnection({
          iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
        });

        stream.getTracks().forEach(track => {
          peerConnection.current?.addTrack(track, stream);
        });

        peerConnection.current.ontrack = event => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
          }
        };

        peerConnection.current.onicecandidate = event => {
          if (event.candidate) {
            socket?.emit('signal', { user1, user2, data: { candidate: event.candidate } });
          }
        };

        socket.emit('join_video_call', { user1, user2, targetRole, callerName, callerProfile, user }, () => {
          console.log('join video call connected');

          socket.on('user-joined', async () => {
            console.log('user joined');

            const offer = await peerConnection.current!.createOffer();
            await peerConnection.current!.setLocalDescription(offer);
            socket.emit('signal', { user1, user2, data: { offer } });
          });
        });

        socket.on('signal', async ({ data }) => {
          if (data.offer) {
            await peerConnection.current!.setRemoteDescription(new RTCSessionDescription(data.offer));
            const answer = await peerConnection.current!.createAnswer();
            await peerConnection.current!.setLocalDescription(answer);
            socket.emit('signal', { user1, user2, data: { answer } });
          } else if (data.answer) {
            await peerConnection.current!.setRemoteDescription(new RTCSessionDescription(data.answer));
          } else if (data.candidate) {
            await peerConnection.current!.addIceCandidate(new RTCIceCandidate(data.candidate));
          }
        });

        socket.on('user-left', () => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = null;
          }
          endCall();
          openModal();
        });
      } catch (err: unknown) {
        if (err instanceof DOMException) {
          if (err.name === 'NotAllowedError') {
            HotToastError('Camera or microphone permission denied');

            openErrorModal(
              'Please allow camera and microphone access in your browser settings to continue the video call.',
              'Permission Required'
            );
          } else if (err.name === 'NotFoundError') {
            HotToastError('No camera or microphone found');

            openErrorModal(
              'We couldn’t detect a camera or microphone on your device. Please connect one and try again.',
              'Device Not Found'
            );
          } else {
            HotToastError(err.message);

            openErrorModal(
              'Something went wrong while accessing your camera or microphone. Please try again.',
              'Video Call Error'
            );
          }
        } else {
          HotToastError('Failed to start video call');

          openErrorModal(
            'The video call could not be started at this moment. Please check your connection and try again.',
            'Connection Error'
          );
        }

        console.error('Failed to initialize video call:', err);
      }
    };

    init();

    return () => {
      endCall();
    };
  }, [user1, user2, localVideoRef, remoteVideoRef]);

  const endCall = () => {
    const socket = socketRef.current;

    if (socket) {
      socket.emit('leave_video_call', { user1, user2 });
      socket.disconnect();
      socketRef.current = null;
    }

    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }

    localStream?.getTracks().forEach(track => track.stop());

    if (peerConnection.current) {
      peerConnection.current.ontrack = null;
      peerConnection.current.onicecandidate = null;
      peerConnection.current.close();
      peerConnection.current = null;
    }

    setLocalStream(null);
  };

  return { localStream, endCall };
};
