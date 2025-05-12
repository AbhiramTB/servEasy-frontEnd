export const URL: string = "http://localhost:5001";

export const lightThems = {
  theme1: "light",
  theme2: "cupcake",
  theme3: "bumblebee",
  theme4: "emerald",
  theme5: "corporate",
  theme6: "synthwave",
  theme7: "retro",
  theme8: "valentine",
  theme9: "garden",
  theme10: "lofi",
};
export const darkThemes = {
  theme1: "dark",
  theme2: "synthwave",
  theme3: "halloween",
  theme4: "forest",
  theme5: "black",
  theme6: "luxury",
  theme7: "dracula",
  theme8: "business",
  theme9: "night",
  theme10: "coffee",
  theme11: "dim",
  theme12: "sunset",
};

export const lightTheme = lightThems.theme1;
export const darkTheme = darkThemes.theme12;

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
  getServiceProviderInfoChat:"/user/profile/serviceprovider-chat/"
};

export const apiEndPointServiceProvider = {
  verifyServiceProvider: "/service-providers/verify",
  serviceProviderRegister: "/service-providers/register",
  getServiceProvider: "/service-providers/",
  getCategories: "/service-providers/categories",
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
