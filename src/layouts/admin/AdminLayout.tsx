import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../../components/admin/NavBar';
import { useTheme } from '../../hooks/useTheme';

const AdminLayout = () => {
  useTheme();
  const adminToken = localStorage.getItem('adminToken');

  if (!adminToken) {
    return <Navigate to="/admin/sigin" />;
  }

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
