import { useEffect, useState } from "react";
import {
  MapPin,
  CheckCircle,
  Phone,
  MapPinned,
  Star,
  Calendar,
  PlusCircle,
} from "lucide-react";
import { AddressCard } from "../../Address/AddressCard";
  
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
  putRequest,
} from "../../../utils/makeRequestInstance";
import { apiEndPoint, serviceEndPoint } from "../../../utils/constant";
import { useParams } from "react-router-dom";
import ServiceDetailsCard from "../../ui/ServiceDetailsCard";
import { IAddress } from "../../Address/IAddress";
import { HotToastError, HotToastSuccess } from "../../../utils/HotToasitify";
import { Toaster } from "react-hot-toast";
import BookingSuccess from "../../ui/bookingSuccessCard";
import { AddressEditModal } from "../../Address/AddressEdit";

const BookService = () => {
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);
  const [isAddNewAddressModalOpen, setIsAddNewAddressModalOpen] =
    useState(false);

  const [conformCard, setConformCard] = useState<boolean>(false);

  const [service, setService] = useState<any>(null);
  const { id } = useParams();

  useEffect(() => {
    fetchAddresses();
    fetchService();
  }, []);

  const handleRequestError = (error: unknown) => {
    console.error("Request failed:", error);
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
      setAddresses(addresses.filter((address) => address._id !== id));
    } catch (error) {
      handleRequestError(error);
    }
  };



  const handleSaveAddress = async (address: IAddress) => {
    try {
      let res;
      if (address?._id) {
        res = await putRequest(apiEndPoint.addNewAddress, { address });
      } else {
        res = await postRequest(apiEndPoint.addNewAddress, { address });
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
        HotToastError("Address Required");
        return;
      }
      const res = await postRequest(serviceEndPoint.bookservice, {
        serviceId: id,
        address: selectedAddress,
      });
      if (res.status === 201) {
       
        HotToastSuccess("Service booking successfully confirmed!")


        setConformCard(true);
      }
    } catch (error) {}
  };

  return (
    <>
                      <Toaster></Toaster>

      {conformCard && (
        <div className="mt-[200px]">
          <BookingSuccess
            successTitle="Booking Confirmed!"
            successSubTitle="Your service  has been successfully booked."
            buttonText="View Booked Service"
            // ButtonFn={}
          />
        </div>
      )}

      {!conformCard && (
        <div className="container min-h-screen p-6 bg-base-100">
          <Toaster></Toaster>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Addresses Column */}
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center justify-between p-4 rounded-lg shadow-sm bg-base-200">
                <h1 className="flex items-center text-lg font-bold text-primary">
                  <MapPin className="w-5 h-5 mr-2" /> Addresses
                </h1>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => openAddressModal()}
                >
                  <PlusCircle className="w-4 h-4 mr-1" /> Add
                </button>
              </div>

              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {addresses.length === 0 ? (
                  <div className="flex items-center text-sm alert bg-base-200 text-base-content">
                    <PlusCircle className="w-5 h-5 mr-2 text-primary" />
                    <span>No addresses. Click 'Add' to create one.</span>
                  </div>
                ) : (
                  addresses.map((address) => (
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
              </div>
            </div>

            {/* Service and Booking Details Column */}
            <div className="space-y-6 md:col-span-2">
              {/* Service Provider Details */}
              {service?.serviceProviderDetails && (
                <div className="p-6 shadow-md card bg-base-200 rounded-xl">
                  <div className="flex items-center space-x-5">
                    <div className="avatar">
                      <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img
                          src={
                            service.serviceProviderDetails.profileImage ||
                            "/default-avatar.png"
                          }
                          alt="Service Provider"
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h2 className="mb-2 text-xl card-title text-primary">
                        {service.serviceProviderDetails.serviceProviderName}
                      </h2>
                      <div className="space-y-2 text-sm text-base-content opacity-80">
                        <p className="flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-primary" />
                          {service.serviceProviderDetails.serviceProviderPhone}
                        </p>
                        <p className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-primary" />
                          {service.serviceProviderDetails.experience} Years
                          Experience
                        </p>
                        <p className="flex items-center">
                          <MapPinned className="w-4 h-4 mr-2 text-primary" />
                          {service.serviceProviderDetails.location.address}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center text-primary">
                      <Star fill="currentColor" className="w-6 h-6 mr-1" />
                      <span className="text-lg font-bold">4.5</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex space-x-5">
                {/* Service Details */}
                {service && (
                  <div className="w-2/3 card ">
                    <ServiceDetailsCard service={service} />
                  </div>
                )}

                {/* Selected Address Confirmation */}
                {selectedAddress && (
                  <div className="w-1/3 p-5 shadow-md card bg-base-200 rounded-xl">
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-base-100">
                        <h3 className="flex items-center mb-3 text-sm font-semibold text-primary">
                          <CheckCircle className="w-5 h-5 mr-2 text-success" />
                          Selected Address
                        </h3>
                        <div className="text-sm">
                          <p className="font-medium text-base-content">
                            {selectedAddress.name}
                          </p>
                          <p className="text-base-content opacity-70">
                            {selectedAddress.houseName}
                          </p>
                          <p className="text-xs text-base-content opacity-70">
                            {selectedAddress.pincode}, {selectedAddress.state}
                          </p>
                        </div>
                      </div>

                      {service?.serviceProviderDetails && (
                        <div className="p-4 space-y-2 text-sm rounded-lg bg-base-100">
                          <p className="font-semibold text-primary">Summary</p>
                          <div className="space-y-1">
                            <p>
                              <span className="font-medium">Provider:</span>{" "}
                              {
                                service.serviceProviderDetails
                                  .serviceProviderName
                              }
                            </p>
                            <p>
                              <span className="font-medium">
                                Estimated Price:
                              </span>{" "}
                              ₹{service?.estimatedPrice}
                            </p>
                            <p>
                              <span className="font-medium">Service Type:</span>{" "}
                              {service?.serviceType == "Online"
                                ? "Online"
                                : "Offline"}
                            </p>
                            {service.serviceType == "Offline" &&
                              selectedAddress && (
                                <p>
                                  <span className="font-medium">
                                    Service Location:
                                  </span>{" "}
                                  {selectedAddress.houseName},{" "}
                                  {selectedAddress.pincode}
                                </p>
                              )}
                          </div>
                          <p className="mt-2 text-xs text-warning">
                            Note: The service provider must confirm the service
                            before it proceeds.
                          </p>
                        </div>
                      )}

                      <button
                        className="w-full mt-3 btn btn-primary btn-sm"
                        onClick={handleBooking}
                        disabled={!selectedAddress}
                      >
                        Confirm Booking
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Address Edit Modal */}
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
    </>
  );
};

export default BookService;
