import React from 'react';
import { Link, Location } from 'react-router-dom';
import { Bell, Menu, X } from 'lucide-react';
import { ServiceProviderLinks } from '../../../utils/constants/ServiceProviderLinks';
import { ROUTES } from '../../../utils/constants/routes';
import AppLogo from '../../ui/AppLogo';

interface Props {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (v: boolean) => void;
  toggleNotifications: () => void;
  bellButtonRef: React.RefObject<HTMLButtonElement | null>;
  notificationCount: number;
  location: Location;
  profile: string;
}

const MobileView: React.FC<Props> = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  toggleNotifications,
  bellButtonRef,
  notificationCount,
  location,
  profile,
}) => {
  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-base-200 border-b border-base-300">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => setIsMobileMenuOpen(true)} className="btn btn-ghost btn-sm p-2">
            <Menu size={22} className="text-base-content" />
          </button>

          <div className="flex items-center gap-2">
            <AppLogo />
          </div>

          <div className="flex items-center gap-2">
            <button
              ref={bellButtonRef}
              onClick={toggleNotifications}
              className="relative btn btn-ghost btn-circle btn-sm hover:bg-base-300"
            >
              <Bell size={22} className="text-base-content" />
              {notificationCount > 0 && <span className="badge badge-error badge-xs absolute top-1.5 right-1.5"></span>}
            </button>

            <Link to={ROUTES.SERVICEPROVIDER.PROFILE}>
              <div className="avatar cursor-pointer">
                <div className="w-9 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100 hover:scale-105 transition">
                  <img src={profile} alt="Profile" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <aside className="fixed top-0 left-0 h-full w-64 bg-base-200 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 py-4 border-b border-base-300">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-content font-bold text-lg">S</span>
                </div>
                <span className="text-base-content font-bold text-lg">ServEasy</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="btn btn-ghost btn-sm btn-circle">
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 px-3 py-4 overflow-y-auto">
              <ul className="menu menu-md w-full p-0 gap-1">
                {ServiceProviderLinks.map(item => (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      className={`${location.pathname === item.path ? 'active bg-primary' : ''}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon size={20} />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
};

export default MobileView;
