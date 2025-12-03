import React from 'react';
import { FaUser, FaCalendarCheck, FaPalette } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { RootState } from '../../../redux/store';
import { Info } from 'lucide-react';

const SidebarLayout = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
<<<<<<< HEAD
    <div className="flex min-h-screen">
      <aside className="w-64 p-4 shadow-md bg-base-300">
=======
    <div className="flex flex-col min-h-screen lg:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 p-4 shadow-md lg:block bg-base-300">
>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6
        <div className="mb-6 text-xl font-semibold">
          Hello, {user.userName.toUpperCase()}
        </div>
        <nav className="space-y-3">
          <SidebarItem icon={<FaUser />} label="My Profile" to="/myprofile" end />
          <SidebarItem icon={<FaCalendarCheck />} label="My Bookings" to="/myprofile/booked-services/" />
          <SidebarItem icon={<FaPalette />} label="Appearance" to="/myprofile/appearance" />
          <SidebarItem icon={<Info />} label="About ServEasy" to="/myprofile/aboutus" />
        </nav>
      </aside>

<<<<<<< HEAD
      {/* Main content */}
      <main className="flex-1 p-6">
=======
      {/* Mobile Top Navbar */}
      <nav className="flex px-2 py-3 space-x-4 overflow-x-auto shadow-sm lg:hidden bg-base-200">
        <SidebarItem icon={<FaUser />} label="My Profile" to="/myprofile" end />
        <SidebarItem icon={<FaCalendarCheck />} label="Bookings" to="/myprofile/booked-services/" />
        <SidebarItem icon={<FaPalette />} label="Theme" to="/myprofile/appearance" />
        <SidebarItem icon={<Info />} label="About" to="/myprofile/aboutus" />
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-4">
>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6
        <Outlet />
      </main>
    </div>
  );
};

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
<<<<<<< HEAD
  end?: boolean; 
=======
  end?: boolean;
>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, to, end }) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
<<<<<<< HEAD
        `flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
          isActive
            ? 'text-accent font-semibold'
            : 'hover:text-info hover:bg-base-200'
        }`
      }
    >
      <span className="text-lg">{icon}</span>
      <span className="font-medium">{label}</span>
=======
        `flex items-center gap-2 whitespace-nowrap px-3 py-2 rounded-md transition-colors text-sm ${
          isActive
            ? 'text-accent font-semibold'
            : 'hover:text-info hover:bg-base-100'
        }`
      }
    >
      <span className="text-base">{icon}</span>
      <span>{label}</span>
>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6
    </NavLink>
  );
};

export default SidebarLayout;
