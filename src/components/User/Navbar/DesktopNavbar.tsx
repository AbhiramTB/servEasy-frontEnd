import { Link } from 'react-router-dom';
import { Bell, MessageCircle, User, Calendar, LogOut } from 'lucide-react';
import AppLogo from '../../ui/AppLogo';
import Notifications from '../../ui/Notifictions';
import { ISavedNotification } from '../../../utils/types/INotification';
import InitialAvatar from '../../../utils/ui/InitialAvatar';
import { ROUTES } from '../../../utils/constants/routes';

type DesktopNavbarProps = {
  scrolled: boolean;
  mobileMenuOpen: boolean;
  user: any;
  chatNotificationCount: number;
  notificationCount: number;
  showNotifications: boolean;
  notifications: ISavedNotification[];
  handleChatClick: () => void;
  toggleNotifications: () => void;
  setNotificationCount: (v: number) => void;
  setNotifications: React.Dispatch<React.SetStateAction<ISavedNotification[]>>;
  verifyServiceProvider: () => void;
  handleLogOut: () => void;
};

const DesktopNavbar = ({
  scrolled,
  mobileMenuOpen,
  user,
  chatNotificationCount,
  notificationCount,
  showNotifications,
  notifications,
  handleChatClick,
  toggleNotifications,
  setNotificationCount,
  setNotifications,
  verifyServiceProvider,
  handleLogOut,
}: DesktopNavbarProps) => {
  if (mobileMenuOpen) return null;

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex items-center justify-between h-16">
        {/* Logo */}
        <AppLogo to={ROUTES.USER.HOME} />

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          {/* Chat */}
          <div className="relative">
            <button onClick={handleChatClick} className="btn btn-ghost btn-circle hover:bg-base-200">
              <MessageCircle className="w-5 h-5" />
              {chatNotificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full px-2">
                  {chatNotificationCount > 9 ? '9+' : chatNotificationCount}
                </span>
              )}
            </button>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button onClick={toggleNotifications} className="btn btn-ghost btn-circle hover:bg-base-200">
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full px-2">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2">
                <Notifications
                  countMakeitZero={() => setNotificationCount(0)}
                  localNotifications={notifications}
                  setLocalNotifications={setNotifications}
                  decrementUnreadCount={() => setNotificationCount(Math.max(0, notificationCount - 1))}
                />
              </div>
            )}
          </div>

          {user.serviceProvider && (
            <button onClick={verifyServiceProvider} className="btn btn-outline btn-secondary btn-sm">
              Go to Service Dashboard
            </button>
          )}

          {/* Avatar */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-12 rounded-full">
                <InitialAvatar name={user.userName} imageSrc={user.profileImage} />
              </div>
            </div>

            <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-56 border">
              <li>
                <Link to="/myprofile">
                  <User className="w-4 h-4 mr-2" />
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/myprofile/booked-services/">
                  <Calendar className="w-4 h-4 mr-2" />
                  Your Bookings
                </Link>
              </li>
              <li className="border-t mt-2 pt-2">
                <button onClick={handleLogOut} className="text-error flex items-center">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopNavbar;
