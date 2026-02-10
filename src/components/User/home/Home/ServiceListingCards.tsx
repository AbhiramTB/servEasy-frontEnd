import React from 'react';
import { IServiceHome } from '../../../utils/types/IserviceHome';
import { MapPin, Star } from 'lucide-react';

interface HomePageCardProps {
  service: IServiceHome;
}

const ServiceCard: React.FC<HomePageCardProps> = ({ service }) => {
  return (
    <div className="w-full max-w-sm min-h-[600px] bg-base-100 rounded-xl shadow-xl overflow-hidden flex flex-col border border-base-200">
      <div className="p-6 flex items-start justify-between h-40">
        <div className="flex-1 min-w-0">
          {' '}
          <h2 className="text-2xl font-bold text-base-content mb-2 truncate">{service.serviceName}</h2>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1 badge badge-ghost py-3">
              <Star className="w-4 h-4 fill-warning text-warning" />
              <span className="opacity-60 text-xs">({0})</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-12 h-12 rounded-full">
                <img src={service.profileImage} alt="provider" />
              </div>
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-base text-base-content truncate">{service.serviceProviderName}</h3>
              <span className="badge badge-neutral text-xs text-success">{service.experience}</span>
            </div>
          </div>
        </div>

        <div className="text-right flex-shrink-0 ml-2">
          <p className="text-base-content/60 text-xs mb-1">Price Range:</p>
          <p className="text-xl font-black text-primary">₹{service.estimatedPrice}</p>
        </div>
      </div>

      <div className="relative h-64 w-full bg-base-300">
        <img src={service.serviceImage} alt="service" className="w-full h-full object-cover" />
      </div>

      <div className="p-4 flex-grow overflow-hidden">
        <p className="text-sm text-base-content/80 line-clamp-3 italic">"{service.description}"</p>
      </div>

      <div className="p-5 flex flex-col gap-3 bg-base-200/50 mt-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-info text-sm min-w-0">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            {service?.distance && (
              <span className="font-medium whitespace-nowrap">{(service.distance / 1000).toFixed(1)} KM</span>
            )}
            <span className="truncate opacity-70 border-l border-base-content/20 pl-2">
              {service.location.address.split(' ').slice(0, 3).join(' ')}
            </span>
          </div>
          <div className="badge badge-outline font-bold text-xs uppercase tracking-tighter">{service.serviceType}</div>
        </div>

        <div className="text-xs text-base-content/40 uppercase font-bold tracking-widest">Service Details</div>
      </div>
    </div>
  );
};

export default ServiceCard;
