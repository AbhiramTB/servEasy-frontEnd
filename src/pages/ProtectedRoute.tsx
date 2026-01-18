import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const accessToken = localStorage.getItem("accessToken");
  const location = useLocation();
 
  console.log("ProtectedRoute Rendered - Path:", location.pathname);
  console.log("Access Token:", accessToken);

  if (accessToken && location.pathname === "/signIn") {
   
    return <Navigate to="/" replace />;
  }

  return accessToken ? <Outlet /> : <Navigate to="/signIn" replace />;
};

export default ProtectedRoute;
