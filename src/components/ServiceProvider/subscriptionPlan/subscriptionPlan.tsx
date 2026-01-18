import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { closeModal } from '../../../redux/slices/subscriptionSlice';
import PlanCard from './PlanCard';
import { getRequest } from '../../../utils/makeRequestInstance';
import { ISubscriptionPlan } from '../../../utils/types/ISubscriptionPlan';

const SubscriptionModal: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: RootState) => state.subscriptionModal);
  const [plans, setPlans] = useState<ISubscriptionPlan[] | []>([]);
  const serviceProviderInfo = useSelector((state: RootState) => state.serviceProvider);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (serviceProviderInfo.isProServiceProvider) {
      return;
    }
    const fetchPlans = async () => {
      try {
        const data = await getRequest('/service-providers/subscription-plans');
        setPlans(data.data);
      } catch (error) {
        console.error('Error fetching subscription plans:', error);
      }
    };

    fetchPlans();
  }, []);

  if (!isOpen || !plans) return null;

  return (
    <>
      {plans.length > 0 && (
        <dialog className=" modal modal-open">
          <div className=" modal-box">
            <div className="flex items-center justify-between pb-2 mb-4 border-b">
              <h3 className="text-lg font-bold">Subscribe to a Plan</h3>
              <button className="btn btn-sm btn-circle btn-ghost" onClick={() => dispatch(closeModal())}>
                ✕
              </button>
            </div>

            {plans.map(plan => (
              <>
                <div className="flex justify-center">
                  {plans && (
                    <>
                      <PlanCard
                        plan={plan}
                        key={plan._id}
                        loading={loading}
                        setLoading={(state: boolean) => setLoading(state)}
                      />
                    </>
                  )}
                </div>
              </>
            ))}
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => dispatch(closeModal())}>close</button>
          </form>
        </dialog>
      )}
    </>
  );
};

export default SubscriptionModal;
