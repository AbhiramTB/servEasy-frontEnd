import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../../components/ServiceProvider/Navbar';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import SubscriptionModal from '../../components/ServiceProvider/subscriptionPlan/subscriptionPlan';
import { useEffect } from 'react';
const ServiceProviderLayout = () => {
  const navigate = useNavigate();
  const serviceProviderInfo = useSelector((state: RootState) => state.serviceProvider);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!user || !user.serviceProvider) {
      navigate('/', { replace: true });
      return;
    }
  }, [user]);
  return (
    <div>
      <Navbar profile={serviceProviderInfo.profileImage}></Navbar>
      <SubscriptionModal />
      <div className="bg-base-100 bg-grid-pattern">
        <Outlet />
      </div>
    </div>
  );
};

export default ServiceProviderLayout;
