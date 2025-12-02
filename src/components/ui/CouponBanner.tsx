import { useEffect, useState } from 'react';
import { getRequest } from '../../utils/makeRequestInstance'; 
import { IBannerCoupon } from '../../utils/types/ICoupon'; 
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface Iprop {
  isBannerHidden: (action: boolean) => void;
}

const CouponBanner: React.FC<Iprop> = ({ isBannerHidden }) => {
  const [coupon, setCoupon] = useState<IBannerCoupon | null>(null);
  const [skipIndex, setSkipIndex] = useState(0);
  const [totalCoupons, setTotalCoupons] = useState(0);
  const [hideBanner, setHideBanner] = useState(false);
  const location = useLocation();

  const fetchCoupon = async (skip = 0) => {
    try {
      const res = await getRequest(`/coupons/featured?skip=${skip}`);
      if(res.data.coupon&&res.data.total){
        setCoupon(res.data.coupon);
        setTotalCoupons(res.data.total);
            isBannerHidden(false);

      }else{

            isBannerHidden(true);

      }
    } catch (error) {
      console.error('Error fetching coupon:', error);
    }
  };

  useEffect(() => {
    fetchCoupon(0);
    setSkipIndex(0);
  }, []);

  useEffect(() => {
    fetchCoupon(skipIndex);
  }, [skipIndex]);

  useEffect(() => {
    setSkipIndex(0);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setHideBanner(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  const handleDismiss = () => {
    if (skipIndex + 1 >= totalCoupons) {
      setCoupon(null);
      isBannerHidden(true);
    } else {
      setSkipIndex(prev => prev + 1);
    }
  };




  if (!coupon || hideBanner)   return null;
  

  

  const timeLeft = dayjs(coupon.validTo).fromNow(true);
  const endDate = dayjs(coupon.validTo).format('DD MMM YYYY');

  return (
    <div className="fixed top-0 left-0 z-50 w-full text-white bg-slate-800">
      <div className="container px-4 py-2 mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Left content */}
          <div className="flex items-center gap-2 text-sm">
            <span>🎟️</span>
            <span>
              Save ₹{coupon.discountValue} with code <strong className="font-bold">{coupon.code}</strong>
            </span>
            <span className="hidden md:inline text-white/80">• {coupon.description}</span>
            <span className="hidden lg:inline text-white/70">
              • Expires {endDate} ({timeLeft} left)
            </span>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <a href="/coupons" className="text-sm transition-colors hover:text-white/80">
              View All →
            </a>
            <button
              onClick={handleDismiss}
              className="ml-2 transition-colors text-white/70 hover:text-white"
              aria-label="Dismiss coupon"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponBanner;
