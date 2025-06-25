import React from "react";
import { Phone, Calendar, MapPinned, Star } from "lucide-react";

interface Location {
  address: string;
}

interface ServiceProviderDetails {
  profileImage?: string;
  serviceProviderName: string;
  serviceProviderPhone: string;
  experience: number;
  location: Location;
  rating?: number;
}

interface ServiceProviderCardProps {
  details: ServiceProviderDetails;
}

const ServiceProviderCard: React.FC<ServiceProviderCardProps> = ({ details }) => {
  return (
    <div className="p-6 shadow-md rounded-xl bg-base-200">
      <div className="flex items-center gap-6">
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              src={details.profileImage || "/default-avatar.png"}
              alt="Service Provider"
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex-grow space-y-1">
          <h2 className="text-xl font-bold text-primary">
            {details.serviceProviderName}
          </h2>
          <p className="flex items-center text-sm">
            <Phone className="w-4 h-4 mr-2 text-primary" />
            {details.serviceProviderPhone}
          </p>
          <p className="flex items-center text-sm">
            <Calendar className="w-4 h-4 mr-2 text-primary" />
            {details.experience} Years Experience
          </p>
          <p className="flex items-center text-sm">
            <MapPinned className="w-4 h-4 mr-2 text-primary" />
            {details.location.address}
          </p>
        </div>
        <div className="flex items-center text-primary">
          <Star fill="currentColor" className="w-6 h-6 mr-1" />
          <span className="text-lg font-bold">{details.rating ?? "4.5"}</span>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderCard;
