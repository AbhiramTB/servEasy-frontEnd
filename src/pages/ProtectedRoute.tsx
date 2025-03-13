import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const accessToken = localStorage.getItem("accessToken");

  return accessToken ? <Outlet /> : <Navigate to="/signIn" />;
};

export default ProtectedRoute;
