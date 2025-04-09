import React from "react";

interface PaymentDetails {
  convenienceFee?: number;
  inspectionCost?: number;
  materialCost?: number | null;
  serviceCost?: number;
  total?: number;
  travelCost?: number;
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

interface PaymentInfoModalProps {
  isOpen?: boolean;
  selectedBooking: ServiceBooking | BookingData;
  closeDetailsModal?: () => void;
  onPrintReceipt?: () => void;
  payment?:number
}


interface ServiceAddress {
  description: string;
  houseName: string;
  landmark: string;
  name: string;
  phone: string;
  pincode: string;
  state: string;
  _id: string;
}



interface BookingData {
  _id: string;
  estimatedServiceTime: string;
  payment?: PaymentDetails;
  paymentStatus: string;
  paymentType: string;
  profileImage: string;
  serviceBills: string[];
  serviceBookedAddress: ServiceAddress;
  serviceImage: string;
  serviceName: string;
  serviceProviderEmail: string;
  serviceProviderName: string;
  serviceStatus: string;
  serviceType: string;
  userEmail: string;
  userName: string;
  userProfile: string;
}


// Helper functions
const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case "completed":
      return "badge-success";
    case "pending":
      return "badge-warning";
    case "cancelled":
      return "badge-error";
    default:
      return "badge-info";
  }
};



const PaymentInfoModal: React.FC<PaymentInfoModalProps> = ({
  isOpen,
  selectedBooking,
  closeDetailsModal,
  onPrintReceipt = () => console.log("Print receipt clicked"),

}) => {


  if (!isOpen) return null;

  return (
    <div className=" modal modal-open">
      <div className="modal-box">
        <h3 className="text-lg font-bold"></h3>
        <div className="py-4">
          <div className="grid grid-cols-1 gap-4">
            {selectedBooking.serviceName && (
              <div className="flex items-center mb-4 space-x-3">
                <div className="avatar">
                  <div className="w-16 h-16 mask mask-squircle">
                    <img
                      src={
                        selectedBooking.serviceImage ||
                        "https://via.placeholder.com/64"
                      }
                      alt={selectedBooking.serviceName}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold">
                    {selectedBooking.serviceName}
                  </h3>
                  <p className="text-sm opacity-70">
                    {selectedBooking.serviceType}
                  </p>
                  <div
                    className={`badge ${getStatusColor(selectedBooking.serviceStatus)} mt-2`}
                  >
                    {selectedBooking.serviceStatus}
                  </div>
                </div>
              </div>
            )}

            { 
              (selectedBooking.userName && (
                <>
                  <div className="divider">Customer Information</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="avatar">
                        <div className="w-12">
                          <img src={selectedBooking.userProfile} />
                        </div>
                      </div>

                      <p>{selectedBooking.userName}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Email:</p>
                      <p>{selectedBooking.userEmail}</p>
                    </div>
                  </div>
                </>
              ))}

           {selectedBooking.serviceBookedAddress.name &&
            <>
             <div className="divider">Service Address</div>
             <div className="p-4 card bg-base-200">
               <p>
                 <span className="font-semibold">Name:</span>{" "}
                 {selectedBooking.serviceBookedAddress.name}
               </p>
               <p>
                 <span className="font-semibold">Phone:</span>{" "}
                 {selectedBooking.serviceBookedAddress.phone}
               </p>
               <p>
                 <span className="font-semibold">House:</span>{" "}
                 {selectedBooking.serviceBookedAddress.houseName}
               </p>
               <p>
                 <span className="font-semibold">Landmark:</span>{" "}
                 {selectedBooking.serviceBookedAddress.landmark}
               </p>
               <p>
                 <span className="font-semibold">State:</span>{" "}
                 {selectedBooking.serviceBookedAddress.state}
               </p>
               <p>
                 <span className="font-semibold">Pincode:</span>{" "}
                 {selectedBooking.serviceBookedAddress.pincode}
               </p>
               <p>
                 <span className="font-semibold">Description:</span>{" "}
                 {selectedBooking.serviceBookedAddress.description}
               </p>
             </div></>
           }

            {selectedBooking.payment &&
              <>
              <div className="divider">Payment Breakdown</div>
              <div className="p-4 card bg-base-200">
                <table className="table w-full table-compact">
                  <tbody>
                    <tr>
                      <td className="font-semibold">Service Cost</td>
                      <td className="text-right">
                        ₹{selectedBooking?.payment?.serviceCost ?? 0}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Inspection Cost</td>
                      <td className="text-right">
                        ₹{selectedBooking?.payment?.inspectionCost ?? 0}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Travel Cost</td>
                      <td className="text-right">
                        ₹{selectedBooking?.payment?.travelCost ?? 0}
                      </td>
                    </tr>
                    {
                      selectedBooking.payment.materialCost&&
                      <tr>
                      <td className="font-semibold">Material Cost</td>
                      <td className="text-right">
                        ₹{selectedBooking?.payment?.materialCost ?? 0}
                      </td>
                    </tr>
                    }
                    <tr>
                      <td className="font-semibold">Convenience Fee</td>
                      <td className="text-right">
                        ₹{selectedBooking?.payment?.convenienceFee ?? 0}
                      </td>
                    </tr>
                    <tr className="text-lg font-bold">
                      <td>Total</td>
                      <td className="text-right">
                        ₹{selectedBooking?.payment?.total ?? 0}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div></>
            }

            <div className="p-4 card bg-base-200">
              <p className="font-semibold">Payment Method:</p>
              <p className="text-lg">{selectedBooking.paymentType}</p>
            </div>
          </div>
        </div>
        <div className="modal-action">
          <button className="btn" onClick={closeDetailsModal}>
            Close
          </button>
          <button className="btn btn-primary" onClick={onPrintReceipt}>
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfoModal;
