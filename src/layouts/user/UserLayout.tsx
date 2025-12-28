import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import Navbar from '../../components/User/Navbar';
import Footer from '../../components/ui/Footer';
import { useEffect, useState } from 'react';
import CouponBanner from '../../components/ui/CouponBanner';

const UserLayout = () => {
  const location = useLocation();
  const shouldHideFooter = location.pathname.startsWith('/chat');
  const [scrolled, setScrolled] = useState(false);
  const [hideBanner, sethideBanner] = useState(false);

  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  useEffect(() => {
    if (!accessToken) navigate('/signIn', { replace: true });
  }, [accessToken, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  console.log(hideBanner + '   banner state');
  return (
    <div className="relative flex flex-col min-h-screen">
      {!scrolled && !hideBanner && <CouponBanner isBannerHidden={(action: boolean) => sethideBanner(action)} />}

      <div className={`${!scrolled && !hideBanner ? 'mt-9' : ''}`}>
        <Navbar scrolled={scrolled} />
      </div>

      <div className="flex-grow  bg-base-100 bg-grid-pattern">
        <Outlet />
      </div>

      {!shouldHideFooter && <Footer />}
    </div>
  );
};

export default UserLayout;
