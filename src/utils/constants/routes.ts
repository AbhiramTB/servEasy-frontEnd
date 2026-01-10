export const ROUTES = {
  AUTH: {
    LOGIN: '/login',
    LOGOUT: '/logout',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
  },
  ADMIN: {
    ROOT: '/admin',
    HOME: '/admin/home',
    USERS: '/admin/users',
    SERVICE_PROVIDER_VERIFICATION: '/admin/serviceProvider/verification',
    SERVICE_PROVIDER_LISTING: '/admin/serviceProvider',
    ALL_SERVICES: '/admin/service',
    BOOKING_MANAGEMENT: '/admin/booking-management',
    CATEGORY_MANAGEMENT: '/admin/category-management',
    SITE_SETTINGS: '/admin/site-settings',
    COUPON_MANAGEMENT: '/admin/coupon-management',
    SERVICE_PROVIDER_WALLET_DETAIL: (id: string | number) => `/admin/service-provider-wallets/${id}`,
    SERVICE_PROVIDER_WALLETS: '/admin/service-provider-wallets',
    LOGS: '/admin/logs',
    subscriptionManagement: 'subscription-management',
    ADSMANAGEMENT: 'ads-management',
  },
  USER: {
    HOME: '/',
    PROFILE: '/profile',
    BOOKINGS: '/bookings',
  },
  SERVICEPROVIDER: {
    BASE: '/service-provider',

    REGISTER: '/service-provider/register',

    DASHBOARD: '/service-provider/dashboard',
    ADS: '/service-provider/ads',

    BOOKED_SERVICES: '/service-provider/booked-services',
    BOOKED_SERVICE_DETAILS: (id: string) => `/service-provider/booked-services/${id}`,

    BOOKED_SERVICES_ONLINE: (id: string) => `/service-provider/booked-services-online/${id}`,

    CHATS: '/service-provider/chats',
    CHAT_WITH_USER: (userId: string) => `/service-provider/chat/${userId}`,

    VIDEO_CALL: (userId: string) => `/service-provider/video-call/${userId}`,

    PROFILE: '/service-provider/myprofile',

    SERVICE_MANAGEMENT: '/service-provider/service-management',
    PAYMENT_MANAGEMENT: '/service-provider/payment-management',

    SLOT_MANAGEMENT: (serviceId: string) => `/service-provider/slot-management/${serviceId}`,

    WALLET: '/service-provider/wallet',

    AI_ASSISTANCE: '/service-provider/assistance',
    AI_ASSISTANCE_CHAT: (chatId: string) => `/service-provider/assistance/${chatId}`,
  },
};
