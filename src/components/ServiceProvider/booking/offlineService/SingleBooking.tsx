import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getRequest, patchRequest, postRequest } from '../../../../utils/makeRequestInstance';
import { HotToastError, HotToastPromise, HotToastSuccess } from '../../../../utils/notificationToast';
import PaymentModal from '../paymentModal';
import { Ipayment } from '../../../../utils/types/Ipayment';
import { getMinMaxDateTime } from '../../../../utils/getMinMaxDateTime';
import ServiceDateTime from '../../../User/bookService/ServiceTimeInfo';
import { IServiceDateTime } from '../../../../utils/types/booking';
import AcceptServiceModal from '../ShowAcceptModal';
import CancelBookingModal from '../CancelBookingModal';
import PriceDetailsCard from '../PriceDetailsCard';
import UploadDocumentsModal from '../UploadDocumentsModal';
import StatusUpdateModal from '../StatusUpdateModal';
import StatusAlert from '../StatusAlert';
import BookingStepper from '../BookingStepper';
import ServiceCardCompact from '../ServiceCardCompact';
import UserInfoCompact from '../UserInfoCompact';
import ServiceAddressCard from '../ServiceAddressCard';
import { getServiceStatusFlags } from '../../../../utils/getServiceStatusFlags';
import ScheduleAndPaymentInfo from '../ScheduleAndPaymentInfo';
import RescheduleBookingModal from '../rescheduleBooking';
import { IReview } from '../../../../utils/types/IReview';
import StarRating from '../../../ui/StarRating';
import dayjs from 'dayjs';
import { ReloadButton } from '../../../User/bookService/ReloadButton';
import ShowBills from '../../../ui/ShowBills';
interface IliveLocation {
  lat: number;
  lng: number;
}

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
    serviceBills?: [string];

    address: {
      name: string;
      houseName: string;
      pincode: string;
      state: string;
      phone: string;
    };
    payment?: Ipayment;
    cancelReason?: string;
    preferredSlot: IServiceDateTime;
    liveLocation: IliveLocation;
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
    _id: string;
    userName: string;
    profileImage: string;
    email: string;
    phone?: string;
  };
  review?: IReview;
}

