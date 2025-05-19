import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import {
  getRequest,
  postRequest,
  putRequest,
} from "../../../utils/makeRequestInstance";
import { HotToastError, HotToastSuccess } from "../../../utils/notificationToast";
import { Toaster } from "react-hot-toast";
import PaymentModal from "./paymentModal";
import { Ipayment } from "../../../utils/types/Ipayment";

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

  const isPending = bookedService.serviceStatus === "pending";
  const isConfirmed = bookedService.serviceStatus === "confirmed";
  const isInProgress = bookedService.serviceStatus === "inProgress";
  const isCompleted = bookedService.serviceStatus === "completed";
  const isCancelled = bookedService.serviceStatus === "cancelled";
  const isPaymentRequested = bookedService.serviceStatus === "requested";
  const getStatusClass = () => {
    if (isPending) return "alert-warning";
    if (isConfirmed) return "alert-info";
    if (isInProgress) return "alert-info";
    if (isPaymentRequested) return "alert-success";
    if (isCompleted) return "alert-success";
    if (isCancelled) return "alert-error";
    return "";
  };

  return (
    <div className="container max-w-4xl min-h-screen p-4 mx-auto bg-base-200">
      {/* Feedback messages */}

      {/* <div className="mb-4 text-sm breadcrumbs">
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Service Details - 2/3 width */}
        <div className="p-4 shadow md:col-span-2 bg-base-100 rounded-box">
          <div className="flex flex-col gap-4 mb-4 md:flex-row">
            <div className="avatar">
              <div className="w-24 h-24 rounded">
                <img src={service.serviceImage} alt={service.serviceName} />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold">{service.serviceName}</h2>
              <div className="my-1 space-x-2">
                <span className="badge badge-primary">{service.category}</span>
                <span className="badge badge-secondary">
                  {service.serviceType}
                </span>
              </div>
              <p className="my-1 text-sm opacity-75">{service.description}</p>
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
            <div className="mr-3 avatar">
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
            <h3 className="mb-2 font-medium">Booking Status</h3>
            {isCancelled ? (
              <div className="text-error">Service has been cancelled</div>
            ) : (
              <ul className="w-full steps steps-horizontal">
                <li
                  className={`step ${isPending || isConfirmed || isInProgress || isPaymentRequested || isCompleted ? "step-primary" : ""}`}
                >
                  Pending
                </li>
                <li
                  className={`step ${isConfirmed || isInProgress || isPaymentRequested || isCompleted ? "step-primary" : ""}`}
                >
                  Confirmed
                </li>
                <li
                  className={`step ${isInProgress || isPaymentRequested || isCompleted ? "step-primary" : ""}`}
                >
                  In Progress
                </li>
                <li
                  className={`step ${isPaymentRequested || isCompleted ? "step-primary" : ""}`}
                >
                  Payment Requested
                </li>
                <li className={`step ${isCompleted ? "step-primary" : ""}`}>
                  Completed
                </li>
              </ul>
            )}
          </div>

          {/* Schedule and Payment Summary */}
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
          <div className="flex flex-wrap justify-end gap-2 mt-4">
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

            {isConfirmed ||
              (isInProgress && (
                <button
                  className="btn btn-warning"
                  onClick={() => setPaymentForm(true)}
                >
                  Request Payment
                </button>
              ))}

            {paymentForm && (
              <PaymentModal
                payment={payment}
                setPayment={(data: Ipayment) => setPayment(data)}
                closeModal={() => setPaymentForm(false)}
                makePaymentRequest={handlePaymentRequest}
              />
            )}
            {isCompleted ||
              (isPaymentRequested && (
                <button
                  className="btn btn-info"
                  onClick={() => setShowInvoiceModal(true)}
                >
                  Upload Bills
                </button>
              ))}
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="mb-4 shadow card bg-base-100">
            <div className="p-4 card-body">
              <h3 className="text-base card-title">Service Address</h3>
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
                    <span> material Cost</span>
                    <span>₹{bookedService.payment.materialCost}</span>
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
                  {bookedService.payment?.total &&
                    bookedService.payment.convenienceFee && (
                      <div className="flex justify-between mt-1 text-xs opacity-75">
                        <span>Your Earnings</span>
                        <span>
                          ₹
                          {Math.floor(
                            bookedService.payment?.total -
                              bookedService.payment?.convenienceFee
                          )}{" "}
                        </span>
                      </div>
                    )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Accept Booking Modal */}
      {showAcceptModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Accept Booking</h3>
            <p className="py-4">Please provide an estimated service time:</p>

            <div className="mb-4 form-control">
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
                <option value="inProgress">In Progress</option>
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
            <h3 className="text-lg font-bold">Upload Invoice Images</h3>

            <div className="mb-4 form-control">
              <label className="label">
                <span className="label-text">Select Invoice Images</span>
              </label>
              <input
                type="file"
                className="w-full file-input file-input-bordered"
                accept="image/jpeg,image/png,image/jpg,image/gif"
                multiple
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setInvoiceFiles(Array.from(e.target.files));
                  }
                }}
              />
              <label className="label">
                <span className="label-text-alt">Accepted formats:image</span>
              </label>
            </div>

            {/* Preview area for selected images */}
            {invoiceFiles && invoiceFiles.length > 0 && (
              <div className="mt-4">
                <p className="font-medium">
                  Selected Images ({invoiceFiles.length}):
                </p>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {invoiceFiles.map((file, index) => (
                    <div key={index} className="relative p-2 border rounded">
                      {/* Image preview thumbnail */}
                      <div className="flex items-center justify-center h-16 mb-1">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="object-contain max-w-full max-h-full"
                          onLoad={() =>
                            URL.revokeObjectURL(URL.createObjectURL(file))
                          }
                        />
                      </div>
                      <div className="text-xs truncate">{file.name}</div>
                      <button
                        className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full"
                        onClick={() => {
                          const newFiles = [...invoiceFiles];
                          newFiles.splice(index, 1);
                          setInvoiceFiles(newFiles);
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setShowInvoiceModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-info"
                onClick={handleInvoiceUpload}
                disabled={!invoiceFiles || invoiceFiles.length === 0}
              >
                Upload{" "}
                {invoiceFiles && invoiceFiles.length > 0
                  ? `(${invoiceFiles.length})`
                  : ""}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceProviderBookingManage;
