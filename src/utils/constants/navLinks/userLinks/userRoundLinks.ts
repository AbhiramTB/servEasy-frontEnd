// nav/userRoundLinks.ts
import { MessageCircle, Bell } from 'lucide-react';

export type RoundNavLinkId = 'chat' | 'notification';

export const userRoundLinks: {
  id: RoundNavLinkId;
  icon: React.ElementType;
  ariaLabel: string;
}[] = [
  {
    id: 'chat',
    icon: MessageCircle,
    ariaLabel: 'Open Chat',
  },
  {
    id: 'notification',
    icon: Bell,
    ariaLabel: 'Notifications',
  },
];
