import { FC, useMemo } from 'react';
import { Crown, BadgeX } from 'lucide-react';
import { ISubscription } from '../types/ISubscription';

interface Props {
  subscriptions?: ISubscription[];
  isSubscribedProvider?: boolean;
}

const SubscriptionIcon: FC<Props> = ({ subscriptions, isSubscribedProvider }) => {
  // if ((!subscriptions || subscriptions.length === 0) && !isSubscribedProvider) {
  //   return;
  // }
  const isActive = useMemo(() => {
    if (!subscriptions || subscriptions.length === 0) return false;

    const today = new Date();

    return subscriptions.some(sub => {
      const start = new Date(sub.startDate);
      const end = new Date(sub.endDate);

      return start <= today && today <= end && sub.status === 'active';
    });
  }, [subscriptions]);

  return (
    <div className="flex items-center">
      {isActive || isSubscribedProvider ? (
        <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full shadow-sm border border-yellow-300">
          <Crown className="w-4 h-4 text-yellow-600" />
          <span className="text-sm font-semibold">Pro Service Provider</span>
        </div>
      ) : (
        <div className="flex items-center gap-1 text-gray-400">
          <BadgeX className="w-4 h-4" />
          <span className="text-sm">No Subscription</span>
        </div>
      )}
    </div>
  );
};

export default SubscriptionIcon;
