
import React from "react";

interface ServiceCardCompactProps {
  serviceImage: string;
  serviceName: string;
  serviceType: string;
  description: string;
  estimatedPrice: number;
}

const ServiceCardCompact: React.FC<ServiceCardCompactProps> = ({
  serviceImage,
  serviceName,
  
  serviceType,
  description,
  estimatedPrice,
}) => {
  return (
    <div className="flex flex-col gap-4 mb-4 md:flex-row">
      <div className="avatar">
        <div className="w-24 h-24 rounded">
          <img src={serviceImage} alt={serviceName} />
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold">{serviceName}</h2>
        <div className="my-1 space-x-2">
          <span className="badge badge-secondary">{serviceType}</span>
        </div>
        <p className="my-1 text-sm opacity-75">{description}</p>
        <div className="mt-2">
          <strong className="text-xl text-primary">₹{estimatedPrice}</strong>
        </div>
      </div>
    </div>
  );
};

export default ServiceCardCompact;
