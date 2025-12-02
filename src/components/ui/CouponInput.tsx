import { useState } from 'react';
import { HotToastError, } from '../../utils/notificationToast';

interface CouponInputProps {
  bookingId: string;
  handleApply: (code: string) => void;
  currentCoupon:string|null
  handleRemoveCoupon:()=>void;
}

const CouponInput: React.FC<CouponInputProps> = ({  handleApply,currentCoupon ,handleRemoveCoupon}) => {
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(currentCoupon);

  const handleApplyCoupon = async () => {
    if (!coupon.trim()) {
      HotToastError('Please enter a coupon code');
      return;
    }

    handleApply(coupon);

    setAppliedCoupon(coupon.trim());
  };


  const handleRemove =async ()=>{
     
       handleRemoveCoupon()

      setAppliedCoupon(null);
      setCoupon('');
  }
 

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={coupon}
          onChange={e => setCoupon(e.target.value)}
          placeholder="Enter coupon code"
          disabled={!!appliedCoupon }
          className="flex-1 input input-bordered"
        />
        {appliedCoupon ? (
          <button onClick={handleRemove} className="text-white bg-red-500 btn hover:bg-red-600" >
            Remove
          </button>
        ) : (
          <button
            onClick={handleApplyCoupon}
            disabled={!coupon.trim() }
            className="text-white btn bg-success hover:bg-success/90 disabled:opacity-50"
          >
            Apply
          </button>
        )}
      </div>
      {appliedCoupon && (
        <p className="mt-2 text-sm text-green-600">
          Coupon <strong>{appliedCoupon}</strong> is applied.
        </p>
      )}
    </div>
  );
};

export default CouponInput;
