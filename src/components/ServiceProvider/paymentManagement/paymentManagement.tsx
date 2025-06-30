import { useEffect, useState } from "react";
import { getRequest } from "../../../utils/makeRequestInstance";
import { paymentRoutes } from "../../../utils/constant";
import PaymentInfoTable from "../../ui/PaymentInfoTable";
import PaymentInfoModal from "../../ui/paymentInfoModal";

interface PaymentDetails {
  convenienceFee: number;
  inspectionCost: number;
  materialCost: number | null;
  serviceCost: number;
  total: number;
  travelCost: number;
}

interface ServiceBookedAddress {
  description: string;
  houseName: string;
  landmark: string;
  name: string;
  phone: string;
  pincode: string;
  state: string;
  _id: string;
}

interface ServiceBooking {
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

const PaymentManagement = () => {
  const [paymentData, setPaymentData] = useState<ServiceBooking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<ServiceBooking | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);

  useEffect(() => {
    getPaymentInfo();
  }, []);

  const getPaymentInfo = async () => {
    try {
      setLoading(true);
      const response = await getRequest(paymentRoutes.getServiceProviderPayments);
      setPaymentData(response.data || []);
      console.log(response.data);
    } catch (error) {
      setError("Failed to fetch payment information");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };



  const handleViewDetails = (booking: ServiceBooking) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedBooking(null);
  };

  const handlePrintReceipt = () => {
    if (selectedBooking) {
      console.log(`Printing receipt for booking: ${selectedBooking._id}`);
     
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="shadow-lg alert alert-error">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (paymentData.length === 0) {
    return (
      <div className="shadow-lg alert alert-info">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="flex-shrink-0 w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>No payment information available.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-6 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Payment Management</h1>
      
      <div className="w-full mb-6 shadow stats">
        <div className="stat">
          <div className="stat-title">Total Bookings</div>
          <div className="stat-value">{paymentData.length}</div>
        </div>
        
        <div className="stat">
          <div className="stat-title">Total Revenue</div>
          <div className="stat-value">
            {formatCurrency(paymentData.reduce((sum, booking) => sum + booking.payment.total, 0))}
          </div>
        </div>
        
        <div className="stat">
          <div className="stat-title">your Earnings</div>
          <div className="stat-value">
            {formatCurrency(paymentData.reduce((sum, booking) => sum + booking.payment.total, 0) - paymentData.reduce((sum, booking) => sum + booking.payment.convenienceFee, 0))}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>Service</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Payment Type</th>
              <th>Service Cost</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paymentData.map((booking) => (
              <PaymentInfoTable 
                key={booking._id}
                booking={booking}
                handleViewDetails={()=>handleViewDetails(booking)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment Details Modal */}
      {selectedBooking && (
        <PaymentInfoModal 
          isOpen={showDetailsModal}
          selectedBooking={selectedBooking}
          closeDetailsModal={closeDetailsModal}
          onPrintReceipt={handlePrintReceipt}
        />
      )}
    </div>
  );
};

export default PaymentManagement;