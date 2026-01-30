import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRequest } from '../../../utils/makeRequestInstance';
import RazorpayButton from '../../ui/PaymentButton';
import ShowBills from '../../ui/ShowBills';
import dayjs from 'dayjs';
import ServiceCardCompact from '../../ServiceProvider/booking/ServiceCardCompact';
import { HotToastError } from '../../../utils/notificationToast';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { ReloadButton } from './ReloadButton';

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
    serviceBills?: string[];
    serviceSlot: IServiceSlot;
    payment: {
      serviceCost?: number;
      metaialCost?: number;
      travelCost?: number;
      inspectionCost?: number;
      total: number;
      convenienceFee?: number;
    };
    address?: {
      name: string;
      houseName: string;
      pincode: string;
      state: string;
      phone: string;
    };
  };
  service: {
    serviceName: string;
    category: string;
    description: string;
    estimatedPrice: number;
    serviceImage: string;
    serviceType: string;
  };
  serviceProvider: {
    serviceProviderName: string;
    profileImage: string;
    isVerified: string;
    experience: number;
  };
}
export interface IServiceSlot {
  date: Date;
  startTime: string;
  endTime: string;
}
const ServiceBookingDetailsOnline = () => {
  const { id } = useParams();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showBills, setShowBills] = useState(false);
  const [showPaymentConfirm, setShowPaymentConfirm] = useState(false);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (id) {
      getBookedService(id);
    }
  }, [id]);

  const getBookedService = async (id: string) => {
    try {
      setLoading(true);
      const res = await getRequest(`service/bookings${id}`);
      if (res.status === 200) {
        console.log(res.data);

        setBookingData(res.data.service);
      }
    } catch (err) {
      setError('Failed to load booking details');
      console.error(err);
    } finally {
      setLoading(false);
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
          <span>{error || 'Booking data not found'}</span>
        </div>
      </div>
    );
  }

  const { bookedService, service, serviceProvider } = bookingData;
  const formattedBookedDate = new Date(bookedService.bookedTime).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

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

  const isCancelled = bookedService.serviceStatus === 'cancelled';
  const isCompleted = bookedService.serviceStatus === 'completed';
  const isInProgress = bookedService.serviceStatus === 'in-progress';

  const handlePaymentClick = () => {
    setShowPaymentConfirm(true);
  };

  // const confirmPayment = () => {
  //   setShowPaymentConfirm(false);
  //   // Continue with payment process
  // };

  return (
    <div className="container px-4 py-4 mx-auto ">
      {/* Breadcrumbs */}
      <div className="mb-4 text-sm breadcrumbs">
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/booked-services/">My Bookings</Link>
          </li>
          <li>{bookedService._id}</li>

          {id && (
            <li>
              <ReloadButton reloadAction={() => getBookedService(id)} />{' '}
            </li>
          )}
        </ul>
      </div>

      {/* Status Banner */}
      {(isCompleted || isCancelled) && (
        <div className={`alert ${isCompleted ? 'alert-success' : 'alert-error'} mb-4`}>
          <div>
            <h3 className="font-bold">{isCompleted ? 'Service Completed' : 'Service Cancelled'}</h3>
            <div className="text-xs">
              {isCompleted ? 'The service has been successfully completed.' : 'This service has been cancelled.'}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Main Content */}
        <div className="md:col-span-2">
          <div className="shadow-xl card bg-base-100">
            <div className="card-body">
              <ServiceCardCompact
                serviceImage={service.serviceImage}
                description={service.description}
                serviceName={service.serviceName}
                estimatedPrice={service.estimatedPrice}
              />

              <div className="my-2 divider"></div>

              {/* Service Provider */}
              <div className="flex items-center mb-4">
                <div className="mr-3 avatar">
                  <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-2">
                    <img src={serviceProvider.profileImage} alt={serviceProvider.serviceProviderName} />
                  </div>
                </div>
                <div>
                  <div className="font-medium">{serviceProvider.serviceProviderName}</div>
                  <div className="text-xs">
                    <span
                      className={`badge ${serviceProvider.isVerified === 'verified' ? 'badge-success' : 'badge-warning'} badge-sm mr-1`}
                    >
                      {serviceProvider.isVerified}
                    </span>
                    <span>{serviceProvider.experience} years experience</span>
                  </div>
                </div>
              </div>

              {/* Status Timeline */}
              {!isCancelled && (
                <div className="my-4">
                  <h3 className="mb-2 font-medium">Booking Status</h3>
                  <ul className="w-full steps steps-horizontal">
                    <li className={`step ${statusStep >= 1 ? 'step-primary' : ''}`}>Pending</li>
                    <li className={`step ${statusStep >= 2 ? 'step-primary' : ''}`}>Confirmed</li>
                    <li className={`step ${statusStep >= 3 ? 'step-primary' : ''}`}>Payment Complete</li>
                    <li className={`step ${statusStep >= 4 ? 'step-primary' : ''}`}>Completed</li>
                  </ul>
                </div>
              )}

              {/* Booking Details */}
              <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
                <div className="p-3 rounded-lg bg-base-200">
                  <h3 className="mb-2 font-medium text-primary">Booking Schedule</h3>
                  <div className="space-y-1 text-sm">
                    <p>Booked on: {formattedBookedDate}</p>
                    <p>
                      Service slot : {dayjs(bookedService.serviceSlot.date).format('DD MMM YYYY, hh:mm A')} on{' '}
                      {bookedService.serviceSlot.startTime} to {bookedService.serviceSlot.endTime}
                    </p>
                    {isCompleted && <p className="text-success">Completed ✓</p>}
                  </div>
                </div>

                {bookedService.serviceStatus !== 'pending' && bookedService.serviceStatus !== 'cancelled' && (
                  <div className="p-3 rounded-lg bg-base-200">
                    <h3 className="mb-2 font-medium text-primary">Payment Details</h3>
                    <div className="space-y-1 text-sm">
                      <p>Status: {bookedService.paymentStatus}</p>
                      <p>Method: {bookedService.paymentType}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-end gap-2 mt-6">
                {bookedService.serviceStatus === 'pending' && (
                  <button className="btn btn-error btn-sm">Cancel Booking</button>
                )}
                {bookedService.serviceBills && bookedService.serviceBills.length > 0 && (
                  <button onClick={() => setShowBills(true)} className="btn btn-primary btn-sm">
                    Show Bills
                  </button>
                )}
                {!isCancelled && <button className="btn btn-primary btn-sm">Contact Provider</button>}
                {isCompleted && <button className="btn btn-success btn-sm">Download Invoice</button>}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 md:col-span-1">
          {/* Payment Information */}
          {bookedService.payment &&
            bookedService.serviceStatus !== 'pending' &&
            bookedService.serviceStatus !== 'cancelled' && (
              <div className="w-full max-w-md mx-auto border shadow-lg rounded-xl bg-base-100 border-base-300">
                <div className="space-y-4 card-body">
                  <h3 className="text-sm font-semibold text-primary">Price Details</h3>

                  {bookedService.paymentStatus === 'completed' && (
                    <div className="px-2 py-1 text-sm font-medium rounded text-success bg-success/10">
                      Payment Completed
                    </div>
                  )}

                  <div className="space-y-2 text-sm">
                    <div className="my-1 divider" />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>₹{bookedService.payment.total}</span>
                    </div>
                  </div>

                  {id && bookedService.serviceStatus === 'confirmed' && bookedService.paymentStatus !== 'completed' && (
                    <button onClick={handlePaymentClick} className="w-full mt-2 btn btn-primary btn-sm">
                      💳 Make Payment
                    </button>
                  )}
                </div>
              </div>
            )}

          {/* Video Call Area with Countdown */}
          {bookedService.paymentStatus === 'completed' &&
            !isCompleted &&
            !isCancelled &&
            bookedService.isOnlineService && (
              <div className="w-full max-w-md mx-auto border shadow-lg rounded-xl bg-base-100 border-base-300">
                <div className="space-y-4 card-body">
                  <h3 className="text-lg font-semibold text-primary">🧑‍💻 Online Session</h3>

                  <div className="p-4 text-center rounded-lg bg-base-200">
                    <div className="text-sm text-base-content/70">Scheduled Time</div>
                    <div className="mt-1 font-medium text-base-content">
                      {dayjs(bookedService.serviceSlot.startTime).format('DD MMM YYYY, hh:mm A')}
                      <br />
                      <span className="text-sm text-base-content/60">
                        {dayjs(bookedService.serviceSlot.startTime).format('DD MMM YYYY, hh:mm A')}
                        {' to '} {dayjs(bookedService.serviceSlot.startTime).format('DD MMM YYYY, hh:mm A')}
                      </span>
                    </div>
                  </div>

                  <span className="text-base-content ">
                    The service provider will connect with you via video call at the scheduled time.
                  </span>
                </div>
              </div>
            )}

          {isCompleted && (
            <div className="shadow-xl card bg-base-100">
              <div className="card-body">
                <h3 className="mb-2 font-medium text-primary">Rate Service</h3>
                <div className="flex justify-center mb-2 rating rating-md">
                  {[1, 2, 3, 4, 5].map(star => (
                    <input key={star} type="radio" name="rating" className="bg-orange-400 mask mask-star-2" />
                  ))}
                </div>
                <textarea
                  className="w-full mb-2 text-sm textarea textarea-bordered"
                  placeholder="Share your experience"
                ></textarea>
                <button className="w-full btn btn-primary btn-sm">Submit Review</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment Confirmation Modal */}
      {showPaymentConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 rounded-lg bg-base-100">
            <h3 className="mb-4 text-lg font-bold">Confirm Payment</h3>
            <p>Are you sure you want to proceed with the payment?</p>
            <p className="mt-2 font-bold">Amount: ₹{bookedService.payment?.total}</p>
            <p className="mt-1 text-sm text-base-content/70">Once confirmed, the payment cannot be cancelled.</p>
            <div className="flex justify-end gap-2 mt-6">
              <button className=" btn btn-outline btn-md" onClick={() => setShowPaymentConfirm(false)}>
                Cancel
              </button>

              {id && (
                <RazorpayButton
                  onSuccess={() => {
                    getBookedService(id);
                  }}
                  buttonStyle={{
                    className: 'p-3 text-base font-bold rounded-md hover:bg-opacity-45 bg-primary',
                    buttonText: 'Pay Now',
                  }}
                  createOrderApi="/payment/create-order"
                  customerInfo={{ email: user.email || '', phone: user.phone || '', userName: user.userName || '' }}
                  onError={() => HotToastError('your attempted transaction was unsuccessful')}
                  payload={{ serviceId: id }}
                  total={bookedService.payment.total - 100}
                  verifyApi={'/payment/verify'}
                  onBeforePayment={() => setShowPaymentConfirm(false)}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {showBills && bookedService.serviceBills && (
        <ShowBills
          close={() => setShowBills(false)}
          serviceName={service.serviceName}
          bills={bookedService.serviceBills}
        />
      )}
    </div>
  );
};

export default ServiceBookingDetailsOnline;
