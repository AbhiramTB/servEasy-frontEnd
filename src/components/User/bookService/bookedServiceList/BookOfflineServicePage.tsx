import { useEffect, useState } from 'react';
import { MapPin, CheckCircle, PlusCircle } from 'lucide-react';
import { AddressCard } from '../../../Address/AddressCard';

import { deleteRequest, getRequest, postRequest, putRequest } from '../../../../utils/makeRequestInstance';
import { apiEndPoint, serviceEndPoint } from '../../../../utils/constant';
import { useParams } from 'react-router-dom';
import { IAddress } from '../../../Address/IAddress';
import { HotToastError, HotToastSuccess } from '../../../../utils/notificationToast';
import BookingSuccess from '../../../ui/bookingSuccessCard';
import { AddressEditModal } from '../../../Address/AddressEdit';
import CurrentLocationFetcher from '../CurrentLocationFetcher';
import ServiceDateTimePicker from '../ServiceDateTimePicker';
import { IServiceDateTime } from '../../../../utils/types/booking';
import ServiceProviderCard from '../../../ui/ServiceProviderCard';
import ServiceCardCompact from '../../../ServiceProvider/booking/ServiceCardCompact';

const BookService = () => {
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);
  const [isAddNewAddressModalOpen, setIsAddNewAddressModalOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [conformCard, setConformCard] = useState<boolean>(false);
  const [isBookingConfirmLoading, setIsBookingConfirmLoading] = useState(false);
  const [serviceDateTime, setServiceDateTime] = useState<IServiceDateTime>({
    date: new Date(),
    time: 'anyTime',
  });
  const [service, setService] = useState<any>(null);
  const { id } = useParams();

  useEffect(() => {
    fetchAddresses();
    fetchService();
  }, []);

  const handleRequestError = (error: unknown) => {
    console.error('Request failed:', error);
  };

  const fetchAddresses = async () => {
    try {
      const res = await getRequest(apiEndPoint.getAddress);

      setAddresses(res.data.allAddress || []);
      if (res.data.allAddress.length > 0) {
        setSelectedAddress(res.data.allAddress[0]);
      }
    } catch (error) {
      handleRequestError(error);
    }
  };

  const fetchService = async () => {
    try {
      const res = await getRequest(`${apiEndPoint.getSingleService}/${id}`);
      console.log(res);

      setService(res.data.services[0]);
    } catch (error) {
      handleRequestError(error);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    try {
      await deleteRequest(`${apiEndPoint.deleteAddress}${id}`);
      setAddresses(addresses.filter(address => address._id !== id));
    } catch (error) {
      handleRequestError(error);
    }
  };

  const handleSaveAddress = async (address: IAddress) => {
    try {
      if (address?._id) {
        await putRequest(apiEndPoint.addNewAddress, { address });
      } else {
        await postRequest(apiEndPoint.addNewAddress, { address });
      }

      fetchAddresses();
      setSelectedAddress(null);
      setIsAddNewAddressModalOpen(false);
    } catch (error) {
      handleRequestError(error);
    }
  };

  const openAddressModal = (address?: Partial<IAddress>) => {
    setSelectedAddress(address ? { ...(address as IAddress) } : null);
    setIsAddNewAddressModalOpen(true);
  };

  const handleAddressSelect = (address: IAddress) => {
    setSelectedAddress(address);
  };

  const handleBooking = async () => {
    try {
      if (!selectedAddress) {
        HotToastError('Address Required');
        return;
      }

      setIsBookingConfirmLoading(true);

      console.log({ serviceDateTime, currentLocation });

      const data: {
        serviceId: string;
        address: IAddress;
        preferredServiceTime: IServiceDateTime;
        liveLocation?: {
          lat: number;
          lng: number;
        };
      } = {
        serviceId: id + '',
        address: selectedAddress,
        preferredServiceTime: serviceDateTime,
        ...(currentLocation && { liveLocation: currentLocation }),
      };

      const res = await postRequest(serviceEndPoint.bookservice, data);

      if (res.status === 201) {
        HotToastSuccess('Service booking successfully confirmed!');

        setConformCard(true);
      }
      console.log(res);
    } catch (error: any) {
      console.log(error?.response?.data.message);
      HotToastError(error?.response?.data.message);
    } finally {
      setIsBookingConfirmLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4">
      {conformCard && (
        <div className="mt-3 bg-base-100">
          <BookingSuccess
            successTitle="Booking Confirmed!"
            successSubTitle="Your service has been successfully booked."
            buttonText="View Booked Service"
          />
        </div>
      )}

      {!conformCard && (
        <div className="container min-h-screen p-2 sm:p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 bg-base-100 border shadow-lg rounded-lg p-2 md:p-4">
            <div className="space-y-4 md:col-span-1 order-2 md:order-1">
              <div className="flex items-center justify-between p-3 md:p-4">
                <h1 className="flex items-center text-base sm:text-lg font-bold text-primary">
                  <MapPin className="w-5 h-5 mr-2" />
                  Addresses
                </h1>

                <button className="btn btn-primary btn-sm" onClick={() => openAddressModal()}>
                  <PlusCircle className="w-4 h-4 mr-1" />
                  Add
                </button>
              </div>

              <div className="space-y-3 max-h-none md:max-h-[500px] overflow-visible md:overflow-y-auto">
                {addresses.length === 0 ? (
                  <div className="alert bg-base-200 text-sm">
                    <PlusCircle className="w-5 h-5 mr-2 text-primary" />
                    No addresses. Click &apos;Add&apos; to create one.
                  </div>
                ) : (
                  addresses.map(address => (
                    <AddressCard
                      key={address._id}
                      address={address}
                      onEdit={() => openAddressModal(address)}
                      onDelete={() => handleDeleteAddress(address._id)}
                      onSelect={() => handleAddressSelect(address)}
                      isSelected={selectedAddress?._id === address._id}
                    />
                  ))
                )}

                <CurrentLocationFetcher setLocation={setCurrentLocation} />
              </div>
            </div>

            <div className="space-y-6 md:col-span-2 order-1 md:order-2">
              <div className="order-1">
                <div className="p-3 sm:p-4 md:p-6">
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                    {service?.serviceProviderDetails && (
                      <div className="flex-1">
                        <ServiceProviderCard details={service.serviceProviderDetails} />
                      </div>
                    )}

                    {service && (
                      <div className="flex-1">
                        <ServiceCardCompact
                          serviceImage={service.serviceImage}
                          description={service.description}
                          serviceName={service.serviceName}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 md:gap-5">
                <div className="w-full md:w-2/3 order-3 md:order-none">
                  <ServiceDateTimePicker value={serviceDateTime} setValue={setServiceDateTime} />
                </div>

                {selectedAddress && (
                  <div className="w-full md:w-1/3 bg-base-100 rounded-xl p-4 order-4 md:order-none">
                    <div className="space-y-4">
                      <div>
                        <h3 className="flex items-center mb-2 text-sm sm:text-base font-semibold text-primary">
                          <CheckCircle className="w-5 h-5 mr-2 text-success" />
                          Selected Address
                        </h3>

                        <div className="text-sm">
                          <p className="font-medium">{selectedAddress.name}</p>
                          <p className="opacity-70">{selectedAddress.houseName}</p>
                          <p className="text-xs opacity-70">
                            {selectedAddress.pincode}, {selectedAddress.state}
                          </p>
                        </div>
                      </div>

                      {service?.serviceProviderDetails && (
                        <div className="space-y-1 text-sm">
                          <p className="font-semibold text-primary">Summary</p>

                          <p>
                            <span className="font-medium">Provider:</span>{' '}
                            {service.serviceProviderDetails.serviceProviderName}
                          </p>

                          <p>
                            <span className="font-medium">Estimated Price:</span> ₹{service.estimatedPrice}
                          </p>

                          <p>
                            <span className="font-medium">Service Type:</span>{' '}
                            {service.serviceType === 'Online' ? 'Online' : 'Offline'}
                          </p>

                          {service.serviceType === 'Offline' && (
                            <p>
                              <span className="font-medium">Location:</span> {selectedAddress.houseName},{' '}
                              {selectedAddress.pincode}
                            </p>
                          )}

                          <p className="mt-2 text-xs text-warning">
                            Note: Provider must confirm before service starts.
                          </p>
                        </div>
                      )}

                      <button
                        className="w-full btn btn-primary btn-md md:btn-sm mt-3"
                        onClick={handleBooking}
                        disabled={!selectedAddress || isBookingConfirmLoading}
                      >
                        Confirm Booking
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {isAddNewAddressModalOpen && (
            <AddressEditModal
              address={selectedAddress || {}}
              onSave={handleSaveAddress}
              onCancel={() => {
                setSelectedAddress(null);
                setIsAddNewAddressModalOpen(false);
              }}
              isNew={!selectedAddress?._id}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default BookService;
