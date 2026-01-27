// import { Route } from 'react-router-dom';

// import { ROUTES } from '../utils/constants/routes';
// import ServiceProviderLayout from '../layouts/provider/ServiceProviderLayout';
// import AdsPage from '../components/ServiceProvider/ads/AdsPage';
// import BookedServiceServiceProvider from '../components/ServiceProvider/booking/bookedServicesList';
// import OnlineBookingManagement from '../components/ServiceProvider/booking/onlineService/OnlineServiceBookingManagement';
// import ChatUI from '../components/User/chat/AllChatsServiceProvider';
// import ChatServiceProvider from '../components/User/chat/ChatServiceProvider';
// import ServiceProviderVideoCall from '../components/VideoCall/ServiceProviderVideoCall';
// import Myprofile from '../components/ServiceProvider/service/profile/Myprofile';
// import ServiceManagement from '../components/ServiceProvider/service/ServiceManagement';
// import PaymentManagement from '../components/ServiceProvider/paymentManagement/paymentManagement';
// import SlotPage from '../components/ServiceProvider/SlotManagement/SlotPage';
// import Walletpage from '../components/ServiceProvider/wallet/walletPage';
// import SubscriptionFeaturesRoutes from './SubscriptionFeaturesRoutes';

// const ServiceProviderRoutes = () => {
//   return (
//     <Route>
//       <Route path={ROUTES.SERVICEPROVIDER.BASE} element={<ServiceProviderLayout />}>
//         <Route path={ROUTES.SERVICEPROVIDER.DASHBOARD} element={<Dashboard />} />

//         <Route path={ROUTES.SERVICEPROVIDER.ADS} element={<AdsPage />} />

//         <Route path={ROUTES.SERVICEPROVIDER.BOOKED_SERVICES} element={<BookedServiceServiceProvider />} />

//         <Route path={ROUTES.SERVICEPROVIDER.BOOKED_SERVICE_DETAILS} element={<ServiceBookingManage />} />

//         <Route path={ROUTES.SERVICEPROVIDER.BOOKED_SERVICES_ONLINE} element={<OnlineBookingManagement />} />

//         <Route path={ROUTES.SERVICEPROVIDER.CHATS} element={<ChatUI />} />

//         <Route path={ROUTES.SERVICEPROVIDER.CHAT_WITH_USER} element={<ChatServiceProvider />} />

//         <Route path={ROUTES.SERVICEPROVIDER.VIDEO_CALL} element={<ServiceProviderVideoCall />} />

//         <Route path={ROUTES.SERVICEPROVIDER.PROFILE} element={<Myprofile />} />

//         <Route path={ROUTES.SERVICEPROVIDER.SERVICE_MANAGEMENT} element={<ServiceManagement />} />

//         <Route path={ROUTES.SERVICEPROVIDER.PAYMENT_MANAGEMENT} element={<PaymentManagement />} />

//         <Route path={ROUTES.SERVICEPROVIDER.SLOT_MANAGEMENT} element={<SlotPage />} />

//         <Route path={ROUTES.SERVICEPROVIDER.WALLET} element={<Walletpage />} />

//         <Route
//           path={ROUTES.SERVICEPROVIDER.AI_ASSISTANCE}
//           element={
//             <SubscriptionFeaturesRoutes>
//               <AiAssistancePage />
//             </SubscriptionFeaturesRoutes>
//           }
//         />

//         <Route
//           path={ROUTES.SERVICEPROVIDER.AI_ASSISTANCE_CHAT}
//           element={
//             <SubscriptionFeaturesRoutes>
//               <AiAssistancePage />
//             </SubscriptionFeaturesRoutes>
//           }
//         />
//       </Route>
//     </Route>
//   );
// };

// export default ServiceProviderRoutes;
