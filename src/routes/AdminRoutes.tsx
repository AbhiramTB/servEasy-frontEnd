import { Route } from 'react-router-dom';
// import AdminProtectedRoute from '../pages/AdminProtectedRoute';
import AdminLayout from '../layouts/admin/AdminLayout.tsx';
import UserListingPage from '../components/admin/UserListingPage';
import ServiceProviderVerification from '../components/admin/ServiceProviderVerification';
import ServiceProviderListing from '../components/admin/serviceProviderListing';
import Allservices from '../components/admin/service-management/Allservices';
import BookingManagement from '../components/admin/bookingManagement/booking-management';
import CategoryList from '../components/admin/service-management/CategoryManagement';
import SiteSettingsPage from '../components/admin/siteSettings/SiteSettingsPage';
import CouponListPage from '../components/admin/coupon management/CouponPage';
import AdminLogs from '../components/admin/AdminLogs';
import AdminHome from '../components/admin/Home.tsx';
import AdminProviderWallet from '../components/admin/wallet/AdminProviderWallet.tsx';
import WalletListing from '../components/admin/wallet/WalletListing.tsx';
import { ROUTES } from '../utils/constants/routes.ts';
import SubscriptionPlansPage from '../components/admin/subscriptionsManagement/SubscriptionPlansPage.tsx';
import AdsPage from '../components/admin/AdsPage.tsx';

const AdminRoutes = () => {
  return (
    <Route>
      <Route path={ROUTES.ADMIN.ROOT} element={<AdminLayout />}>
        <Route path={ROUTES.ADMIN.HOME} element={<AdminHome />} />
        <Route path={ROUTES.ADMIN.USERS} element={<UserListingPage />} />
        <Route path={ROUTES.ADMIN.SERVICE_PROVIDER_VERIFICATION} element={<ServiceProviderVerification />} />
        <Route path={ROUTES.ADMIN.SERVICE_PROVIDER_LISTING} element={<ServiceProviderListing />} />
        <Route path={ROUTES.ADMIN.ALL_SERVICES} element={<Allservices />} />
        <Route path={ROUTES.ADMIN.BOOKING_MANAGEMENT} element={<BookingManagement />}></Route>
        <Route path={ROUTES.ADMIN.CATEGORY_MANAGEMENT} element={<CategoryList />} />
        <Route path={ROUTES.ADMIN.SITE_SETTINGS} element={<SiteSettingsPage />} />
        <Route path={ROUTES.ADMIN.COUPON_MANAGEMENT} element={<CouponListPage />} />
        <Route path={ROUTES.ADMIN.SERVICE_PROVIDER_WALLET_DETAIL(':id')} element={<AdminProviderWallet />} />
        <Route path={ROUTES.ADMIN.SERVICE_PROVIDER_WALLETS} element={<WalletListing />} />
        <Route path={ROUTES.ADMIN.LOGS} element={<AdminLogs />} />
        <Route path={ROUTES.ADMIN.subscriptionManagement} element={<SubscriptionPlansPage />} />
        <Route path={ROUTES.ADMIN.ADSMANAGEMENT} element={<AdsPage />} />
      </Route>
    </Route>
  );
};

export default AdminRoutes;
