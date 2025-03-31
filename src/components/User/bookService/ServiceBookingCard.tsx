import React from "react";
import { Briefcase, Mail, Home, Phone } from "lucide-react";

type Address = {
  name: string;
  houseName: string;
  pincode: string;
  state: string;
  phone: string;
  _id: string;
};

type Booking = {
  _id: string;
  serviceStatus: string;
  paymentType: string;
  serviceBookedAddress: Address;
  serviceName: string;
  serviceType: string;
  serviceImage: string;
};

type ServiceBookingCardProps = {
  booking: Booking;
};

const ServiceBookingCard: React.FC<ServiceBookingCardProps> = ({ booking }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "badge-success";
      case "pending":
        return "badge-warning";
      case "cancelled":
        return "badge-error";
      case "in progress":
        return "badge-info";
      default:
        return "badge-ghost";
    }
  };

  const getPaymentColor = (paymentType: string) => {
    switch (paymentType.toLowerCase()) {
      case "paid":
      case "online":
        return "badge-primary";
      case "cash":
      case "cod":
        return "badge-accent";
      default:
        return "badge-ghost";
    }
  };

  return (
    <div className="card card-side bg-base-200  border-primary shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border ">
      <figure className="w-1/4 min-w-32">
        <img
          src={booking.serviceImage}
          alt={booking.serviceName}
          className="h-full w-full object-cover"
        />
      </figure>
      <div className="card-body p-4">
        <div className="flex justify-between items-start">
          <h2 className="card-title text-primary">{booking.serviceName}</h2>
          <div className="flex gap-2">
            <span className={`badge ${getStatusColor(booking.serviceStatus)}`}>
              {booking.serviceStatus}
            </span>
            <span className={`badge ${getPaymentColor(booking.paymentType)}`}>
              {booking.paymentType}
            </span>
          </div>
        </div>
        
        <div className="divider my-1"></div>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 opacity-70" />
            <span className="text-sm">{booking.serviceType}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 opacity-70" />
            <span className="text-sm">{booking.serviceBookedAddress.name}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Home className="h-4 w-4 opacity-70" />
            <span className="text-sm truncate">{booking.serviceBookedAddress.houseName}, {booking.serviceBookedAddress.state} - {booking.serviceBookedAddress.pincode}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 opacity-70" />
            <span className="text-sm">{booking.serviceBookedAddress.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceBookingCard;