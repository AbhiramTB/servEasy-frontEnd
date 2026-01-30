import { useEffect, useState } from 'react';
import { ICoupon } from '../../../utils/types/ICoupon';
import { CouponForm } from './CouponForm';
import { CouponCard } from './CouponCard';
import { adminGetRequest, adminPatchRequest, adminPostRequest } from '../../../utils/AxiosAdmin';
import { HotToastSuccess } from '../../../utils/notificationToast';

export const CouponListPage: React.FC = () => {
  const [addNewCoupon, setNewCoupon] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState<ICoupon[]>([]);

  const fetchCoupons = async () => {
    const res = await adminGetRequest('/admin/coupons');

    setCoupons(res.data);
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleToggleBanner = async (id: string, current: boolean) => {
    await adminPatchRequest(`/admin/coupons/${id}/banner`, { action: !current });
    fetchCoupons();
  };

  const handleDeactivate = async (id: string, action: boolean) => {
    await adminPatchRequest(`/admin/coupons/${id}/deactivate`, { action });
    fetchCoupons();
  };

  const handleCreateCoupon = async (data: ICoupon) => {
    try {
      setLoading(true);
      const res = await adminPostRequest('/admin/coupons', { data: data });
      if (res.status === 201) {
        HotToastSuccess('coupon has been successfully added');
        fetchCoupons();
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6 ">
      <h1 className="text-2xl font-bold">Coupon Management</h1>
      <div>
        <button onClick={() => setNewCoupon(!addNewCoupon)} className="p-4 rounded-md text-base-200 bg-primary">
          {addNewCoupon ? 'close coupon model ' : 'Add New Coupon'}
        </button>
      </div>

      {addNewCoupon ? (
        <CouponForm onSubmit={handleCreateCoupon} isLoading={loading} />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {coupons.length > 0 &&
            coupons.map(coupon => (
              <CouponCard
                key={coupon._id}
                coupon={coupon}
                onToggleBanner={handleToggleBanner}
                onDeactivate={handleDeactivate}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default CouponListPage;
