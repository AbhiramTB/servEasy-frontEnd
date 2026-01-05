import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {
  Home,
  LayoutGrid,
  Calendar,
  CreditCard,
  MessageSquare,
  Bell,
  Wallet,
  Crown,
  Menu,
  X,
  LogOut,
  User,
  Clock,
  Sparkles,
  Megaphone,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import { RootState } from '../../redux/store';
import { putRequest } from '../../utils/makeRequestInstance';
import { apiEndPointServiceProvider } from '../../utils/constant';
import { useSocketNotifications } from '../../hooks/useNotifications';
import { HotToastChatNotification, HotToastSuccess } from '../../utils/notificationToast';
import { connectSocket } from '../../utils/socket';
import VideoCallNotification from '../../utils/ui/VideoCallNotification';
import useFetchServiceProviderProfile from '../../hooks/useFetchServiceProviderProfile';
import { ISavedNotification, IVideoCallNotification } from '../../utils/types/INotification';
import Notifications from '../ui/Notifictions';

interface NavItem {
  label: string;
  path: string;
  icon: any;
  isPro?: boolean;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/service-provider/dashboard', icon: Home },
  { label: 'Services', path: '/service-provider/service-management', icon: LayoutGrid },
  { label: 'Bookings', path: '/service-provider/booked-services', icon: Calendar },
  { label: 'Payments', path: '/service-provider/payment-management', icon: CreditCard },
  { label: 'Wallet', path: '/service-provider/wallet', icon: Wallet },
  { label: 'Messages', path: '/service-provider/chats', icon: MessageSquare },
  { label: 'AI Assistant', path: '/service-provider/assistance', icon: Sparkles, isPro: true, badge: 'PRO' },
  { label: 'Advertisements', path: '/service-provider/ads', icon: Megaphone, isPro: true, badge: 'PRO' },
  { label: 'Time Slots', path: '/service-provider/slot-management', icon: Clock },
];

const ringtune = new Audio('/Ringtone Video call.mp3');

interface SidebarProps {
  profile: string;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (val: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ profile, isSidebarOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const serviceProviderInfo = useSelector((state: RootState) => state.serviceProvider);

  // const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOnDuty, setIsOnDuty] = useState(true);

  const [videoCallNotification, setVideoCallNotification] = useState<IVideoCallNotification | null>(null);
  const [rejectFn, setRejectFn] = useState<(() => void) | null>(null);
  const [acceptFn, setAcceptFn] = useState<(() => void) | null>(null);
  const [notifications, setNotifications] = useState<ISavedNotification[] | []>([]);
  const [notificationCount, setNotificationCount] = useState<number>(4);
  const [chatNotificationCount, setChatNotificationCount] = useState<number>(0);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const getServiceProvider = useFetchServiceProviderProfile();

  const toggleStatus = () => setIsOnDuty(prev => !prev);

  const handleOnDutty = async () => {
    const res = await putRequest(apiEndPointServiceProvider.makeActiveAllservice + serviceProviderInfo._id, {});
    if (res.status === 200) {
      toggleStatus();
      HotToastSuccess('Service Provider is now On Duty');
    }
  };

  const handleOffDutty = async () => {
    const res = await putRequest(apiEndPointServiceProvider.makeInactiveAllService + serviceProviderInfo._id, {});
    if (res.status === 200) {
      toggleStatus();
      HotToastSuccess('Service Provider is now Off Duty');
    }
  };

  const handleNotification = (notification: any) => {
    if (notification.type === 'video_call') {
      ringtune.currentTime = 0;
      ringtune.play();

      const socket = connectSocket();
      toast.dismiss();

      const reject = () => {
        ringtune.pause();
        socket.emit('reject_videoCall', {
          callRoomId: notification.callerId,
          user2: notification.callerId,
        });
      };

      const accept = () => {
        ringtune.pause();
        navigate('/service-provider/video-call/' + notification.callerId);
      };

      setRejectFn(() => reject);
      setAcceptFn(() => accept);
      setVideoCallNotification(notification);
    }

    if (notification.type === 'chat') {
      HotToastChatNotification(notification, () => {});
      toast.dismiss();
    }
  };

  useSocketNotifications(serviceProviderInfo.userId, handleNotification);

  useEffect(() => {
    getServiceProvider();
  }, []);

  const canShow = serviceProviderInfo.isVerified === 'verified' && serviceProviderInfo.isBlocked === false;

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-primary shadow-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="btn btn-ghost btn-sm text-primary-content"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link to="/" className="text-xl font-bold text-primary-content">
            ServEasy
          </Link>

          <div className="flex items-center gap-2">
            <Link
              to="/service-provider/chats"
              className="btn btn-ghost btn-sm btn-circle text-primary-content relative"
            >
              <MessageSquare size={20} />
              {chatNotificationCount > 0 && (
                <span className="absolute -top-1 -right-1 badge badge-error badge-xs">{chatNotificationCount}</span>
              )}
            </Link>
            <button
              onClick={() => setShowNotifications(prev => !prev)}
              className="btn btn-ghost btn-sm btn-circle text-primary-content relative"
            >
              <Bell size={20} />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 badge badge-error badge-xs">{notificationCount}</span>
              )}
            </button>
          </div>
        </div>

        {showNotifications && (
          <div className="fixed top-16 right-0 left-0 z-[100] bg-base-100 shadow-2xl border-t border-base-300 max-h-[80vh] overflow-hidden">
            <Notifications
              countMakeitZero={() => setNotificationCount(0)}
              localNotifications={notifications}
              setLocalNotifications={setNotifications}
              decrementUnreadCount={() => setNotificationCount(prev => Math.max(0, prev - 1))}
            />
          </div>
        )}
      </div>

      {canShow && (
        <aside
          className={`hidden lg:flex fixed top-0 left-0 h-screen bg-base-200 shadow-xl transition-all duration-300 z-40 flex-col ${
            isSidebarOpen ? 'w-64' : 'w-20'
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-base-300 bg-base-100">
            {isSidebarOpen && (
              <Link to="/" className="text-2xl font-bold text-primary">
                ServEasy
              </Link>
            )}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="btn btn-ghost btn-sm btn-circle ml-auto hover:bg-base-300"
            >
              {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          </div>

          {isSidebarOpen && (
            <div className="px-4 pt-4 relative">
              <button
                onClick={() => setShowNotifications(prev => !prev)}
                className="btn btn-ghost btn-sm w-full justify-start gap-3 hover:bg-base-300"
              >
                <Bell size={20} />
                <span>Notifications</span>
                {notificationCount > 0 && (
                  <span className="badge badge-error badge-sm ml-auto">{notificationCount}</span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute left-full top-0 ml-2 z-[100] w-96 bg-base-100 rounded-lg shadow-2xl border border-base-300 max-h-[600px] overflow-hidden">
                  <div className="sticky top-0 bg-base-200 px-4 py-3 border-b border-base-300 flex items-center justify-between">
                    <h3 className="font-semibold text-base-content">Notifications</h3>
                    <button onClick={() => setShowNotifications(false)} className="btn btn-ghost btn-xs btn-circle">
                      <X size={16} />
                    </button>
                  </div>
                  <Notifications
                    countMakeitZero={() => setNotificationCount(0)}
                    localNotifications={notifications}
                    setLocalNotifications={setNotifications}
                    decrementUnreadCount={() => setNotificationCount(prev => Math.max(0, prev - 1))}
                  />
                </div>
              )}
            </div>
          )}

          {!isSidebarOpen && (
            <div className="px-2 pt-4">
              <button
                onClick={() => setShowNotifications(prev => !prev)}
                className="btn btn-ghost btn-sm btn-circle mx-auto relative hover:bg-base-300"
              >
                <Bell size={20} />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 badge badge-error badge-xs">{notificationCount}</span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute left-full top-20 ml-2 z-[100] w-96 bg-base-100 rounded-lg shadow-2xl border border-base-300 max-h-[600px] overflow-hidden">
                  <div className="sticky top-0 bg-base-200 px-4 py-3 border-b border-base-300 flex items-center justify-between">
                    <h3 className="font-semibold text-base-content">Notifications</h3>
                    <button onClick={() => setShowNotifications(false)} className="btn btn-ghost btn-xs btn-circle">
                      <X size={16} />
                    </button>
                  </div>
                  <Notifications
                    countMakeitZero={() => setNotificationCount(0)}
                    localNotifications={notifications}
                    setLocalNotifications={setNotifications}
                    decrementUnreadCount={() => setNotificationCount(prev => Math.max(0, prev - 1))}
                  />
                </div>
              )}
            </div>
          )}

          <div className="p-4 border-b border-base-300">
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="relative w-12 rounded-full ring ring-primary ring-offset-base-200 ring-offset-2">
                  <img src={profile} alt="Profile" />
                  {serviceProviderInfo.isProServiceProvider && (
                    <span className="absolute -bottom-1 -right-1 bg-warning rounded-full p-1">
                      <Crown size={12} className="text-warning-content" />
                    </span>
                  )}
                </div>
              </div>
              {isSidebarOpen && (
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate text-base-content">
                    {serviceProviderInfo.serviceProviderName || 'Provider'}
                  </p>
                  <p className="text-xs text-base-content/60 truncate">{serviceProviderInfo.serviceProviderEmail}</p>
                </div>
              )}
            </div>

            {isSidebarOpen && (
              <div className="mt-4 p-3 bg-base-100 rounded-lg border border-base-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-base-content">Status</span>
                  <span className={`badge badge-sm ${isOnDuty ? 'badge-success' : 'badge-error'}`}>
                    {isOnDuty ? 'On Duty' : 'On Leave'}
                  </span>
                </div>
                {isOnDuty ? (
                  <button onClick={handleOffDutty} className="btn btn-error btn-sm w-full">
                    Go on Leave
                  </button>
                ) : (
                  <button onClick={handleOnDutty} className="btn btn-success btn-sm w-full">
                    Go On Duty
                  </button>
                )}
              </div>
            )}
          </div>

          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="menu menu-vertical gap-1">
              {NAV_ITEMS.map(({ label, path, icon: Icon, isPro, badge }) => {
                const active = isActive(path);
                const isLocked = isPro && !serviceProviderInfo.isProServiceProvider;

                return (
                  <li key={path}>
                    <Link
                      to={isLocked ? '#' : path}
                      className={`flex items-center gap-3 rounded-lg transition-colors ${
                        active ? 'bg-primary text-primary-content' : 'hover:bg-base-300 text-base-content'
                      } ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={e => {
                        if (isLocked) {
                          e.preventDefault();
                          toast('Upgrade to PRO to access this feature', { icon: '👑' });
                        }
                      }}
                    >
                      <Icon size={20} />
                      {isSidebarOpen && (
                        <>
                          <span className="flex-1">{label}</span>
                          {badge && (
                            <span className="badge badge-warning badge-sm gap-1">
                              <Crown size={10} />
                              {badge}
                            </span>
                          )}
                          {isLocked && <Crown size={16} className="text-warning" />}
                        </>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="p-4 border-t border-base-300 bg-base-100">
            <ul className="menu menu-vertical gap-1">
              <li>
                <Link
                  to="/service-provider/myprofile"
                  className="flex items-center gap-3 hover:bg-base-300 text-base-content rounded-lg"
                >
                  <User size={20} />
                  {isSidebarOpen && <span>My Profile</span>}
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    localStorage.removeItem('accessToken');
                    window.location.href = '/signin';
                  }}
                  className="flex items-center gap-3 text-error hover:bg-error/10 rounded-lg"
                >
                  <LogOut size={20} />
                  {isSidebarOpen && <span>Logout</span>}
                </button>
              </li>
            </ul>
          </div>
        </aside>
      )}

      {isMobileMenuOpen && canShow && (
        <>
          <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsMobileMenuOpen(false)} />
          <aside className="lg:hidden fixed top-0 left-0 h-screen w-80 bg-base-200 shadow-xl z-50 flex flex-col animate-slide-in-left">
            <div className="p-4 border-b border-base-300 mt-16 bg-base-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="avatar">
                  <div className="relative w-16 rounded-full ring ring-primary ring-offset-base-200 ring-offset-2">
                    <img src={profile} alt="Profile" />
                    {serviceProviderInfo.isProServiceProvider && (
                      <span className="absolute -bottom-1 -right-1 bg-warning rounded-full p-1.5">
                        <Crown size={14} className="text-warning-content" />
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate text-base-content">
                    {serviceProviderInfo.serviceProviderName || 'Provider'}
                  </p>
                  <p className="text-sm text-base-content/60 truncate">{serviceProviderInfo.serviceProviderEmail}</p>
                </div>
              </div>

              <div className="p-3 bg-base-200 rounded-lg border border-base-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-base-content">Status</span>
                  <span className={`badge ${isOnDuty ? 'badge-success' : 'badge-error'}`}>
                    {isOnDuty ? 'On Duty' : 'On Leave'}
                  </span>
                </div>
                {isOnDuty ? (
                  <button onClick={handleOffDutty} className="btn btn-error btn-sm w-full">
                    Go on Leave
                  </button>
                ) : (
                  <button onClick={handleOnDutty} className="btn btn-success btn-sm w-full">
                    Go On Duty
                  </button>
                )}
              </div>
            </div>

            <nav className="flex-1 overflow-y-auto p-4">
              <ul className="menu menu-vertical gap-1">
                {NAV_ITEMS.map(({ label, path, icon: Icon, isPro, badge }) => {
                  const active = isActive(path);
                  const isLocked = isPro && !serviceProviderInfo.isProServiceProvider;

                  return (
                    <li key={path}>
                      <Link
                        to={isLocked ? '#' : path}
                        className={`flex items-center gap-3 rounded-lg transition-colors ${
                          active ? 'bg-primary text-primary-content' : 'hover:bg-base-300 text-base-content'
                        } ${isLocked ? 'opacity-50' : ''}`}
                        onClick={e => {
                          if (isLocked) {
                            e.preventDefault();
                            toast('Upgrade to PRO to access this feature', { icon: '👑' });
                          } else {
                            setIsMobileMenuOpen(false);
                          }
                        }}
                      >
                        <Icon size={20} />
                        <span className="flex-1">{label}</span>
                        {badge && (
                          <span className="badge badge-warning badge-sm gap-1">
                            <Crown size={10} />
                            {badge}
                          </span>
                        )}
                        {isLocked && <Crown size={16} className="text-warning" />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="p-4 border-t border-base-300 bg-base-100">
              <ul className="menu menu-vertical gap-1">
                <li>
                  <Link
                    to="/service-provider/myprofile"
                    className="flex items-center gap-3 hover:bg-base-300 text-base-content rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User size={20} />
                    <span>My Profile</span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      localStorage.removeItem('accessToken');
                      window.location.href = '/signin';
                    }}
                    className="flex items-center gap-3 text-error hover:bg-error/10 rounded-lg"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          </aside>
        </>
      )}

      {videoCallNotification && (
        <VideoCallNotification
          videoCallNotification={videoCallNotification}
          onAccept={acceptFn!}
          onReject={rejectFn!}
          onClose={() => setVideoCallNotification(null)}
        />
      )}

      <style>{`
        @keyframes slide-in-left {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Sidebar;
