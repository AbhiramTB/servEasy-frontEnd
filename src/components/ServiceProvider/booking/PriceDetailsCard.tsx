import React from 'react';
import { Ipayment } from '../../../utils/types/Ipayment';

interface PriceDetailsCardProps {
  payment: Ipayment;
}

const PriceDetailsCard: React.FC<PriceDetailsCardProps> = ({ payment }) => {
  const {
    serviceCost = 0,
    materialCost = 0,
    travelCost = 0,
    inspectionCost = 0,
    total,
    convenienceFee = 0,
  } = payment;

  const earnings = Math.floor(total - convenienceFee);

  return (
    <div className="shadow card bg-base-100">
      <div className="p-4 card-body">
        <h3 className="text-base card-title">Price Details</h3>
        <div className="space-y-1 text-sm">
          {serviceCost > 0 && (
            <div className="flex justify-between">
              <span>Service Cost</span>
              <span>₹{serviceCost}</span>
            </div>
          )}

          {materialCost > 0 && (
            <div className="flex justify-between">
              <span>Material Cost</span>
              <span>₹{materialCost}</span>
            </div>
          )}

          {travelCost > 0 && (
            <div className="flex justify-between">
              <span>Travel Cost</span>
              <span>₹{travelCost}</span>
            </div>
          )}

          {inspectionCost > 0 && (
            <div className="flex justify-between">
              <span>Inspection Cost</span>
              <span>₹{inspectionCost}</span>
            </div>
          )}

          <div className="my-1 divider" />

          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          {convenienceFee > 0 && (
            <div className="flex justify-between mt-1 text-xs opacity-75">
              <span>Convenience Fee (10%)</span>
              <span>₹{convenienceFee}</span>
            </div>
          )}

          {convenienceFee > 0 && (
            <div className="flex justify-between mt-1 text-xs opacity-75">
              <span>Your Earnings</span>
              <span>₹{earnings}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceDetailsCard;
