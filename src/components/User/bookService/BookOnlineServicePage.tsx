import { useEffect, useState } from "react";
import {
  Phone,
  Calendar,
  MapPinned,
  Star,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import ServiceDetailsCard from "../../ui/ServiceDetailsCard";
import BookingSuccess from "../../ui/bookingSuccessCard";

import { getRequest, postRequest } from "../../../utils/makeRequestInstance";
import { apiEndPoint, serviceEndPoint } from "../../../utils/constant";
import { IAddress } from "../../Address/IAddress";
import { HotToastSuccess } from "../../../utils/notificationToast";

const BookOnlineService = () => {
  const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);
  const [conformCard, setConformCard] = useState(false);
  const [service, setService] = useState<any>(null);
  const { id } = useParams();

  useEffect(() => {
    fetchService();
  }, []);

  
  const fetchService = async () => {
    try {
      const res = await getRequest(`${apiEndPoint.getSingleService}/${id}`);
      setService(res.data.service[0]);
    } catch (error) {
      console.error("Failed to fetch service:", error);
    }
  };

  const handleBooking = async () => {
    try {
      const res = await postRequest(serviceEndPoint.bookservice, {
        serviceId: id,
        isOnline:true,
      });
      if (res.status === 201) {
        HotToastSuccess("Service booking successfully confirmed!");
        setConformCard(true);
      }
    } catch (error) {
      console.error("Booking failed:", error);
    }
  };

  if (conformCard) {
    return (
      <div className="flex items-center justify-center h-screen">
        <BookingSuccess
          successTitle="Booking Confirmed!"
          successSubTitle="Your service has been successfully booked."
          buttonText="View Booked Service"
        />
      </div>
    );
  }

  return (
    <div className="container min-h-screen px-4 py-8 mx-auto bg-base-100">
      <Toaster />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Left Side: Service and Provider Details */}
        <div className="space-y-6 md:col-span-2">
          {service?.serviceProviderDetails && (
            <div className="p-6 shadow-md rounded-xl bg-base-200">
              <div className="flex items-center gap-6">
                <div className="avatar">
                  <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={service.serviceProviderDetails.profileImage || "/default-avatar.png"}
                      alt="Service Provider"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex-grow space-y-1">
                  <h2 className="text-xl font-bold text-primary">
                    {service.serviceProviderDetails.serviceProviderName}
                  </h2>
                  <p className="flex items-center text-sm">
                    <Phone className="w-4 h-4 mr-2 text-primary" />
                    {service.serviceProviderDetails.serviceProviderPhone}
                  </p>
                  <p className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-primary" />
                    {service.serviceProviderDetails.experience} Years Experience
                  </p>
                  <p className="flex items-center text-sm">
                    <MapPinned className="w-4 h-4 mr-2 text-primary" />
                    {service.serviceProviderDetails.location.address}
                  </p>
                </div>
                <div className="flex items-center text-primary">
                  <Star fill="currentColor" className="w-6 h-6 mr-1" />
                  <span className="text-lg font-bold">4.5</span>
                </div>
              </div>
            </div>
          )}

          {service && (
            <div>
              <ServiceDetailsCard service={service} />
            </div>
          )}
        </div>

        {/* Right Side: Summary + Booking */}
        <div className="p-6 space-y-4 shadow-md bg-base-200 rounded-xl">
          <h3 className="text-lg font-semibold text-primary">Booking Summary</h3>
          {service?.serviceProviderDetails && (
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Provider:</span>{" "}
                {service.serviceProviderDetails.serviceProviderName}
              </p>
              <p>
              <span className="font-medium">Estimated Price:</span> ₹{service.estimatedPrice} / hour

              </p>
              <p>
                <span className="font-medium">Service Type:</span>{" "}
                {service.serviceType === "Online" ? "Online" : "Offline"}
              </p>
              {service.serviceType === "Offline" && selectedAddress && (
                <p>
                  <span className="font-medium">Service Location:</span>{" "}
                  {selectedAddress.houseName}, {selectedAddress.pincode}
                </p>
              )}
              <p className="mt-2 text-xs text-warning">
                Note: The service provider must confirm the service before it proceeds.
              </p>
            </div>
          )}
          <button
            className="w-full btn btn-primary"
            onClick={handleBooking}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookOnlineService;
