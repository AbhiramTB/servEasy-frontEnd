import React from "react";

interface IService {
  id: string;
  serviceImage: string;
  serviceName: string;
  serviceType: string;
  isActive: boolean;
  category: string;
  estimatedPrice: number;
  description: string;
  location: {
    address: string;
  };
}

interface HomePageCardProps {
  service: IService;
}

const HomePageCard: React.FC<HomePageCardProps> = ({ service }) => {
  return (
    <div className="max-w-sm ml-20 overflow-hidden transition-shadow duration-300">
      <div className="overflow-hidden transition-shadow duration-300 shadow-xl card bg-base-100 hover:shadow-2xl">
        <figure className="relative h-48">
          <img
            src={service.serviceImage}
            alt={service.serviceName}
            className="object-cover w-full h-full"
          />
          <div className="absolute top-2 right-2 badge badge-primary badge-sm">
            {service.serviceType}
          </div>
        </figure>
        <div className="p-4 card-body">
          <div className="flex items-center justify-between">
            <h2 className="truncate card-title text-base-content">
              {service.serviceName}
            </h2>
            {/* <div
              // className={`badge badge-sm ${service.isActive ? "badge-success" : "badge-error"}`}
            >
              {service.isActive ? "Active" : "Inactive"}
            </div> */}
          </div>
          <div className="flex items-center text-sm">
            <span className="mr-2 font-medium text-base-content/80">Category:</span>
            <span className="text-base-content/70">{service.category}</span>
          </div>
          <div className="mt-1 mb-1 text-lg font-bold text-primary">
            ₹{service.estimatedPrice.toLocaleString("en-IN")}
          </div>
          <p className="text-sm text-base-content/60 line-clamp-2">
            {service.description}
          </p>
          <div className="flex items-start mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-primary mr-1 mt-0.5"
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
            <span className="text-xs truncate text-base-content/70">
              {service.location.address}
            </span>
          </div>
          <div className="justify-end mt-3 card-actions">
            <button className="w-full btn btn-primary btn-sm">Book Service</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageCard;
