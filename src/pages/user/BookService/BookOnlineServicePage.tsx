import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRequest, postRequest } from '../../../utils/makeRequestInstance';
import { apiEndPoint, serviceEndPoint } from '../../../utils/constant';
import { HotToastError, HotToastSuccess } from '../../../utils/notificationToast';
import { ISlot } from '../../../utils/types/ISlot';
export interface IServiceProviderDetails {
  _id: string;
  serviceProviderName: string;
  serviceProviderEmail: string;
  serviceProviderPhone: string;
  profileImage: string;
  description: string;
  experience: number;
  isVerified: 'verified' | 'pending' | 'rejected';
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
}

export interface IBookingService {
  _id: string;
  serviceName: string;
  description: string;
  serviceImage: string;
  estimatedPrice: number;
  category: string;
  serviceType: 'Online' | 'Offline';
  serviceProviderId: string;
  serviceProviderDetails: IServiceProviderDetails;
}
// UI Components
import BookingSuccess from '../../../components/ui/bookingSuccessCard';
import SlotSelector from '../../../components/ui/SlotSelector';
import ServiceProviderCard from '../../../components/ui/ServiceProviderCard';
import ServiceCardCompact from '../../../components/ServiceProvider/booking/ServiceCardCompact';
import EmptyState from '../../../components/ui/EmptyState';

const BookOnlineService = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [service, setService] = useState<IBookingService | null>(null);
  const [slots, setSlots] = useState<ISlot[]>([]);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchService(), fetchSlots()]);
      setLoading(false);
    };
    loadData();
  }, [id]);

  const fetchService = async () => {
    try {
      const res = await getRequest(`${apiEndPoint.getSingleService}/${id}`);
      setService(res.data.service[0]);
    } catch (error) {}
  };

  const fetchSlots = async () => {
    try {
      const response = await getRequest(`service/online-services/slots/${id}`);
      setSlots(response.data || []);
    } catch (error) {
      console.error('Failed to fetch slots:', error);
    }
  };

  const handleBooking = async () => {
    if (!selectedSlotId) return HotToastError('Please select a time slot');

    setBookingLoading(true);
    try {
      const res = await postRequest(serviceEndPoint.bookOnlineService, {
        serviceId: id,
        slotId: selectedSlotId,
      });
      if (res.status === 201) {
        HotToastSuccess('Booking Confirmed!');
        setIsConfirmed(true);
      }
    } catch (error) {
      HotToastError('Booking failed. Please try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <span className="loading loading-ring loading-lg text-primary"></span>
        <p className="text-gray-500 animate-pulse">Preparing booking details...</p>
      </div>
    );
  }

  if (isConfirmed) {
    return (
      <div className="flex items-center justify-center h-screen bg-base-100 px-4">
        <BookingSuccess
          successTitle="Booking Confirmed!"
          successSubTitle="Your online session has been scheduled successfully."
          buttonText="Go to My Bookings"
          ButtonFn={() => navigate('/user/bookings')}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 pb-20">
      {/* Header Area */}
      <div className="bg-primary/5 py-10 mb-8 border-b border-primary/10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-base-content">Complete Your Booking</h1>
          <p className="text-gray-500 mt-2">Review details and select a preferred time slot.</p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Service & Provider Info */}
          <div className="lg:col-span-2 space-y-6">
            {service && (
              <section className="bg-base-100 border border-base-300 rounded-2xl overflow-hidden shadow-sm">
                <div className="p-1">
                  <ServiceCardCompact
                    serviceImage={service.serviceImage}
                    description={service.description}
                    serviceName={service.serviceName}
                  />
                </div>
                <div className="px-6 py-4 bg-base-200/50 flex justify-between items-center">
                  <span className="text-sm font-medium uppercase tracking-wider text-gray-500">Estimated Price</span>
                  <span className="text-2xl font-bold text-primary">₹{service.estimatedPrice}</span>
                </div>
              </section>
            )}

            {service?.serviceProviderDetails && (
              <section>
                <h3 className="text-lg font-bold mb-4 ml-1">About the Professional</h3>
                <div className="transition-all hover:shadow-md rounded-2xl">
                  <ServiceProviderCard details={service.serviceProviderDetails} />
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Slot Selection Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="bg-base-100 border-2 border-primary/20 p-6 rounded-2xl shadow-xl">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-8 bg-primary rounded-full"></div>
                  <h3 className="text-xl font-bold">Available Slots</h3>
                </div>

                {slots.length > 0 ? (
                  <div className="mb-8">
                    <SlotSelector slots={slots} onSelect={slotId => setSelectedSlotId(slotId)} />
                  </div>
                ) : (
                  <div className="py-6">
                    <EmptyState
                      message="No slots available for today. Please check back later."
                      title="All Full!"
                      icon="no-data"
                    />
                  </div>
                )}

                <div className="divider"></div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Service Fee</span>
                    <span className="font-semibold text-base-content">₹{service?.estimatedPrice}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount</span>
                    <span className="text-primary">₹{service?.estimatedPrice}</span>
                  </div>
                </div>

                <button
                  className={`btn btn-primary w-full mt-6 shadow-lg shadow-primary/20 ${bookingLoading ? 'loading' : ''}`}
                  onClick={handleBooking}
                  disabled={!selectedSlotId || bookingLoading}
                >
                  {bookingLoading ? 'Processing...' : 'Confirm'}
                </button>

                <p className="text-[10px] text-center text-gray-400 mt-4 px-4">
                  By clicking confirm, you agree to ServEasy's terms of service and cancellation policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookOnlineService;
