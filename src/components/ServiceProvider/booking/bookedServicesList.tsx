import { useEffect, useState } from 'react';
import { getRequest } from '../../../utils/makeRequestInstance';
import { serviceEndPoint } from '../../../utils/constant';

import { Link } from 'react-router-dom';
import ServiceBookingCard from '../../User/bookService/bookedServiceList/BookedServiceCard';
import Pagination from '../../ui/Pagination';
import EmptyState from '../../ui/EmptyState';
import BookingCardSkeleton from '../../../Skeleton/BookingListingCardSkeleton';

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
  const [loading, setLoading] = useState(false);
  const getBookedService = async (page: number) => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookedService(0);
  }, []);

  return (
    <div className="">
      {!loading && bookedServices.length === 0 && (
        <>
          <h1 className="mb-4 text-xl font-bold">Booked Services</h1>
          <EmptyState
            message="If a user books any service, it will automatically appear here"
            title="No bookings found."
            icon="no-results"
          />
        </>
      )}

      {loading && (
        <>
          <h1 className="mb-4 text-xl font-bold">Booked Services</h1>

          <div className="grid gap-4">
            {Array(dataLimit)
              .fill(0)
              .map((_, index) => (
                <BookingCardSkeleton key={index} />
              ))}
          </div>
        </>
      )}

      {!loading && bookedServices.length > 0 && (
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
      )}

      <Pagination crrPage={crrPage} dataLimit={dataLimit} totaldata={totaldata} fetchData={getBookedService} />
    </div>
  );
};

export default BookedServiceServiceProvider;
