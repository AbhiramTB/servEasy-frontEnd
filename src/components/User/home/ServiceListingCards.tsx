import React from 'react';
import { IServiceHome } from '../../../utils/types/IserviceHome';
import { CalendarDays, MapPin, User } from 'lucide-react';

interface HomePageCardProps {
  service: IServiceHome;
}

const ServiceListingCards: React.FC<HomePageCardProps> = ({ service }) => {
  return (
    <div className="card bg-base-200 w-80 h-[500px] shadow-md hover:shadow-xl transition-all duration-300 group border border-base-300 rounded-xl overflow-hidden">
      
      {/* Image */}
      <figure className="relative h-40 overflow-hidden">
        <img
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          src={service.serviceImage}
          alt={service.serviceName}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        <div className="absolute top-2 left-2">
          <div className="px-2 py-1 text-xs shadow-md badge badge-primary text-primary-content">
            {service.serviceType}
          </div>
        </div>
      </figure>

      {/* Card Body */}
      <div className="p-4 space-y-3 card-body">
        <div className="flex items-start justify-between">
          <h2 className="text-base card-title line-clamp-1">{service.serviceName}</h2>
        </div>

        <div className="text-xs badge badge-outline badge-primary">{service.category}</div>

        <div className="flex items-center text-xs">
          <MapPin className="w-4 h-4 mr-1 text-primary" />
          <span className="line-clamp-1">{service.location.address}</span>
        </div>

        <div className="text-center">
          <p className="text-lg font-bold">
            ₹{service.estimatedPrice.toLocaleString()}
            <span className="ml-1 text-xs font-normal opacity-70">onwards</span>
          </p>
        </div>

        <div className="flex items-center text-xs">
          <CalendarDays className="w-4 h-4 mr-1 text-accent" />
          <span>
            {new Date(service.createdAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </span>
        </div>

        <div className="flex items-center mt-2">
          <div className="avatar">
            <div className="w-8 border rounded-full border-primary/30">
              <img src={service.profileImage} alt={service.serviceProviderName} />
            </div>
          </div>
          <div className="ml-2">
            <p className="text-sm font-medium">{service.serviceProviderName}</p>
            <p className="text-xs text-base-content/60">Verified Provider</p>
          </div>
          {service.experience && (
            <div className="ml-auto text-xs badge bg-base-100">
              <User className="inline-block w-4 h-4 mr-1" />
              {service.experience} years experience
              </div>
           ) }
        </div>
      </div>
    </div>
  );
};

export default ServiceListingCards;
