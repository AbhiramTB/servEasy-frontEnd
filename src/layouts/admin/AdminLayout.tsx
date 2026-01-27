import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../../components/admin/NavBar';
import { useTheme } from '../../hooks/useTheme';

const AdminLayout = () => {
  useTheme();
  const adminToken = localStorage.getItem('adminToken');

  if (!adminToken) {
    return <Navigate to="/admin/sign-in" />;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-base-100 bg-hex-pattern ">
        <Outlet />
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default AdminLayout;
