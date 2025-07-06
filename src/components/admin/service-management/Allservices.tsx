import { useEffect, useCallback, useState } from 'react';
import { apiEndPointAdmin } from '../../../utils/constant';
import { adminGetRequest, adminPatchRequest } from '../../../utils/AxiosAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { addServices } from '../../../redux/slices/adminSlice';
import { RootState } from '../../../redux/store';
import ServiceDetails from './ServiceDetails';
import { HotToastError, HotToastSuccess } from '../../../utils/notificationToast';
import { Toaster } from 'react-hot-toast';
import Pagination from '../../../utils/ui/pagination';
import SearchComponent from '../../ui/SearchComponent';

const Allservices = () => {
  const dispatch = useDispatch();
  const services = useSelector((state: RootState) => state.admin.allServices);
  const [crrPage, setCrrPage] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const dataLimit = 6;
  const [details, setDetails] = useState<null | object>();
  const getServices = useCallback(
    async (page: number,searchVal?:string) => {
      try {
          const param: Record<string, any> = { page, limit: dataLimit };
        if (searchVal) {
          param.search = searchVal;
        }
        const res = await adminGetRequest(apiEndPointAdmin.getAllservices,{params:param});

        setCrrPage(page);
        if (res.status === 200) {

          dispatch(addServices(res.data.allServices));
          setTotalData(res.data.count);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    getServices(crrPage,searchQuery);
  }, [getServices]);

  useEffect(() => {
    getServices(0,searchQuery);
  }, [searchQuery]);


  const handleToggleBlock = async (serviceId: string, isBlocked: boolean) => {
    try {
      const res = await adminPatchRequest(apiEndPointAdmin.blockUnblokServices, {
        serviceId,
        action: isBlocked ? 'Unblock' : 'Block',
      });
      console.log(res);
      if (res.status === 200) {
        blockUnblock(serviceId);
        HotToastSuccess(res.data.message);
      } else if (res.status === 400) {
        HotToastError(res.data.message);
      }
    } catch (error) {}
  };

  const block = (serviceId: string) => {
    handleToggleBlock(serviceId.toString(), false);
  };
  const unBlock = (serviceId: string) => {
    handleToggleBlock(serviceId.toString(), true);
  };

  const blockUnblock = (serviceId: string) => {
    dispatch(addServices(services.map(i => (i._id == serviceId ? { ...i, isActive: !i.isActive } : i))));
  };
  return (
    <div>
      <Toaster />
              <h1 className='mt-4 text-xl font-bold ml-14 text-start'>Service Managment</h1>

      <div className="flex justify-end mr-7 align-end">
        <div >
          <SearchComponent setSearch={setSearchQuery} searchVal={searchQuery} />
        </div>
      </div>
      {services && (
        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service: any) => (
            <div
              key={service._id.toString()}
              className="overflow-hidden transition-shadow duration-300 border rounded-lg shadow-lg bg-base-100 border-base-300 hover:shadow-xl"
            >
              {/* Service Image */}
              <div className="h-48 overflow-hidden">
                <img src={service.serviceImage} alt={service.description} className="object-cover w-full h-full" />
              </div>

              {/* Service Details */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-base-content">{service.serviceName}</h3>
                  <span className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-0.5 rounded">
                    {service.serviceType}
                  </span>
                </div>

                <p className="mb-2 text-sm text-base-content/70">{service.description}</p>

                <div className="flex items-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 mr-1 text-base-content/50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-sm truncate text-base-content/70">{service.location.address}</span>
                </div>

                {/* <div className="mb-4">
                  <span className="text-sm text-base-content/70">Category: </span>
                  <span className="text-sm font-medium text-base-content">{service.category}</span>
                </div> */}

                {/* Price and Provider Info */}
                <div className="flex items-center justify-between pt-2 border-t border-base-300">
                  <div>
                    <p className="text-xl font-bold text-primary">₹{service.estimatedPrice}</p>
                  </div>
                  <div className="flex items-center">
                    <img
                      src={service.serviceProviderDetails?.profileImage || ''}
                      alt={service.serviceProviderDetails?.serviceProviderName}
                      className="object-cover w-8 h-8 mr-2 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium text-base-content">
                        {service.serviceProviderDetails.serviceProviderName}
                      </p>
                      <p className="text-xs text-base-content/70">
                        {service.serviceProviderDetails.experience} yrs exp
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {/* <button
                    onClick={() => handleEdit(service._id.toString())}
                    className="flex items-center justify-center px-4 py-2 text-sm font-medium rounded text-primary-content bg-primary hover:bg-primary-focus"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit
                  </button> */}

                  {service.isActive ? (
                    <button
                      onClick={() => handleToggleBlock(service._id.toString(), false)}
                      className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded bg-error hover:bg-error-focus"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                        />
                      </svg>
                      Block
                    </button>
                  ) : (
                    <button
                      onClick={() => handleToggleBlock(service._id.toString(), true)}
                      className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded bg-success hover:bg-success-focus"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      Unblock
                    </button>
                  )}

                  <button
                    onClick={() => setDetails(service)}
                    className="flex items-center justify-center px-4 py-2 text-sm font-medium rounded text-base-content bg-base-300 hover:bg-base-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {details && (
        <ServiceDetails
          service={details}
          onEdit={() => alert('clicked the ')}
          onBlock={block}
          onUnblock={unBlock}
          onClose={() => setDetails(null)}
        />
      )}

      <Pagination
        crrPage={crrPage}
        dataLimit={dataLimit}
        totaldata={totalData}
        fetchData={(p: number) => getServices(p,searchQuery)}
      />
    </div>
  );
};

export default Allservices;
