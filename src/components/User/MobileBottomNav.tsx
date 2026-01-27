import { MessageCircle, User, Home, CalendarClock } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
import { ROUTES } from '../../utils/constants/routes';

interface IProp {
  chatCount: number;
}
const MobileBottomNav: React.FC<IProp> = ({ chatCount }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    {
      icon: <Home size={20} />,
      label: 'Home',
      path: ROUTES.USER.HOME,
    },
    {
      icon: <MessageCircle size={20} />,
      label: 'Chats',
      path: '/chats',
      badge: chatCount,
    },
    {
      icon: <CalendarClock size={20} />,
      label: 'Bookings',
      path: '/myprofile/booked-services/',
    },
    {
      icon: <User size={20} />,
      label: 'Profile',
      path: '/myprofile',
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t md:hidden bg-base-100 border-base-300">
      <div className="flex justify-between px-2 py-2">
        {tabs.map(tab => {
          const active = location.pathname === tab.path;

          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center justify-center flex-1 gap-1 text-xs"
            >
              <div className="relative">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-150 ${
                    active ? 'bg-primary/10 text-primary' : 'text-base-content'
                  }`}
                >
                  {tab.icon}
                </div>
                {tab.badge && tab.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-error text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {tab.badge > 9 ? '9+' : tab.badge}
                  </span>
                )}
              </div>
              <span className={active ? 'text-primary' : ''}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;
