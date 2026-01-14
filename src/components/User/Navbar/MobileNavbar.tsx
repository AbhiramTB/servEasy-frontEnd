import { Link, useNavigate } from 'react-router-dom';
import { Bell, Calendar, LogOut, MessageCircle, User } from 'lucide-react';
import Notifications from '../../ui/Notifictions';
import { INotification, ISavedNotification } from '../../../utils/types/INotification';
import InitialAvatar from '../../../utils/ui/InitialAvatar';
import { UserState } from '../../../redux/slices/userSlice';
import AppLogo from '../../ui/AppLogo';
import { ROUTES } from '../../../utils/constants/routes';

type NavbarProps = {
  scrolled: boolean;
  mobileMenuOpen: boolean;
  user: UserState;
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

const Navbar = ({
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
}: NavbarProps) => {
  const serviceProviderLanding = () => {
    navigate(ROUTES.SERVICEPROVIDER.BASE);
  };

  const navigate = useNavigate();
  return (
    <div
      className={`navbar  shadow-sm   fixed  left-0 right-0 z-50 transition-all  duration-300 ${scrolled ? 'bg-base-100/70 shadow-lg ' : 'bg-primary/5 '}  `}
    >
      <div className="navbar-start">
        <div className="dropdown"></div>
      </div>
      <div className="navbar-center">
        <AppLogo to={ROUTES.USER.HOME} />
      </div>

      <div className="navbar-end mr-0  lg:mr-10">
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

        <button className="btn btn-ghost btn-circle" onClick={toggleNotifications}>
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {' '}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />{' '}
            </svg>
            <span className="badge badge-xs badge-primary indicator-item">{notificationCount}</span>
          </div>
        </button>

        <div className="dropdown dropdown-end pl-24">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar md:right-16">
            <div className="w-10 rounded-full">
              <InitialAvatar name={user.userName} imageSrc={user.profileImage} />
            </div>
          </div>

          <ul tabIndex={-1} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <Link to="/myprofile">
                <User className="w-4 h-4 " />
                My Account
              </Link>
            </li>
            <li>
              <Link to="/myprofile/booked-services/">
                <Calendar className="w-4 h-4 " />
                Your Bookings
              </Link>
            </li>
            <li>
              <a
                className="justify-between"
                onClick={user.serviceProvider ? verifyServiceProvider : serviceProviderLanding}
              >
                {user.serviceProvider ? 'Go to Service Dashboard' : 'Become a Service Provider'}
                <span className="badge">New</span>
              </a>
            </li>

            <li className="border-t mt-2 pt-2">
              <button onClick={handleLogOut} className="text-error flex items-center">
                <LogOut className="w-4 h-4 " />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>

      {showNotifications && (
        <div className="absolute right-0 mt-2 z-50">
          <Notifications
            countMakeitZero={() => setNotificationCount(0)}
            localNotifications={notifications}
            setLocalNotifications={setNotifications}
            decrementUnreadCount={() => setNotificationCount(Math.max(0, notificationCount - 1))}
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;
