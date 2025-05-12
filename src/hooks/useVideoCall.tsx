import { useEffect, useRef } from "react";
import { getSocket } from "../utils/socket";

export const useVideoCall = (roomId: string) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const socket = getSocket();

  useEffect(() => {
    const init = async () => {
      // 1. Get User Media
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // 2. Create WebRTC Connection
      peerConnection.current = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });

      // 3. Add tracks
      stream.getTracks().forEach((track) => {
        peerConnection.current?.addTrack(track, stream);
      });

      // 4. Set remote stream
      peerConnection.current.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      // 5. ICE candidate
      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("signal", { roomId, data: { candidate: event.candidate } });
        }
      };

      // 6. Join room
      socket.emit("join", roomId);

      // 7. Handle user joined
      socket.on("user-joined", async () => {
        const offer = await peerConnection.current!.createOffer();
        await peerConnection.current!.setLocalDescription(offer);
        socket.emit("signal", { roomId, data: { offer } });
      });

      // 8. Handle signaling
      socket.on("signal", async ({ data }) => {
        if (data.offer) {
          await peerConnection.current!.setRemoteDescription(new RTCSessionDescription(data.offer));
          const answer = await peerConnection.current!.createAnswer();
          await peerConnection.current!.setLocalDescription(answer);
          socket.emit("signal", { roomId, data: { answer } });
        } else if (data.answer) {
          await peerConnection.current!.setRemoteDescription(new RTCSessionDescription(data.answer));
        } else if (data.candidate) {
          await peerConnection.current!.addIceCandidate(new RTCIceCandidate(data.candidate));
        }
      });

      // 9. Handle user leave
      socket.on("user-left", () => {
        remoteVideoRef.current!.srcObject = null;
      });
    };

    init();

    // 10. Cleanup
    return () => {
      socket.disconnect();
      peerConnection.current?.close();
    };
  }, [roomId]);

  return { localVideoRef, remoteVideoRef };
};
