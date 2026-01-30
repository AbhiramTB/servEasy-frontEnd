import { Outlet } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import SubscriptionModal from '../../components/ServiceProvider/subscriptionPlan/subscriptionPlan';
import { useEffect, useState } from 'react';
import Sidebar from '../../components/ServiceProvider/sideBar/Sidebar';
import useFetchServiceProviderProfile from '../../hooks/useFetchServiceProviderProfile';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { getRequest } from '../../utils/makeRequestInstance';
import { apiEndPointServiceProvider } from '../../utils/constant';
import ServiceProviderLanding from '../../components/ui/Landing/serviceProviderLanding/ServiceProviderLandingPage';

const ServiceProviderLayout = () => {
  // const [status, setStatus] = useState<
  //   { hasProvider: false } | { hasProvider: true; status: IServiceProviderStatus }
  // >();

  // const getServiceProviderStatus = async () => {
  //   const res = await getRequest(apiEndPointServiceProvider.STATUS);
  //   if (res.status == 200) {
  //     await getProfile();
  //     setStatus(res.data);
  //   }
  // };

  const serviceProviderInfo = useSelector((state: RootState) => state.serviceProvider);

  const [isLoading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  const getProfile = useFetchServiceProviderProfile();

  const verifyServiceProvider = async () => {
    try {
      const res = await getRequest(apiEndPointServiceProvider.verifyServiceProvider);
      if (res.status === 200) {
        setIsVerified(true);
        await getProfile();
      } else {
        setIsVerified(false);
      }
    } catch {
      setIsVerified(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyServiceProvider();
    // getServiceProviderStatus();
  }, []);

  // useEffect(() => {
  //   if (!isLoading && isVerified === false) {
  //     navigate('/landingSp', { replace: true });
  //   }
  // }, [isLoading, isVerified]);

  if (!isLoading && isVerified === false) {
    return <ServiceProviderLanding />;
  }

  if (isLoading || isVerified === null) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-base-100 bg-grid-pattern ">
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
