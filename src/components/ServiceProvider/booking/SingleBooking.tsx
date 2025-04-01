import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getRequest, putRequest } from "../../../utils/makeRequestInstance";
import { HotToastError, HotToastSuccess } from "../../../utils/HotToasitify";
import { Toaster } from "react-hot-toast";

// Interfaces
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
    cancellationReason?: string;
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
  const [invoiceFile, setInvoiceFile] = useState<File | null>(null);
 
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
        // Refresh booking data
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

      const res = await putRequest(`service/service-provider/bookings/${id}/cancel`, {
        serviceStatus: "cancelled",
        cancellationReason: cancelReason,
      });

      if (res.status === 200) {
        HotToastSuccess("Booking cancelled successfully");
        setShowCancelModal(false);
        // Refresh booking data
        getBookedService(id as string);
      }
    } catch (err) {
    
      HotToastError("Failed to cancel booking")
      console.error(err);
    }
  };

  const handleStatusUpdate = async () => {
    try {
      const res = await putRequest(`service/service-provider/bookings/${id}/status`, {
        serviceStatus: newStatus,
      });

      if (res.status === 200) {
        HotToastSuccess("Status updated successfully");
        setShowStatusModal(false);
        // Refresh booking data
        getBookedService(id as string);
      }
    } catch (err) {
        HotToastError("Failed to update status");
      console.error(err);
    }
  };

  const handlePaymentRequest = async () => {
    try {
      const res = await putRequest(
        `service/service-provider/bookings/${id}/payment-request`,
        {
          paymentStatus: "requested",
        }
      );

      if (res.status === 200) {
        HotToastSuccess("Payment requested successfully");
        // Refresh booking data
        getBookedService(id as string);
      }
    } catch (err) {
        HotToastError("Failed to request payment");
      console.error(err);
    }
  };

  const handleInvoiceUpload = async () => {
    try {
      if (!invoiceFile) {
        HotToastError("Please select an invoice file to upload");
        return;
      }

      const formData = new FormData();
      formData.append("invoice", invoiceFile);

      // Note: You may need to adjust this based on your actual API
      // const res = await putRequest(`service-provider/bookings/${id}/invoice`, formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // });

      // if (res.status === 200) {
      //   setActionSuccess('Invoice uploaded successfully');
      //   setShowInvoiceModal(false);
      //   // Refresh booking data
      //   getBookedService(id as string);
      // }
    } catch (err) {
        HotToastError("Failed to upload invoice");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error || !bookingData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
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

  const isPending = bookedService.serviceStatus === "pending";
  const isConfirmed = bookedService.serviceStatus === "confirmed";
  const isInProgress = bookedService.serviceStatus === "inProgress";
  const isCompleted = bookedService.serviceStatus === "completed";
  const isCancelled = bookedService.serviceStatus === "cancelled";

  const getStatusClass = () => {
    if (isPending) return "alert-warning";
    if (isConfirmed) return "alert-info";
    if (isInProgress) return "alert-info";
    if (isCompleted) return "alert-success";
    if (isCancelled) return "alert-error";
    return "";
  };
  

  return (
    <div className="container mx-auto p-4 max-w-4xl bg-base-200 min-h-screen">
      {/* Feedback messages */}
      

    

      {/* <div className="text-sm breadcrumbs mb-4">
        <ul>
          <li>
            <Link to="/dashboard" className="link link-primary">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/bookings" className="link link-primary">
              Bookings
            </Link>
          </li>
          <li>Manage Booking</li>
        </ul>
      </div> */}

<Toaster></Toaster>

      {/* Status Banner */}
      <div className={`alert ${getStatusClass()} mb-4`}>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
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
          <div>
            <span className="font-bold">
              Status:{" "}
              {bookedService.serviceStatus.charAt(0).toUpperCase() +
                bookedService.serviceStatus.slice(1)}
            </span>
            {isCancelled &&
              bookedService.cancellationReason &&
              ` - Reason: ${bookedService.cancellationReason}`}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Service Details - 2/3 width */}
        <div className="md:col-span-2 bg-base-100 p-4 rounded-box shadow">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="avatar">
              <div className="w-24 h-24 rounded">
                <img src={service.serviceImage} alt={service.serviceName} />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold">{service.serviceName}</h2>
              <div className="space-x-2 my-1">
                <span className="badge badge-primary">{service.category}</span>
                <span className="badge badge-secondary">
                  {service.serviceType}
                </span>
              </div>
              <p className="text-sm opacity-75 my-1">{service.description}</p>
              <div className="mt-2">
                <strong className="text-xl text-primary">
                  ₹{service.estimatedPrice}
                </strong>
              </div>
            </div>
          </div>

          <div className="divider"></div>

          {/* Customer Details */}
          <div className="flex items-center mb-4">
            <div className="avatar mr-3">
              <div className="w-10 h-10 rounded-full">
                <img src={user.profileImage} alt={user.userName} />
              </div>
            </div>
            <div>
              <div className="font-medium">{user.userName}</div>
              <div className="text-xs opacity-75">
                <span className="mr-2">
                  {user.email} || {user.phone}
                </span>
              </div>
            </div>
          </div>

          {/* Status Timeline */}
          <div className="mb-4">
            <h3 className="font-medium mb-2">Booking Status</h3>
            {isCancelled ? (
              <div className="text-error">Service has been cancelled</div>
            ) : (
              <ul className="steps steps-horizontal w-full">
                <li
                  className={`step ${isPending || isInProgress || isCompleted ? "step-primary" : ""}`}
                >
                  Pending
                </li>
                <li
                  className={`step ${isConfirmed || isInProgress || isCompleted ? "step-primary" : ""}`}
                >
                  Confirmed
                </li>
                <li
                  className={`step ${isInProgress || isCompleted ? "step-primary" : ""}`}
                >
                  In Progress
                </li>
                <li className={`step ${isCompleted ? "step-primary" : ""}`}>
                  Completed
                </li>
              </ul>
            )}
          </div>

          {/* Schedule and Payment Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="bg-base-200 p-3 rounded-box">
              <h3 className="font-medium mb-2">Schedule</h3>
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

            <div className="bg-base-200 p-3 rounded-box">
              <h3 className="font-medium mb-2">Payment</h3>
              <div className="text-sm">
                <p>
                  Status:{" "}
                  <span
                    className={`${
                      bookedService.paymentStatus === "paid"
                        ? "text-success"
                        : bookedService.paymentStatus === "requested"
                          ? "text-warning"
                          : bookedService.paymentStatus === "refunded"
                            ? "text-error"
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

          {/* Action Buttons */}
          <div className="mt-4 flex flex-wrap gap-2 justify-end">
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

            {isCompleted && bookedService.paymentStatus !== "paid" && (
              <button
                className="btn btn-warning"
                onClick={handlePaymentRequest}
                disabled={bookedService.paymentStatus === "requested"}
              >
                {bookedService.paymentStatus === "requested"
                  ? "Payment Requested"
                  : "Request Payment"}
              </button>
            )}

            {isCompleted && (
              <button
                className="btn btn-info"
                onClick={() => setShowInvoiceModal(true)}
              >
                Upload Invoice
              </button>
            )}
          </div>
        </div>

        {/* Side Panel - 1/3 width */}
        <div className="md:col-span-1">
          {/* Address Card */}
          <div className="card bg-base-100 shadow mb-4">
            <div className="card-body p-4">
              <h3 className="card-title text-base">Service Address</h3>
              <div className="text-sm">
                <p className="font-medium">{bookedService.address.name}</p>
                <p>{bookedService.address.houseName}</p>
                <p>
                  {bookedService.address.state} -{" "}
                  {bookedService.address.pincode}
                </p>
                <p className="mt-1">📞 {bookedService.address.phone}</p>
              </div>
            </div>
          </div>

          {/* Price Details */}
          {/* <div className="card bg-base-100 shadow">
            <div className="card-body p-4">
              <h3 className="card-title text-base">Price Details</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Base Price</span>
                  <span>₹{service.estimatedPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Fee</span>
                  <span>₹{Math.floor(service.estimatedPrice * 0.03)}</span>
                </div>
                <div className="divider my-1"></div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>
                    ₹
                    {service.estimatedPrice +
                      Math.floor(service.estimatedPrice * 0.03)}
                  </span>
                </div>
                <div className="flex justify-between text-xs opacity-75 mt-1">
                  <span>Your Earnings</span>
                  <span>
                    ₹
                    {service.estimatedPrice -
                      Math.floor(service.estimatedPrice * 0.05)}
                  </span>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* Accept Booking Modal */}
      {showAcceptModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Accept Booking</h3>
            <p className="py-4">Please provide an estimated service time:</p>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">
                  Estimated Service Date and Time
                </span>
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

      {/* Cancel Booking Modal */}
      {showCancelModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Cancel Booking</h3>
            <p className="py-4">Please provide a reason for cancellation:</p>

            <div className="form-control mb-4">
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
            <h3 className="font-bold text-lg">Update Service Status</h3>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Select New Status</span>
              </label>
              <select
                className="select select-bordered"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="confirmed">Confirmed</option>
                <option value="inProgress">In Progress</option>
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

      {/* Upload Invoice Modal */}
      {showInvoiceModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Upload Invoice</h3>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Select Invoice File</span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setInvoiceFile(e.target.files[0]);
                  }
                }}
              />
              <label className="label">
                <span className="label-text-alt">
                  Accepted formats: PDF, DOC, DOCX, JPG, PNG
                </span>
              </label>
            </div>

            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setShowInvoiceModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-info" onClick={handleInvoiceUpload}>
                Upload Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceProviderBookingManage;
