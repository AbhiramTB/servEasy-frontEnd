import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import Navbar from '../../components/User/Navbar';
import Footer from '../../components/ui/Footer';
import { useEffect, useState } from 'react';
import CouponBanner from '../../components/ui/CouponBanner';
import { getRequest } from '../../utils/makeRequestInstance';
import { IBannerCoupon } from '../../utils/types/ICoupon';

const UserLayout = () => {
  const location = useLocation();
  const shouldHideFooter = location.pathname.startsWith('/chat') || location.pathname.startsWith('/video-call');
  const [scrolled, setScrolled] = useState(false);

  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const [coupon, setCoupon] = useState<IBannerCoupon | null>(null);
  const [skipIndex, setSkipIndex] = useState(0);
  const [totalCoupons, setTotalCoupons] = useState(0);
  const [hideBanner, setHideBanner] = useState(false);

  const fetchCoupon = async (skip: number) => {
    try {
      const res = await getRequest(`/coupons/featured?skip=${skip}`);
      if (res.data?.coupon) {
        setCoupon(res.data.coupon);
        setTotalCoupons(res.data.total);
        setHideBanner(false);
      } else {
        setCoupon(null);
        setHideBanner(true);
      }
    } catch (error) {
      console.error('Error fetching coupon:', error);
      setHideBanner(true);
    }
  };

  useEffect(() => {
    if (!accessToken) return;
    fetchCoupon(skipIndex);
  }, []);

  useEffect(() => {
    if (!accessToken) navigate('/', { replace: true });
  }, [accessToken, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen">
      {!scrolled && !hideBanner && coupon && (
        <CouponBanner
          skipIndex={skipIndex}
          setHideBanner={(status: boolean) => setHideBanner(status)}
          totalCoupons={totalCoupons}
          coupon={coupon}
          fetchCoupon={(skip: number) => fetchCoupon(skip)}
          setSkipIndex={(skip: number) => setSkipIndex(skip)}
        />
      )}

      <div className={`${!scrolled && !hideBanner && coupon ? 'mt-9' : 'mt-0'}`}>
        <Navbar scrolled={scrolled} />
      </div>

      <div className="flex-grow  bg-base-100 bg-diagonal-grid">
        <Outlet />
      </div>

      {!shouldHideFooter && <Footer />}
    </div>
  );
};

export default UserLayout;
