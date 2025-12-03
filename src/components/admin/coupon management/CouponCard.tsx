import React from 'react';
import dayjs from 'dayjs';
import { ICoupon } from '../../../utils/types/ICoupon';
import { BadgePercent, Eye, EyeOff, XCircle, CheckCircle } from 'lucide-react';

interface CouponCardProps {
  coupon: ICoupon;
  onToggleBanner?: (id: string, current: boolean) => void;
  onDeactivate?: (id: string, action: boolean) => void;
}

export const CouponCard: React.FC<CouponCardProps> = ({ coupon, onToggleBanner, onDeactivate }) => {
  const isExpired = dayjs(coupon.validTo).isBefore(dayjs());

  const formatDate = (date: Date) => {
    return dayjs(date).format('DD MMM, YYYY');
  };

  return (
    <div
      className={`border rounded-md shadow-sm p-3 bg-base-100 border-base-300 hover:shadow-md transition-all text-sm ${
        isExpired ? 'opacity-60 ' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-1">
        <h2 className="flex items-center gap-1 font-semibold text-base-content">
          <BadgePercent className="w-4 h-4 text-primary" />
          {coupon.code}
        </h2>
        {coupon.showInBanner && (
          <div className="tooltip" data-tip="Featured in banner">
            <span className="badge badge-accent badge-sm">Featured</span>
          </div>
        )}
      </div>

      {coupon.description && <p className="mb-2 text-xs text-base-content/70 line-clamp-2">{coupon.description}</p>}

      <div className="mb-1 text-sm font-semibold text-primary">₹{coupon.discountValue} OFF</div>

      <div className="mb-2 text-xs text-base-content/70">
        <span className="font-medium">Valid:</span> {formatDate(coupon.validFrom)} - {formatDate(coupon.validTo)}
        {isExpired && <span className="ml-2 font-semibold text-error">(Expired)</span>}
      </div>

      {!isExpired && (
        <div className="flex justify-end gap-2 mt-2">
          <div className="tooltip" data-tip={coupon.showInBanner ? 'Remove from banner' : 'Show in banner'}>
            <button
              className={`btn btn-xs ${coupon.showInBanner ? 'btn-outline btn-accent' : 'btn-accent'}`}
              onClick={() => onToggleBanner?.(coupon._id!, coupon.showInBanner)}
            >
              {coupon.showInBanner ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {coupon.isActive ? (
            <div className="tooltip" data-tip="Deactivate Coupon">
              <button className="btn btn-xs btn-outline btn-error" onClick={() => onDeactivate?.(coupon._id!, false)}>
                <XCircle className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="tooltip" data-tip="Activate Coupon">
              <button className="btn btn-xs btn-outline btn-success" onClick={() => onDeactivate?.(coupon._id!, true)}>
                <CheckCircle className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
