import { User, Calendar, LogOut } from 'lucide-react';

export const userDropdownLinks = [
  {
    type: 'link',
    to: '/myprofile',
    icon: User,
    label: 'My Account',
  },
  {
    type: 'link',
    to: '/myprofile/booked-services/',
    icon: Calendar,
    label: 'Your Bookings',
  },
  {
    type: 'divider',
  },
  {
    type: 'action',
    icon: LogOut,
    label: 'Logout',
    variant: 'danger',
  },
] as const;
