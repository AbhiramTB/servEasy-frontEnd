import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import ServiceDetailsCard from "../../ui/ServiceDetailsCard";
import BookingSuccess from "../../ui/bookingSuccessCard";

import { getRequest, postRequest } from "../../../utils/makeRequestInstance";
import { apiEndPoint, serviceEndPoint } from "../../../utils/constant";
import {
  HotToastError,
  HotToastSuccess,
} from "../../../utils/notificationToast";
import { ISlot } from "../../../utils/types/ISlot";
import SlotSelector from "../../ui/SlotSelector";
import ServiceProviderCard from "../../ui/ServiceProviderCard";

const BookOnlineService = () => {
  const [conformCard, setConformCard] = useState(false);
  const [service, setService] = useState<any>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [slots, setSlots] = useState<ISlot[] | []>([]);

  const { id } = useParams();

  useEffect(() => {
    fetchService();
    fetchSlots();
  }, [id]);

  const handleSlotSelect = (slotId: string) => {
    setSelectedSlotId(slotId);
    console.log("Selected slot:", slotId);
  };

  const fetchService = async () => {
    try {
      const res = await getRequest(`${apiEndPoint.getSingleService}/${id}`);
      console.log(res.data.services);

      setService(res.data.services[0]);
    } catch (error) {
      console.error("Failed to fetch service:", error);
    }
  };

  const fetchSlots = async () => {
    try {
      const response = await getRequest(`service/online-services/slots/${id}`);
      setSlots(response.data);
    } catch (error) {
      console.error("Failed to fetch slots:", error);
      throw error;
    }
  };

  const handleBooking = async () => {
    try {
      if (!selectedSlotId) {
        return HotToastError("Please select a slot before confirming.");
      }
      const res = await postRequest(serviceEndPoint.bookservice, {
        serviceId: id,
        isOnline: true,
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
              <ServiceProviderCard details={service?.serviceProviderDetails} />
            </div>
          )}

          {service && (
            <div>
              <ServiceDetailsCard service={service} />
            </div>
          )}
        </div>

        <div className="p-6 space-y-4 shadow-md bg-base-200 rounded-xl">
          {slots.length > 0 ? (
            <div>
              
              <h3 className="text-lg font-semibold text-primary">
                {" "}
                Today’s Available Slots{" "}
              </h3>
              <SlotSelector slots={slots} onSelect={handleSlotSelect} />
            </div>
          ) : (
            <div>
              
              <h3 className="text-lg font-semibold text-primary">
                No slots available for today.
              </h3>
            </div>
          )}
          {selectedSlotId}
          <button
            className="w-full btn btn-primary"
            onClick={handleBooking}
            disabled={selectedSlotId == null ? true : false}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookOnlineService;
