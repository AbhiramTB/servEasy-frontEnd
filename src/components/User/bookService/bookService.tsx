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
      setService(res.data.service[0]);
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

  const handleSetDefaultAddress = async (id: string) => {
    try {
      await patchRequest(apiEndPoint.deleteAddress, { addressId: id });

      setAddresses(
        addresses.map((address) => ({
          ...address,
          isDefault: address._id === id,
        }))
      );
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
            ButtonFn={() => alert("happy Allea")}
          />
        </div>
      )}

      {!conformCard && (
        <div className="container bg-base-100 min-h-screen p-6">
          <Toaster></Toaster>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Addresses Column */}
            <div className="md:col-span-1 space-y-4">
              <div className="bg-base-200 rounded-lg p-4 flex justify-between items-center shadow-sm">
                <h1 className="text-lg font-bold text-primary flex items-center">
                  <MapPin className="mr-2 w-5 h-5" /> Addresses
                </h1>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => openAddressModal()}
                >
                  <PlusCircle className="mr-1 w-4 h-4" /> Add
                </button>
              </div>

              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {addresses.length === 0 ? (
                  <div className="alert bg-base-200 text-base-content text-sm flex items-center">
                    <PlusCircle className="mr-2 w-5 h-5 text-primary" />
                    <span>No addresses. Click 'Add' to create one.</span>
                  </div>
                ) : (
                  addresses.map((address) => (
                    <AddressCard
                      key={address._id}
                      address={address}
                      onEdit={() => openAddressModal(address)}
                      onDelete={() => handleDeleteAddress(address._id)}
                      onSetDefault={() => handleSetDefaultAddress(address._id)}
                      onSelect={() => handleAddressSelect(address)}
                      isSelected={selectedAddress?._id === address._id}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Service and Booking Details Column */}
            <div className="md:col-span-2 space-y-6">
              {/* Service Provider Details */}
              {service?.serviceProviderDetails && (
                <div className="card bg-base-200 shadow-md p-6 rounded-xl">
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
                      <h2 className="card-title text-primary text-xl mb-2">
                        {service.serviceProviderDetails.serviceProviderName}
                      </h2>
                      <div className="text-base-content opacity-80 space-y-2 text-sm">
                        <p className="flex items-center">
                          <Phone className="mr-2 text-primary w-4 h-4" />
                          {service.serviceProviderDetails.serviceProviderPhone}
                        </p>
                        <p className="flex items-center">
                          <Calendar className="mr-2 text-primary w-4 h-4" />
                          {service.serviceProviderDetails.experience} Years
                          Experience
                        </p>
                        <p className="flex items-center">
                          <MapPinned className="mr-2 text-primary w-4 h-4" />
                          {service.serviceProviderDetails.location.address}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center text-primary">
                      <Star fill="currentColor" className="mr-1 w-6 h-6" />
                      <span className="font-bold text-lg">4.5</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex space-x-5">
                {/* Service Details */}
                {service && (
                  <div className="card w-2/3 ">
                    <ServiceDetailsCard service={service} />
                  </div>
                )}

                {/* Selected Address Confirmation */}
                {selectedAddress && (
                  <div className="card bg-base-200 w-1/3 shadow-md p-5 rounded-xl">
                    <div className="space-y-4">
                      <div className="bg-base-100 p-4 rounded-lg">
                        <h3 className="text-sm font-semibold text-primary flex items-center mb-3">
                          <CheckCircle className="mr-2 w-5 h-5 text-success" />
                          Selected Address
                        </h3>
                        <div className="text-sm">
                          <p className="font-medium text-base-content">
                            {selectedAddress.name}
                          </p>
                          <p className="text-base-content opacity-70">
                            {selectedAddress.houseName}
                          </p>
                          <p className="text-base-content opacity-70 text-xs">
                            {selectedAddress.pincode}, {selectedAddress.state}
                          </p>
                        </div>
                      </div>

                      {service?.serviceProviderDetails && (
                        <div className="bg-base-100 p-4 rounded-lg text-sm space-y-2">
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
                          <p className="text-xs text-warning mt-2">
                            Note: The service provider must confirm the service
                            before it proceeds.
                          </p>
                        </div>
                      )}

                      <button
                        className="btn btn-primary btn-sm w-full mt-3"
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
