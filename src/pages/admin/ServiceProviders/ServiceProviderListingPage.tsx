import { useEffect, useState, useCallback } from 'react';
import { IServiceProvider } from '../../../utils/types/IServiceProvider';
import { apiEndPointAdmin } from '../../../utils/constant';
import { adminGetRequest, adminPatchRequest } from '../../../utils/AxiosAdmin';
import { HotToastSuccess } from '../../../utils/notificationToast';
import SearchComponent from '../../../components/ui/SearchComponent';
import SubscriptionIcon from '../../../utils/ui/SubscriptionIcon';
import ImagePreview from '../../../components/ui/ImagePreview';
import Pagination from '../../../components/ui/Pagination';
import SubscriptionInfoServiceProvider from '../../../components/ServiceProvider/service/profile/SubscriptionInfoServiceProvider';


export interface Location {
  address: string;
  latitude: number;
  longitude: number;
}

const ServiceProviderListing = () => {
  const [crrPage, setCrrPage] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProvider, setSelectedProvider] = useState<IServiceProvider | null>(null);
  const dataLimit = 6;
  const [serviceProviders, setServiceProviders] = useState<IServiceProvider[]>([]);

  const getAllServiceProviders = useCallback(async (page: number, searchVal?: string) => {
    try {
      const param: Record<string, any> = { page, limit: dataLimit };
      if (searchVal) param.search = searchVal;
      const res = await adminGetRequest(`${apiEndPointAdmin.serviceProvider}`, { params: param });
      setCrrPage(page);
      if (res.data && res.data.data) {
        setServiceProviders(res.data.data);
        setTotalData(res.data.count);
      }
    } catch (error) {
      console.error('Error fetching service providers:', error);
    }
  }, []);

  useEffect(() => {
    getAllServiceProviders(crrPage, searchQuery);
  }, [getAllServiceProviders, searchQuery]);

  useEffect(() => {
    getAllServiceProviders(0, searchQuery);
  }, [searchQuery]);

  const toggleBlockStatus = (providerId: string) => {
    setServiceProviders(prev => prev.map(sp => (sp._id === providerId ? { ...sp, isBlocked: !sp.isBlocked } : sp)));
  };

  const handleBlockProvider = async (providerId: string) => {
    try {
      const res = await adminPatchRequest(apiEndPointAdmin.blockUnblockServiceProvider, {
        providerId,
        action: 'Block',
      });
      if (res.status === 200) {
        HotToastSuccess(res.data.message);
        toggleBlockStatus(providerId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnblockProvider = async (providerId: string) => {
    try {
      const res = await adminPatchRequest(apiEndPointAdmin.blockUnblockServiceProvider, {
        providerId,
        action: 'Unblock',
      });
      if (res.status === 200) {
        HotToastSuccess(res.data.message);
        toggleBlockStatus(providerId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container px-4 py-8 mx-auto  ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-base-content">Service Providers</h1>
        <SearchComponent setSearch={setSearchQuery} searchVal={searchQuery} />
      </div>

      {serviceProviders.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(num => (
            <ShimmerProviderCard key={num} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceProviders.map(provider => (
            <div
              key={provider._id}
              className="relative card bg-base-100 shadow-md hover:shadow-xl transition duration-300 border border-base-200 rounded-2xl overflow-hidden"
            >
              <div className="absolute top-3 left-3 z-20">
                <SubscriptionIcon subscriptions={provider.subscriptions} />
              </div>

              <figure className="relative h-40 w-full ">
                <ImagePreview
                  src={provider.profileImage || '/default-profile.png'}
                  alt={provider.serviceProviderName}
                  className="w-full h-full object-cover"
                />

                {/* STATUS BADGES */}
                <div className="absolute top-3 right-3 flex flex-col gap-1 z-20">
                  {provider.isVerified === 'verified' && <span className="badge badge-success">Verified</span>}
                  {provider.isVerified === 'rejected' && <span className="badge badge-error">Rejected</span>}
                  {provider.isBlocked && <span className="badge badge-neutral">Blocked</span>}
                </div>
              </figure>

              {/* CONTENT */}
              <div className="card-body p-4 space-y-1">
                <h2 className="card-title text-base font-semibold truncate">{provider.serviceProviderName}</h2>

                <p className="text-sm opacity-70 truncate">{provider.serviceProviderEmail}</p>

                <p className="text-sm opacity-70">{provider.serviceProviderPhone}</p>

                {/* ACTION BUTTONS */}
                <div className="pt-3 flex justify-between items-center">
                  {provider.isBlocked ? (
                    <button
                      onClick={() => handleUnblockProvider(provider._id)}
                      className="btn btn-success btn-sm text-white"
                    >
                      Unblock
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBlockProvider(provider._id)}
                      className="btn btn-error btn-sm text-white"
                    >
                      Block
                    </button>
                  )}

                  <button onClick={() => setSelectedProvider(provider)} className="btn btn-outline btn-sm">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8">
        <Pagination
          crrPage={crrPage}
          dataLimit={dataLimit}
          totaldata={totalData}
          fetchData={(p: number) => getAllServiceProviders(p, searchQuery)}
        />
      </div>

      {selectedProvider && (
        <dialog id="provider_modal" open className="modal modal-open">
          <div className="modal-box max-w-3xl bg-base-300">
            <h3 className="font-bold text-xl mb-3">{selectedProvider.serviceProviderName}</h3>

            <div className="flex gap-4">
              <div className="w-32 h-32 ">
                <ImagePreview src={selectedProvider.profileImage} key={selectedProvider.profileImage} />
              </div>

              <div className="space-y-1 text-sm">
                <p>
                  <strong>Email:</strong> {selectedProvider.serviceProviderEmail}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedProvider.serviceProviderPhone}
                </p>
                <p>
                  <strong>Experience:</strong> {selectedProvider.experience} years
                </p>
                <p>
                  <strong>Address:</strong> {selectedProvider.location.address}
                </p>
              </div>
            </div>

            <div className="divider my-3"></div>

            <p className="text-sm text-gray-700 mb-3">
              <strong>Description:</strong> {selectedProvider.description || 'No description provided.'}
            </p>

            <div className="mb-3">
              <strong>Services:</strong>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedProvider.services.map((service, idx) => (
                  <span key={idx} className="badge badge-primary badge-outline">
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {selectedProvider.subscriptions?.length ? (
              <div className="mt-4">
                <SubscriptionInfoServiceProvider subscriptions={selectedProvider.subscriptions} />
              </div>
            ) : (
              <p className="text-sm text-gray-500">No subscriptions found.</p>
            )}

            {selectedProvider.document && selectedProvider.document.length > 0 && (
              <div className="mt-6">
                <strong className="block mb-2 text-base">Documents:</strong>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {selectedProvider.document.map((doc: string, idx: number) => {
                    return <ImagePreview src={doc} key={doc + idx} />;
                  })}
                </div>
              </div>
            )}

            <div className="modal-action">
              <button onClick={() => setSelectedProvider(null)} className="btn btn-outline">
                Close
              </button>
            </div>
          </div>

          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setSelectedProvider(null)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default ServiceProviderListing;

const ShimmerProviderCard = () => {
  return (
    <div className="card bg-base-100 m-5 shadow-md border border-base-200 rounded-2xl overflow-hidden animate-pulse">
      <div className="h-36 w-full bg-base-300"></div>

      <div className="card-body p-4 space-y-3">
        <div className="h-4 w-2/3 bg-base-300 rounded"></div>
        <div className="h-3 w-1/2 bg-base-300 rounded"></div>
        <div className="h-3 w-1/3 bg-base-300 rounded"></div>

        <div className="flex justify-between mt-4">
          <div className="h-8 w-20 bg-base-300 rounded-md"></div>
          <div className="h-8 w-20 bg-base-300 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};
