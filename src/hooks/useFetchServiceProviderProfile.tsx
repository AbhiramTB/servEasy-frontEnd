


import { useDispatch } from 'react-redux';
import { getRequest } from '../utils/makeRequestInstance';
import { apiEndPointServiceProvider } from '../utils/constant';
import { addServiceProvider } from '../redux/slices/serviceProvider';
const useFetchServiceProviderProfile = () => {
    const dispatch = useDispatch();
   const getServiceProvider = async () => {
     try {
       const res = await getRequest(apiEndPointServiceProvider.getServiceProvider);
           console.log(res.data.serviceProvider)
       dispatch(addServiceProvider(res.data.serviceProvider));
     } catch (error) {
       console.error('Error fetching service provider:', error);
     }
   };

   return getServiceProvider
}

export default useFetchServiceProviderProfile
