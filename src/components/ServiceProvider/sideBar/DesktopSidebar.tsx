import React from 'react';
import { Link, Location } from 'react-router-dom';
import { ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import { ServiceProviderLinks } from '../../../utils/constants/ServiceProviderLinks';
import { HotToastError } from '../../../utils/notificationToast';
import AppLogo from '../../ui/AppLogo';

interface Props {
  profile: string;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (v: boolean) => void;
  toggleNotifications: (e?: React.MouseEvent) => void;
  notificationCount: number;
  location: Location;
  serviceProviderInfo: any;
}

const DesktopSidebar: React.FC<Props> = ({
  profile,
  isSidebarOpen,
  setIsSidebarOpen,
  toggleNotifications,
  notificationCount,
  location,
  serviceProviderInfo,
}) => {
  return (
    <aside
      className={`hidden lg:flex flex-col fixed top-0 left-0 h-screen bg-base-200 border-r border-base-300 transition-all duration-300 z-30 ${
        isSidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div
        className={`flex items-center ${
          isSidebarOpen ? 'justify-between px-4' : 'justify-center'
        } h-16 border-b border-base-300 shrink-0`}
      >
        <div className="flex items-center gap-2">
          {!isSidebarOpen && (
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shrink-0">
              <span className="text-primary-content font-bold text-xl">S</span>
            </div>
          )}
          {isSidebarOpen && <AppLogo />}
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto scrollbar-hide">
        <ul className="menu menu-md p-0 gap-2">
          {ServiceProviderLinks.map(item => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            const locked = item.isPro && !serviceProviderInfo.isProServiceProvider;

            return (
              <li key={item.label} className="tooltip tooltip-right" data-tip={!isSidebarOpen ? item.label : ''}>
                <Link
                  to={item.path}
                  onClick={e => {
                    if (locked) {
                      HotToastError('Upgrade to PRO 👑');
                    }
                    if (item.isNotification) toggleNotifications(e);
                  }}
                  className={`flex items-center gap-4 ${
                    active ? 'active bg-primary' : ''
                  } ${!isSidebarOpen ? 'justify-center px-0' : ''}`}
                >
                  <div className="relative">
                    <Icon size={22} />
                    {item.isNotification && notificationCount > 0 && (
                      <span className="badge badge-error badge-xs absolute -top-1 -right-1"></span>
                    )}
                  </div>
                  {isSidebarOpen && <span className="flex-1">{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-base-300 bg-base-200 p-2 space-y-1 shrink-0">
        <Link
          to="/service-provider/myprofile"
          className={`btn btn-ghost w-full ${isSidebarOpen ? 'justify-start' : 'justify-center'} gap-3 px-2`}
        >
          <div className="avatar">
            <div className="w-8 h-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={profile} alt="profile" />
            </div>
          </div>
          {isSidebarOpen && <span className="text-sm">My Profile</span>}
        </Link>

        <button
          className={`btn btn-ghost btn-sm w-full ${
            isSidebarOpen ? 'justify-start' : 'justify-center'
          } gap-4 text-error`}
          onClick={() => {
            localStorage.removeItem('accessToken');
            window.location.href = '/signin';
          }}
        >
          <LogOut size={20} />
          {isSidebarOpen && <span>Logout</span>}
        </button>

        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="btn btn-ghost btn-xs w-full">
          {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>
    </aside>
  );
};

export default DesktopSidebar;
