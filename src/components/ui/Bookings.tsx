import React, { useState } from "react";
import PaymentInfoModal from "./paymentInfoModal";
import { BookingData } from "../../utils/types/booking";
import dayjs from "dayjs";

interface BookingsProps {
  bookings: BookingData[];
}

const Bookings: React.FC<BookingsProps> = ({ bookings }) => {
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  
  const formatDate = (dateString: string | undefined | null): string => {
  if (!dateString) return "N/A";

  const date = dayjs(dateString);
  if (!date.isValid()) return "Invalid Date";

  return date.format("DD MMM YYYY, hh:mm A");
};

  const handleViewDetails = (bookingId: string) => {
    setSelectedBookingId(bookingId);
  };

  const closeDetailsModal = () => {
    setSelectedBookingId(null);
  };

  const getStatusBadgeClasses = (status: string) => {
    switch(status) {
      case 'completed':
        return "badge badge-success text-white";
      case 'pending':
        return "badge badge-warning text-white";
      default:
        return "badge badge-info text-white";
    }
  };

  return (
    <div className="overflow-hidden shadow-lg bg-base-200 rounded-xl">
      {/* Header row */}
      <div className="grid grid-cols-7 px-6 py-5 font-medium bg-primary text-primary-content">
        <div className="text-sm tracking-wider uppercase">Booking ID</div>
        <div className="text-sm tracking-wider uppercase">Service</div>
        <div className="text-sm tracking-wider uppercase">Provider</div>
        <div className="text-sm tracking-wider uppercase">Customer</div>
        <div className="text-sm tracking-wider uppercase">Scheduled Time</div>
        <div className="text-sm tracking-wider uppercase">Status</div>
        <div className="text-sm tracking-wider uppercase">Actions</div>
      </div>

      {/* Booking rows */}
      <div className="divide-y divide-base-300">
        {bookings.length > 0 ? (
          bookings.map((booking: BookingData) => (
            <div 
              key={booking._id}
              className="grid items-center grid-cols-7 px-6 py-6 transition-colors duration-150 hover:bg-base-300"
            >
              {/* Booking ID */}
              <div className="font-mono text-base-content">
                {booking._id.substring(0, 8)}...
              </div>

              {/* Service */}
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-lg ring ring-primary ring-opacity-20">
                      <img 
                        src={booking.serviceImage} 
                        alt={booking.serviceName} 
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="font-medium text-base-content">{booking.serviceName}</div>
                  <div className="text-sm text-base-content/70">{booking.serviceType}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="avatar">
                    <div className="w-10 h-10 rounded-full ring ring-primary ring-opacity-10">
                      <img 
                        src={booking.profileImage} 
                        alt={booking.serviceProviderName} 
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="font-medium text-base-content">{booking.serviceProviderName}</div>
                  <div className="max-w-xs text-xs truncate text-base-content/70">{booking.serviceProviderEmail}</div>
                </div>
              </div>

              <div className="flex items-center ml-6 space-x-4 ">
                <div className="flex-shrink-0">
                  <div className="avatar">
                    <div className="w-10 h-10 rounded-full ring ring-primary ring-opacity-10">
                      <img 
                        src={booking.userProfile} 
                        alt={booking.userName} 
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="font-medium text-base-content">{booking.userName}</div>
                  <div className="max-w-xs text-xs truncate text-base-content/70">{booking.userEmail}</div>
                </div>
              </div>

              <div className="text-base-content">
                {formatDate(booking.estimatedServiceTime)}
              </div>

              <div>
                <span className={getStatusBadgeClasses(booking.serviceStatus)}>
                  {booking.serviceStatus.charAt(0).toUpperCase() + booking.serviceStatus.slice(1)}
                </span>
              </div>

              <div>
                <button 
                  onClick={() => handleViewDetails(booking._id)} 
                  className="btn btn-primary btn-sm"
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-16 text-center">
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-primary/10">
                <svg className="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <h3 className="mt-4 text-lg font-medium text-base-content">No bookings available</h3>
            <p className="mt-2 text-base-content/70">Bookings will appear here when they are created.</p>
          </div>
        )}
      </div>

      {/* Render PaymentInfoModal only for the selected booking */}
      {selectedBookingId && 
        (() => {
          const selectedBooking = bookings.find(booking => booking._id === selectedBookingId);
          if (selectedBooking) {
            return (
              <PaymentInfoModal 
                isOpen={true} 
                closeDetailsModal={closeDetailsModal} 
                selectedBooking={selectedBooking}
              />
            );
          }
          return null;
        })()
      }
    </div>
  );
};

export default Bookings;