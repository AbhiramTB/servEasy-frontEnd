import { Route } from 'react-router-dom';

import { ROUTES } from '../utils/constants/routes';
import ServiceProviderLayout from '../layouts/provider/ServiceProviderLayout';
import AdsPage from '../components/ServiceProvider/ads/AdsPage';
import BookedServiceServiceProvider from '../components/ServiceProvider/booking/bookedServicesList';
import OnlineBookingManagement from '../components/ServiceProvider/booking/onlineService/OnlineServiceBookingManagement';
import ChatUI from '../components/User/chat/AllChatsServiceProvider';
import ChatServiceProvider from '../components/User/chat/ChatServiceProvider';
import ServiceProviderVideoCall from '../components/VideoCall/ServiceProviderVideoCall';
import Myprofile from '../components/ServiceProvider/service/profile/Myprofile';
import ServiceManagement from '../components/ServiceProvider/service/ServiceManagement';
import PaymentManagement from '../components/ServiceProvider/paymentManagement/paymentManagement';
import SlotPage from '../components/ServiceProvider/SlotManagement/SlotPage';
import Walletpage from '../components/ServiceProvider/wallet/walletPage';
import SubscriptionFeaturesRoutes from './SubscriptionFeaturesRoutes';
import ServiceProviderBookingManage from '../components/ServiceProvider/booking/offlineService/SingleBooking';
import ServiceProviderDashboard from '../components/ServiceProvider/Dashboard';
import AssistancePage from '../components/ServiceProvider/aiAssistance/AssistancePage';

const ServiceProviderRoutes = () => {
  return (
<Route path={ROUTES.SERVICEPROVIDER.ROOT} element={<ServiceProviderLayout />}>

  <Route
    path={ROUTES.SERVICEPROVIDER.DASHBOARD}
    element={<ServiceProviderDashboard />}
  />

  <Route
    path={ROUTES.SERVICEPROVIDER.BOOKED_SERVICES}
    element={<BookedServiceServiceProvider />}
  />

  <Route
    path={ROUTES.SERVICEPROVIDER.CHATS}
    element={<ChatUI />}
  />

  <Route
    path={ROUTES.SERVICEPROVIDER.VIDEO_CALL}
    element={<ServiceProviderVideoCall />}
  />

  <Route
    path={ROUTES.SERVICEPROVIDER.CHAT_DETAIL}
    element={<ChatServiceProvider />}
  />

  <Route
    path={ROUTES.SERVICEPROVIDER.BOOKED_SERVICE_DETAIL}
    element={<ServiceProviderBookingManage />}
  />

  <Route
    path={ROUTES.SERVICEPROVIDER.PROFILE}
    element={<Myprofile />}
  />

  <Route
    path={ROUTES.SERVICEPROVIDER.BOOKED_SERVICE_ONLINE}
    element={<OnlineBookingManagement />}
  />

  <Route
    path={ROUTES.SERVICEPROVIDER.SERVICE_MANAGEMENT}
    element={<ServiceManagement />}
  />

  <Route
    path={ROUTES.SERVICEPROVIDER.PAYMENT_MANAGEMENT}
    element={<PaymentManagement />}
  />

  <Route
    path={ROUTES.SERVICEPROVIDER.SLOT_MANAGEMENT}
    element={<SlotPage />}
  />

  <Route
    path={ROUTES.SERVICEPROVIDER.WALLET}
    element={<Walletpage />}
  />

  <Route
    path={ROUTES.SERVICEPROVIDER.ASSISTANCE}
    element={
      <SubscriptionFeaturesRoutes>
        <AssistancePage />
      </SubscriptionFeaturesRoutes>
    }
  />

  <Route
    path={ROUTES.SERVICEPROVIDER.ASSISTANCE_CHAT}
    element={
      <SubscriptionFeaturesRoutes>
        <AssistancePage />
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
  );
};

export default ServiceProviderRoutes;
