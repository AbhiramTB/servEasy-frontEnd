import React from 'react';
import { ISubscriptionPlan } from '../../../utils/types/ISubscriptionPlan';

interface Props {
  plan: ISubscriptionPlan;
  onEdit: (plan: ISubscriptionPlan) => void;
}

const PlanCard: React.FC<Props> = ({ plan, onEdit }) => {
  return (
    <div className="bg-base-200 p-5 rounded-xl shadow space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{plan.name}</h2>
        <span className="badge badge-success">₹{plan.price}</span>
      </div>

      <p className="text-sm">Validity: {plan.validityDays} days</p>
      <p className="text-sm">Ads / Month: {plan.adLimitPerMonth}</p>
      <p className="text-sm">Payout in: {plan.payoutSpeedDays} days</p>

      <div className="flex flex-wrap gap-1">
        {plan.features.map((f, i) => (
          <span key={i} className="badge badge-outline text-xs">
            {f}
          </span>
        ))}
      </div>

      <p className="text-sm text-gray-500">{plan.description}</p>

      <button onClick={() => onEdit(plan)} className="btn btn-sm btn-outline w-full mt-2">
        Edit Plan
      </button>
    </div>
  );
};

export default PlanCard;
