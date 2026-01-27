import React from 'react';

interface PaymentDetails {
  serviceCost: number;
  total: number;
}

interface ServiceBookedAddress {
  // Add properties as needed
}

interface Booking {
  _id: string;
  payment: PaymentDetails;
  paymentType: string;
  serviceBookedAddress: ServiceBookedAddress;
  serviceImage: string;
  serviceName: string;
  serviceStatus: string;
  serviceType: string;
  userEmail: string;
  userName: string;
  userProfile: string;
}

interface PropsServiceBooking {
  booking: Booking;
  handleViewDetails: () => void;
}

// Helper functions
const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'badge-success';
    case 'pending':
      return 'badge-warning';
    case 'cancelled':
      return 'badge-error';
    default:
      return 'badge-info';
  }
};

const PaymentInfoTable: React.FC<PropsServiceBooking> = ({ booking, handleViewDetails }) => {
  console.log(booking);

  return (
    <tr key={booking._id} className="rounded-sm hover bg-base-300">
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="w-12 h-12 mask mask-squircle">
              <img src={booking.serviceImage || 'https://via.placeholder.com/40'} alt={booking.serviceName} />
            </div>
          </div>
          <div>
            <div className="font-bold">{booking.serviceName}</div>
            <div className="text-sm opacity-50">{booking.serviceType}</div>
          </div>
        </div>
      </td>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar"></div>
          <div>
            <div className="font-bold">{booking.userName}</div>
            <div className="text-sm opacity-50">{booking.userEmail}</div>
          </div>
        </div>
      </td>
      <td>
        <div className={`badge ${getStatusColor(booking.serviceStatus)}`}>{booking.serviceStatus}</div>
      </td>
      <td>{booking.paymentType}</td>
      <td>{booking.payment.serviceCost}</td>
      <td>{booking.payment.total}</td>

      <td>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
          </label>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li onClick={handleViewDetails}> View Details</li>
          </ul>
        </div>
      </td>
    </tr>
  );
};

export default PaymentInfoTable;
