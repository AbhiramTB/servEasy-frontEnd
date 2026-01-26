import { Route, Navigate } from 'react-router-dom';
import { ROUTES } from '../utils/constants/routes';
import UserLandingPage from '../components/ui/Landing/userLanding/UserLandingPage';
import UserLayout from '../layouts/user/UserLayout';
import HomePage from '../components/User/home/HomePage';
import SidebarLayout from '../components/User/profile/SidebarLayout';
import UserProfile from '../components/User/profile/updateProfile';
import Appearance from '../components/User/profile/Appearance';
import BookedService from '../components/User/bookService/bookedServiceList/BookedServiceListPage';
import AboutUs from '../components/User/profile/AboutUs';
import SingleServiceCard from '../components/User/bookService/ServiceDetailsPage';
import BookService from '../components/User/bookService/bookedServiceList/BookOfflineServicePage';
import BookOnlineService from '../components/User/bookService/BookOnlineServicePage';
import VideoCall from '../components/VideoCall/VideoCallUser';
import ServiceBookingDetailsOnline from '../components/User/bookService/bookedOnlineServicePage';
import ChatUser from '../components/User/chat/ChatUser';
import ChatsUser from '../components/User/chat/AllchatsUser';
import ServiceProviderRegisterPage from '../components/ServiceProvider/Register/ServiceProviderRegisterPage';
import ServiceBookingDetails from '../components/User/bookService/BookedOfflineServicePage';
import AuthPage from '../components/User/AuthModel/AuthPage';
import Otp from '../components/User/AuthModel/Otp';
import { useAuth } from '../hooks/useAuth';
import CouponsPage from '../pages/user/CouponsPage';

const UserRoutes = () => {
  const { userAccessToken = true } = useAuth();

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
        <Route path={'coupons'} element={<CouponsPage />} />

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
