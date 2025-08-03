import { Route } from "react-router-dom"
import AdminProtectedRoute from "../pages/AdminProtectedRoute"
import AdminLayout from "../pages/AdminLayout"
import UserListingPage from "../components/admin/UserListingPage"
import ServiceProviderVerification from "../components/admin/ServiceProviderVerification"
import ServiceProviderListing from "../components/admin/serviceProviderListing"
import Allservices from "../components/admin/service-management/Allservices"
import BookingManagement from "../components/admin/bookingManagement/booking-management"
import CategoryList from "../components/admin/service-management/CategoryManagement"
import SiteSettingsPage from "../components/admin/siteSettings/SiteSettingsPage"
import CouponListPage from "../components/admin/coupon management/CouponPage"
import AdminLogs from "../components/admin/AdminLogs"
import AdminHome from '../components/admin/Home.tsx';

const AdminRoutes=()=>{

return (

    
          <Route element={<AdminProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="home" element={<AdminHome/>} />
              <Route path="users" element={<UserListingPage />} />
              <Route path="serviceProvider/verification" element={<ServiceProviderVerification />} />
              <Route path="serviceProvider" element={<ServiceProviderListing />} />
              <Route path="service" element={<Allservices />} />
              <Route path="booking-management" element={<BookingManagement />}></Route>
              <Route path="category-management" element={<CategoryList />} />
              <Route path="site-settings" element={<SiteSettingsPage />} />
               <Route path='coupon-management' element={<CouponListPage/>}/>

              <Route path='logs' element={<AdminLogs/>}/>
            </Route>
          </Route>

)
    
}

export default AdminRoutes