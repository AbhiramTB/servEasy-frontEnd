import { Route, Navigate } from 'react-router-dom';
import { ROUTES } from '../utils/constants/routes';
import UserLandingPage from '../pages/user/Landing/UserLandingPage';
import UserLayout from '../layouts/user/UserLayout';
import HomePage from '../pages/user/Home/HomePage';
import SidebarLayout from '../pages/user/Profile/ProfileLayoutPage';
import UserProfile from '../pages/user/Profile/UserProfilePage';
import Appearance from '../pages/user/Profile/AppearancePage';
import BookedService from '../pages/user/BookService/BookedServiceListPage';
import AboutUs from '../pages/user/Profile/AboutUsPage';
import SingleServiceCard from '../pages/user/BookService/ServiceDetailsPage';
import BookService from '../pages/user/BookService/BookOfflineServicePage';
import BookOnlineService from '../pages/user/BookService/BookOnlineServicePage';
import VideoCall from '../pages/user/VideoCall/VideoCallPage';
import ServiceBookingDetailsOnline from '../pages/user/BookService/BookedOnlineServicePage';
import ChatUser from '../pages/user/Chat/ChatUserPage';
import ChatsUser from '../pages/user/Chat/AllChatsUserPage';
import ServiceProviderRegisterPage from '../components/ServiceProvider/Register/ServiceProviderRegisterPage';
import ServiceBookingDetails from '../pages/user/BookService/BookedOfflineServicePage';
import AuthPage from '../pages/user/Auth/AuthPage';
import Otp from '../pages/user/Auth/OtpPage';
import { useAuth } from '../hooks/useAuth';
import CouponsPage from '../pages/user/CouponsPage';

const UserRoutes = () => {
  const { userAccessToken } = useAuth();

  return (
    <Route>
      <Route path={ROUTES.USER.OTP} element={<Otp />} />

      <Route
        path={ROUTES.USER.SIGN_IN}
        element={userAccessToken ? <Navigate to={ROUTES.USER.HOME} replace /> : <AuthPage />}
      />

      <Route
        path={ROUTES.USER.ROOT}
        element={userAccessToken ? <Navigate to={ROUTES.USER.HOME} replace /> : <UserLandingPage />}
      />

      <Route path={ROUTES.USER.ROOT} element={<UserLayout />}>
        <Route path={ROUTES.USER.HOME} element={<HomePage />} />
        <Route path={ROUTES.USER.SERVEASY} element={<HomePage />} />

        <Route path={ROUTES.USER.PROFILE} element={<SidebarLayout />}>
          <Route index element={<UserProfile />} />
          <Route path={ROUTES.USER.PROFILE_APPEARANCE} element={<Appearance />} />
          <Route path={ROUTES.USER.PROFILE_BOOKED_SERVICES} element={<BookedService />} />
          <Route path={ROUTES.USER.PROFILE_ABOUT_US} element={<AboutUs />} />
        </Route>
        <Route path={ROUTES.USER.BOOKED_SERVICES} element={<BookedService />} />
        <Route path={ROUTES.USER.SERVICE_DETAILS} element={<SingleServiceCard />} />
        <Route path={ROUTES.USER.BOOK_SERVICE} element={<BookService />} />
        <Route path={ROUTES.USER.BOOK_SERVICE_ONLINE} element={<BookOnlineService />} />
        <Route path={ROUTES.USER.VIDEO_CALL} element={<VideoCall />} />
        <Route path={ROUTES.USER.BOOKED_SERVICE_DETAILS} element={<ServiceBookingDetails />} />
        <Route path={ROUTES.USER.BOOKED_SERVICE_ONLINE_DETAILS} element={<ServiceBookingDetailsOnline />} />
        <Route path={ROUTES.USER.COUPON} element={<CouponsPage />} />

        {/* Chat */}
        <Route path={ROUTES.USER.CHAT_WITH_PROVIDER} element={<ChatUser />} />
        <Route path={ROUTES.USER.CHATS} element={<ChatsUser />} />
      </Route>

      {/* -------- Service Provider -------- */}
      <Route path={ROUTES.SERVICEPROVIDER.REGISTER} element={<ServiceProviderRegisterPage />} />
    </Route>
  );
};

export default UserRoutes;
