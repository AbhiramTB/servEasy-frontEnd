import dayjs from 'dayjs';
import { IUserCoupon } from '../../utils/types/IUserCoupon';

interface CouponCardProps {
  coupon: IUserCoupon;
}

const CouponCard: React.FC<CouponCardProps> = ({ coupon }) => {
  return (
    <div className="relative w-80 bg-base-100 border border-base-300 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      {/* <div className={`absolute top-0 left-0 w-1.5 h-full ${coupon.isActive ? 'bg-primary' : 'bg-base-300'}`}></div> */}

      <div className="p-5 pl-7">
        <div className="flex justify-between items-start mb-3">
          <div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Coupon Code</span>
            <h2 className="text-xl font-black text-base-content tracking-tight uppercase leading-none mt-1">
              {coupon.code}
            </h2>
          </div>
          <div
            className={`badge badge-sm font-bold ${coupon.isActive ? 'badge-primary badge-outline' : 'badge-ghost opacity-50'}`}
          >
            {coupon.isActive ? 'ACTIVE' : 'INACTIVE'}
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-base-content leading-none">{coupon.discountValue} ₹</span>
            <span className="text-xs font-bold text-base-content/40 uppercase tracking-widest">Off</span>
          </div>
          <p className="text-xs text-base-content/60 mt-1 font-medium italic">
            {coupon.description || 'Applicable on all orders'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-y-3 pt-3 border-t border-base-200">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase font-bold text-base-content/40">Starts</span>
            <span className="text-[11px] font-bold text-base-content">
              {dayjs(coupon.validFrom).format('DD MMM YYYY')}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[9px] uppercase font-bold text-base-content/40">Ends</span>
            <span className="text-[11px] font-bold text-error">{dayjs(coupon.validTo).format('DD MMM YYYY')}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] uppercase font-bold text-base-content/40">Min. Purchase</span>
            <span className="text-[11px] font-bold text-base-content">₹{coupon.minOrderAmount}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[9px] uppercase font-bold text-base-content/40">Redeemed</span>
            <span className="text-[11px] font-bold text-base-content">
              {coupon.usedCount} / {coupon.usageLimit}
            </span>
          </div>
        </div>
      </div>

      {coupon.showInBanner && (
        <div className="bg-primary/5 py-1 text-center border-t border-primary/10">
          <span className="text-[9px] font-black text-primary uppercase tracking-widest">Featured Offer</span>
        </div>
      )}
    </div>
  );
};

export default CouponCard;
