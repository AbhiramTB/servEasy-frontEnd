
export const URL: string = import.meta.env.VITE_BACKEND_URL;



export const apiEndPoint = {
  refreshToken: "/refresh-token",
  resendOtp: "/resend-otp",
  signUp: "/signup",
  SignInPhone: "/signin/phone",
  SignInEmail: "/signin/email",
  getUserProfile: "/profile",
  googleSign: "/google/signin",
  updateProfileOtpVerfy: "/updateProfile/verifyotp",
  updateProfile: "/updateProfile",
  forgotPassword: "/forgot-password",
  forgotPasswordVerifyOtp: "/forgot-password/verify-otp",
  resetPassword: "/forgot-password/reset",
  locationAutocomplete: "/location/autocomplete",
  getSingleService: "/user/service",
  getServices: "/getactive/services",
  logOutUser: "/logout",
  addNewAddress: "/user/addresses",
  editAddress: "/user/addresses",
  deleteAddress: "/user/addresses",
  getAddress: "/user/addresses",
  getSpecificChat :"/chat",
  getUserChat:"/user/profile/",
  getChats:"/chat/chats",
  getServiceProviderInfoChat:"/user/profile/serviceprovider-chat/",
  getThemes:"/themes",
  getBanners:"/banners/active"
};

export const apiEndPointServiceProvider = {
  verifyServiceProvider: "/service-providers/verify",
  serviceProviderRegister: "/service-providers/register",
  getServiceProvider: "/service-providers/",
  getCategories: "/service-providers/categories",
  getPaymentInfo:"/service-providers/get-paymentinfo",
  makeActiveAllservice:"/service-providers/services/activate-all/",
  makeInactiveAllService:"/service-providers/services/deactivate-all/"
};

export const apiEndPointAdmin = {
  adminRefreshToken: "/admin-refresh-token",
  AdminSignIn: "/admin/signin",
  getPrfoile: "/admin/profile",
  getAllUsers: "/admin/users",
  blockUnblockUser: "/admin/users/block-unblock",
  serviceProvider: "/admin/serviceProvider",
  serviceProviderReject: "/admin/serviceProvider/reject",
  serviceProviderVerify: "/admin/serviceProvider/verify",
  getAllservices: "/admin/service",
  blockUnblokServices: "/admin/service",
  blockUnblockServiceProvider: "/admin/serviceprovider",
  fetchCategories: "/admin/category",
  addCategory: "/admin/category",
  updateCategory: "/admin/category",
  deleteCategory: "/admin/category",
  addService: "/admin/category/service",
  updateService: "/admin/category/service",
  deleteService: "/admin/category/service/",

  adminLogout: "/admin/logout",
  gtPaymentInfo: "/admin/dashboard/payment-info",

 makeActiveSiteSettings:'admin/site-settings/activate',
 deleteSiteSettings:'admin/site-settings/delete',
 addsiteSettings:'admin/site-settings/add',
  getSiteSettings:'admin/site-settings',

};

export const serviceEndPoint = {
  addNewService: "/service/",
  getAllService: "/service/",
  updateService: "/service/",
  blockUnblock: "/service/block-unblock",
  bookservice: "/service/book",
  getUserBookService: "/service/bookings",
  getSingleBookedService: "/services/bookings",
  getServiceProviderBookService: "/service/bookings/serviceprovider",
  
};
export const routes = {
  siginSignup: "/signin",
  home: "/",
};
export const adminRoutes = {
  AdminSignIn: "/admin/sigin",
};

export const paymentRoutes = {
  getServiceProviderPayments: "/payment/service-provider/",
  getServiceAdminPayments: "/payment/admin/",
};
