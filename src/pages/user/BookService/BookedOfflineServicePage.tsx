import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { deleteRequest, getRequest, postRequest, putRequest } from '../../../utils/makeRequestInstance';
import RazorpayButton from '../../../components/ui/PaymentButton';
import ShowBills from '../../../components/ui/ShowBills';
import ReviewCard from '../../../components/User/bookService/ReviewCard';
import { IReview } from '../../../utils/types/IReview';
import ServeasyInvoiceDownloader from '../../../components/User/bookService/bookedServiceList/InvoiceDownloader';
import { IBookingHistory, IServiceDateTime } from '../../../utils/types/booking';
import ServiceDateTime from '../../../components/User/bookService/ServiceTimeInfo';
import { HotToastError, HotToastSuccess } from '../../../utils/notificationToast';
import BookingHistoryList from '../../../components/ui/BookingHistoryList';
import ServiceAddressCard from '../../../components/ServiceProvider/booking/ServiceAddressCard';
import BookingStepper from '../../../components/ServiceProvider/booking/BookingStepper';
import UserInfoCompact from '../../../components/ServiceProvider/booking/UserInfoCompact';
import ServiceCardCompact from '../../../components/ServiceProvider/booking/ServiceCardCompact';
import CancelBookingModal from '../../../components/ServiceProvider/booking/CancelBookingModal';
import CouponInput from '../../../components/ui/CouponInput';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { ReloadButton } from '../../../components/User/bookService/ReloadButton';
import { ROUTES } from '../../../utils/constants/routes';
import useDataRefresh from '../../../hooks/useDataRefresh';

interface Address {
  name: string;
  houseName: string;
  pincode: string;
  state: string;
  phone: string;
}

export interface IPayment {
  serviceCost?: number;
  materialCost: number;
  travelCost: number;
  inspectionCost: number;
  convenienceFee: number;
  total: number;
  discountAmount: number;
  finalTotal?: number;
}

interface Location {
  address: string;
  latitude: number;
  longitude: number;
  _id: string;
}

interface Service {
  _id: string;
  serviceName: string;
  category: string;
  description: string;
  estimatedPrice: number;
  serviceImage: string;
  serviceType: string;
  location: Location;
  serviceProviderId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ServiceProvider {
  _id: string;
  serviceProviderName: string;
  serviceProviderEmail: string;
  serviceProviderPhone: string;
  profileImage: string;
  description: string;
  experience: number;
  services: string[];
  location: Location;
  isVerified: string;
  isBlocked: boolean;
  userId: string;
}

interface BookedService {
  _id: string;
  userId: string;
  serviceId: string;
  serviceProviderId: string;
  bookedTime: string;
  estimatedServiceTime: string;
  serviceStatus: string;
  paymentStatus: string;
  paymentType: string;
  address: Address;
  createdAt: string;
  updatedAt: string;
serviceBills?: string[];
  preferredSlot: IServiceDateTime;
  bookingHistory?: IBookingHistory[];

  cancelReason?: string;
  payment?: IPayment;
  coupon?: ICouponApplied;
}

export interface BookingData {
  bookedService: BookedService;
  service: Service;
  serviceProvider: ServiceProvider;
  review?: IReview;
}

export interface ICouponApplied {
  _id?: string;
  code: string;
  discountAmount: number;
  appliedAt: Date;
}

const ServiceBookingDetails = () => {
  const { id } = useParams();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [review, setReview] = useState<IReview | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showBills, setShowBills] = useState(false);
  const [download, setDownload] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [cancelReason, setCancelReason] = useState<string>('');
  const user = useSelector((state: RootState) => state.user);

  useDataRefresh(() => fetchData(id));

  const handleApplyCoupon = async (coupon: string): Promise<boolean> => {
    try {
      const response = await postRequest(`/service/bookings/${id}/coupon/apply`, {
        couponCode: coupon.trim(),
      });
      if (response.status === 200) {
        console.log(response.data.data);

        if (response.data.data.success) {
          HotToastSuccess('🎉 Coupon applied! You saved successfully.');
          if (!bookedService) return false;

          setBookingData(prev => {
            if (!prev) return null;

            return {
              ...prev,
              bookedService: {
                ...prev.bookedService,
                payment: prev.bookedService.payment
                  ? {
                      ...prev.bookedService.payment,
                      finalTotal: response.data.data.finalAmount as number,
                      discountAmount: response.data.data.discountAmount as number,
                    }
                  : prev.bookedService.payment,
              },
            };
          });
          return true;
        } else {
          HotToastError(response.data.data.message);

          return false;
        }
      } else {
        return false;
      }
    } catch (error: any) {
      HotToastError(error?.response?.data?.message || 'Failed to apply coupon');
      return false;
    } finally {
    }
  };

