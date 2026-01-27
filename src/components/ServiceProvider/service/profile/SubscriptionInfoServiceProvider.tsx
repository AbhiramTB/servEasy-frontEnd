import dayjs from 'dayjs';
import { ISubscription } from '../../../../utils/types/ISubscription';
interface SubscriptionInfoProps {
  subscriptions: ISubscription[];
}

const getStatusBadgeClass = (status?: string) => {
  switch (status?.toLowerCase()) {
    case 'active':
      return 'badge badge-success';
    case 'expired':
      return 'badge badge-error';
    case 'pending':
      return 'badge badge-warning';
    default:
      return 'badge';
  }
};

const SubscriptionInfoServiceProvider = ({ subscriptions }: SubscriptionInfoProps) => {
  return (
    <div className="space-y-4">
      {subscriptions.map(subscription => (
        <div
          key={subscription.planId + subscription.createdAt}
          className="p-4 border rounded-lg bg-base-50 border-base-300"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="text-sm font-medium text-base-content/70">Start Date</label>
              <p className="text-base font-medium">{dayjs(subscription.startDate).format('MMM DD, YYYY')}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-base-content/70">End Date</label>
              <p className="text-base font-medium">{dayjs(subscription.endDate).format('MMM DD, YYYY')}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-base-content/70">Duration</label>
              <p className="text-base font-medium">
                {dayjs(subscription.endDate).diff(dayjs(subscription.startDate), 'day')} days
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-base-content/70">Status</label>
              <div className="mt-1">
                <span className={getStatusBadgeClass(subscription.status)}>
                  {subscription.status?.charAt(0).toUpperCase() + subscription.status?.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {subscription.status?.toLowerCase() === 'active' && (
            <div className="mt-3 text-sm text-success">
              <svg className="inline w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Your subscription is currently active
            </div>
          )}

          {subscription.status?.toLowerCase() === 'expired' && (
            <div className="mt-3 text-sm text-error">
              <svg className="inline w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              This subscription has expired
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SubscriptionInfoServiceProvider;
