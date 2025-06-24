import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import {
  getRequest,
  postRequest,
  putRequest,
} from "../../../../utils/makeRequestInstance";
import { HotToastError, HotToastSuccess } from "../../../../utils/notificationToast";
import { Toaster } from "react-hot-toast";
import PaymentModal from "../paymentModal";
import { Ipayment } from "../../../../utils/types/Ipayment";
import { getMinMaxDateTime } from "../../../../utils/getMinMaxDateTime";
import ServiceDateTime from "../../../User/bookService/ServiceTimeInfo";
import { IServiceDateTime } from "../../../../utils/types/booking";
import AcceptServiceModal from "../ShowAcceptModal";
import CancelBookingModal from "../CancelBookingModal";
import PriceDetailsCard from "../PriceDetailsCard";
import UploadDocumentsModal from "../UploadDocumentsModal";
import StatusUpdateModal from "../StatusUpdateModal";
import StatusAlert from "../StatusAlert";
import BookingStepper from "../BookingStepper";
import ServiceCardCompact from "../ServiceCardCompact";
import UserInfoCompact from "../UserInfoCompact";
import ServiceAddressCard from "../ServiceAddressCard";
import { getServiceStatusFlags } from "../../../../utils/getServiceStatusFlags";
import ScheduleAndPaymentInfo from "../ScheduleAndPaymentInfo";


interface IliveLocation {
    lat: number;
    lng: number;
  };


interface BookingData {
  bookedService: {
    _id: string;
    userId: string;
    serviceId: string;
    serviceProviderId: string;
    bookedTime: string;
    estimatedServiceTime: string;
    serviceStatus: string;
    paymentStatus: string;
    paymentType: string;
    address: {
      name: string;
      houseName: string;
      pincode: string;
      state: string;
      phone: string;
    };
    payment?: Ipayment;
    cancellationReason?: string;
      preferredSlot:IServiceDateTime
    liveLocation:IliveLocation
  };
  service: {
    serviceName: string;
    category: string;
    description: string;
    estimatedPrice: number;
    serviceImage: string;
    serviceType: string;
  };
  user: {
    userName: string;
    profileImage: string;
    email: string;
    phone?: string;
  };
}

