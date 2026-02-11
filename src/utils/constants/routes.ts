export const ROUTES = {
  AUTH: {
    LOGOUT: '/logout',
    REGISTER: '/register',
  },
  ADMIN: {
    ROOT: '/admin',
    HOME: '/admin/home',
    SIGNIN: '/admin/sign-in',
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
    subscriptionManagement: '/admin/subscription-management',
    ADSMANAGEMENT: 'ads-management',
  },
  // USER: {
  //   HOME: '/',
  //   PROFILE: '/profile',
  //   BOOKINGS: '/bookings',
  // },

  USER: {
    ROOT: '/',
    FORGOT_PASSWORD: '/forgot-password',
    SIGN_IN: '/signin',
    OTP: '/otp',
    HOME: '/home',
    LOGOUT: '/logout',

    SERVEASY: '/serveasy',

    PROFILE: 'myprofile',
    PROFILE_APPEARANCE: 'appearance',
    PROFILE_BOOKED_SERVICES: 'booked-services',
    PROFILE_ABOUT_US: 'aboutus',

    BOOKED_SERVICES: '/booked-services',

    SERVICE_DETAILS: '/service-details/:id',
    BOOK_SERVICE: '/bookService/:id',
    BOOK_SERVICE_ONLINE: '/bookService-online/:id',

    VIDEO_CALL: '/video-call/:userId',

    BOOKED_SERVICE_DETAILS: '/booked-service/:id',
    BOOKED_SERVICE_ONLINE_DETAILS: '/booked-service-online/:id',

    CHAT_WITH_PROVIDER: '/chat/:serviceProviderId',
    CHATS: '/chats',
    COUPON: '/coupons',
  },

  // SERVICEPROVIDER: {
  //   BASE: '/service-provider',
  //   LANDING: '/service-provider/become',
  //   REGISTER: '/service-provider/register',

  //   DASHBOARD: '/service-provider/dashboard',
  //   ADS: '/service-provider/ads',

  //   BOOKED_SERVICES: '/service-provider/booked-services',
  //   BOOKED_SERVICE_DETAILS: (id: string) => `/service-provider/booked-services/${id}`,

  //   BOOKED_SERVICES_ONLINE: (id: string) => `/service-provider/booked-services-online/${id}`,

  //   CHATS: '/service-provider/chats',
  //   CHAT_WITH_USER: (userId: string) => `/service-provider/chat/${userId}`,

  //   VIDEO_CALL: (userId: string) => `/service-provider/video-call/${userId}`,

  //   PROFILE: '/service-provider/myprofile',

  //   SERVICE_MANAGEMENT: '/service-provider/service-management',
  //   PAYMENT_MANAGEMENT: '/service-provider/payment-management',

  //   SLOT_MANAGEMENT: (serviceId: string) => `/service-provider/slot-management/${serviceId}`,

  //   WALLET: '/service-provider/wallet',

  //   AI_ASSISTANCE: '/service-provider/assistance',
  //   AI_ASSISTANCE_CHAT: (chatId: string) => `/service-provider/assistance/${chatId}`,
  // },




 SERVICEPROVIDER: {
    ROOT: "/service-provider",
    REGISTER: '/service-provider/register',

   DASHBOARD: "dashboard",
    BOOKED_SERVICES: "booked-services",
    BOOKED_SERVICE_DETAIL: "booked-services/:id",
    BOOKED_SERVICE_ONLINE: "booked-services-online/:id",

    CHATS: "chats",
    CHAT_DETAIL: "chat/:userid",

    VIDEO_CALL: "video-call/:userId",

    PROFILE: "myprofile",

    SERVICE_MANAGEMENT: "service-management",
    PAYMENT_MANAGEMENT: "payment-management",

    SLOT_MANAGEMENT: "slot-management/:serviceId",

    WALLET: "wallet",

    ASSISTANCE: "assistance",
    ASSISTANCE_CHAT: "assistance/:chatId",

    ADS: "ads",
  },





};


