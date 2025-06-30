import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getRequest, putRequest } from '../../utils/makeRequestInstance';
import { addServiceProvider } from '../../redux/slices/serviceProvider';
import { apiEndPointServiceProvider } from '../../utils/constant';
import { MessageSquare, Home, LayoutGrid, Calendar, CreditCard, Bell } from 'lucide-react';
import { useSocketNotifications } from '../../hooks/useNotifications';
import { HotToastChatNotification, HotToastSuccess } from '../../utils/notificationToast';
import toast from 'react-hot-toast';
import { connectSocket } from '../../utils/socket';
import { IVideoCallNotification } from '../../utils/types/INotification';
import VideoCallNotification from '../../utils/ui/VideoCallNotification';

const ringtune = new Audio('/Ringtone Video call.mp3');

interface NavbarProps {
  profile: string;
}

const Navbar: React.FC<NavbarProps> = ({ profile }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const serviceProviderInfo = useSelector((state: RootState) => state.serviceProvider);
  const dispatch = useDispatch();
  const [isOnDuty, setIsOnDuty] = useState(true);

  const toggleStatus = () => {
    setIsOnDuty(prev => !prev);
  };

  const [videoCallNotification, setVideoCallNotification] = useState<IVideoCallNotification | null>(null);
  const [rejectFn, setRejectFn] = useState<() => void>(() => () => {});
  const [acceptFn, setAcceptFn] = useState<() => void>(() => () => {});

  const navigate = useNavigate();

  const handleOnDutty = async () => {
    try {
      const res = await putRequest(apiEndPointServiceProvider.makeActiveAllservice + serviceProviderInfo._id, {});

      if (res.status === 200) {
        toggleStatus();
        HotToastSuccess('Service Provider is now On Duty');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOffDutty = async () => {
    try {
      const res = await putRequest(apiEndPointServiceProvider.makeInactiveAllService + serviceProviderInfo._id, {});

      if (res.status === 200) {
        toggleStatus();
        HotToastSuccess('Service Provider is now Off Duty');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getServiceProvider();
  }, []);

  const getServiceProvider = async () => {
    try {
      const res = await getRequest(apiEndPointServiceProvider.getServiceProvider);

      dispatch(addServiceProvider(res.data.serviceProvider));
    } catch (error) {
      console.error('Error fetching service provider:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNotification = (notification: any) => {
    console.log(notification);
    console.log('notification', notification);

    if (notification.type === 'video_call') {
      console.log('Expected video call path:', `/video-call/${notification.callerId}`);
      console.log('Expected service provider path:', `/service-provider/video-call/${notification.callerId}`);
      console.log('Actual receiverId:', notification.callerId);

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
          navigate('/service-provider/video-call/' + +notification.callerId);
        }
      };

      setAcceptFn(() => acceptCall);

      if (!videoCallNotification) {
        setVideoCallNotification(notification);
      }

      // HotToastVideoCall(notification, () => {}, handleReject);

      return;
    } else if (notification.type === 'chat') {
      HotToastChatNotification(notification, () => {});
      toast.dismiss();
    }
  };

  useSocketNotifications(serviceProviderInfo.userId, handleNotification);

  return (
    <div className="sticky top-0 z-40">
      <div className="shadow-lg navbar bg-primary">
        <div className="navbar-start">
          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              className="btn btn-ghost btn-circle text-primary-content hover:bg-primary-focus"
              onClick={toggleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Logo */}
          <Link to="/">
            <div className="flex items-center gap-2 font-serif text-xl btn btn-ghost text-primary-content">
              <p className="font-bold">ServEasy</p>
            </div>
          </Link>
        </div>

        {/* Desktop menu */}
        {serviceProviderInfo.isVerified === 'verified' && serviceProviderInfo.isBlocked === false && (
          <div className="hidden navbar-center text-primary-content lg:flex">
            <ul className="px-1 menu menu-horizontal">
              <li>
                <Link
                  to="/service-provider/dashboard"
                  className="flex items-center gap-2 font-medium hover:bg-primary-focus"
                >
                  <Home size={18} />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/service-provider/service-management"
                  className="flex items-center gap-2 font-medium hover:bg-primary-focus"
                >
                  <LayoutGrid size={18} />
                  <span>Service Management</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/service-provider/booked-services"
                  className="flex items-center gap-2 font-medium hover:bg-primary-focus"
                >
                  <Calendar size={18} />
                  <span>Booking</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/service-provider/payment-management"
                  className="flex items-center gap-2 font-medium hover:bg-primary-focus"
                >
                  <CreditCard size={18} />
                  <span>Payment Management</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/service-provider/chats"
                  className="flex items-center gap-2 font-medium hover:bg-primary-focus"
                >
                  <MessageSquare size={18} />
                  <span>Messages</span>
                </Link>
              </li>
            </ul>
            <div className="flex items-center gap-3 ml-4">
              <span className="font-semibold text-white">{isOnDuty ? 'On Duty' : 'On Leave'}</span>

              {isOnDuty ? (
                <button onClick={handleOffDutty} className="btn btn-sm btn-error">
                  Go on Leave
                </button>
              ) : (
                <button onClick={handleOnDutty} className="btn btn-sm btn-success">
                  Go On Duty
                </button>
              )}
            </div>
          </div>
        )}

        {videoCallNotification && (
          <VideoCallNotification
            onAccept={() => acceptFn()}
            onReject={() => rejectFn()}
            videoCallNotification={videoCallNotification}
            onClose={() => setVideoCallNotification(null)}
          />
        )}

        {serviceProviderInfo.isVerified === 'verified' && serviceProviderInfo.isBlocked === false && (
          <div className="navbar-end">
            <div className="flex items-center mr-2 lg:hidden">
              <Link
                to="/service-provider/chats"
                className="relative btn btn-circle btn-ghost text-primary-content hover:bg-primary-focus"
              >
                <MessageSquare size={24} />
                <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs text-white rounded-full bg-accent">
                  3
                </span>
              </Link>
              <Link
                to="/service-provider/notifications"
                className="relative ml-1 btn btn-circle btn-ghost text-primary-content hover:bg-primary-focus"
              >
                <Bell size={24} />
                <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs text-white rounded-full bg-secondary">
                  5
                </span>
              </Link>
            </div>

            <div className="dropdown dropdown-end">
              <button tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full md:w-12 lg:w-16">
                  <img alt="Profile Image" src={profile} />
                </div>
              </button>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
              >
                <li>
                  <Link to="myprofile">
                    <button className="w-full text-left">My profile</button>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      localStorage.removeItem('accessToken');
                      window.location.href = '/signin';
                    }}
                    className="w-full text-left"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="shadow-lg lg:hidden bg-primary">
          <ul className="w-full px-4 py-2 menu menu-vertical text-primary-content">
            <li>
              <Link
                to="/service-provider/dashboard"
                className="flex items-center gap-3 py-2 font-medium rounded-lg hover:bg-primary-focus"
              >
                <Home size={20} />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/service-provider/service-management"
                className="flex items-center gap-3 py-2 font-medium rounded-lg hover:bg-primary-focus"
              >
                <LayoutGrid size={20} />
                <span>Service Management</span>
              </Link>
            </li>
            <li>
              <Link
                to="/service-provider/booked-services"
                className="flex items-center gap-3 py-2 font-medium rounded-lg hover:bg-primary-focus"
              >
                <Calendar size={20} />
                <span>Booking</span>
              </Link>
            </li>
            <li>
              <Link
                to="/service-provider/payment-management"
                className="flex items-center gap-3 py-2 font-medium rounded-lg hover:bg-primary-focus"
              >
                <CreditCard size={20} />
                <span>Payment Management</span>
              </Link>
            </li>
            <li>
              <Link
                to="/service-provider/chats"
                className="flex items-center gap-3 py-2 font-medium rounded-lg hover:bg-primary-focus"
              >
                <MessageSquare size={20} />
                <span>Messages</span>
                <span className="px-2 py-1 ml-auto text-xs text-white rounded-full bg-accent">3</span>
              </Link>
            </li>
            <li>
              <Link
                to="/service-provider/notifications"
                className="flex items-center gap-3 py-2 font-medium rounded-lg hover:bg-primary-focus"
              >
                <Bell size={20} />
                <span>Notifications</span>
                <span className="px-2 py-1 ml-auto text-xs text-white rounded-full bg-secondary">5</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
