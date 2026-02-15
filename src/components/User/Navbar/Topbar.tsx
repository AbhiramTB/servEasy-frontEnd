import { Link, useNavigate } from 'react-router-dom';
import { Bell, Calendar, Home, LogOut, MessageCircle, User } from 'lucide-react';
import Notifications from '../../ui/Notifictions';
import { ISavedNotification } from '../../../utils/types/INotification';
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
    navigate(ROUTES.SERVICEPROVIDER.ROOT + '/' + ROUTES.SERVICEPROVIDER.DASHBOARD);
  };

  const tabs = [
    { icon: <Home />, label: 'Home', path: ROUTES.USER.HOME },
    // {
    //   label: 'Chats',
    //   path: '/chats',
    //   // badge: chatCount,
    // },
    {
      label: 'Bookings',
      path: '/myprofile/booked-services/',
    },

    {
      label: 'Apperance',
      path: '/myprofile/appearance',
    },
    {
      icon: <User size={20} />,
      label: 'Profile',
      path: '/myprofile',
    },
  ];

  const navigate = useNavigate();
  return (
    <div
      className={`navbar  shadow-sm   fixed  left-0 right-0 z-50 transition-all  duration-300 ${scrolled ? 'bg-base-100/70 shadow-lg ' : 'bg-primary/5 '}  `}
    >
      <div className="navbar-start">
        <div className="dropdown"></div>
      </div>
      <div className="navbar-center   ">
        <AppLogo to={ROUTES.USER.HOME} />
      </div>

      <div className="navbar-end mr-0 ml-0 md:ml-56 lg:ml-0 lg:mr-10">
        {!mobileMenuOpen && (
          <div className="flex items-center gap-4 ml-5  mr-5 ">
            {tabs.map(i => (
              <Link
                key={i.path}
                to={i.path}
                className=" font-medium text-base-content hover:text-primary transition-colors hover:underline  whitespace-nowrap"
              >
                <span className="px-2 py-1">{i.label}</span>
              </Link>
            ))}
          </div>
        )}

        {!mobileMenuOpen && (
          <div className="relative hidden md:flex">
            <button onClick={handleChatClick} className="btn btn-ghost btn-circle">
              <MessageCircle className="w-5 h-5" />
              {chatNotificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full px-2">
                  {chatNotificationCount > 9 ? '9+' : chatNotificationCount}
                </span>
              )}
            </button>
          </div>
        )}

        <button className="btn btn-ghost btn-circle" onClick={toggleNotifications}>
          <div className="indicator">
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <span className="badge badge-xs badge-primary indicator-item">{notificationCount}</span>
            )}
          </div>
        </button>

        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle ">
            {/* <div className="w-9 rounded-full"> */}
            <InitialAvatar name={user.userName} imageSrc={user.profileImage} />
            {/* </div> */}
          </div>

          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 w-52 rounded-box bg-base-100 p-2 shadow z-50">
            <li>
              <Link to="/myprofile">
                <User className="w-4 h-4" />
                My Account
              </Link>
            </li>

            <li>
              <Link to="/myprofile/booked-services">
                <Calendar className="w-4 h-4" />
                Your Bookings
              </Link>
            </li>

            <li>
              <button
                onClick={user.serviceProvider ? verifyServiceProvider : serviceProviderLanding}
                className="justify-between"
              >
                {user.serviceProvider ? 'Go to Service Dashboard' : 'Become a Service Provider'}
                <span className="badge">New</span>
              </button>
            </li>

            <li className="border-t mt-2 pt-2">
              <button onClick={handleLogOut} className="text-error flex items-center gap-2">
                <LogOut className="w-4 h-4" />
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
