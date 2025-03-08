import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./components/User/AuthModel/SignInSignUp/SignInSingUp";
import Home from "./components/User/Home";
import Body from "./pages/Body";
import Otp from "./components/User/AuthModel/Otp";
import Register from "./components/ServiceProvider/Register.tsx";
import AdminSignIn from "../src/components/admin/auth/Sigin.tsx";
import AdminHome from "../src/components/admin/Home.tsx";
import ServiceProviderListing from "../src/components/admin/serviceProviderListing.tsx";
import UserListingPage from "../src/components/admin/UserListingPage.tsx";
import Sample from "./sample.tsx";
import Dashboard from "./components/ServiceProvider/Dashboard.tsx";
import AdminLayout from "./pages/AdminLayout.tsx";
import ServiceProviderLayout from "./pages/ServiceProviderLayout.tsx";
import ProtectedRoute from "./pages/ProtectedRoute.tsx"; 
import AdminProtectedRoute from "./pages/AdminProtectedRoute"; 

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/signIn" element={<AuthPage />} />
        <Route path="otp" element={<Otp />} />

        
        <Route path="/" element={<Body />}>
          <Route index element={<Home />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/service-provider" element={<ServiceProviderLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Route>

       
        <Route path="admin/sigin" element={<AdminSignIn />} />

        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="home" element={<AdminHome />} />
            <Route path="users" element={<UserListingPage />} />
            <Route path="serviceProvider" element={<ServiceProviderListing />} />
          </Route>
        </Route>

        
        <Route path="/Test" element={<Sample />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