const ServiceProviderBookingManage = () => {
  const { id } = useParams();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAcceptModal, setShowAcceptModal] = useState<boolean>(false);
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [showStatusModal, setShowStatusModal] = useState<boolean>(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState<boolean>(false);
  const [estimatedTime, setEstimatedTime] = useState<string>("");
  const [cancelReason, setCancelReason] = useState<string>("");
  const [newStatus, setNewStatus] = useState<string>("");
  const [invoiceFiles, setInvoiceFiles] = useState<File[]>([]);
  const [payment, setPayment] = useState<Ipayment>({
    serviceCost: 0,
    materialCost: 0,
    travelCost: 0,
    inspectionCost: 0,
    total: 0,
    convenienceFee: 0,
  });
  
const { min, max } = getMinMaxDateTime(2);

  
  const [paymentForm, setPaymentForm] = useState<boolean>(false);
  useEffect(() => {
    if (id) {
      getBookedService(id);
    }
  }, [id]);

  const getBookedService = async (id: string) => {
    try {
      setLoading(true);
      const res = await getRequest(`/service/bookings/serviceProvider/${id}`);

      if (res.status === 200) {
        console.log(res.data.service);

        setBookingData(res.data.service);

        if (res.data.service.bookedService.serviceStatus) {
          setNewStatus(res.data.service.bookedService.serviceStatus);
        }
      }
    } catch (err) {
      setError("Failed to load booking details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptBooking = async () => {
    try {
      console.log(estimatedTime);
      const estimatedTimeDate=new Date(estimatedTime)
      const now=new Date()
      if(estimatedTimeDate <= now){
        HotToastError("Please select a future date and time.")
      }
      if (!estimatedTime) {
        HotToastError("Please provide an estimated service time");
        return;
      }

      const res = await putRequest(
        `service/service-provider/bookings/${id}/accept`,
        {
          estimatedServiceTime: estimatedTime,
          serviceStatus: "confirmed",
        }
      );

      if (res.status === 200) {
        HotToastSuccess("Booking accepted successfully");
        setShowAcceptModal(false);
        getBookedService(id as string);
      }
    } catch (err) {
      HotToastError("Failed to accept booking");
      console.error(err);
    }
  };

  const handleCancelBooking = async () => {
    try {
      if (!cancelReason) {
        HotToastError("Please provide a cancellation reason");
        return;
      }

      const res = await putRequest(
        `service/service-provider/bookings/${id}/cancel`,
        {
          serviceStatus: "cancelled",
          cancellationReason: cancelReason,
        }
      );

      if (res.status === 200) {
        HotToastSuccess("Booking cancelled successfully");
        setShowCancelModal(false);
        getBookedService(id as string);
      }
    } catch (err) {
      HotToastError("Failed to cancel booking");
      console.error(err);
    }
  };

  const handleStatusUpdate = async () => {
    try {
      const res = await putRequest(
        `service/service-provider/bookings/${id}/status`,
        {
          serviceStatus: newStatus,
        }
      );

      if (res.status === 200) {
        HotToastSuccess("Status updated successfully");
        setShowStatusModal(false);
        getBookedService(id as string);
      }
    } catch (err) {
      HotToastError("Failed to update status");
      console.error(err);
    }
  };

  const handlePaymentRequest = async (): Promise<void> => {
    try {
      console.log(payment);

      const res = await putRequest(
        `service/service-provider/bookings/${id}/payment-request`,
        {
          payment,
          paymentStatus: "requested",
        }
      );

      if (res.status === 200) {
        HotToastSuccess("Payment requested successfully");
        getBookedService(id as string);
      }
    } catch (err) {
      console.error(err);
      HotToastError("Failed to request payment");
    }
  };

  const handleInvoiceUpload = async () => {
    try {
      if (!invoiceFiles || invoiceFiles.length === 0) {
        HotToastError("Please select at least one invoice image to upload");
        return;
      }

      // Convert invoiceFiles to base64 strings
      const base64Invoices = await Promise.all(
        invoiceFiles.map((file: File) => {
          return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
          });
        })
      );

      // Prepare data to send
      const formData = {
        invoices: base64Invoices,
      };

      // Send request using postRequest
      const response = await postRequest(
        `service/service-provider/uploadbills/${id}/`,
        formData
      );

      if (response.status === 201) {
        HotToastSuccess(
          `Successfully uploaded ${invoiceFiles.length} invoice image(s)`
        );
      }

      setShowInvoiceModal(false);
      setInvoiceFiles([]);
    } catch (err) {
      HotToastError("Failed to upload invoice images");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error || !bookingData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-200">
        <div className="alert alert-error">
          <span>Error: {error || "Booking not found"}</span>
        </div>
      </div>
    );
  }

  const { bookedService, service, user } = bookingData;

  const formattedBookedDate = new Date(
    bookedService.bookedTime
  ).toLocaleDateString();
  const formattedServiceDate = bookedService.estimatedServiceTime
    ? new Date(bookedService.estimatedServiceTime).toLocaleDateString()
    : "Not set";
  const formattedServiceTime = bookedService.estimatedServiceTime
    ? new Date(bookedService.estimatedServiceTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";
const {
  isPending,
  isConfirmed,
  isInProgress,
  isCompleted,
  isCancelled,
  isPaymentRequested,
} = getServiceStatusFlags(bookedService.serviceStatus);

  return (
    <div className="container max-w-4xl min-h-screen p-4 mx-auto bg-base-200">



      <Toaster></Toaster>

<StatusAlert
  status={bookedService.serviceStatus}
  cancellationReason={bookedService.cancellationReason}
/>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="p-4 shadow md:col-span-2 bg-base-100 rounded-box">
        
        <ServiceCardCompact
  serviceImage={service.serviceImage}
  serviceName={service.serviceName}
  serviceType={service.serviceType}
  description={service.description}
  estimatedPrice={service.estimatedPrice}
/>

          <div className="divider"></div>

          {/* Customer Details */}
        <UserInfoCompact
  profileImage={user.profileImage}
  userName={user.userName}
  email={user.email}
  phone={user.phone??" "}
/>

          {/* Status Timeline */}
     
     <BookingStepper status={bookedService.serviceStatus} />

        <ScheduleAndPaymentInfo
  bookedDate={formattedBookedDate}
  serviceDate={formattedServiceDate}
  serviceTime={formattedServiceTime}
  isPending={isPending}
  estimatedServiceTime={bookedService.estimatedServiceTime}
  paymentStatus={bookedService.paymentStatus}
  paymentType={bookedService.paymentType}
/>



<div className="flex flex-wrap justify-center gap-2 mt-4">
  {/* Pending Actions */}
  {isPending && (
    <>
      <button
        className="btn btn-success"
        onClick={() => setShowAcceptModal(true)}
      >
        Accept Booking
      </button>
      <button
        className="btn btn-error"
        onClick={() => setShowCancelModal(true)}
      >
        Cancel Booking
      </button>
    </>
  )}

  {/* Active Booking Actions */}
  {!isCancelled && !isPending && (
    <>
      <button
        className="btn btn-primary"
        onClick={() => setShowStatusModal(true)}
      >
        Update Status
      </button>
      <button className="btn btn-secondary">Contact Customer</button>
    </>
  )}



  {(isInProgress || isPaymentRequested || isCompleted) && (
  <button
    className="btn btn-info"
    onClick={() => setShowInvoiceModal(true)}
  >
    Upload Bills
  </button>
)}



  {/* Request Payment - when confirmed or in progress */}
  {(isConfirmed || isInProgress) && (
    <button
      className="w-full mt-4 btn btn-warning"
      onClick={() => setPaymentForm(true)}
    >
      Request Payment
    </button>
  )}
  

  {/* Payment Modal */}
  {paymentForm && (
    <PaymentModal
      payment={payment}
      setPayment={(data: Ipayment) => setPayment(data)}
      closeModal={() => setPaymentForm(false)}
      makePaymentRequest={handlePaymentRequest}
    />
  )}
</div>


        </div>

        <div className="md:col-span-1">
          <div className="mb-4 shadow card bg-base-100">
             <ServiceDateTime 
            serviceDateTime={bookedService.preferredSlot}
            userType="serviceProvider"
            isCancelled={isCancelled?true:false}
          />
          </div>
          <div className="mb-4 shadow card bg-base-100">

          
<ServiceAddressCard
  address={bookedService.address}
  liveLocation={bookedService.liveLocation}
/>
          </div>

         

          {/* Price Details */}
         {bookedService.payment && (
  <PriceDetailsCard payment={bookedService.payment} />
)}
        </div>
      </div>




<AcceptServiceModal estimatedTime={estimatedTime} max={max} min={min} handleAcceptBooking={handleAcceptBooking} setEstimatedTime={ setEstimatedTime} setShow={setShowAcceptModal} show={showAcceptModal} />

<CancelBookingModal
        show={showCancelModal}
        setShow={setShowCancelModal}
        cancelReason={cancelReason}
        setCancelReason={setCancelReason}
        handleCancelBooking={handleCancelBooking}
      />



<StatusUpdateModal
        show={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        onUpdate={handleStatusUpdate}
        statusList={["confirmed", "inProgress"]}
        selectedStatus={newStatus}
        setSelectedStatus={setNewStatus}
      />
    

      

      {/* Update Status Modal */}


 

       <UploadDocumentsModal
        showModal={showInvoiceModal}
        setShowModal={setShowInvoiceModal}
        invoiceFiles={invoiceFiles}
        setInvoiceFiles={setInvoiceFiles}
        onUpload={handleInvoiceUpload}
      />
    </div>
  );
};

export default ServiceProviderBookingManage;
