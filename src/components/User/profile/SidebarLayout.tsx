import React from 'react';
import { FaUser, FaCalendarCheck, FaPalette, FaCreditCard } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { RootState } from '../../../redux/store';

const SidebarLayout = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 p-4 shadow-md bg-base-300">
        <div className="mb-6 text-xl font-semibold">
          Hello, {user.userName.toUpperCase()}
        </div>
        <nav className="space-y-3">
          <SidebarItem icon={<FaUser />} label="My Profile" to="/myprofile" end />
          <SidebarItem icon={<FaCalendarCheck />} label="My Bookings" to="/myprofile/booked-services/" />
          <SidebarItem icon={<FaPalette />} label="Appearance" to="/myprofile/appearance" />
          <SidebarItem icon={<FaCreditCard />} label="My Payments" to="/myprofile/aboutus" />
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  end?: boolean; 
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, to, end }) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
          isActive
            ? 'text-accent font-semibold'
            : 'hover:text-info hover:bg-base-200'
        }`
      }
    >
      <span className="text-lg">{icon}</span>
      <span className="font-medium">{label}</span>
    </NavLink>
  );
};

export default SidebarLayout;
