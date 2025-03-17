import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  // const adminToken = localStorage.getItem("adminToken");
  const adminToken=true;
  return adminToken ? <Outlet /> : <Navigate to="/admin/sigin" />;
};

export default AdminProtectedRoute;
