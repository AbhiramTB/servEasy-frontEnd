import React, { useState, useEffect } from 'react';
import { getRequest } from '../../utils/makeRequestInstance';
import EmptyState from '../../components/ui/EmptyState';
import { IUserCoupon } from '../../utils/types/IUserCoupon';
import CouponCard from '../../components/ui/CouponCard';

const CouponsPage: React.FC = () => {
  const [coupons, setCoupons] = useState<IUserCoupon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        setLoading(true);
        const response = await getRequest('/coupons/');

        if (response.status == 200) {
          setCoupons(response.data.data);
          setError('');
        }
      } catch (err) {
        setError('Failed to fetch coupons');
        console.error('Error fetching coupons:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-base-content/70 text-lg">Loading coupons...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="alert alert-error max-w-md">
          <EmptyState></EmptyState>

          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className=" py-8 px-4 ">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-2 tracking-tight">Active Coupons</h1>
          <p className="text-sm md:text-base text-base-content/60">Save more with our exclusive discount codes</p>
        </div>

        {/* Responsive Grid System */}
        {/* 1 col on mobile, 2 on medium, 3 on large. 'justify-items-center' keeps w-80 cards centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {coupons.map(coupon => (
            <div key={coupon._id} className="w-full flex justify-center">
              <CouponCard coupon={coupon} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {coupons.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-20 opacity-80">
            <EmptyState
              icon="no-data"
              title="No active coupons available"
              message="Check back later for new deals!"
              actionText="Browse Products"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CouponsPage;
