import { useEffect, useState } from 'react';
import { getRequest } from './utils/makeRequestInstance';
import { ICoupon } from './utils/types/ICoupon';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Sample = () => {
  const [coupons, setCoupons] = useState<ICoupon[]>([]);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [dismissed, setDismissed] = useState<string[]>([]);
  const location = useLocation();

  const fetchCoupons = async () => {
    try {
      const res = await getRequest('/coupons/featured');
      setCoupons(res.data);
    } catch (error) {
      console.error('Error fetching coupons:', error);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  useEffect(() => {
    setVisibleIndex(0); // reset on route change
  }, [location.pathname]);

  const handleDismiss = (id?: string) => {
    if (!id) return;
    setDismissed(prev => [...prev, id]);
  };

  const activeCoupons = coupons.filter(c => !dismissed.includes(c._id || ''));
  const visibleCoupon = activeCoupons[visibleIndex] || null;

  if (!visibleCoupon) return null;

  return (
    <div className="flex items-center justify-between px-4 py-2 text-white rounded-none shadow-md bg-primary">
      <div>
        <p className="text-sm font-semibold md:text-base">
          🎉 Use <span className="underline">{visibleCoupon.code}</span> & save ₹{visibleCoupon.discountValue}!
        </p>
        <p className="text-xs md:text-sm opacity-80">{visibleCoupon.description || 'Grab it before it expires!'}</p>
      </div>

      <div className="flex gap-2">
        <a href="/coupons" className="btn btn-sm btn-secondary">
          View
        </a>
        <button
          onClick={() => handleDismiss(visibleCoupon._id)}
          className="text-white btn btn-sm btn-ghost hover:text-red-200"
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Sample;
