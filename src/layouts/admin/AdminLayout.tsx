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
    <>
      <Navbar />
      <div className="bg-base-100 bg-grid-pattern">
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
