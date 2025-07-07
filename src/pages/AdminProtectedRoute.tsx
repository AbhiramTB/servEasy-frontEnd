import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  const adminToken = localStorage.getItem("adminToken");

  return adminToken ? <Outlet /> : <Navigate to="/admin/signin" />;
};

export default AdminProtectedRoute;
