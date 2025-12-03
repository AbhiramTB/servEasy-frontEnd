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
<<<<<<< HEAD
        return "badge-info";
=======
>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6
      case "requested":
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
<<<<<<< HEAD
    <div className="overflow-hidden transition-all h-60 duration-300 border shadow-xl card card-side bg-base-200 border-primary hover:shadow-2xl">
    <figure className="w-1/4 min-w-32">
      <img
        src={booking?.serviceImage || "/default-service.jpg"}
        alt={booking?.serviceName || "Service"}
        className="object-cover w-full h-full"
      />
    </figure>
  
    <div className="p-4 card-body">
      <div className="flex items-start justify-between">
        {booking?.serviceName && (
          <h2 className="card-title text-primary">{booking.serviceName}</h2>
        )}
        <div className="flex gap-2">
          {booking?.serviceStatus && (
            <span className={`badge ${getStatusColor(booking.serviceStatus)}`}>
              {booking.serviceStatus}
            </span>
          )}
          {booking?.paymentType && (
            <span className={`badge ${getPaymentColor(booking.paymentType)}`}>
              {booking.paymentType}
            </span>
          )}
        </div>
      </div>
  
      <div className="my-1 divider"></div>
  
      <div className="grid grid-cols-2 gap-2">
        {booking?.serviceType && (
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 opacity-70" />
            <span className="text-sm">{booking.serviceType}</span>
          </div>
        )}
  
        {booking?.serviceBookedAddress?.name && (
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 opacity-70" />
            <span className="text-sm">{booking.serviceBookedAddress.name}</span>
          </div>
        )}
  
        {booking?.serviceBookedAddress?.houseName &&
          booking?.serviceBookedAddress?.state &&
          booking?.serviceBookedAddress?.pincode && (
            <div className="flex items-center col-span-2 gap-2">
              <Home className="w-4 h-4 opacity-70" />
              <span className="text-sm truncate">
                {booking.serviceBookedAddress.houseName},{" "}
                {booking.serviceBookedAddress.state} -{" "}
                {booking.serviceBookedAddress.pincode}
              </span>
            </div>
        )}
  
        {booking?.serviceBookedAddress?.phone && (
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 opacity-70" />
            <span className="text-sm">{booking.serviceBookedAddress.phone}</span>
          </div>
        )}
      </div>
    </div>
  </div>
=======
    <div className="flex flex-col overflow-hidden transition-all duration-300 border shadow-xl bg-base-200 border-primary hover:shadow-2xl rounded-xl lg:flex-row">
      
      {/* Image */}
      <div className="w-full h-48 lg:w-1/4 lg:h-auto">
        <img
          src={booking?.serviceImage || "/default-service.jpg"}
          alt={booking?.serviceName || "Service"}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        {/* Header */}
        <div className="flex flex-col justify-between gap-2 sm:flex-row">
          {booking?.serviceName && (
            <h2 className="text-lg font-semibold text-primary">
              {booking.serviceName}
            </h2>
          )}
          <div className="flex gap-2">
            {booking?.serviceStatus && (
              <span className={`badge ${getStatusColor(booking.serviceStatus)}`}>
                {booking.serviceStatus}
              </span>
            )}
            {booking?.paymentType && (
              <span className={`badge ${getPaymentColor(booking.paymentType)}`}>
                {booking.paymentType}
              </span>
            )}
          </div>
        </div>

        <div className="my-2 divider" />

        {/* Info */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {booking?.serviceType && (
            <div className="flex items-center gap-2 text-sm">
              <Briefcase className="w-4 h-4 opacity-70" />
              {booking.serviceType}
            </div>
          )}

          {booking?.serviceBookedAddress?.name && (
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 opacity-70" />
              {booking.serviceBookedAddress.name}
            </div>
          )}

          {booking?.serviceBookedAddress?.phone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 opacity-70" />
              {booking.serviceBookedAddress.phone}
            </div>
          )}

          {booking?.serviceBookedAddress?.houseName &&
            booking?.serviceBookedAddress?.state &&
            booking?.serviceBookedAddress?.pincode && (
              <div className="flex items-center gap-2 text-sm sm:col-span-2">
                <Home className="w-4 h-4 opacity-70" />
                <span className="truncate">
                  {booking.serviceBookedAddress.houseName}, {booking.serviceBookedAddress.state} - {booking.serviceBookedAddress.pincode}
                </span>
              </div>
            )}
        </div>
      </div>
    </div>
>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6
  );
};

export default ServiceBookingCard;
