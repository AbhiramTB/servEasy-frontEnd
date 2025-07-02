import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { addServiceProviders, ServiceProvider } from '../../redux/slices/adminSlice'; // Assuming this action exists
import { adminGetRequest, adminPatchRequest } from '../../utils/AxiosAdmin'; // Assuming this utility exists
import { apiEndPointAdmin } from '../../utils/constant'; // Assuming this config exists
import { HotToastSuccess } from '../../utils/notificationToast';
import { Toaster } from 'react-hot-toast';
import Pagination from '../../utils/ui/pagination';
import SearchComponent from '../ui/SearchComponent';
export interface Location {
  address: string;
  latitude: number;
  longitude: number;
}

const ServiceProviderListing = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  const [crrPage, setCrrPage] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const dataLimit = 3;

  const serviceProviders = useSelector((state: RootState) => state.admin.serviceProviders);

  const getAllServiceProviders = useCallback(
    async (page: number, searchVal?: string) => {
      try {
        setLoading(true);
        const param: Record<string, any> = { page, limit: dataLimit };
        if (searchVal) {
          param.search = searchVal;
        }
        const res = await adminGetRequest(`${apiEndPointAdmin.serviceProvider}`, { params: param });
        setCrrPage(page);
        if (res.data && res.data.data) {
          dispatch(addServiceProviders(res.data.data));
          setTotalData(res.data.count);
        }
      } catch (error) {
        console.error('Error fetching service providers:', error);
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    getAllServiceProviders(crrPage,searchQuery);
  }, [getAllServiceProviders, searchQuery]);

  useEffect(() => {
    getAllServiceProviders(0, searchQuery);
  }, [searchQuery]);

  const filteredServiceProviders = serviceProviders.filter(provider => {
    switch (activeTab) {
      case 'verified':
        return provider.isVerified === 'verified';
      case 'rejected':
        return provider.isVerified === 'rejected';
      case 'blocked':
        return provider.isBlocked === true;
      case 'nonBlocked':
        return provider.isBlocked !== true;
      default:
        return true;
    }
  });

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };


 const blockProvidder=(providerId:string)=>{
  
             dispatch(addServiceProviders( serviceProviders.map((sp)=>sp._id==providerId?{...sp,isBlocked:!sp.isBlocked}:sp)));

  }
  const handleBlockProvider = async (providerId: string) => {
    try {
      const res = await adminPatchRequest(apiEndPointAdmin.blockUnblockServiceProvider, {
        providerId,
        action: 'Block',
      });

      if (res.status == 200) {
        HotToastSuccess(res.data.message);
       blockProvidder(providerId)
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
      if (res.status == 200) {
        HotToastSuccess(res.data.message);
       blockProvidder(providerId)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex justify-end mt-3">
        <SearchComponent setSearch={setSearchQuery} searchVal={searchQuery} />
      </div>
      <h1 className="mb-6 text-3xl font-bold">Service Providers{searchQuery}</h1>

      <Toaster />

      <div className="mb-6 tabs tabs-boxed">
        <button className={`tab ${activeTab === 'all' ? 'tab-active' : ''}`} onClick={() => handleTabChange('all')}>
          All Providers
        </button>
        <button
          className={`tab ${activeTab === 'verified' ? 'tab-active' : ''}`}
          onClick={() => handleTabChange('verified')}
        >
          Verified
        </button>
        <button
          className={`tab ${activeTab === 'rejected' ? 'tab-active' : ''}`}
          onClick={() => handleTabChange('rejected')}
        >
          Rejected
        </button>
        <button
          className={`tab ${activeTab === 'blocked' ? 'tab-active' : ''}`}
          onClick={() => handleTabChange('blocked')}
        >
          Blocked
        </button>
        <button
          className={`tab ${activeTab === 'nonBlocked' ? 'tab-active' : ''}`}
          onClick={() => handleTabChange('nonBlocked')}
        >
          Non-Blocked
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="flex flex-col w-full gap-4">
            <div className="w-full h-32 skeleton"></div>
            <div className="w-full h-32 skeleton"></div>
            <div className="w-full h-32 skeleton"></div>
          </div>
        </div>
      ) : (
        <>
          {filteredServiceProviders.length === 0 ? (
            <div className="alert alert-info">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="w-6 h-6 stroke-current shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>No service providers found in this category.</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredServiceProviders.map((provider: ServiceProvider) => (
                <div key={provider._id} className="shadow-xl card bg-base-100">
                  <figure className="relative">
                    <img
                      src={provider.profileImage || '/default-profile.png'}
                      alt={provider.serviceProviderName}
                      className="object-cover w-full h-48"
                    />
                    <div className="absolute flex flex-col gap-1 top-2 right-2">
                      {provider.isVerified === 'verified' && (
                        <div className="gap-1 badge badge-success">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                          </svg>
                          Verified
                        </div>
                      )}
                      {provider.isVerified === 'rejected' && (
                        <div className="gap-1 badge badge-error">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                          </svg>
                          Rejected
                        </div>
                      )}
                      {provider.isBlocked === true && (
                        <div className="gap-1 badge badge-neutral">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                            />
                          </svg>
                          Blocked
                        </div>
                      )}
                    </div>
                  </figure>

                  <div className="card-body">
                    <h2 className="card-title">{provider.serviceProviderName}</h2>
                    <p className="text-sm text-base-content/70 line-clamp-2">{provider.description}</p>

                    <div className="my-1 divider"></div>

                    <div className="mb-2">
                      <h3 className="mb-1 text-sm font-medium">Services:</h3>
                      <div className="flex flex-wrap gap-1">
                        {provider.services.slice(0, 3).map((service, index: number) => (
                          <span key={index} className="badge badge-primary badge-outline">
                            {service}
                          </span>
                        ))}
                        {provider.services.length > 3 && (
                          <span className="badge badge-ghost">+{provider.services.length - 3} more</span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          ></path>
                        </svg>
                        <span className="truncate">{provider.serviceProviderEmail}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          ></path>
                        </svg>
                        <span>{provider.serviceProviderPhone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                        </svg>
                        <span className="truncate">{provider.location.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                        <span>Experience: {provider.experience} years</span>
                      </div>
                    </div>

                    <div className="justify-end mt-4 card-actions">
                      {/* <button className="btn btn-primary btn-sm">
                        View Details
                      </button> */}
                      <li className="flex items-center gap-2">
                        {/* Unblock Button */}
                        {provider.isBlocked && (
                          <button
                            onClick={() => handleUnblockProvider(provider._id)}
                            className="flex items-center gap-2 p-2 text-white transition rounded-md bg-success hover:bg-success-focus"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="font-medium">Unblock Provider</span>
                          </button>
                        )}

                        {/* Block Button */}
                        {provider.isBlocked == false && (
                          <button
                            onClick={() => handleBlockProvider(provider._id)}
                            className="flex items-center gap-2 p-2 text-white transition rounded-md bg-error hover:bg-error-focus"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                            <span className="font-medium">Block Provider</span>
                          </button>
                        )}
                      </li>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <Pagination
        crrPage={crrPage}
        dataLimit={dataLimit}
        totaldata={totalData}
        fetchData={(p: number) => getAllServiceProviders(p)}
      />
    </div>
  );
};

export default ServiceProviderListing;
