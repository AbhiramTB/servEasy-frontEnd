import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '../../../redux/store';
import { useSocketNotifications } from '../../../hooks/useNotifications';
import { HotToastChatNotification, HotToastPromise } from '../../../utils/notificationToast';
import { connectSocket } from '../../../utils/socket';

import MobileView from './MobileView';
import DesktopSidebar from './DesktopSidebar';
import NotificationPanel from './NotificationPanel';

import VideoCallNotification from '../../../utils/ui/VideoCallNotification';
import { ISavedNotification, IVideoCallNotification } from '../../../utils/types/INotification';
import useFetchServiceProviderProfile from '../../../hooks/useFetchServiceProviderProfile';
import { deleteRequest, getRequest, patchRequest } from '../../../utils/makeRequestInstance';
import toast from 'react-hot-toast';

interface SidebarProps {
  profile: string;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (val: boolean) => void;
}

const ringtone = new Audio('/Ringtone Video call.mp3');

const Sidebar: React.FC<SidebarProps> = ({ profile, isSidebarOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const getProfile = useFetchServiceProviderProfile();
  const serviceProviderInfo = useSelector((state: RootState) => state.serviceProvider);

  const notificationRef = useRef<HTMLDivElement>(null);
  const bellButtonRef = useRef<HTMLButtonElement>(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<ISavedNotification[]>([]);
  const [notificationCount, setNotificationCount] = useState(0);

  const [videoCallNotification, setVideoCallNotification] = useState<IVideoCallNotification | null>(null);
  const [acceptFn, setAcceptFn] = useState<(() => void) | null>(null);
  const [rejectFn, setRejectFn] = useState<(() => void) | null>(null);

  const toggleNotifications = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setShowNotifications(prev => !prev);
  };

  const getNotfication = async () => {
    try {
      const res = await getRequest('/service-providers/notification');
      console.log(res);
      setNotifications(res.data.notifications);
      setNotificationCount(res.data.unreadedNotification);
    } catch (error) {
      console.log(error);
    }
  };

  const markAsRead = async (id: string) => {
    const res = await HotToastPromise(patchRequest(`/service-providers/notification/${id}`, {}), {
      loading: 'loading',
      error: 'Could not update notification.',
      success: 'Notification marked as read!',
    });
    if (res.status == 200) {
      decrementUnreadCount();
      setNotifications((prev: ISavedNotification[]) => prev.map(n => (n._id === id ? { ...n, read: true } : n)));
    }
  };

  const decrementUnreadCount = () => {
    setNotificationCount(prev => prev - 1);
  };

  const handleSocketNotification = (notification: any) => {
    if (notification.type === 'video_call') {
      ringtone.currentTime = 0;
      ringtone.play();

      const socket = connectSocket();

      const reject = () => {
        ringtone.pause();
        socket.emit('reject_videoCall', {
          callRoomId: notification.callerId,
          user2: notification.callerId,
        });
      };

      const accept = () => {
        ringtone.pause();
        navigate('/service-provider/video-call/' + notification.callerId);
      };

      setAcceptFn(() => accept);
      setRejectFn(() => reject);
      setVideoCallNotification(notification);
    }

    if (notification.type === 'chat') {
      HotToastChatNotification(notification, () => {});
    }
  };

  useSocketNotifications(serviceProviderInfo.userId, handleSocketNotification);

  useEffect(() => {
    getProfile();
    getNotfication();
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target as Node) &&
        bellButtonRef.current &&
        !bellButtonRef.current.contains(e.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showNotifications]);

  return (
    <>
      <MobileView
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        toggleNotifications={toggleNotifications}
        bellButtonRef={bellButtonRef}
        notificationCount={notificationCount}
        location={location}
        profile={profile}
      />

      <DesktopSidebar
        profile={profile}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        toggleNotifications={toggleNotifications}
        notificationCount={notificationCount}
        location={location}
        serviceProviderInfo={serviceProviderInfo}
      />

      {showNotifications && (
        <NotificationPanel
          ref={notificationRef}
          notifications={notifications}
          notificationCount={notificationCount}
          onClose={() => setShowNotifications(false)}
          onClear={() => setNotifications([])}
          onMarkAsRead={(id: string) => markAsRead(id)}
        />
      )}

      {videoCallNotification && (
        <VideoCallNotification
          videoCallNotification={videoCallNotification}
          onAccept={acceptFn!}
          onReject={rejectFn!}
          onClose={() => setVideoCallNotification(null)}
        />
      )}
    </>
  );
};

export default Sidebar;
