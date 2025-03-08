import { Outlet } from 'react-router-dom'
import Navbar from '../components/ServiceProvider/Navbar'
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
const ServiceProviderLayout = () => {
    const serviceProviderInfo = useSelector(
        (state: RootState) => state.serviceProvider
      );
  return (
    <div>
      <Navbar profile={serviceProviderInfo.profileImage} ></Navbar>
      <Outlet/>
    </div>
  )
}

export default ServiceProviderLayout
