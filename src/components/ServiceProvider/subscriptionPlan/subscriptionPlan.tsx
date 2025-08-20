import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { closeModal } from '../../../redux/slices/subscriptionSlice';
import PlanCard from './PlanCard';
import { getRequest } from '../../../utils/makeRequestInstance';

const plans = [
  {
    _id: '689c646259a0a6f955b46dc2',
    name: 'Premium',
    price: 499,
    validityDays: 30,
    features: ['ads_posting', 'ai chat boat'],
    adLimitPerMonth: 50,
    payoutSpeedDays: 2,
    description: 'Premium plan with unlimited calendar access, ad posting up to 50 per month, and detailed analytics.',
    createdAt: '2025-08-13T10:09:38.556Z',
    updatedAt: '2025-08-13T10:09:38.556Z',
    __v: 0,
  },
];

const SubscriptionModal: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: RootState) => state.subscriptionModal);
  const [plans, setPlans] = useState();
  
  
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await getRequest('/service-providers/subscription-plans');
        setPlans(data.data);
      } catch (error) {
        console.error("Error fetching subscription plans:", error);
      }
    };
    
    fetchPlans();
  }, []);
  if (!isOpen) return null;
  const handleSubscribe = async () => {
    try {
      console.log('Payment flow started...');
      // await axios.post("/api/subscribe", { planId: plans[0]._id });

      dispatch(closeModal());
    } catch (err) {
      console.error('Subscription failed', err);
    }
  };

  return (
    <dialog className=" modal modal-open">
      <div className=" modal-box">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 mb-4 border-b">
          <h3 className="text-lg font-bold">Subscribe to a Plan</h3>
          <button className="btn btn-sm btn-circle btn-ghost" onClick={() => dispatch(closeModal())}>
            ✕
          </button>
        </div>

        {/* Plan Card */}
        <div className="flex justify-center">{plans && <PlanCard plan={plans[0]} onSubscribe={handleSubscribe} />}</div>
      </div>
      {/* Background overlay */}
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => dispatch(closeModal())}>close</button>
      </form>
    </dialog>
  );
};

export default SubscriptionModal;
