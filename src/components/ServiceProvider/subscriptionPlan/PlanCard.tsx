import React from 'react';
import RazorpayButton from '../../ui/PaymentButton';
import { HotToastError, HotToastSuccess } from '../../../utils/notificationToast';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

interface Plan {
  _id: string;
  name: string;
  price: number;
  validityDays: number;
  features: string[];
  description: string;
  adLimitPerMonth: number;
  payoutSpeedDays: number;
}

interface PlanCardProps {
  plan: Plan;
  onSubscribe?: () => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, onSubscribe }) => {
  const serviceProvider = useSelector((state: RootState) => state.serviceProvider);
  return (
    <div className="shadow-sm w-96 card bg-base-100">
      <div className="card-body">
        <span className="badge badge-xs badge-warning">Most Popular</span>
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold">{plan.name}</h2>
          <span className="text-xl">
            ₹{plan.price}/{plan.validityDays}d
          </span>
        </div>
        <p className="mt-2 text-sm opacity-70">{plan.description}</p>

        <ul className="flex flex-col gap-2 mt-6 text-sm">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block w-4 h-4 mr-2 text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {onSubscribe && (
          <div className="mt-6">
            <RazorpayButton
              onSuccess={() => HotToastSuccess('Subscription activated successfully. Welcome to Premium!')}
              buttonStyle={{
                className: 'p-3 text-base font-bold w-full text-primary-content rounded-md hover:bg-opacity-45 bg-primary',
                buttonText: `Subscribe Now`,
              }}
              createOrderApi="/payment/subscription/createOrder"
              customerInfo={{
                email: serviceProvider.serviceProviderEmail || '',
                phone: serviceProvider.serviceProviderPhone || '',
                userName: serviceProvider.serviceProviderName || '',
              }}
              onError={() => HotToastError('your attempted transaction was unsuccessful')}
              payload={{ planId: plan._id }}
              total={plan.price}
              verifyApi={'/payment/subscription/verify'}
            />{' '}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanCard;
