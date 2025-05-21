import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRequest } from "../../../utils/makeRequestInstance";
import RazorpayButton from "../../ui/PaymentButton";
import ShowBills from "../../ui/ShowBills";
import ReviewCard from "./ReviewCard";
import { IReview } from "../../../utils/types/IReview";
import ServeasyInvoiceDownloader from "./bookedServiceList/InvoiceDownloader";

interface Address {
  name: string;
  houseName: string;
  pincode: string;
  state: string;
  phone: string;
}

interface Ipayment {
  serviceCost?: number;
  metaialCost?: number;
  travelCost?: number;
  inspectionCost?: number;
  total: number;
  convenienceFee?: number;
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
  serviceBills?: [string];

  cancelReason?: string;
  payment?: Ipayment;
}

export interface BookingData {
  bookedService: BookedService;
  service: Service;
  serviceProvider: ServiceProvider;
  review?:IReview
}

const ServiceBookingDetails = () => {
  const { id } = useParams();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [review,setReview]=useState<IReview |null>(null)
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showBills, setShowBills] = useState(false);
  const [download, setDownload] = useState(false);
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
         
        setBookingData(res.data.service);
        setReview(res.data.service.review)
      }
    } catch (err) {
      setError("Failed to load booking details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  console.log(bookingData);
  console.log(review);

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
          <span>{error || "Booking data not found"}</span>
        </div>
      </div>
    );
  }

  const { bookedService, service, serviceProvider } = bookingData;
  const formattedBookedDate = new Date(
    bookedService.bookedTime
  ).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const formattedEstimatedDate = new Date(
    bookedService.estimatedServiceTime
  ).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const formattedEstimatedTime = new Date(
    bookedService.estimatedServiceTime
  ).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const getStatusStep = (status: string) => {
    switch (status) {
      case "pending":
        return 1;
      case "confirmed":
        return 2;
      case "inProgress":
        return 3;
      case "requested":
        return 3;
      case "completed":
        return 4;
      case "cancelled":
        return -1;
      default:
        return 1;
    }
  };

  const statusStep = getStatusStep(bookedService.serviceStatus);
  const isCancelled = bookedService.serviceStatus === "cancelled";
  const isCompleted = bookedService.serviceStatus === "completed";

  return (
    <div className="container min-h-screen px-4 py-4 mx-auto bg-base-200">
      {/* Breadcrumb */}
      <div className="mb-4 text-sm breadcrumbs text-base-content">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {/* <li>
            <Link to="/account">My Account</Link>
          </li> */}
          <li>
            <Link to="/booked-services/">My Bookings</Link>
          </li>

          <li>{bookedService._id}</li>
        </ul>
      </div>

      {/* Status Banner for Completed or Cancelled */}
      {(isCompleted || isCancelled) && (
        <div
          className={`alert ${isCompleted ? "alert-success" : "alert-error"} mb-6`}
        >
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
            <h3 className="font-bold">
              {isCompleted ? "Service Completed" : "Service Cancelled"}
            </h3>
            <div className="text-xs">
              {isCompleted
                ? "The service has been successfully completed. Thank you for using our service!"
                : "This service has been cancelled. For any queries, please contact customer support."}
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
            className={`card bg-base-100 shadow-xl ${isCancelled ? "border-error border" : isCompleted ? "border-success border" : ""}`}
          >
            <div className="card-body">
              <div className="flex flex-col gap-4 mb-4 md:flex-row md:items-center">
                <div className="relative flex-shrink-0">
                  <img
                    src={service.serviceImage}
                    alt={service.serviceName}
                    className={`w-28 h-28 object-cover rounded-lg ${isCancelled ? "opacity-60" : ""}`}
                  />
                  {isCancelled && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="badge badge-error badge-lg">
                        CANCELLED
                      </span>
                    </div>
                  )}
                  {isCompleted && (
                    <div className="absolute top-2 right-2">
                      <span className="badge badge-success">✓</span>
                    </div>
                  )}
                </div>
                <div className="flex-grow">
                  <h2 className="card-title text-primary">
                    {service.serviceName}
                  </h2>
                  <div className="flex items-center">
                    <span className="mr-2 badge badge-outline badge-sm">
                      {service.category}
                    </span>
                    <span className="badge badge-outline badge-sm">
                      {service.serviceType}
                    </span>
                    {isCancelled && (
                      <span className="ml-2 badge badge-error badge-sm">
                        Cancelled
                      </span>
                    )}
                    {isCompleted && (
                      <span className="ml-2 badge badge-success badge-sm">
                        Completed
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-base-content/70">
                    {service.description}
                  </p>
                  <div className="mt-3">
                    <span className="text-xl font-bold text-primary">
                      ₹{service.estimatedPrice}
                    </span>
                  </div>
                </div>
              </div>

              <div className="divider"></div>

              {/* Service Provider Info */}
              <div className="flex items-center mb-6">
                <div className="mr-4 avatar">
                  <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={serviceProvider.profileImage}
                      alt={serviceProvider.serviceProviderName}
                    />
                  </div>
                </div>
                <div>
                  <div className="font-medium">
                    {serviceProvider.serviceProviderName}
                  </div>
                  <div className="text-sm text-base-content/70">
                    <span
                      className={`badge ${serviceProvider.isVerified === "verified" ? "badge-success" : "badge-warning"} badge-sm mr-2`}
                    >
                      {serviceProvider.isVerified}
                    </span>
                    <span>{serviceProvider.experience} years experience</span>
                  </div>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="mt-6 mb-6">
                <h3 className="mb-4 font-semibold text-primary">
                  Booking Status
                </h3>
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
                  <ul className="w-full steps steps-horizontal">
                    <li
                      className={`step ${statusStep >= 1 ? "step-primary" : ""}`}
                    >
                      Pending
                    </li>
                    <li
                      className={`step ${statusStep >= 2 ? "step-primary" : ""}`}
                    >
                      Confirmed
                    </li>
                    <li
                      className={`step ${statusStep >= 3 ? "step-primary" : ""}`}
                    >
                      In Progress
                    </li>
                    <li
                      className={`step ${statusStep >= 4 ? "step-primary" : ""}`}
                    >
                      Completed
                    </li>
                  </ul>
                )}
              </div>

              {/* Cancelled Reason - Only shown if cancelled */}
              {isCancelled && (
                <div className="p-4 mb-6 rounded-lg bg-error/10">
                  <h3 className="mb-2 font-semibold text-error">
                    Cancellation Details
                  </h3>
                  <p className="text-sm">
                    This service was cancelled on{" "}
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
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
                  <h3 className="mb-2 font-semibold text-success">
                    Service Completion Details
                  </h3>
                  <p className="text-sm">
                    This service was completed on{" "}
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                    .
                  </p>
                  <div className="mt-4">
                    <h4 className="mb-2 text-sm font-medium">
                      Service Provider Notes:
                    </h4>
                    <p className="p-2 text-sm italic rounded bg-base-200">
                      "Service completed successfully. Thank you for choosing
                      our service!"
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2">
                {/* Booking Time */}
                <div className="p-4 rounded-lg bg-base-200">
                  <h3 className="mb-2 font-semibold text-primary">
                    Booking Schedule
                  </h3>
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
                  {isCompleted && (
                    <div className="flex items-center mt-2 text-sm text-success">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 mr-2 text-success"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Completed on: {formattedEstimatedDate}</span>
                    </div>
                  )}
                </div>

                {/* Payment Info */}
                <div className="p-4 rounded-lg bg-base-200">
                  <h3 className="mb-2 font-semibold text-primary">
                    Payment Details
                  </h3>
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
                    <p>payment is not received yet</p>
                  </div>
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
                    <span>Method: {bookedService.paymentType}</span>
                  </div>
                  {isCancelled && <></>}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="justify-end mt-8 card-actions">
                {bookedService.serviceStatus === "pending" && (
                  <button className="btn btn-error">Cancel Booking</button>
                )}
                {bookingData.bookedService.serviceBills && (
                  <button
                    onClick={() => setShowBills(true)}
                    className="btn btn-primary"
                  >
                    show bills
                  </button>
                )}
                {!isCancelled && (
                  <button className="btn btn-primary">
                    Contact Service Provider
                  </button>
                )}

                {isCompleted && (
                  <button className="btn btn-success" onClick={() => {setDownload(true)}}>Download Invoice</button>

                )}
              </div>
            </div>
          </div>
        </div>

    {download && <ServeasyInvoiceDownloader bookingData={bookingData}/>}

        {/* Right Side - Details and Price Summary - 1/3 width */}
        <div className="md:col-span-1">
          {/* Address Card */}
          <div className="mb-6 shadow-xl card bg-base-100">
            <div className="card-body">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-primary">Service Address</h3>
              </div>
              <div className="text-sm">
                <p className="font-medium">{bookedService.address.name}</p>
                <p>{bookedService.address.houseName}</p>
                <p>
                  {bookedService.address.state} -{" "}
                  {bookedService.address.pincode}
                </p>
                <div className="flex items-center mt-2">
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
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>{bookedService.address.phone}</span>
                </div>
              </div>
            </div>
          </div>
          {/* 
           <div className="shadow-xl card bg-base-100">
            <div className="card-body">
              <h3 className="mb-4 font-semibold text-primary">Price Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>List price</span>
                  {/* <span>₹{(service.booked * 1.25).toFixed(0)}</span> */}
          {/* </div>
                <div className="flex justify-between">
                  <span>Selling price</span>
                  <span>₹{service.payment.convenienceFee}</span>
                </div>
                <div className="flex justify-between text-success">
                  <span>Discount</span>
                  <span>- ₹{(service.estimatedPrice * 0.25).toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Fee</span>
                  <span>₹{Math.floor(service.estimatedPrice * 0.03)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Handling Fee</span>
                  <span>₹7</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span className="text-success">Free</span>
                </div>
                {isCancelled && (
                  <div className="flex justify-between text-error">
                    <span>Cancellation Fee</span>
                    <span>- ₹0</span>
                  </div>
                )}
                <div className="my-2 divider"></div>
                <div className="flex justify-between font-bold">
                  <span>Total Amount</span>
                  {isCancelled ? (
                    <span className="line-through">₹{service.estimatedPrice}</span>
                  ) : (
                    <span>₹{service.estimatedPrice}</span>
                  )}
                </div>
                {isCompleted && (
                  <div className="flex justify-between font-medium text-success">
                    <span>Payment Received</span>
                    <span>₹{service.estimatedPrice}</span>
                  </div>
                )}
                {isCancelled && (
                  <div className="flex justify-between font-medium text-error">
                    <span>Refund Amount</span>
                    <span>₹{service.estimatedPrice}</span>
                  </div>
                )}
                {!isCancelled && !isCompleted && (
                  <div className="mt-2">
                    <div className="flex items-center">
                      <span className="text-sm">• Cash On Delivery: ₹{service.estimatedPrice}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div> */}

          {bookedService.payment && (
            <div className="shadow card bg-base-100">
              <div className="p-4 card-body">
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
                  <div className="flex justify-between mt-1 text-xs opacity-75">
                    <span>convenience Fee (10%)</span>
                    <span>₹{bookedService.payment?.convenienceFee} </span>
                  </div>
                </div>
              </div>
              {id && bookedService.paymentStatus !=="completed"&& (
                <RazorpayButton
                  serviceid={id}
                  reloadData={() => getBookedService(id)}
                  total={bookedService.payment.total}
                />
              )}
            </div>
          )}

          {/* Feedback Section */}
          {isCompleted && (
            <div className="mt-6 shadow-xl card bg-base-100">
              <ReviewCard
                bookedServiceId={bookedService._id}
                serviceId={bookedService.serviceId}
                review={review }
              />
            </div>
          )}

          {!isCompleted && (
            <div className="mt-6 shadow-xl card bg-base-100">
              <div className="card-body">
                <h3 className="mb-2 font-semibold text-primary">
                  More options
                </h3>
                {/* <button className="w-full btn btn-outline btn-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                  </svg>
                  Did you find this page helpful?
                </button> */}
                {/* <button className="w-full mt-2 btn btn-outline btn-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  Send Order Details
                </button> */}

                {showBills && bookingData.bookedService.serviceBills && (
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
