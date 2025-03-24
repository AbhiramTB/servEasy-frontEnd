import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "./components/User/AuthModel/SignInSignUp/SignInSingUp";
import Home from "./components/User/Home/Home.tsx";
import Body from "./pages/Body";
import Otp from "./components/User/AuthModel/Otp";
import Register from "./components/ServiceProvider/Register.tsx";
import AdminSignIn from "../src/components/admin/auth/Sigin.tsx";
import AdminHome from "../src/components/admin/Home.tsx";
import ServiceProviderVerifiction from "./components/admin/ServiceProviderVerification.tsx";
import UserListingPage from "../src/components/admin/UserListingPage.tsx";
import Dashboard from "./components/ServiceProvider/Dashboard.tsx";
import AdminLayout from "./pages/AdminLayout.tsx";
import ServiceProviderLayout from "./pages/ServiceProviderLayout.tsx";
import ProtectedRoute from "./pages/ProtectedRoute.tsx";
import AdminProtectedRoute from "./pages/AdminProtectedRoute";
import ServiceProviderListing from "./components/admin/serviceProviderListing.tsx";
import Allservices from "./components/admin/service-management/Allservices.tsx";
import ServiceManagement from "./components/ServiceProvider/service/ServiceManagement.tsx";
import SingleServiceCard from "./components/User/Home/SinglePage.tsx";

function App() {
  const token = localStorage.getItem("accessToken");
  const adminToken = localStorage.getItem("adminToken");
  console.log(adminToken);
  
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route
          path="/signIn"
          element={token ? <Navigate to="/" replace /> : <AuthPage />}
        />

        <Route path="otp" element={<Otp />} />

        <Route path="/" element={<Body />}>
          <Route index element={<Home />} />
          <Route path="/service-details/:id" element={<SingleServiceCard />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/service-provider" element={<ServiceProviderLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="register" element={<Register />} />
            {/* <Route path="/service" element={<AddnewService/>} /> */}

            <Route path="service-management" element={<ServiceManagement />} />
          </Route>
        </Route>

        <Route
          path="admin/sigin"
          element={
            adminToken ? <Navigate to={"/admin/home"} replace /> : <AdminSignIn />
          }
        />

        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="home" element={<AdminHome />} />
            <Route path="users" element={<UserListingPage />} />
            <Route
              path="serviceProvider/verification"
              element={<ServiceProviderVerifiction />}
          />
            <Route
              path="serviceProvider"
              element={<ServiceProviderListing />}
            />
            <Route path="service" element={<Allservices />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;