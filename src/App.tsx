import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AuthPage from './components/User/AuthModel/AuthPage.tsx';
import Body from './layouts/user/UserLayout.tsx';
import Otp from './components/User/AuthModel/Otp';
import AdminSignIn from '../src/components/admin/auth/Sigin.tsx';
import Dashboard from './components/ServiceProvider/Dashboard.tsx';
import ServiceProviderLayout from './layouts/provider/ServiceProviderLayout.tsx';
import ServiceManagement from './components/ServiceProvider/service/ServiceManagement.tsx';
import SingleServiceCard from './components/User/bookService/ServiceDetailsPage.tsx';
import BookService from './components/User/bookService/bookedServiceList/BookOfflineServicePage.tsx';
import BookedService from './components/User/bookService/bookedServiceList/BookedServiceListPage.tsx';
import ViewSIngleBookedService from './components/User/bookService/BookedOfflineServicePage.tsx';
import BookedServiceServiceProvider from './components/ServiceProvider/booking/bookedServicesList.tsx';
import ServiceBookingManage from './components/ServiceProvider/booking/offlineService/SingleBooking.tsx';
import PaymentVerify from './components/ui/PaymentVerify.tsx';
import PaymentManagement from './components/ServiceProvider/paymentManagement/paymentManagement.tsx';
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
import SidebarLayout from './components/User/profile/SidebarLayout.tsx';
import UserProfile from './components/User/profile/updateProfile.tsx';
import Appearance from './components/User/profile/Appearance.tsx';
import AboutUs from './components/User/profile/AboutUs.tsx';
import HomePage from './components/User/home/HomePage.tsx';
import Myprofile from './components/ServiceProvider/service/profile/Myprofile.tsx';
import { useAuth } from './hooks/useAuth.tsx';
import NotFound from './components/ui/NotFound.tsx';
import SlotPage from './components/ServiceProvider/SlotManagement/SlotPage.tsx';

import AdminRoutes from './routes/AdminRoutes.tsx';
import Walletpage from './components/ServiceProvider/wallet/walletPage.tsx';
import AiAssistancePage from './components/ServiceProvider/aiAssistance/AssistancePage.tsx';
import SubscriptionFeaturesRoutes from './routes/SubscriptionFeaturesRoutes.tsx';
import SubscriptionPlansPage from './components/admin/subscriptionsManagement/SubscriptionPlansPage.tsx';
import AdsPage from './components/ServiceProvider/ads/AdsPage.tsx';
import ServiceProviderLanding from './components/ui/Landing/serviceProviderLanding/ServiceProviderLandingPage.tsx';
import Sample from './Sample.tsx';
import { ROUTES } from './utils/constants/routes.ts';
import ServiceProviderRegisterPage from './components/ServiceProvider/Register/ServiceProviderRegisterPage.tsx';
import UserLandingPage from './components/ui/Landing/userLanding/UserLandingPage.tsx';
import UserRoutes from './routes/UserRoutes.tsx';

function App() {
  const { userAccessToken = true, adminAccessToken } = useAuth();

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <BrowserRouter>
        <Routes>
          <Route path="cp" element={<SubscriptionPlansPage />} />
          {/* <Route path="/sample" element={<Sample />} /> */}

          <Route path="/payment/verify" element={<PaymentVerify />} />

          {/* <Route path="/" element={<Body />}>
            <Route path="home" element={<HomePage />} />
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
          </Route> */}

          {/* 
          <Route path={ROUTES.USER.OTP} element={<Otp />} />
          <Route
            path={ROUTES.USER.SIGN_IN}
            element={userAccessToken ? <Navigate to={ROUTES.USER.HOME} replace /> : <AuthPage />}
          />
          <Route
            path={ROUTES.USER.ROOT}
            element={userAccessToken ? <Navigate to={ROUTES.USER.HOME} replace /> : <UserLandingPage />}
          />
          <Route path={ROUTES.USER.ROOT} element={<Body />}>
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

            <Route path={ROUTES.USER.BOOKED_SERVICE_DETAILS} element={<ViewSIngleBookedService />} />

            <Route path={ROUTES.USER.BOOKED_SERVICE_ONLINE_DETAILS} element={<ServiceBookingDetailsOnline />} />

            <Route path={ROUTES.USER.CHAT_WITH_PROVIDER} element={<Chat />} />

            <Route path={ROUTES.USER.CHATS} element={<ChatsUser />} />
          </Route>

          <Route path={ROUTES.SERVICEPROVIDER.REGISTER} element={<ServiceProviderRegisterPage />} /> */}

          <Route path="/landingSp" element={<ServiceProviderLanding />} />

          <Route>
            <Route path="/service-provider" element={<ServiceProviderLayout />}>
              <Route path="/service-provider/dashboard" element={<Dashboard />} />
              <Route path="booked-services" element={<BookedServiceServiceProvider />} />
              <Route path="chats" element={<ChatUI />}></Route>
              <Route path="video-call/:userId" element={<ServiceProviderVideoCall />}></Route>
              <Route path="chat/:userid" element={<ChatServiceProvider />} />
              <Route path="booked-services/:id" element={<ServiceBookingManage />} />
              <Route path="myprofile" element={<Myprofile />} />
              <Route path="booked-services-online/:id" element={<OnlineBookingManagement />} />
              <Route path="service-management" element={<ServiceManagement />} />
              <Route path="payment-management" element={<PaymentManagement />} />
              <Route path="slot-management/:serviceId" element={<SlotPage />} />
              <Route path="wallet" element={<Walletpage />} />

              <Route
                path="assistance"
                element={
                  <SubscriptionFeaturesRoutes>
                    <AiAssistancePage />
                  </SubscriptionFeaturesRoutes>
                }
              />
              <Route
                path="assistance/:chatId"
                element={
                  <SubscriptionFeaturesRoutes>
                    <AiAssistancePage />
                  </SubscriptionFeaturesRoutes>
                }
              />

              <Route
                path={ROUTES.SERVICEPROVIDER.ADS}
                element={
                  <SubscriptionFeaturesRoutes>
                    <AdsPage />
                  </SubscriptionFeaturesRoutes>
                }
              />
            </Route>
          </Route>

          <Route
            path="admin/sigin"
            element={adminAccessToken ? <Navigate to={'/admin/home'} replace /> : <AdminSignIn />}
          />
          {UserRoutes()}
          {AdminRoutes()}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
