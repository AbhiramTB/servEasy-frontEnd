import { useState } from 'react';
import { getRequest } from '../../../utils/makeRequestInstance';
import { serviceEndPoint } from '../../../utils/constant';

import { Link } from 'react-router-dom';
import ServiceBookingCard from '../../User/bookService/bookedServiceList/BookedServiceCard';
import Pagination from '../../ui/Pagination';

interface Address {
  name: string;
  houseName: string;
  pincode: string;
  state: string;
  phone: string;
  _id: string;
}

interface Booking {
  _id: string;
  serviceStatus: 'pending' | 'in-progress' | 'completed' | 'cancelled' | 'confirmed';
  paymentType: string;
  serviceBookedAddress: Address;
  serviceName: string;
  serviceType: string;
  serviceImage: string;
  isOnlineService?: boolean;
  bookedTime?: Date;
  estimatedServiceTime?: Date;
}

const BookedServiceServiceProvider = () => {
  const dataLimit = 4;
  const [bookedServices, setBookedServices] = useState<Booking[]>([]);
  const [crrPage, setCrrPage] = useState<number>(0);
  const [totaldata, setTotaldata] = useState<number>(0);

  const getBookedService = async (page: number) => {
    try {
      const res = await getRequest(`${serviceEndPoint.getServiceProviderBookService}?page=${page}&limit=${dataLimit}`);
      setCrrPage(page);
      console.log(res);

      if (res.status === 200) {
        console.log(res.data.services);

        setBookedServices(res.data.services);
        setTotaldata(res.data.count);
      }
    } catch (error) {
      console.error('Error fetching booked services', error);
    }
  };

  return (
    <div className="p-4 bg-base-100">
      <h1 className="mb-4 text-xl font-bold">Booked Services</h1>
      {bookedServices.length > 0 ? (
        <div className="grid gap-4 ">
          {bookedServices.map(service => (
            <Link
              to={
                service.serviceType === 'Online'
                  ? `/service-provider/booked-services-online/${service._id}`
                  : `/service-provider/booked-services/${service._id}`
              }
            >
              {' '}
              <ServiceBookingCard booking={service} key={service._id} />
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No booked services found.</p>
      )}

      <Pagination crrPage={crrPage} dataLimit={dataLimit} totaldata={totaldata} fetchData={p => getBookedService(p)} />
    </div>
  );
};

export default BookedServiceServiceProvider;
