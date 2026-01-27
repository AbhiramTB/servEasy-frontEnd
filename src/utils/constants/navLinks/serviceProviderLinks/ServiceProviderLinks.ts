import { Home, LayoutGrid, Calendar, CreditCard, MessageSquare, Bell, Wallet, Sparkles, Megaphone } from 'lucide-react';
import { ROUTES } from '../../routes';

export interface IServiceProviderLinks {
  label: string;
  path: string;
  icon: any;
  isPro?: boolean;
  badge?: string;
  isNotification?: boolean;
}

export const ServiceProviderLinks: IServiceProviderLinks[] = [
  { label: 'Dashboard', path: '/service-provider/dashboard', icon: Home },
  { label: 'Services', path: '/service-provider/service-management', icon: LayoutGrid },
  { label: 'Bookings', path: '/service-provider/booked-services', icon: Calendar },
  { label: 'Payments', path: '/service-provider/payment-management', icon: CreditCard },
  { label: 'Wallet', path: '/service-provider/wallet', icon: Wallet },
  { label: 'Messages', path: '/service-provider/chats', icon: MessageSquare },
  {
    label: 'Notifications',
    path: '#',
    icon: Bell,
    isNotification: true,
  },
  {
    label: 'AI Assistant',
    path: '/service-provider/assistance',
    icon: Sparkles,
    isPro: true,
    badge: 'PRO',
  },
  {
    label: 'Advertisements',
    path: '/service-provider/ads',
    icon: Megaphone,
    isPro: true,
    badge: 'PRO',
  },
  { label: 'Back to Home', path: ROUTES.USER.HOME, icon: Home },

  // {
  //   label: 'Time Slots',
  //   path: '/service-provider/slot-management',
  //   icon: Clock,
  // },
];