  const handleCancelBooking = async () => {
    try {
      if (!cancelReason) {
        HotToastError('Please provide a cancellation reason');
        return;
      }

      const res = await putRequest(`service/bookings/${id}/cancel`, {
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

  const handleRemove = async () => {
    try {
      setLoading(true);
      const res = await deleteRequest(`/service/bookings/${id}/coupon/remove `);
      if (res.status == 200) {
        if (res?.data?.data?.success) {
          setBookingData(prev => {
            if (!prev) return null;

            return {
              ...prev,
              bookedService: {
                ...prev.bookedService,
                payment: prev.bookedService.payment
                  ? {
                      ...prev.bookedService.payment,
                      finalTotal: res.data.data.finalAmount as number,
                      discountAmount: res.data.data.discountAmount as number,
                    }
                  : prev.bookedService.payment,
              },
            };
          });

          HotToastSuccess(res?.data?.data?.message || `Coupon removed successfully!!`);
        } else {
        }
      }
    } catch (error: any) {
      HotToastError(error?.response?.data?.message || 'Failed to remove coupon');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const fetchData = (id?: string) => {
    if (id) {
      getBookedService(id);
    }
  };

  const getBookedService = async (id: string) => {
    try {
      setLoading(true);
      const res = await getRequest(`service/bookings${id}`);

      if (res.status === 200) {
        setBookingData(res.data.service);
        console.log(res.data.service.serviceBills)
console.log();
        setReview(res.data.service.review);
      }
    } catch (err) {
      setError('Failed to load booking details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !bookingData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-200">
        <div className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 stroke-current shrink-0"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
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
  const formattedEstimatedDate = new Date(bookedService.estimatedServiceTime).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const formattedEstimatedTime = new Date(bookedService.estimatedServiceTime).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const isCancelled = bookedService.serviceStatus === 'cancelled';
  const isCompleted = bookedService.serviceStatus === 'completed';
  const isConfirmed = bookedService.serviceStatus === 'confirmed';
  return (
    <div className="container min-h-screen px-4 py-4 mx-auto bg-base-200">
      <div className="mb-4 text-sm breadcrumbs text-base-content">
        <ul>
          <li>
            <Link to={ROUTES.USER.HOME}>Home</Link>
          </li>

          <li>
            <Link to={`/myprofile${ROUTES.USER.BOOKED_SERVICES}`}>My Bookings</Link>
          </li>

          <li>{bookedService._id.slice(0, 4) + '...'}</li>

          {id && (
            <li>
              <ReloadButton reloadAction={() => getBookedService(id)} />{' '}
            </li>
          )}
        </ul>
      </div>

      {/* Status Banner for Completed or Cancelled */}
      {(isCompleted || isCancelled) && (
        <div className={`alert ${isCompleted ? 'alert-success' : 'alert-error'} mb-6`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 stroke-current shrink-0"
            fill="none"
            viewBox="0 0 24 24"
          >
            {isCompleted ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            )}
          </svg>
          <div>
            <h3 className="font-bold">{isCompleted ? 'Service Completed' : 'Service Cancelled'}</h3>
            <div className="text-xs">
              {isCompleted
                ? 'The service has been successfully completed. Thank you for using our service!'
                : 'This service has been cancelled. For any queries, please contact customer support.'}
            </div>
          </div>
        </div>
      )}

      {/* Main Card */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Service and Timeline Details - 2/3 width */}
        <div className="md:col-span-2">
          {/* Service Details Card */}
          <div
            className={`card bg-base-100 shadow-xl ${isCancelled ? 'border-error border' : isCompleted ? 'border-success border' : ''}`}
          >
            <div className="card-body">
              <ServiceCardCompact
                serviceImage={service.serviceImage}
                serviceName={service.serviceName}
                serviceType={service.serviceType}
                description={service.description}
                estimatedPrice={service.estimatedPrice}
              />
              <div className="divider"></div>

              <div className="">
                <UserInfoCompact
                  profileImage={serviceProvider.profileImage}
                  userName={serviceProvider.serviceProviderName}
                  email={serviceProvider.serviceProviderEmail}
                  phone={serviceProvider.serviceProviderPhone ?? ' '}
                />

                <span>{serviceProvider.experience} years experience</span>
              </div>

              {/* Status Timeline */}
              <div className="mt-6 mb-6">
                {isCancelled ? (
                  <div className="alert alert-error">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 stroke-current shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Service has been cancelled</span>
                  </div>
                ) : (
                  <BookingStepper status={bookedService.serviceStatus} />
                )}
              </div>

              {/* Cancelled Reason - Only shown if cancelled */}
              {isCancelled && (
                <div className="p-4 mb-6 rounded-lg bg-error/10">
                  <h3 className="mb-2 font-semibold text-error">Cancellation Details</h3>
                  <p className="text-sm">
                    This service was cancelled on{' '}
                    {new Date().toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                    .
                  </p>
                  <p className="mt-2 text-sm">
                    <strong>Reason:</strong> {bookedService.cancelReason}
                  </p>
                  <p className="mt-2 text-sm"></p>
                </div>
              )}

              {/* Completion Details - Only shown if completed */}
              {isCompleted && (
                <div className="p-4 mb-6 rounded-lg bg-success/10">
                  <h3 className="mb-2 font-semibold text-success">Service Completion Details</h3>
                  <p className="text-sm">
                    This service was completed on{' '}
                    {new Date().toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                    .
                  </p>
                  <div className="mt-4">
                    <h4 className="mb-2 text-sm font-medium">Service Provider Notes:</h4>
                    <p className="p-2 text-sm italic rounded bg-base-200">
                      "Service completed successfully. Thank you for choosing our service!"
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2">
                {/* Booking Time */}
                <div className="p-4 rounded-lg bg-base-200">
                  <h3 className="mb-2 font-semibold text-primary">Booking Schedule</h3>
                  <div className="flex items-center mb-2 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 mr-2 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>Booked on: {formattedBookedDate}</span>
                  </div>
                  {bookedService.estimatedServiceTime && (
                    <div className="flex items-center text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 mr-2 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>
                        {isCancelled ? (
                          <span className="line-through">
                            {formattedEstimatedDate} at {formattedEstimatedTime}
                          </span>
                        ) : (
                          `Service on: ${formattedEstimatedDate} at ${formattedEstimatedTime}`
                        )}
                      </span>
                    </div>
                  )}

                  <ServiceDateTime
                    serviceDateTime={bookedService.preferredSlot || new Date()}
                    userType="user"
                    isCancelled={isCancelled ? true : false}
                  />

                  {isCompleted && (
                    <div className="flex items-center mt-2 text-sm text-success">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 mr-2 text-success"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Completed on: {formattedEstimatedDate}</span>
                    </div>
                  )}
                </div>

                {/* Payment Info */}

                <div className="p-4 rounded-lg bg-base-200">
                  <h3 className="mb-2 font-semibold text-primary">Payment Details</h3>

                  {/* Payment Method */}
                  <div className="flex items-center mb-2 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 mr-2 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span>Method: {bookedService.paymentType}</span>
                  </div>

                  {/* Payment Status (only if not pending) */}
                  {bookedService.paymentStatus !== 'pending' && (
                    <div className="flex items-center text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 mr-2 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                      <span>Payment Status: {bookedService.paymentStatus}</span>
                    </div>
                  )}

                  {/* Cancellation Info (optional block) */}
                  {isCancelled && <div className="mt-2 text-sm text-error">This booking has been cancelled.</div>}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="justify-end mt-8 card-actions">
                {bookedService.serviceStatus === 'pending' ||
                  (isConfirmed && (
                    <button className="btn btn-error" onClick={() => setShowCancelModal(true)}>
                      Cancel Booking
                    </button>
                  ))}
                {bookingData.bookedService.serviceBills && bookingData.bookedService.serviceBills?.length > 0 && (
                  <button onClick={() => setShowBills(true)} className="btn btn-primary">
                    show bills
                  </button>
                )}
                {!isCancelled && (
                  <Link to={'/chat/' + serviceProvider.userId}>
                    <button className="btn btn-primary">Contact Service Provider</button>{' '}
                  </Link>
                )}

                {isCompleted && (
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      setDownload(true);
                    }}
                  >
                    Download Invoice
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <CancelBookingModal
          show={showCancelModal}
          setShow={setShowCancelModal}
          cancelReason={cancelReason}
          setCancelReason={setCancelReason}
          handleCancelBooking={handleCancelBooking}
        />

        {download && <ServeasyInvoiceDownloader bookingData={bookingData} />}

        {/* Right Side - Details and Price Summary - 1/3 width */}
        <div className="md:col-span-1">
          {bookedService.address && <ServiceAddressCard address={bookedService.address} />}
          {bookedService.payment && (
            <div className="shadow card bg-base-100">
              {/* <div className="p-4 card-body">
                <h3 className="text-base card-title">Price Details</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>service Cost</span>
                    <span>₹{bookedService.payment.serviceCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span> metaialCost</span>
                    <span>₹{bookedService.payment.metaialCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>travelCost</span>
                    <span>₹{bookedService.payment.travelCost}</span>
                  </div>

                  <div className="my-1 divider"></div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{bookedService.payment.total}</span>
                  </div>

                  <div className="flex justify-between font-bold">
                    <span>discount</span>
                    <span>₹{bookedService.payment.discountAmount}</span>
                  </div>

                  <div className="flex justify-between font-bold">
                    <span>total after discount</span>
                    <span>₹{bookedService.payment.finalTotal}</span>
                  </div>
                </div>
                <div className="">
                  <CouponInput bookingId={id + ''} handleApply={(coupon: string) => handleApplyCoupon(coupon)} />
                </div>
              </div> */}

              <div className="p-4 card-body">
                <h3 className="text-base font-semibold card-title">Price Details</h3>

                <div className="space-y-2 text-sm">
                  {/* Base Costs */}
                  <div className="flex justify-between">
                    <span>Service Cost</span>
                    <span>₹{bookedService.payment.serviceCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Material Cost</span>
                    <span>₹{bookedService.payment.materialCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Travel Cost</span>
                    <span>₹{bookedService.payment.travelCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>inspection Cost</span>
                    <span>₹{bookedService.payment.inspectionCost}</span>
                  </div>

                  <div className="my-2 divider" />

                  {/* Subtotal */}
                  <div className="flex justify-between font-medium">
                    <span>Subtotal</span>
                    <span>₹{bookedService.payment.total}</span>
                  </div>

                  {/* If discount applied */}
                  {bookedService.payment.discountAmount > 0 ? (
                    <>
                      <div className="flex justify-between font-semibold text-success">
                        <span>Discount</span>
                        <span>- ₹{bookedService.payment.discountAmount}</span>
                      </div>

                      <div className="my-2 divider" />

                      <div className="flex justify-between text-lg font-bold text-primary">
                        <span>Total After Discount</span>
                        <span>₹{bookedService.payment.finalTotal}</span>
                      </div>
                    </>
                  ) : (
                    // If no discount applied
                    <div className="flex justify-between text-lg font-bold text-primary">
                      <span>Total</span>
                      <span>₹{bookedService.payment.total}</span>
                    </div>
                  )}

                  {id && bookedService.paymentStatus !== 'completed' && (
                    <div className="mt-4">
                      <CouponInput
                        bookingId={id + ''}
                        currentCoupon={bookedService.coupon?.code || null}
                        handleRemoveCoupon={() => handleRemove()}
                        handleApply={(coupon: string) => handleApplyCoupon(coupon)}
                      />
                    </div>
                  )}
                </div>
              </div>

              {id && bookedService.paymentStatus !== 'completed' && (
                <RazorpayButton
                  onSuccess={() => getBookedService(id)}
                  buttonStyle={{
                    className: 'p-3 text-base-100 font-bold rounded-md hover:bg-opacity-45 bg-primary',
                    buttonText: 'Pay Now',
                  }}
                  createOrderApi="/payment/create-order"
                  customerInfo={{ email: user.email || '', phone: user.phone || '', userName: user.userName || '' }}
                  onError={() => HotToastError('your attempted transaction was unsuccessful')}
                  payload={{ serviceId: id }}
                  total={bookedService.payment.total - 100}
                  verifyApi={'/payment/verify'}
                />
              )}
            </div>
          )}

          {/* Feedback Section */}
          {isCompleted && (
            <div className="mt-6 shadow-xl card bg-base-100">
              <ReviewCard bookedServiceId={bookedService._id} serviceId={bookedService.serviceId} review={review} />
            </div>
          )}

          <div className="mt-5 bg-base-200">
            <BookingHistoryList history={bookedService.bookingHistory ?? []} />
          </div>

          {  (
            <div className="">
              <div className="card-body">
                {/* <h3 className="mb-2 font-semibold text-primary">More options</h3> */}


                {showBills&&bookingData?.bookedService?.serviceBills&&bookingData?.bookedService?.serviceBills?.length>0 && (
                  <ShowBills
                    close={() => setShowBills(false)}
                    serviceName={bookingData.service.serviceName}
                    bills={bookingData.bookedService.serviceBills}
                  ></ShowBills>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceBookingDetails;
