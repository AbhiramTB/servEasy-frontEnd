import React from 'react';
import { IServiceHome } from '../../../utils/types/IserviceHome';
import { CalendarDays, MapPin, User, Star, Heart } from 'lucide-react';

interface HomePageCardProps {
  service: IServiceHome;
}

const ServiceListingCards: React.FC<HomePageCardProps> = ({ service }) => {
  return (
    <div className="card bg-base-200 w-96 rounded-md  h-[700px] shadow-xl hover:shadow-2xl transition-all duration-500 group hover:scale-105 border border-base-300">
      
      <figure className="relative overflow-hidden">
        <img
          className="object-cover w-full h-52 transition-transform duration-500 group-hover:scale-110"
          src={service.serviceImage}
          alt={service.serviceName}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        
        
        
        <div className="absolute top-3 left-3">
          <div className="badge badge-primary badge-lg font-bold text-primary-content shadow-lg">
            {service.serviceType}
          </div>
        </div>
      </figure>

      <div className="card-body bg-gradient-to-b from-base-100 to-base-200/50">
        <div className="flex items-start justify-between">
          <h2 className="card-title text-base-content group-hover:text-primary transition-colors duration-300">
            {service.serviceName}
          </h2>
          {/* <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-warning fill-current" />
            <span className="text-sm font-semibold text-base-content/70">4.8</span>
          </div> */}
        </div>

        <div className="badge badge-outline badge-primary">
          {service.category}
        </div>

        <div className="flex items-center text-sm  p-3 rounded-xl border border-base-300">
          <div className="p-1 bg-primary/20 rounded-lg mr-2">
            <MapPin className="w-4 h-4 text-primary" />
          </div>
          <span className="font-medium text-base-content">{service.location.address}</span>
        </div>

        <div className="bg-base-100   p-3 rounded-xl shadow-lg">
          <p className="text-lg font-bold  text-center">
            ₹{service.estimatedPrice.toLocaleString()}
            <span className="text-sm font-normal opacity-80 ml-1">onwards</span>
          </p>
        </div>

        <div className="flex items-center text-sm bg-accent/10 p-3 rounded-lg border border-accent/30">
          <div className="p-1 bg-accent/20 rounded-lg mr-2">
            <CalendarDays className="w-4 h-4 text-accent" />
          </div>
          <span className="font-medium text-base-content">
            Listed on {new Date(service.createdAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </span>
        </div>

        <div className="flex items-center mt-4 p-3 bg-base-200 rounded-xl border border-base-300 shadow-sm">
          <div className="avatar ">
            <div className="w-10 rounded-full border-2 border-primary/30">
              <img
                src={service.profileImage}
                alt={service.serviceProviderName}
              />
            </div>
          </div>
          <div className="ml-3 flex-1">
            <div className="flex items-center text-sm font-semibold text-base-content">
              <User className="w-4 h-4 mr-1 text-primary" />
              {service.serviceProviderName}
            </div>
            <p className="text-xs text-base-content/60">Verified Provider</p>
          </div>
         
        </div>

      
      </div>

      
    </div>
  );
};

export default ServiceListingCards;