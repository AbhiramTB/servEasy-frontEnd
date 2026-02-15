import { Route } from 'react-router-dom';

import { ROUTES } from '../utils/constants/routes';
import ServiceProviderLayout from '../layouts/provider/ServiceProviderLayout';
import SubscriptionFeaturesRoutes from './SubscriptionFeaturesRoutes';

import ServiceProviderDashboard from '../pages/serviceProvider/DashboardPage';
import BookedServiceServiceProvider from '../pages/serviceProvider/BookedServicesPage';
import OnlineBookingManagement from '../pages/serviceProvider/OnlineBookingPage';
import ServiceProviderBookingManage from '../pages/serviceProvider/BookingManagePage';
import ChatUI from '../pages/serviceProvider/ChatsPage';
import ChatServiceProvider from '../pages/serviceProvider/ChatDetailPage';
import ServiceProviderVideoCall from '../pages/serviceProvider/VideoCallPage';
import Myprofile from '../pages/serviceProvider/ProfilePage';
import ServiceManagement from '../pages/serviceProvider/ServiceManagementPage';
import PaymentManagement from '../pages/serviceProvider/PaymentManagementPage';
import SlotPage from '../pages/serviceProvider/SlotManagementPage';
import Walletpage from '../pages/serviceProvider/WalletPage';
import AssistancePage from '../pages/serviceProvider/AssistancePage';
import AdsPage from '../pages/serviceProvider/AdsPage';

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
