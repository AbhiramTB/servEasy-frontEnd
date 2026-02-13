import React, { useEffect, useState } from 'react';
import { getRequest } from '../../utils/makeRequestInstance';
import { apiEndPoint, apiEndPointServiceProvider } from '../../utils/constant';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate, useLocation } from 'react-router-dom';
import { HotToastChatNotification, HotToastSuccess, HotToastSystemNotification } from '../../utils/notificationToast';
import { useSocketNotifications } from '../../hooks/useNotifications';
import toast from 'react-hot-toast';
import { ISavedNotification, IVideoCallNotification } from '../../utils/types/INotification';
import { connectSocket } from '../../utils/socket';
import VideoCallNotification from '../../utils/ui/VideoCallNotification';
import { useFetchUserProfile } from '../../hooks/useFetchUserProfile';
import { useTheme } from '../../hooks/useTheme';
import MobileBottomNav from './MobileBottomNav';
import TopBar from './Navbar/Topbar';
import { ROUTES } from '../../utils/constants/routes';
import ConfirmModal from '../ui/modal/ConfirmModal';

const ringtune = new Audio('/Ringtone Video call.mp3');
const notificationRingtone = new Audio('/sounds/notification.mp3');

interface IProp {
  scrolled: boolean;
}
const Navbar: React.FC<IProp> = ({ scrolled }) => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<ISavedNotification[] | []>([]);
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const [chatNotificationCount, setChatNotificationCount] = useState<number>(0);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [videoCallNotification, setVideoCallNotification] = useState<IVideoCallNotification | null>(null);
  const [rejectFn, setRejectFn] = useState<() => void>(() => () => {});
  const [acceptFn, setAcceptFn] = useState<() => void>(() => () => {});
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useTheme();

  useEffect(() => {
    setChatNotificationCount(parseInt(localStorage.getItem('chatNotificationCount') || '0'));
  }, []);

  const location = useLocation();
  const [pathUrl, setPathUrl] = useState(location.pathname);
  useFetchUserProfile();

  useEffect(() => {
    setPathUrl(location.pathname);
  }, [location.pathname]);

  const handleNotification = (notification: any) => {
    if (notification.targetRole === 'USER') {
      console.log('Received Notification:', notification);

      if (notification.type === 'video_call') {
        ringtune.currentTime = 0;
        ringtune.play();

        const socket = connectSocket();
        toast.dismiss();

        const handleReject = () => {
          ringtune.currentTime = 0;
          ringtune.pause();
          socket.emit('reject_videoCall', {
            callRoomId: notification.callerId,
            user2: notification.callerId,
          });
        };

        setRejectFn(() => handleReject);

        const acceptCall = () => {
          ringtune.pause();
          ringtune.currentTime = 0;
          if (notification.user) {
            navigate('/video-call/' + notification.callerId);
          } else {
            navigate('/service-provider/video-call/' + notification.callerId);
          }
        };

        setAcceptFn(() => acceptCall);

        if (!videoCallNotification) {
          setVideoCallNotification(notification);
        }

        return;
      } else if (notification.type === 'notification') {
        notificationRingtone.currentTime = 0;
        notificationRingtone.play();
        toast.dismiss();

        HotToastSystemNotification(notification);
        getNotfication();
        toast.dismiss();
      } else if (notification.type === 'chat') {
        if (pathUrl == '/chats') {
          setChatNotificationCount(0);
          localStorage.setItem('chatNotificationCount', chatNotificationCount + 0 + '');
        }

        if (pathUrl !== '/chats') {
          setChatNotificationCount(chatNotificationCount + 1);
          localStorage.setItem('chatNotificationCount', chatNotificationCount + 1 + '');
        }

        notificationRingtone.currentTime = 0;
        notificationRingtone.play();

        HotToastChatNotification(notification, () => {
          navigate('/chat/' + notification.senderId);
          setChatNotificationCount(0);
        });
        toast.dismiss();
      }
    }
  };

  useSocketNotifications(user._id + '', handleNotification);

  useEffect(() => {
    getNotfication();
    // const handleScroll = () => {
    //   if (window.scrollY > 20) {
    //     setScrolled(true);
    //   } else {
    //     setScrolled(false);
    //   }
    // };

    // window.addEventListener('scroll', handleScroll);
    // return () => {
    //   window.removeEventListener('scroll', handleScroll);
    // };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setMobileMenuOpen(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getNotfication = async () => {
    try {
      const res = await getRequest('/notification');
      setNotifications(res.data.notifications);
      setNotificationCount(res.data.unreadCount);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogOut = async () => {
    try {
      const res = await getRequest(apiEndPoint.logOutUser);
      if (res.status === 200) {
        localStorage.removeItem('accessToken');
        window.location.replace(ROUTES.USER.ROOT);
      } else {
        console.error('Logout failed:', res.data.message);
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const verifyServiceProvider = async () => {
    try {
      const res = await getRequest(apiEndPointServiceProvider.verifyServiceProvider);
      if (res.status === 200) {
        HotToastSuccess('login successful');
        navigate('/service-provider/dashboard');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleChatClick = () => {
    setChatNotificationCount(0);
    navigate('/chats');
  };

  return (
    <div className="bg-hex-pattern">
      <div>
        <nav>
          <TopBar
            chatNotificationCount={chatNotificationCount}
            handleChatClick={handleChatClick}
            handleLogOut={() => setShowLogoutModal(true)}
            mobileMenuOpen={mobileMenuOpen}
            notificationCount={notificationCount}
            notifications={notifications}
            scrolled={scrolled}
            setNotificationCount={setNotificationCount}
            setNotifications={setNotifications}
            showNotifications={showNotifications}
            toggleNotifications={toggleNotifications}
            user={user}
            verifyServiceProvider={verifyServiceProvider}
          />

          {/* Top bar for mobile view */}
          {/* <MobileNavbar
            chatNotificationCount={chatNotificationCount}
            handleChatClick={handleChatClick}
            handleLogOut={handleLogOut}
            mobileMenuOpen={mobileMenuOpen}
            notificationCount={notificationCount}
            notifications={notifications}
            scrolled={scrolled}
            setNotificationCount={setNotificationCount}
            setNotifications={setNotifications}
            showNotifications={showNotifications}
            toggleNotifications={toggleNotifications}
            user={user}
            verifyServiceProvider={verifyServiceProvider}
          /> */}

          {/* <MobileNavbar
            handleLogOut={handleLogOut}
            notificationCount={notificationCount}
            notifications={notifications}
            setNotificationCount={setNotificationCount}
            setNotifications={setNotifications}
            showNotifications={showNotifications}
            toggleNotifications={toggleNotifications}
            user={user}
            verifyServiceProvider={verifyServiceProvider}
            key={'dfdf'}
          /> */}

          {mobileMenuOpen && <MobileBottomNav chatCount={chatNotificationCount} />}
        </nav>

        {/* Video Call Notification */}
        {videoCallNotification && (
          <VideoCallNotification
            onAccept={() => acceptFn()}
            onReject={() => rejectFn()}
            videoCallNotification={videoCallNotification}
            onClose={() => setVideoCallNotification(null)}
          />
        )}

        <ConfirmModal
          isOpen={showLogoutModal}
          title="Log Out?"
          message="Are you sure you want to log out? You can sign back in anytime to continue using the app."
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogOut}
          cancelText="No"
          confirmText="Yes, Log Out"
        />

        {/* Spacer for fixed navbar */}
        <div className="h-16"></div>
      </div>
    </div>
  );
};

export default Navbar;
