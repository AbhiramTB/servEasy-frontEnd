import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { MapPin, Tag, X, Edit, Trash2, Eye, EyeOff } from "lucide-react";

interface ServiceDetailsProps {
  serviceId: string;
  onClose?: () => void;
}

const ServiceDetailsView: React.FC<ServiceDetailsProps> = ({ serviceId, onClose }) => {
  const allServices = useSelector((state: RootState) => state.serviceProvider.allServices);
  const service = allServices.find(svc => svc._id === serviceId);

  if (!service) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity">
        <div className="w-full max-w-md p-6 rounded-lg shadow-lg bg-base-100">
          <p className="text-center text-error">Service not found</p>
          <button className="w-full mt-4 btn btn-primary" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center w-full z-1 backdrop-blur-md">
      <div className="w-full max-w-md rounded-lg shadow-lg bg-base-100">
        {/* Header with image */}
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <img 
            src={service.serviceImage} 
            alt={service.serviceName}
            className="object-cover w-full h-full"
          />
          <button 
            className="absolute btn btn-sm btn-circle top-2 right-2 btn-neutral"
            onClick={onClose}
          >
            <X size={16} />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
            <h1 className="text-xl font-bold text-white">{service.serviceName}</h1>
            <span className={`badge ${service.isActive ? 'badge-success' : 'badge-error'}`}>
              {service.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="p-6 space-y-4">
          {/* Price */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-base-200">
            <span className="font-semibold">Price:</span>
            <span className="text-xl font-bold text-primary">₹{service.estimatedPrice}</span>
          </div>
          
          {/* Description */}
          <div>
            <h3 className="mb-1 font-semibold">Description</h3>
            <p className="text-sm text-base-content">{service.description}</p>
          </div>
          
          {/* Key Details */}
          <div className="p-4 space-y-2 rounded-lg bg-base-200">
            <div className="flex items-center gap-2">
              <Tag className="text-primary" size={16} />
              <span className="font-medium">Type:</span> {service.serviceType}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="text-primary" size={16} />
              <span className="font-medium">Location:</span> {service.location.address}
            </div>
            {service.category && (
              <div>
                <span className="font-medium">Category:</span> {service.category}
              </div>
            )}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center justify-between p-4 border-t rounded-b-lg border-base-300 bg-base-100">
          <button className="flex items-center gap-2 btn btn-primary btn-sm">
            <Edit size={16} /> Edit
          </button>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 btn btn-warning btn-sm">
              {service.isActive ? <EyeOff size={16} /> : <Eye size={16} />}
              {service.isActive ? 'Hide' : 'Show'}
            </button>
            <button className="flex items-center gap-2 btn btn-error btn-sm">
              <Trash2 size={16} /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsView;



