export const ROUTES = {
  AUTH: {
    LOGIN: "/login",
    LOGOUT: "/logout",
    REGISTER: "/register",
    FORGOT_PASSWORD: "/forgot-password",
  },
 ADMIN: {
    ROOT: "/admin",
    HOME: "/admin/home",
    USERS: "/admin/users",
    SERVICE_PROVIDER_VERIFICATION: "/admin/serviceProvider/verification",
    SERVICE_PROVIDER_LISTING: "/admin/serviceProvider",
    ALL_SERVICES: "/admin/service",
    BOOKING_MANAGEMENT: "/admin/booking-management",
    CATEGORY_MANAGEMENT: "/admin/category-management",
    SITE_SETTINGS: "/admin/site-settings",
    COUPON_MANAGEMENT: "/admin/coupon-management",
    SERVICE_PROVIDER_WALLET_DETAIL: (id: string | number) =>
      `/admin/service-provider-wallets/${id}`,
    SERVICE_PROVIDER_WALLETS: "/admin/service-provider-wallets",
    LOGS: "/admin/logs",
    subscriptionManagement:"subscription-management"
  },
  USER: {
    HOME: "/",
    PROFILE: "/profile",
    BOOKINGS: "/bookings",
  },
  PROVIDER: {
    DASHBOARD: "/provider/dashboard",
    WALLET: "/provider/wallet",
  },
};
