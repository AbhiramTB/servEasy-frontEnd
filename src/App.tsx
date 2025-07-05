import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AuthPage from './components/User/AuthModel/AuthPage.tsx';
import Body from './pages/Body';
import Otp from './components/User/AuthModel/Otp';
import Register from './components/ServiceProvider/Register/Register.tsx';
import AdminSignIn from '../src/components/admin/auth/Sigin.tsx';
import AdminHome from '../src/components/admin/Home.tsx';
import ServiceProviderVerifiction from './components/admin/ServiceProviderVerification.tsx';
import UserListingPage from '../src/components/admin/UserListingPage.tsx';
import Dashboard from './components/ServiceProvider/Dashboard.tsx';
import AdminLayout from './pages/AdminLayout.tsx';
import ServiceProviderLayout from './pages/ServiceProviderLayout.tsx';
import ProtectedRoute from './pages/ProtectedRoute.tsx';
import AdminProtectedRoute from './pages/AdminProtectedRoute';
import ServiceProviderListing from './components/admin/serviceProviderListing.tsx';
import Allservices from './components/admin/service-management/Allservices.tsx';
import ServiceManagement from './components/ServiceProvider/service/ServiceManagement.tsx';
import SingleServiceCard from './components/User/bookService/ServiceDetailsPage.tsx';
import BookService from './components/User/bookService/bookedServiceList/BookOfflineServicePage.tsx';
import BookedService from './components/User/bookService/bookedServiceList/BookedServiceListPage.tsx';
import ViewSIngleBookedService from './components/User/bookService/BookedOfflineServicePage.tsx';
import BookedServiceServiceProvider from './components/ServiceProvider/booking/bookedServicesList.tsx';
import ServiceBookingManage from './components/ServiceProvider/booking/offlineService/SingleBooking.tsx';
import PaymentVerify from './components/ui/PaymentVerify.tsx';
import PaymentManagement from './components/ServiceProvider/paymentManagement/paymentManagement.tsx';
import BookingManagement from './components/admin/bookingManagement/booking-management.tsx';
import CategoryList from './components/admin/service-management/CategoryManagement.tsx';
import Chat from './components/User/chat/ChatUser.tsx';
import ChatServiceProvider from './components/User/chat/ChatServiceProvider.tsx';
import ChatUI from './components/User/chat/AllChatsServiceProvider.tsx';
import ChatsUser from './components/User/chat/AllchatsUser.tsx';
import BookOnlineService from './components/User/bookService/BookOnlineServicePage.tsx';
import ServiceBookingDetailsOnline from './components/User/bookService/bookedOnlineServicePage.tsx';
import OnlineBookingManagement from './components/ServiceProvider/booking/onlineService/OnlineServiceBookingManagement.tsx';
import { Toaster } from 'react-hot-toast';
import VideoCall from './components/VideoCall/VideoCallUser.tsx';
import ServiceProviderVideoCall from './components/VideoCall/ServiceProviderVideoCall.tsx';
import SiteSettingsPage from './components/admin/siteSettings/SiteSettingsPage.tsx';
import SidebarLayout from './components/User/profile/SidebarLayout.tsx';
import UserProfile from './components/User/profile/updateProfile.tsx';
import Appearance from './components/User/profile/Appearance.tsx';
import AboutUs from './components/User/profile/AboutUs.tsx';
import HomePage from './components/User/home/HomePage.tsx';
import Myprofile from './components/ServiceProvider/service/profile/Myprofile.tsx';
import { useAuth } from './hooks/useAuth.tsx';
import NotFound from './components/ui/NotFound.tsx';
import SlotPage from './components/ServiceProvider/SlotManagement/SlotPage.tsx';
import AdminLogs from './components/admin/AdminLogs.tsx';

function App() {
  const { userAccessToken = true, adminAccessToken } = useAuth();

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <BrowserRouter basename="/">
        <Routes>
          <Route path="/payment/verify" element={<PaymentVerify />} />
          <Route path="/signIn" element={userAccessToken ? <Navigate to="/" replace /> : <AuthPage />} />
          <Route path="otp" element={<Otp />} />

          <Route path="/" element={<Body />}>
            <Route index element={<HomePage />} />
            <Route path="/serveasy" element={<HomePage />} />
            <Route path="myprofile" element={<SidebarLayout />}>
              <Route index element={<UserProfile />} />
              <Route path="appearance" element={<Appearance />} />
              <Route path="booked-services/" element={<BookedService />} />
              <Route path="aboutus" element={<AboutUs />} />
            </Route>

            <Route path="/booked-services" element={<BookedService />} />
            <Route path="/service-details/:id" element={<SingleServiceCard />} />
            <Route path="/bookService/:id" element={<BookService />} />
            <Route path="/bookService-online/:id" element={<BookOnlineService />} />
            <Route path="/video-call/:userId" element={<VideoCall />} />
            <Route path="/booked-service/:id" element={<ViewSIngleBookedService />} />
            <Route path="/booked-service-online/:id" element={<ServiceBookingDetailsOnline />} />
            <Route path="chat/:serviceProviderId" element={<Chat />} />
            <Route path="chats" element={<ChatsUser />}></Route>
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/service-provider" element={<ServiceProviderLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="register" element={<Register />} />
              <Route path="booked-services" element={<BookedServiceServiceProvider />} />
              <Route path="chats" element={<ChatUI />}></Route>
              <Route path="video-call/:userId" element={<ServiceProviderVideoCall />}></Route>
              <Route path="chat/:userid" element={<ChatServiceProvider />} />
              <Route path="booked-services/:id" element={<ServiceBookingManage />} />
              <Route path="myprofile" element={<Myprofile />} />
              <Route path="booked-services-online/:id" element={<OnlineBookingManagement />} />
              <Route path="service-management" element={<ServiceManagement />} />
              <Route path="payment-management" element={<PaymentManagement />} />
              <Route path="slot-management" element={<SlotPage />} />
            </Route>
          </Route>

          <Route
            path="admin/sigin"
            element={adminAccessToken ? <Navigate to={'/admin/home'} replace /> : <AdminSignIn />}
          />
          <Route element={<AdminProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="home" element={<AdminHome />} />
              <Route path="users" element={<UserListingPage />} />
              <Route path="serviceProvider/verification" element={<ServiceProviderVerifiction />} />
              <Route path="serviceProvider" element={<ServiceProviderListing />} />
              <Route path="service" element={<Allservices />} />
              <Route path="booking-management" element={<BookingManagement />}></Route>
              <Route path="category-management" element={<CategoryList />} />
              <Route path="site-settings" element={<SiteSettingsPage />} />
               <Route path='logs' element={<AdminLogs/>}/>
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
