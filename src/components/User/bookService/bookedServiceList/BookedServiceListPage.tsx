import { useEffect, useState } from 'react';
import { getRequest } from '../../../../utils/makeRequestInstance';
import { serviceEndPoint } from '../../../../utils/constant';
import ServiceBookingCard from './BookedServiceCard';
import { Link } from 'react-router-dom';
import Pagination from '../../../ui/Pagination';
import BookingCardSkeleton from '../../../../Skeleton/BookingListingCardSkeleton';
import EmptyState from '../../../ui/EmptyState';

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
}

const BookedService = () => {
  const [bookedServices, setBookedServices] = useState<Booking[]>([]);
  const [crrPage, setPage] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);
  const [isLoading, setLoading] = useState(true);
  const dataLimit = 3;

  const getCount = async () => {
    try {
      const res = await getRequest(serviceEndPoint.getUserBookService + '?count=true');
      if (res.status === 200) {
        setTotalData(res.data.count);
      }
    } catch (error) {
      console.error('Error fetching booked services', error);
    }
  };

  useEffect(() => {
    getCount();
    getBookedService(crrPage);
  }, []);

  const getBookedService = async (page: number) => {
    try {
      setLoading(true);
      const res = await getRequest(`${serviceEndPoint.getUserBookService}?page=${page}&limit=${dataLimit}`);
      if (res.status === 200) {
        console.log(res.data.services);
        setBookedServices(res.data.services);
        setPage(page);
      }
    } catch (error) {
      console.error('Error fetching booked services', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 bg-base-100">
      <h1 className="mb-4 text-xl font-bold">Booked Services</h1>

      {isLoading ? (
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <BookingCardSkeleton key={i} />
          ))}
        </div>
      ) : bookedServices && bookedServices.length > 0 ? (
        <div className="grid gap-4">
          {bookedServices.map(service => (
            <Link
              key={service._id}
              to={
                service.serviceType === 'Online'
                  ? `/booked-service-online/${service._id}`
                  : `/booked-service/${service._id}`
              }
            >
              <ServiceBookingCard booking={service} />
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState title="No bookings yet" icon="deep-search" message="Once you book a service, it will appear here" />
      )}

      <Pagination
        crrPage={crrPage}
        dataLimit={dataLimit}
        totaldata={totalData}
        fetchData={(p: number) => getBookedService(p)}
      />
    </div>
  );
};

export default BookedService;
