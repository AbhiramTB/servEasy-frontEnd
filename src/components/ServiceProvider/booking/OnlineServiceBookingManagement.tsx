import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRequest, putRequest } from "../../../utils/makeRequestInstance";
import { HotToastError, HotToastSuccess } from "../../../utils/HotToasitify";
import { Toaster } from "react-hot-toast";

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

const OnlineBookingManagement = () => {
  const { id } = useParams();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAcceptModal, setShowAcceptModal] = useState<boolean>(false);
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [showStatusModal, setShowStatusModal] = useState<boolean>(false);
  const [estimatedTime, setEstimatedTime] = useState<string>("");
  const [cancelReason, setCancelReason] = useState<string>("");
  const [newStatus, setNewStatus] = useState<string>("");

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
      setError("Failed to load booking details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptBooking = async () => {
    try {
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

  const handleStartVideoCall = () => {
  };

  const getStatusClass = () => {
    if (!bookingData) return "alert-info";
    
    switch (bookingData.bookedService.serviceStatus) {
      case "pending":
        return "alert-info";
      case "confirmed":
        return "alert-success";
      case "in-progress":
        return "alert-warning";
      case "completed":
        return "alert-success";
      case "cancelled":
        return "alert-error";
      default:
        return "alert-info";
    }
  };

  const isPending = bookingData?.bookedService.serviceStatus === "pending";
  const isInProgress = bookingData?.bookedService.serviceStatus === "in-progress";
  const isCancelled = bookingData?.bookedService.serviceStatus === "cancelled";

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
    
  const statusStep = (() => {
    switch (bookedService.serviceStatus) {
      case "pending":
        return 1;
      case "confirmed":
        return 2;
      case "in-progress":
        return 3;
      case "completed":
        return 4;
      case "cancelled":
        return -1;
      default:
        return 1;
    }
  })();

  return (
    <div className="container max-w-4xl min-h-screen p-4 mx-auto bg-base-200">
      <Toaster />

      {/* Status Banner */}
      <div className={`alert ${getStatusClass()} mb-4`}>
        <div className="flex justify-between w-full">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0 w-6 h-6 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="ml-2 font-bold">
              Status:{" "}
              {bookedService.serviceStatus.charAt(0).toUpperCase() +
                bookedService.serviceStatus.slice(1)}
            </span>
          </div>
          
          {isInProgress && bookedService.isOnlineService && (
            <button 
              className="btn btn-sm btn-accent" 
              onClick={handleStartVideoCall}
            >
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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="p-4 shadow md:col-span-2 bg-base-100 rounded-box">
          <div className="flex flex-col gap-4 mb-4 md:flex-row">
            <div className="avatar">
              <div className="w-20 h-20 rounded">
                <img src={service.serviceImage} alt={service.serviceName} />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{service.serviceName}</h2>
              <div className="my-1 space-x-2">
                <span className="badge badge-primary">{service.category}</span>
                <span className="badge badge-secondary">{service.serviceType}</span>
                {bookedService.isOnlineService && (
                  <span className="badge badge-accent">Online Service</span>
                )}
              </div>
              <p className="my-1 text-sm opacity-75 line-clamp-2">{service.description}</p>
              <div className="mt-2">
                <strong className="text-xl text-primary">₹{service.estimatedPrice}</strong>
              </div>
            </div>
          </div>

          <div className="my-2 divider"></div>

          <div className="flex items-center mb-4">
            <div className="mr-3 avatar">
              <div className="w-10 h-10 rounded-full">
                <img src={user.profileImage} alt={user.userName} />
              </div>
            </div>
            <div>
              <div className="font-medium">{user.userName}</div>
              <div className="text-xs opacity-75">
                {user.email} {user.phone && `• ${user.phone}`}
              </div>
            </div>
          </div>

          {!isCancelled && (
            <div className="mb-4">
              <h3 className="mb-2 font-medium">Booking Status</h3>
              <ul className="w-full steps steps-horizontal">
                <li className={`step ${statusStep >= 1 ? "step-primary" : ""}`}>Pending</li>
                <li className={`step ${statusStep >= 2 ? "step-primary" : ""}`}>Confirmed</li>
                <li className={`step ${statusStep >= 3 ? "step-primary" : ""}`}>Payment Received</li>
                <li className={`step ${statusStep >= 4 ? "step-primary" : ""}`}>Completed</li>
              </ul>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2">
            <div className="p-3 bg-base-200 rounded-box">
              <h3 className="mb-2 font-medium">Schedule</h3>
              <div className="text-sm">
                <p>Booked: {formattedBookedDate}</p>
                <p>
                  Service: {formattedServiceDate}{" "}
                  {formattedServiceTime && `at ${formattedServiceTime}`}
                </p>
                {!bookedService.estimatedServiceTime && isPending && (
                  <p className="text-warning">
                    *Accept booking to set service time
                  </p>
                )}
              </div>
            </div>

            <div className="p-3 bg-base-200 rounded-box">
              <h3 className="mb-2 font-medium">Payment</h3>
              <div className="text-sm">
                <p>
                  Status:{" "}
                  <span
                    className={`${
                      bookedService.paymentStatus === "paid"
                        ? "text-success"
                        : bookedService.paymentStatus === "pending"
                          ? "text-warning"
                          : ""
                    }`}
                  >
                    {bookedService.paymentStatus.charAt(0).toUpperCase() +
                      bookedService.paymentStatus.slice(1)}
                  </span>
                </p>
                <p>Method: {bookedService.paymentType}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-end gap-2 mt-4">
            {isPending && (
              <>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => setShowAcceptModal(true)}
                >
                  Accept Booking
                </button>
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => setShowCancelModal(true)}
                >
                  Cancel Booking
                </button>
              </>
            )}

            {!isCancelled && !isPending && (
              <>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setShowStatusModal(true)}
                >
                  Update Status
                </button>

                <button className="btn btn-secondary btn-sm">Contact Customer</button>
                
                {isInProgress && bookedService.isOnlineService && (
                  <button 
                    className="btn btn-accent btn-sm" 
                    onClick={handleStartVideoCall}
                  >
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
              </>
            )}
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="mb-4 shadow card bg-base-100">
            <div className="p-4 card-body">
              <h3 className="text-base card-title">Quick Info</h3>
              <div className="text-sm">
                <p className="mb-2">
                  <span className="font-medium">Service Type:</span>{" "}
                  {bookedService.isOnlineService ? "Online" : "In-person"}
                </p>
                <p className="mb-2">
                  <span className="font-medium">Booking Date:</span>{" "}
                  {formattedBookedDate}
                </p>
                <p>
                  <span className="font-medium">Service Status:</span>{" "}
                  {bookedService.serviceStatus.charAt(0).toUpperCase() +
                    bookedService.serviceStatus.slice(1)}
                </p>
              </div>
            </div>
          </div>
          
          {bookedService.isOnlineService && (
            <div className="mb-4 shadow card bg-base-100">
              <div className="p-4 card-body">
                <h3 className="text-base card-title">Online Service</h3>
                <div className="text-sm">
                  <p className="mb-2">This service will be delivered online via video call.</p>
                  {isInProgress && (
                    <button 
                      className="mt-2 btn btn-accent btn-block" 
                      onClick={handleStartVideoCall}
                    >
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


      {showAcceptModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Accept Booking</h3>
            <p className="py-4">Please provide an estimated service time:</p>

            <div className="mb-4 form-control">
              <label className="label">
                <span className="label-text">Estimated Service Date and Time</span>
              </label>
              <input
                type="datetime-local"
                className="input input-bordered"
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(e.target.value)}
              />
            </div>

            <div className="modal-action">
              <button className="btn" onClick={() => setShowAcceptModal(false)}>
                Cancel
              </button>
              <button className="btn btn-success" onClick={handleAcceptBooking}>
                Accept
              </button>
            </div>
          </div>
        </div>
      )}

      {showCancelModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Cancel Booking</h3>
            <p className="py-4">Please provide a reason for cancellation:</p>

            <div className="mb-4 form-control">
              <label className="label">
                <span className="label-text">Cancellation Reason</span>
              </label>
              <textarea
                className="textarea textarea-bordered"
                rows={3}
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
              ></textarea>
            </div>

            <div className="modal-action">
              <button className="btn" onClick={() => setShowCancelModal(false)}>
                Back
              </button>
              <button className="btn btn-error" onClick={handleCancelBooking}>
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Status Modal */}
      {showStatusModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Update Service Status</h3>

            <div className="mb-4 form-control">
              <label className="label">
                <span className="label-text">Select New Status</span>
              </label>
              <select
                className="select select-bordered"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="confirmed">Confirmed</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="modal-action">
              <button className="btn" onClick={() => setShowStatusModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleStatusUpdate}>
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnlineBookingManagement;