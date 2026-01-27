import { IBannerCoupon } from '../../utils/types/ICoupon';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link } from 'react-router-dom';

dayjs.extend(relativeTime);

interface Iprop {
  skipIndex: number;
  fetchCoupon: (skip: number) => void;
  coupon: IBannerCoupon;
  setSkipIndex: (skip: number) => void;
  totalCoupons: number;
  setHideBanner: (state: boolean) => void;
}

const CouponBanner: React.FC<Iprop> = ({
  setHideBanner,
  fetchCoupon,
  coupon,
  totalCoupons,
  skipIndex,
  setSkipIndex,
}) => {
  const handleNext = () => {
    if (skipIndex + 1 < totalCoupons) {
      const nextIndex = skipIndex + 1;
      setSkipIndex(nextIndex);
      fetchCoupon(nextIndex);
    }
  };

  const handlePrev = () => {
    if (skipIndex > 0) {
      const prevIndex = skipIndex - 1;
      setSkipIndex(prevIndex);
      fetchCoupon(prevIndex);
    }
  };

  if (!coupon) return null;

  const timeLeft = dayjs(coupon.validTo).fromNow(true);

  return (
    <div className="fixed top-0 left-0 z-50 w-full text-base-100 bg-base-content">
      <div className="container px-4 py-2 mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Left content */}
          <div className="flex items-center gap-2 text-sm">
            <span>🎟️</span>
            <span>
              Save ₹{coupon.discountValue} with code <strong className="font-bold">{coupon.code}</strong>
            </span>
            <span className="hidden md:inline text-base-300">• {coupon.description}</span>
            <span className="hidden lg:inline text-base-200">
              • Expires {4} ({timeLeft} left)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex  text-sm items-center ">
              <button
                onClick={handlePrev}
                disabled={skipIndex === 0}
                className="disabled:opacity-30  text-primary hover:text-yellow-400"
                aria-label="Previous coupon"
              >
                ←
              </button>

              <span className="  font-mono">
                {skipIndex + 1}/{totalCoupons}
              </span>

              <button
                onClick={handleNext}
                disabled={skipIndex + 1 >= totalCoupons}
                className="disabled:opacity-30 text-primary  hover:text-yellow-400"
                aria-label="Next coupon"
              >
                →
              </button>
            </div>

            <Link to={'/coupons'} className="text-sm transition-colors hover:text-white/80">
              View All →
            </Link>
            <button onClick={() => setHideBanner(true)} className="ml-2 transition-colors  hover:text-primary">
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponBanner;
