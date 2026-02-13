import { Navigate, Route } from 'react-router-dom';
// import AdminProtectedRoute from '../pages/AdminProtectedRoute';
import AdminLayout from '../layouts/admin/AdminLayout.tsx';
import UserListingPage from '../pages/admin/Users/UserListingPage';
import ServiceProviderVerification from '../pages/admin/ServiceProviders/ServiceProviderVerificationPage';
import ServiceProviderListing from '../pages/admin/ServiceProviders/ServiceProviderListingPage';
import Allservices from '../pages/admin/Services/AllServicesPage';
import BookingManagement from '../pages/admin/Bookings/BookingManagementPage';
import CategoryList from '../pages/admin/Services/CategoryManagementPage';
import SiteSettingsPage from '../pages/admin/Settings/SiteSettingsPage';
import CouponListPage from '../pages/admin/Coupons/CouponListPage';
import AdminLogs from '../pages/admin/Logs/AdminLogsPage';
import AdminHome from '../pages/admin/Dashboard/AdminHomePage';
import AdminProviderWallet from '../pages/admin/ServiceProviders/Wallet/AdminProviderWalletPage';
import WalletListing from '../pages/admin/ServiceProviders/Wallet/WalletListingPage';
import { ROUTES } from '../utils/constants/routes.ts';
import SubscriptionPlansPage from '../pages/admin/Subscriptions/SubscriptionPlansPage';
import AdsPage from '../pages/admin/Ads/AdsPage';
import { useAuth } from '../hooks/useAuth.tsx';
import AdminSignIn from '../components/admin/auth/Sigin.tsx';

const AdminRoutes = () => {
  const { adminAccessToken } = useAuth();
  return (
    <Route>
        <Route
            path={ROUTES.ADMIN.SIGNIN}
            element={adminAccessToken ? <Navigate to={ROUTES.ADMIN.HOME} replace /> : <AdminSignIn />}
          />
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
