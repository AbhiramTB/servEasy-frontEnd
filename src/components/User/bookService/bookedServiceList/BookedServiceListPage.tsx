<<<<<<< HEAD
import  { useEffect, useState } from "react";
import { getRequest } from "../../../../utils/makeRequestInstance";
import { serviceEndPoint } from "../../../../utils/constant";
import ServiceBookingCard from "./BookedServiceCard";
import { Link } from "react-router-dom";
import Pagination from "../../../ui/Pagination";
import BookingCardSkeleton from "../../../../Skeleton/BookingListingCardSkeleton";
=======
import { useEffect, useState } from 'react';
import { getRequest } from '../../../../utils/makeRequestInstance';
import { serviceEndPoint } from '../../../../utils/constant';
import ServiceBookingCard from './BookedServiceCard';
import { Link } from 'react-router-dom';
import Pagination from '../../../ui/Pagination';
import BookingCardSkeleton from '../../../../Skeleton/BookingListingCardSkeleton';
>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6

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
  serviceStatus: string;
  paymentType: string;
  serviceBookedAddress: Address;
  serviceName: string;
  serviceType: string;
  serviceImage: string;
}

const BookedService = () => {
  const [bookedServices, setBookedServices] = useState<Booking[]>([]);
<<<<<<< HEAD
    const [crrPage, setPage] = useState<number>(0);
    const [totalData, setTotalData] = useState<number>(0);
    const dataLimit = 3;

    const getCount=async()=>{
        try {
      const res = await getRequest(serviceEndPoint.getUserBookService+"?count=true");
      if (res.status === 200) {
        setTotalData(res.data.count);
        
      }
    } catch (error) {
      console.error("Error fetching booked services", error);
    }
    } 

  useEffect(() => {
    getCount()
    getBookedService(crrPage);
  }, []);

  const getBookedService = async (page:number) => {
    try {
      const res = await getRequest(`${serviceEndPoint.getUserBookService}?page=${page}&limit=${dataLimit}` );
      if (res.status === 200) {
        console.log(res.data.service);
        setBookedServices(res.data.service);
        setPage(page)
      }
    } catch (error) {
      console.error("Error fetching booked services", error);
    }
  };

=======
  const [crrPage, setPage] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);
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
      const res = await getRequest(`${serviceEndPoint.getUserBookService}?page=${page}&limit=${dataLimit}`);
      if (res.status === 200) {
        console.log(res.data.service);
        setBookedServices(res.data.service);
        setPage(page);
      }
    } catch (error) {
      console.error('Error fetching booked services', error);
    }
  };
  // {dfdfdf}
>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6
  return (
    <div className="px-4 bg-base-100">
      <h1 className="mb-4 text-xl font-bold">Booked Services</h1>
      {bookedServices.length > 0 ? (
        <div className="grid gap-4 ">
<<<<<<< HEAD
          {bookedServices.map((service) => (
            <Link to={ service.serviceType==="Online"? `/booked-service-online/${service._id}` :`/booked-service/${service._id}`}>
=======
          {bookedServices.map(service => (
            <Link
              to={
                service.serviceType === 'Online'
                  ? `/booked-service-online/${service._id}`
                  : `/booked-service/${service._id}`
              }
            >
>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6
              <ServiceBookingCard booking={service} key={service._id} />
            </Link>
          ))}
        </div>
      ) : (
<<<<<<< HEAD

 <div className="grid gap-4 ">
<BookingCardSkeleton/>
<BookingCardSkeleton/>
<BookingCardSkeleton/>


  </div>


)}
<Pagination
=======
        <div className="grid gap-4 ">
          <BookingCardSkeleton />
          <BookingCardSkeleton />
          <BookingCardSkeleton />
        </div>
      )}
      <Pagination
>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6
        crrPage={crrPage}
        dataLimit={dataLimit}
        totaldata={totalData}
        fetchData={(p: number) => getBookedService(p)}
<<<<<<< HEAD
      />    </div>
=======
      />
    </div>
>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6
  );
};

export default BookedService;