const ServiceProviderBookingManage = () => {
  const { id } = useParams();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAcceptModal, setShowAcceptModal] = useState<boolean>(false);
  const [rescheduleModal, setRescheduleModal] = useState<boolean>(false);

  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [showStatusModal, setShowStatusModal] = useState<boolean>(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState<boolean>(false);
  const [estimatedTime, setEstimatedTime] = useState<string>('');
  const [cancelReason, setCancelReason] = useState<string>('');
  const [newStatus, setNewStatus] = useState<string>('');
  const [isBillsUploadLoading, setBillsUploadLoading] = useState(false);
  const [invoiceFiles, setInvoiceFiles] = useState<File[]>([]);
  const [reason, setReason] = useState('');
  const [showBills, setShowBills] = useState(false);

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

        setBookingData(res.data.service);
        if (res.data.service.bookedService.serviceStatus) {
          // setNewStatus(res.data.service.bookedService.serviceStatus);
        }
      }
    } catch (err) {
      setError('Failed to load booking details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptBooking = async (action: 'accept' | 'reschedule') => {
    try {
      if (!estimatedTime) {
        HotToastError('Please provide an estimated service time');
        return;
      }

      const estimatedTimeDate = new Date(estimatedTime);
      const now = new Date();
      if (estimatedTimeDate <= now) {
        HotToastError('Please select a future date and time.');
        return;
      }
      let res;
      if (action == 'reschedule') {
        res = await patchRequest(`service/service-provider/booking/${id}/confirm`, {
          estimatedServiceTime: estimatedTime,
          serviceStatus: bookedService.serviceStatus,
          reschedule: true,
          reschedReason: reason,
        });
      } else {
        res = await patchRequest(`service/service-provider/booking/${id}/confirm`, {
          estimatedServiceTime: estimatedTime,
          serviceStatus: 'confirmed',
          reschedule: false,
        });
      }

      if (res.status === 200) {
        const message = action == 'accept' ? 'Booking accepted successfully' : 'booking reschedule  successfully';
        HotToastSuccess(message);
        setShowAcceptModal(false);
        getBookedService(id as string);
      }

    } catch (err: any) {
      if (err.response.data.error) {
        HotToastError(err.response.data.error);
      } else {
        HotToastError('Failed to accept booking');
      }
    }
  };

  const handleCancelBooking = async () => {
    try {
      if (!cancelReason) {
        HotToastError('Please provide a cancellation reason');
        return;
      }

      const res = await patchRequest(`service/service-provider/booking/${id}/cancel`, {
        serviceStatus: 'cancelled',
        cancellationReason: cancelReason,
      });

      if (res.status === 200) {
        HotToastSuccess('Booking cancelled successfully');
        setShowCancelModal(false);
        getBookedService(id as string);
      }
    } catch (err) {
      HotToastError('Failed to cancel booking');
      console.error(err);
    }
  };

  const handleStatusUpdate = async () => {
    try {
      const res = await patchRequest(`service/service-provider/booking/${id}/status`, {
        serviceStatus: newStatus,
      });

      if (res.status === 200) {
        HotToastSuccess('Status updated successfully');
        setShowStatusModal(false);
        getBookedService(id as string);
      }
    } catch (err) {
      HotToastError('Failed to update status');
      console.error(err);
    }
  };

  const handlePaymentRequest = async (): Promise<void> => {
    try {

      const res = await patchRequest(`service/service-provider/booking/${id}/payment-request`, {
        payment,
        paymentStatus: 'requested',
      });

      if (res.status === 200) {
        HotToastSuccess('Payment requested successfully');
        getBookedService(id as string);
      }
    } catch (err) {
      console.error(err);
      HotToastError('Failed to request payment');
    }
  };

  const handleInvoiceUpload = async () => {
    try {
      setBillsUploadLoading(true);
      if (!invoiceFiles || invoiceFiles.length === 0) {
        HotToastError('Please select at least one invoice image to upload');
        return;
      }

      // Convert invoiceFiles to base64 strings
      const base64Invoices = await Promise.all(
        invoiceFiles.map((file: File) => {
          return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
          });
        })
      );

      // Prepare data to send
      const formData = {
        invoices: base64Invoices,
      };

      // Send request using postRequest
      const response = await HotToastPromise(postRequest(`service/service-provider/uploadbills/${id}/`, formData), {
        loading: 'Uploading your bills…',
        success: 'Bills uploaded successfully',
        error: 'Failed to upload bills. Please try again',
      });
      if (response.status === 201) {
        // HotToastSuccess(`Successfully uploaded ${invoiceFiles.length} invoice image(s)`);
        getBookedService(id as string);
      }

      setShowInvoiceModal(false);
      setInvoiceFiles([]);
    } catch (err) {
      // HotToastError('Failed to upload invoice images');
      console.error(err);
    } finally {
      setBillsUploadLoading(false);
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
          <span>Error: {error || 'Booking not found'}</span>
        </div>
      </div>
    );
  }

  const { bookedService, service, user } = bookingData;

  const formattedBookedDate = dayjs(bookedService.bookedTime).format('DD/MM/YYYY');

  const formattedServiceDate = bookedService.estimatedServiceTime
    ? dayjs(bookedService.estimatedServiceTime).format('DD/MM/YYYY')
    : 'Not set';

  const formattedServiceTime = bookedService.estimatedServiceTime
    ? dayjs(bookedService.estimatedServiceTime).format('hh:mm A')
    : '';
  const { isPending, isConfirmed, isInProgress, isCompleted, isCancelled, isPaymentRequested } = getServiceStatusFlags(
    bookedService.serviceStatus
  );

  // return (
  //   <div className="container min-h-screen p-2 mx-auto border border-primary/20 bg-primary/5">
  //     <StatusAlert status={bookedService.serviceStatus} cancellationReason={bookedService.cancellationReason} />
  //     <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
  //       <div className="p-4 shadow md:col-span-2 bg-base-100 rounded-box">
  //         <ServiceCardCompact
  //           serviceImage={service.serviceImage}
  //           serviceName={service.serviceName}
  //           serviceType={service.serviceType}
  //           description={service.description}
  //           estimatedPrice={service.estimatedPrice}
  //         />

  //         <div className="divider"></div>

  //         {/* Customer Details */}
  //         <UserInfoCompact
  //           profileImage={user.profileImage}
  //           userName={user.userName}
  //           email={user.email}
  //           phone={user.phone ?? ' '}
  //         />

  //         {/* Status Timeline */}

  //         <BookingStepper status={bookedService.serviceStatus} />

  //         <ScheduleAndPaymentInfo
  //           bookedDate={formattedBookedDate}
  //           serviceDate={formattedServiceDate}
  //           serviceTime={formattedServiceTime}
  //           isPending={isPending}
  //           estimatedServiceTime={bookedService.estimatedServiceTime}
  //           paymentStatus={bookedService.paymentStatus}
  //           paymentType={bookedService.paymentType}
  //         />

  //         <div className="flex flex-wrap justify-center gap-2 mt-4">
  //           {isPending && (
  //             <>
  //               <button className="btn btn-success" onClick={() => setShowAcceptModal(true)}>
  //                 Accept Booking
  //               </button>
  //               <button className="btn btn-error" onClick={() => setShowCancelModal(true)}>
  //                 Cancel Booking
  //               </button>
  //             </>
  //           )}

  //           {isConfirmed && (
  //             <>
  //               <button className="btn btn-primary" onClick={() => setShowStatusModal(true)}>
  //                 Update Status
  //               </button>
  //             </>
  //           )}

  //           <Link to={'/service-provider/chat/' + user._id}>
  //             <button className="btn btn-secondary">Contact Customer</button>
  //           </Link>

  //           {isConfirmed && (
  //             <>
  //               <button className="btn btn-success" onClick={() => setRescheduleModal(true)}>
  //                 reschedule your booking
  //               </button>
  //             </>
  //           )}

  //           {(isInProgress || isPaymentRequested || isCompleted) && !bookedService.serviceBills && (
  //             <button className="btn btn-info" onClick={() => setShowInvoiceModal(true)}>
  //               Upload Bills
  //             </button>
  //           )}

  //           {isInProgress && (
  //             <button className="w-full mt-4 btn btn-warning" onClick={() => setPaymentForm(true)}>
  //               Request Payment
  //             </button>
  //           )}

  //           {paymentForm && (
  //             <PaymentModal
  //               payment={payment}
  //               setPayment={(data: Ipayment) => setPayment(data)}
  //               closeModal={() => setPaymentForm(false)}
  //               makePaymentRequest={handlePaymentRequest}
  //             />
  //           )}
  //         </div>
  //       </div>

  //       <div className="md:col-span-1">
  //         <div className="mb-4 shadow card bg-base-100">
  //           <ServiceDateTime
  //             serviceDateTime={bookedService?.preferredSlot || 0}
  //             userType="serviceProvider"
  //             isCancelled={isCancelled ? true : false}
  //           />
  //         </div>
  //         <div className="mb-4 ">
  //           <ServiceAddressCard address={bookedService.address} liveLocation={bookedService.liveLocation} />
  //         </div>
  //         <div className=" w-full">
  //           <span className="text-lg font-semibold text-primary">user review</span>
  //           <StarRating comment={bookingData.review.comment} rating={bookingData.review.rating} />
  //         </div>

  //         {/* Price Details */}
  //         {bookedService.payment && <PriceDetailsCard payment={bookedService.payment} />}
  //       </div>
  //     </div>

  //     <AcceptServiceModal
  //       estimatedTime={estimatedTime}
  //       max={max}
  //       min={min}
  //       handleAcceptBooking={() => handleAcceptBooking('accept')}
  //       setEstimatedTime={setEstimatedTime}
  //       setShow={setShowAcceptModal}
  //       show={showAcceptModal}
  //     />

  //     <RescheduleBookingModal
  //       estimatedTime={estimatedTime}
  //       setEstimatedTime={setEstimatedTime}
  //       setShowAcceptModal={setRescheduleModal}
  //       handleAcceptBooking={() => handleAcceptBooking('reschedule')}
  //       reason={reason}
  //       setReason={setReason}
  //       show={rescheduleModal}
  //     />

  //     <CancelBookingModal
  //       show={showCancelModal}
  //       setShow={setShowCancelModal}
  //       cancelReason={cancelReason}
  //       setCancelReason={setCancelReason}
  //       handleCancelBooking={handleCancelBooking}
  //     />

  //     <StatusUpdateModal
  //       show={showStatusModal}
  //       onClose={() => setShowStatusModal(false)}
  //       onUpdate={handleStatusUpdate}
  //       statusList={['confirmed', 'inProgress']}
  //       selectedStatus={newStatus}
  //       setSelectedStatus={setNewStatus}
  //     />

  //     <UploadDocumentsModal
  //       showModal={showInvoiceModal}
  //       setShowModal={setShowInvoiceModal}
  //       invoiceFiles={invoiceFiles}
  //       setInvoiceFiles={setInvoiceFiles}
  //       onUpload={handleInvoiceUpload}
  //     />
  //   </div>
  // );

  return (
    <div className="container mx-auto min-h-screen p-4 md:p-6 bg-gradient-to-br from-primary/5 to-base-100">
      <StatusAlert status={bookedService.serviceStatus} cancellationReason={bookedService.cancelReason} />

      {id && (
        <div className="  md:ml-[90%]">
          <ReloadButton reloadAction={() => getBookedService(id)} />
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 animate-fadeIn">
        <div className="md:col-span-2 bg-base-100 rounded-2xl shadow-lg border border-base-200 p-5 space-y-6">
          <ServiceCardCompact
            serviceImage={service.serviceImage}
            serviceName={service.serviceName}
            serviceType={service.serviceType}
            description={service.description}
            estimatedPrice={service.estimatedPrice}
          />

          <div className="border-t border-dashed pt-4" />

          <UserInfoCompact
            profileImage={user.profileImage}
            userName={user.userName}
            email={user.email}
            phone={user.phone ?? ' '}
          />

          <div className="border-t pt-4" />

          <BookingStepper status={bookedService.serviceStatus} cancellationReason={bookedService.cancelReason} />

          <div className="border-t pt-4" />

          <ScheduleAndPaymentInfo
            bookedDate={formattedBookedDate}
            serviceDate={formattedServiceDate}
            serviceTime={formattedServiceTime}
            isPending={isPending}
            estimatedServiceTime={bookedService.estimatedServiceTime}
            paymentStatus={bookedService.paymentStatus}
            paymentType={bookedService.paymentType}
          />

          <div className="flex flex-wrap justify-center gap-3 pt-6">
            {isPending && (
              <>
                <button className="btn btn-success hover:scale-105 transition" onClick={() => setShowAcceptModal(true)}>
                  Accept Booking
                </button>

                <button className="btn btn-error  hover:scale-105 transition" onClick={() => setShowCancelModal(true)}>
                  Cancel Booking
                </button>
              </>
            )}

            {isConfirmed && (
              <button className="btn btn-primary  hover:scale-105 transition" onClick={() => setShowStatusModal(true)}>
                Update Status
              </button>
            )}

            <Link to={`/service-provider/chat/${user._id}`}>
              <button className="btn btn-secondary  hover:btn-secondary transition-all">💬 Contact Customer</button>
            </Link>

            {isConfirmed && (
              <button className="btn btn-success hover:scale-105 transition" onClick={() => setRescheduleModal(true)}>
                Reschedule Booking
              </button>
            )}
            {/* <button className="btn btn-info  hover:scale-105 transition" onClick={() => setShowInvoiceModal(true)}>
              Upload Bills
            </button> */}

            {(isInProgress || isPaymentRequested || isCompleted) &&
              (!bookingData.bookedService.serviceBills || !bookingData.bookedService.serviceBills.length) && (
                <button className="btn btn-info hover:scale-105 transition" onClick={() => setShowInvoiceModal(true)}>
                  Upload Bills
                </button>
              )}

            {bookingData.bookedService.serviceBills && bookingData.bookedService.serviceBills?.length > 0 && (
              <button onClick={() => setShowBills(true)} className="btn btn-primary">
                show bills
              </button>
            )}

            {isInProgress && (
              <button className="btn btn-warning w-full md:w-auto animate-pulse" onClick={() => setPaymentForm(true)}>
                Request Payment
              </button>
            )}
          </div>

          {paymentForm && (
            <PaymentModal
              payment={payment}
              setPayment={(data: Ipayment) => setPayment(data)}
              closeModal={() => setPaymentForm(false)}
              makePaymentRequest={handlePaymentRequest}
            />
          )}
        </div>

        <div className="space-y-4">
          <div className="card bg-base-100 shadow-md border border-base-200 rounded-xl">
            <div className="card-body p-4">
              <ServiceDateTime
                serviceDateTime={bookedService?.preferredSlot || 0}
                userType="serviceProvider"
                isCancelled={isCancelled}
              />
            </div>
          </div>

          <div className="card bg-base-100 shadow-md border border-base-200 rounded-xl">
            <div className="card-body p-4">
              <ServiceAddressCard address={bookedService.address} liveLocation={bookedService.liveLocation} />
            </div>
          </div>

          {bookingData.review && (
            <div className="p-4 bg-base-200 rounded-xl">
              <h3 className="text-lg font-semibold text-primary mb-2">⭐ User Review</h3>
              <StarRating comment={bookingData.review.comment} rating={bookingData.review.rating} />
            </div>
          )}

          {bookedService.payment && (
            <div className="border border-success/30 bg-success/5 rounded-xl shadow p-2">
              <PriceDetailsCard payment={bookedService.payment} />
            </div>
          )}
        </div>
      </div>

      <AcceptServiceModal
        estimatedTime={estimatedTime}
        max={max}
        min={min}
        handleAcceptBooking={() => handleAcceptBooking('accept')}
        setEstimatedTime={setEstimatedTime}
        setShow={setShowAcceptModal}
        show={showAcceptModal}
      />

      <RescheduleBookingModal
        estimatedTime={estimatedTime}
        setEstimatedTime={setEstimatedTime}
        setShowAcceptModal={setRescheduleModal}
        handleAcceptBooking={() => handleAcceptBooking('reschedule')}
        reason={reason}
        setReason={setReason}
        show={rescheduleModal}
      />

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
        statusList={['confirmed', 'inProgress']}
        selectedStatus={newStatus}
        setSelectedStatus={setNewStatus}
      />

      <UploadDocumentsModal
        showModal={showInvoiceModal}
        setShowModal={setShowInvoiceModal}
        invoiceFiles={invoiceFiles}
        setInvoiceFiles={setInvoiceFiles}
        onUpload={handleInvoiceUpload}
        isBillsUploadLoading={isBillsUploadLoading}
      />

      {showBills && bookingData.bookedService.serviceBills && (
        <ShowBills
          close={() => setShowBills(false)}
          serviceName={bookingData.service.serviceName}
          bills={bookingData.bookedService.serviceBills}
        ></ShowBills>
      )}
    </div>
  );
};

export default ServiceProviderBookingManage;
