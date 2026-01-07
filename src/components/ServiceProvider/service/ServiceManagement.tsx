import { useEffect, useState } from 'react';
import AddNewService from './AddnewService';
import { serviceEndPoint } from '../../../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { getRequest, patchRequest } from '../../../utils/makeRequestInstance';
import { addServices } from '../../../redux/slices/serviceProvider';
import { RootState } from '../../../redux/store';
import { MapPin, Edit, Eye } from 'lucide-react';
import ServiceDetailsView from './ServiceDetailsView';
import { HotToastSuccess } from '../../../utils/notificationToast';
import { Toaster } from 'react-hot-toast';
import EditService from './editService';
import { Link } from 'react-router-dom';

const ServiceManagement = () => {
  const dispatch = useDispatch();
  const [addService, setService] = useState(false);
  const [filter, setFilter] = useState('all');
  const [viewMore, setViewMore] = useState<string | null>(null);
  const [isEdit, setEdit] = useState<string | null>(null);

  const allService = useSelector((state: RootState) => state.serviceProvider.allServices);

  useEffect(() => {
    getAllServices();
  }, [addService]);

  const getAllServices = async () => {
    try {
      const res = await getRequest(serviceEndPoint.getAllService);
      console.log(res);

      dispatch(addServices(res.data.allServices));
    } catch (error) {
      console.log(error);
    }
  };

  const filteredServices = allService.filter(service => {
    if (filter === 'active') return service.isActive;
    if (filter === 'hidden') return !service.isActive;
    return true;
  });

  const handleViewMore = (id: string) => {
    setViewMore(id);
  };

  const handleBlock = async (serviceId: string, action: string) => {
    try {
      console.log(action);

      const res = await patchRequest(serviceEndPoint.blockUnblock, {
        serviceId,
        action,
      });
      if (res.status == 200) {
        HotToastSuccess(res.data.message);
        dispatch(addServices(allService.map(i => (i._id === serviceId ? { ...i, isActive: !i.isActive } : i))));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <h1 className="mb-4 text-xl font-bold">Service Management</h1>

      <div className="flex flex-wrap gap-2 mb-4">
        <button className="btn btn-primary" onClick={() => setService(!addService)}>
          {addService ? 'Cancel' : 'Add Service'}
        </button>

        <button className={`btn ${filter === 'all' ? 'btn-accent' : 'btn-ghost'}`} onClick={() => setFilter('all')}>
          All Services
        </button>

        <button
          className={`btn ${filter === 'active' ? 'btn-accent' : 'btn-ghost'}`}
          onClick={() => setFilter('active')}
        >
          Active Services
        </button>

        <button
          className={`btn ${filter === 'hidden' ? 'btn-accent' : 'btn-ghost'}`}
          onClick={() => setFilter('hidden')}
        >
          Hidden Services
        </button>
      </div>

      {/* Add New Service Form */}
      {addService && <AddNewService setNewService={setService} />}

      {/* Services Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredServices.map(service => (
          <div key={service._id} className="overflow-hidden rounded-lg shadow-md bg-base-100">
            {/* Service Image */}
            <div className="relative h-40">
              <img src={service.serviceImage} alt={service.serviceName} className="object-cover w-full h-full" />
              <span
                className={`absolute top-2 right-2 px-2 py-1 text-xs font-bold rounded-full text-white ${
                  service.isActive ? 'bg-success' : 'bg-error'
                }`}
              >
                {service.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>

            {/* Service Details */}
            <div className="p-3">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-bold">{service.serviceName}</h3>
                <p className="font-semibold text-primary">₹{service.estimatedPrice}</p>
              </div>

              <p className="mb-2 text-sm text-gray-600 line-clamp-2">{service.description}</p>

              <div className="flex items-center gap-1 text-sm text-gray-500">
                <MapPin size={14} />
                <span className="truncate">{service.location.address}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between p-2 border-t">
              <button className="btn btn-xs btn-primary" onClick={() => handleViewMore(service._id)}>
                View
              </button>

              {service.serviceType == 'Online' && (
                <Link to={`/service-provider/slot-management/${service._id}`}>
                  {' '}
                  <button className="btn btn-xs btn-primary">slot</button>
                </Link>
              )}

              <div className="flex gap-1">
                <button className="btn btn-xs tooltip " data-tip="Edit" onClick={() => setEdit(service._id)}>
                  <Edit size={14} />
                </button>
                {service.isActive && (
                  <button
                    className="btn btn-xs btn-ghost tooltip "
                    data-tip="Block"
                    onClick={() => handleBlock(service._id, 'Block')}
                  >
                    <Eye size={14} />
                  </button>
                )}
                {!service.isActive && (
                  <button
                    className="btn btn-xs tooltip tooltip-left"
                    data-tip="UnBlock"
                    onClick={() => handleBlock(service._id, 'Unblock')}
                  >
                    <Eye size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {viewMore && <ServiceDetailsView serviceId={viewMore} onClose={() => setViewMore(null)} />}

      {isEdit && (
        <div className="mt-5">
          <EditService serviceId={isEdit} onClose={() => setEdit(null)} getAllServices={() => getAllServices()} />
        </div>
      )}

      {/* Empty State */}
      {filteredServices.length === 0 && (
        <div className="p-8 mt-4 text-center rounded-lg bg-base-100">
          <p>No services found.</p>
        </div>
      )}
    </div>
  );
};

export default ServiceManagement;
