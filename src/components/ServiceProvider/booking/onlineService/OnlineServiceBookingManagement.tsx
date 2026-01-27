import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getRequest, patchRequest, putRequest } from '../../../../utils/makeRequestInstance';
import { HotToastError, HotToastSuccess } from '../../../../utils/notificationToast';
import CancelBookingModal from '../CancelBookingModal';
import StatusUpdateModal from '../StatusUpdateModal';
import ServiceCardCompact from '../ServiceCardCompact';
import UserInfoCompact from '../UserInfoCompact';
import ScheduleAndPaymentInfo from '../ScheduleAndPaymentInfo';
import StatusAlert from '../StatusAlert';
import dayjs from 'dayjs';
import RescheduleSlotModal from './RescheduleSlotModal';

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
    isOnlineService: boolean;
    serviceSlot: IServiceSlot;
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
}

export interface IServiceSlot {
  date: Date;
  startTime: string;
  endTime: string;
}
const OnlineBookingManagement = () => {
  const { id } = useParams();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [showStatusModal, setShowStatusModal] = useState<boolean>(false);
  const [cancelReason, setCancelReason] = useState<string>('');
  const [newStatus, setNewStatus] = useState<string>('');
  const [openReschedule, setOpenReschedule] = useState(false);
  const handleOpenReschedule = () => {
    setOpenReschedule(true);
  };

  const handleCloseReschedule = () => {
    setOpenReschedule(false);
  };

  const handleRescheduleSubmit = async (payload: { date: Date; startTime: Date; endTime: Date }) => {
    console.log('Reschedule Payload:', payload);
    const bookingId = bookingData?.bookedService._id;

    if (!bookingId) {
      console.error('bookingId missing');
      return;
    }
    const res = await patchRequest(`/service/online-bookings/${bookingData?.bookedService._id}/reschedule`, {
      bookingId,
      date: payload.date,
      startTime: payload.startTime,
      endTime: payload.endTime,
    });

    if (res.status === 200) {
      HotToastSuccess('Rescheduled successfully');

      setBookingData((prev): BookingData | null => {
        if (!prev) return prev;

        return {
          ...prev,
          bookedService: {
            ...prev.bookedService,
            serviceSlot: {
              ...prev.bookedService.serviceSlot,
              date: payload.date,
              startTime: payload.startTime.toISOString(),
              endTime: payload.endTime.toISOString(),
            },
          },
        };
      });
      handleCloseReschedule();
    }
  };
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
          setNewStatus(res.data.service.bookedService.serviceStatus);
        }
      }
    } catch (err) {
      setError('Failed to load booking details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async () => {
    try {
      if (!cancelReason) {
        HotToastError('Please provide a cancellation reason');
        return;
      }

      const res = await putRequest(`service/service-provider/bookings/${id}/cancel`, {
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
      const res = await putRequest(`service/service-provider/bookings/${id}/status`, {
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

  const handleStartVideoCall = () => {};

  const isPending = bookingData?.bookedService.serviceStatus === 'pending';
  const isInProgress = bookingData?.bookedService.serviceStatus === 'in-progress';
  const isCancelled = bookingData?.bookedService.serviceStatus === 'cancelled';

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

  const statusStep = (() => {
    switch (bookedService.serviceStatus) {
      case 'pending':
        return 1;
      case 'confirmed':
        return 2;
      case 'in-progress':
        return 3;
      case 'completed':
        return 4;
      case 'cancelled':
        return -1;
      default:
        return 1;
    }
  })();

  return (
    <div className=" max-w-4xl min-h-screen p-4 mx-auto bg-base-100">
      <StatusAlert status={bookedService.serviceStatus} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="p-4 shadow md:col-span-2 bg-base-100 rounded-box">
          <ServiceCardCompact
            serviceImage={service.serviceImage}
            serviceName={service.serviceName}
            serviceType={service.serviceType}
            description={service.description}
            estimatedPrice={service.estimatedPrice}
          />

          <div className="my-2 divider"></div>

          <UserInfoCompact
            profileImage={user.profileImage}
            userName={user.userName}
            email={user.email}
            phone={user.phone ?? ' '}
          />

          {!isCancelled && (
            <div className="mb-4">
              <h3 className="mb-2 font-medium">Booking Status</h3>
              <ul className="w-full steps steps-horizontal">
                <li className={`step ${statusStep >= 1 ? 'step-primary' : ''}`}>Pending</li>
                <li className={`step ${statusStep >= 2 ? 'step-primary' : ''}`}>Confirmed</li>
                <li className={`step ${statusStep >= 3 ? 'step-primary' : ''}`}>Payment Received</li>
                <li className={`step ${statusStep >= 4 ? 'step-primary' : ''}`}>Completed</li>
              </ul>
            </div>
          )}

          <ScheduleAndPaymentInfo
            bookedDate={dayjs(bookedService.bookedTime).format('DD MMM YYYY, hh:mm A')}
            serviceDate={dayjs(bookedService.serviceSlot.date).format('DD MMM YYYY, hh:mm A')}
            serviceTime={`${dayjs(bookedService.serviceSlot.startTime).format('hh:mm A')}  to ${dayjs(bookedService.serviceSlot.endTime).format(' hh:mm A')} `}
            isPending={isPending}
            estimatedServiceTime={dayjs(bookedService.estimatedServiceTime).format('DD MMM YYYY, hh:mm A')}
            paymentStatus={bookedService.paymentStatus}
            paymentType={bookedService.paymentType}
          />

          <div className="flex flex-wrap justify-end gap-2 mt-4">
            {!isCancelled && !isPending && (
              <>
                <button className="btn btn-primary btn-sm" onClick={() => setShowStatusModal(true)}>
                  Update Status
                </button>

                <Link to={`/service-provider/chat/${bookingData.user._id}`}>
                  <button className="btn btn-primary btn-sm">Chat</button>
                </Link>
                <button className="btn btn-sm btn-outline" onClick={handleOpenReschedule}>
                  Reschedule
                </button>

                {/* <button className="btn btn-secondary btn-sm">Contact Customer</button> */}

                {isInProgress && bookedService.isOnlineService && (
                  <Link to={`/video-call/${bookedService.serviceProviderId}`}>
                    <button className="btn btn-accent btn-sm" onClick={handleStartVideoCall}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      Start Video Call
                    </button>
                  </Link>
                )}
              </>
            )}
          </div>
        </div>

        <div className="md:col-span-1">
          {bookedService.isOnlineService && (
            <div className="mb-4 shadow card bg-base-100">
              <div className="p-4 card-body">
                <h3 className="text-base card-title">Online Service</h3>
                <div className="text-sm">
                  <p className="mb-2">This service will be delivered online via video call.</p>
                  {isInProgress && (
                    <button className="mt-2 btn btn-accent btn-block" onClick={handleStartVideoCall}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      Start Video Call
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {bookedService.paymentStatus !== 'completed' && (
        <CancelBookingModal
          show={showCancelModal}
          setShow={setShowCancelModal}
          cancelReason={cancelReason}
          setCancelReason={setCancelReason}
          handleCancelBooking={handleCancelBooking}
        />
      )}

      <StatusUpdateModal
        show={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        onUpdate={handleStatusUpdate}
        statusList={['completed', '']}
        selectedStatus={newStatus}
        setSelectedStatus={setNewStatus}
      />

      {openReschedule && <RescheduleSlotModal onClose={handleCloseReschedule} onSubmit={handleRescheduleSubmit} />}
    </div>
  );
};

export default OnlineBookingManagement;
