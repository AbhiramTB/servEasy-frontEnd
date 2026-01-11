import {
  LayoutDashboard,
  Users,
  BadgeCheck,
  Briefcase,
  Layers,
  CalendarCheck,
  FolderCog,
  Settings,
  FileText,
  Wallet,
  CalendarCog,
} from 'lucide-react';
import { ROUTES } from '../../routes';

export const adminLinks = [
  { to: ROUTES.ADMIN.HOME, icon: LayoutDashboard, label: 'Dashboard' },
  { to: ROUTES.ADMIN.USERS, icon: Users, label: 'Users' },
  { to: ROUTES.ADMIN.SERVICE_PROVIDER_VERIFICATION, icon: BadgeCheck, label: 'Provider Verification' },
  { to: ROUTES.ADMIN.SERVICE_PROVIDER_LISTING, icon: Briefcase, label: 'Providers' },
  { to: ROUTES.ADMIN.ALL_SERVICES, icon: Layers, label: 'Service Management' },
  { to: ROUTES.ADMIN.BOOKING_MANAGEMENT, icon: CalendarCheck, label: 'Booking Management' },
  { to: ROUTES.ADMIN.CATEGORY_MANAGEMENT, icon: FolderCog, label: 'Category Management' },
  { to: ROUTES.ADMIN.SITE_SETTINGS, icon: Settings, label: 'Site Settings' },
  { to: ROUTES.ADMIN.SERVICE_PROVIDER_WALLETS, icon: Wallet, label: 'service-provider wallets' },
  { to: ROUTES.ADMIN.subscriptionManagement, icon: CalendarCog, label: 'Subscription-management' },
  { to: ROUTES.ADMIN.LOGS, icon: FileText, label: 'Server Logs' },
  { to: ROUTES.ADMIN.ADSMANAGEMENT, icon: Settings, label: 'ads-management' },
];
