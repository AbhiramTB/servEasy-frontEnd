import React, { useEffect, useState } from "react";
import { getRequest } from "../../../utils/makeRequestInstance";
import { serviceEndPoint } from "../../../utils/constant";
import ServiceBookingCard from "./ServiceBookingCard";
import { Link, useParams } from "react-router-dom";

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
  useEffect(() => {
    getBookedService();

  }, []);

  const getBookedService = async () => {
    try {
      const res = await getRequest(serviceEndPoint.getUserBookService);
      if (res.status === 200) {
        console.log(res.data.service);
        setBookedServices(res.data.service);
      }
    } catch (error) {
      console.error("Error fetching booked services", error);
    }
  };

  return (
    <div className="bg-base-100 p-4">
      <h1 className="text-xl font-bold mb-4">Booked Services</h1>
      {bookedServices.length > 0 ? (
        
        <div className="grid gap-4 ">
          {bookedServices.map((service) => (
            <Link to={`/booked-service/${service._id}`}>
            <ServiceBookingCard booking={service} key={service._id} />
            </Link>
          ))}
        </div>
        
      ) : (
        <p className="text-gray-600">No booked services found.</p>
      )}
    </div>
  );
};

export default BookedService;
