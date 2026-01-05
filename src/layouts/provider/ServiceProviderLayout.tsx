import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/ServiceProvider/Navbar';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import SubscriptionModal from '../../components/ServiceProvider/subscriptionPlan/subscriptionPlan';
import { useEffect, useState } from 'react';
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

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-base-100">
      <Sidebar
        profile={serviceProviderInfo.profileImage}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <SubscriptionModal />

      <div className={`min-h-screen transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        <div className="lg:hidden h-16" />
        <main className="w-full">
          <div className="container mx-auto p-4 lg:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ServiceProviderLayout;
