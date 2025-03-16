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

export const lightTheme = lightThems.theme4;
export const darkTheme = darkThemes.theme4;

export const apiEndPoint = {
  refreshToken: "/refresh-token",
  resendOtp: "/resend-otp",
  signUp: "/signup",
  SignInPhone: "/signin/phone",
  SignInEmail: "/signin/email",
  getUserProfile: "/profile",
  googleSign: "/google/signin",
  forgotPassword: "/forgot-password",
  forgotPasswordVerifyOtp: "/forgot-password/verify-otp",
  resetPassword: "/forgot-password/reset",
  locationAutocomplete:"/location/autocomplete"
};

export const apiEndPointServiceProvider = {
  verifyServiceProvider:'/service-providers/verify',
  serviceProviderRegister: "/service-providers/register",
  getServiceProvider:"/service-providers/",
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
};
export const serviceEndPoint={
  addNewService:"/service/",
  getAllService:"/service/",
  updateService:"/service/",
  blockUnblock:"/service/block-unblock"
}
export const routes = {
  siginSignup: "/signin",
  home: "/",
};
export const adminRoutes = {
  AdminSignIn: "/admin/sigin",
};
