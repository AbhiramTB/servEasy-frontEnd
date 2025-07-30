import {
  LayoutDashboard, Users, BadgeCheck, Briefcase, Layers,
  CalendarCheck, FolderCog, Settings, FileText,
} from 'lucide-react';

export const adminLinks = [
  { to: '/admin/home', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/users', icon: Users, label: 'Users' },
  { to: '/admin/serviceProvider/verification', icon: BadgeCheck, label: 'Provider Verification' },
  { to: '/admin/serviceProvider', icon: Briefcase, label: 'Providers' },
  { to: '/admin/service', icon: Layers, label: 'Service Management' },
  { to: '/admin/booking-management', icon: CalendarCheck, label: 'Booking Management' },
  { to: '/admin/category-management', icon: FolderCog, label: 'Category Management' },
  { to: '/admin/site-settings', icon: Settings, label: 'Site Settings' },
  { to: '/admin/logs', icon: FileText, label: 'Server Logs' },
];

