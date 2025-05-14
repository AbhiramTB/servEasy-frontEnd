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
import SingleServiceCard from "./components/User/bookService/SinglePage.tsx";
import BookService from "./components/User/bookService/bookService.tsx";
import BookedService from "./components/User/bookService/BookedService.tsx";
import ViewSIngleBookedService from "./components/User/bookService/ViewSIngleBookedService.tsx";
import BookedServiceServiceProvider from "./components/ServiceProvider/booking/bookedServices.tsx";
import ServiceBookingManage from "./components/ServiceProvider/booking/SingleBooking.tsx";
import PaymentVerify from "./components/ui/PaymentVerify.tsx";
import PaymentManagement from "./components/ServiceProvider/paymentManagement/paymentManagement.tsx";
import BookingManagement from "./components/admin/bookingManagement/booking-management.tsx";
import CategoryList from "./components/admin/service-management/CategoryManagement.tsx";
import Chat from "./components/User/chat/ChatUser.tsx";
import ChatServiceProvider from "./components/User/chat/ChatServiceProvider.tsx";
import ChatUI from "./components/User/chat/AllChatsServiceProvider.tsx";
import ChatsUser from "./components/User/chat/AllchatsUser.tsx";
import BookOnlineService from "./components/User/bookService/BookOnlineService.tsx";
import ServiceBookingDetailsOnline from "./components/User/bookService/BookedOnlineService.tsx";
import OnlineBookingManagement from "./components/ServiceProvider/booking/OnlineServiceBookingManagement.tsx";
import { Toaster } from "react-hot-toast";
import VideoCall from "./components/VideoCall/VideoCall.tsx";
function App() {
  const token = localStorage.getItem("accessToken");
  const adminToken = localStorage.getItem("adminToken");
  console.log(adminToken);

  return (
<>   
 <Toaster position="top-center" reverseOrder={false} />

    <BrowserRouter basename="/">
      <Routes>
        <Route path="/payment/verify" element={<PaymentVerify />} />
   
    <Route path="/video-call/:userId" element={<VideoCall/>}></Route>

        <Route
          path="/signIn"
          element={token ? <Navigate to="/" replace /> : <AuthPage />}
        />

        <Route path="otp" element={<Otp />} />

        <Route path="/" element={<Body />}>
          <Route index element={<Home />} />
          <Route path="/service-details/:id" element={<SingleServiceCard />} />
          <Route path="/bookService/:id" element={<BookService />} />
          <Route
            path="/bookService-online/:id"
            element={<BookOnlineService />}
          />

          <Route path="/booked-services/" element={<BookedService />} />
          <Route
            path="/booked-service/:id"
            element={<ViewSIngleBookedService />}
          />

          <Route
            path="/booked-service-online/:id"
            element={<ServiceBookingDetailsOnline />}
          />
          <Route path="chat/:serviceProviderId" element={<Chat />} />
          <Route path="chats" element={<ChatsUser />}></Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/service-provider" element={<ServiceProviderLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="register" element={<Register />} />
            <Route
              path="booked-services"
              element={<BookedServiceServiceProvider />}
            />
            <Route path="chats" element={<ChatUI />}></Route>

            <Route path="chat/:userid" element={<ChatServiceProvider />} />
            <Route
              path="booked-services/:id"
              element={<ServiceBookingManage />}
            />

            <Route
              path="booked-services-online/:id"
              element={<OnlineBookingManagement />}
            />

            <Route path="service-management" element={<ServiceManagement />} />
            <Route path="payment-management" element={<PaymentManagement />} />
          </Route>
        </Route>

        <Route
          path="admin/sigin"
          element={
            adminToken ? (
              <Navigate to={"/admin/home"} replace />
            ) : (
              <AdminSignIn />
            )
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
            <Route
              path="booking-management"
              element={<BookingManagement />}
            ></Route>
            <Route path="category-management" element={<CategoryList />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
