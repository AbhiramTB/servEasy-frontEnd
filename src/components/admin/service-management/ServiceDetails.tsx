import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
interface ServiceDetails {
  _id: string;
  serviceName: string;
  serviceType: string;
  description: string;
  estimatedPrice: number;
  category: string;
  location: {
    address: string;
  };
  serviceImage: string;
  isBlocked: boolean;
  serviceProviderDetails: {
    serviceProviderName: string;
    profileImage: string;
    experience: number;
    createdAt: string;
    location: {
      address: string;
    };
    serviceProviderEmail: string;
    serviceProviderPhone: string;
  };
}

interface ServiceDetailsProps {
  service: any;
  onClose: () => void;
  onEdit: (id: string) => void;
  onBlock: (id: string) => void;
  onUnblock: (id: string) => void;
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({
  service,
  onClose,
  onEdit,
  onBlock,
  onUnblock,
}) => {
  

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Toaster />
      <div className="relative w-full h-full overflow-y-auto shadow-xl md:h-screen bg-base-100 animate-fadeIn">
        {/* Close button absolute positioned */}
        <button
          onClick={onClose}
          className="absolute z-10 p-2 transition-colors rounded-full shadow-md text-base-content/70 hover:text-error bg-base-100 right-4 top-4 hover:bg-base-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
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
        </button>

        {/* Hero image with service name overlay */}
        <div className="relative h-64 overflow-hidden rounded-t-lg">
          <img
            src={service.serviceImage}
            alt={service.description}
            className="object-contain w-full h-auto max-h-[50vh]"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-bold text-white">
                {service.serviceName}
              </h3>
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-primary text-primary-content">
                {service.serviceType}
              </span>
            </div>
            <p className="mt-2 text-white/80">{service.category}</p>
          </div>
        </div>

        <div className="p-6">
          {/* Status Badge */}
          <div className="mb-6">
            <span
              className={`px-4 py-2 text-sm font-medium rounded-full ${
                service.isBlocked
                  ? "bg-error/10 text-error border border-error/20"
                  : "bg-success/10 text-success border border-success/20"
              }`}
            >
              {service.isBlocked ? "Service Blocked" : "Service Active"}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
            {/* Left column */}
            <div className="md:col-span-3">
              <div className="mb-6">
                <h4 className="flex items-center gap-2 mb-3 text-lg font-semibold text-base-content">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  About this Service
                </h4>
                <div className="p-4 rounded-lg bg-base-200/50">
                  <p className="leading-relaxed text-base-content/80">
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="flex items-center gap-2 mb-3 text-lg font-semibold text-base-content">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-primary"
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
                  Location
                </h4>
                <div className="flex items-center p-4 rounded-lg bg-base-200/50">
                  <div className="text-base-content">
                    <p>{service.location.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="md:col-span-2">
              {/* Price card */}
              <div className="p-4 mb-6 border rounded-lg shadow-sm bg-base-100 border-base-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-base-content/70">
                    Estimated Price
                  </span>
                  <div className="text-2xl font-bold text-primary">
                    ₹{service.estimatedPrice}
                  </div>
                </div>

                <div className="my-2 divider"></div>

                <div className="flex items-center gap-2 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm text-base-content/80">
                    Professional Service
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm text-base-content/80">
                    Qualified Provider
                  </span>
                </div>
              </div>

              {/* Service provider card */}
              <div className="overflow-hidden border rounded-lg shadow-sm bg-base-100 border-base-200">
                <div className="p-4 bg-primary/5">
                  <h4 className="font-semibold text-base-content">
                    Service Provider
                  </h4>
                </div>

                <div className="p-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={service.serviceProviderDetails.profileImage}
                      alt={service.serviceProviderDetails.serviceProviderName}
                      className="object-cover w-16 h-16 rounded-full ring-2 ring-primary/20"
                    />
                    <div>
                      <p className="text-lg font-semibold text-base-content">
                        {service.serviceProviderDetails.serviceProviderName}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="badge badge-primary badge-sm">
                          {service.serviceProviderDetails.experience} years exp
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-sm text-base-content/80">
                        {service.serviceProviderDetails.serviceProviderEmail}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span className="text-sm text-base-content/80">
                        {service.serviceProviderDetails.serviceProviderPhone}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-primary"
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
                      <span className="text-sm text-base-content/80">
                        {service.serviceProviderDetails.location.address}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-sm text-base-content/80">
                        Joined: {service.serviceProviderDetails.createdAt}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-6 mt-6 border-t border-base-200">
            {service.isActive ? (
              <button
                onClick={() => onBlock(service._id)}
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
                onClick={() => onUnblock(service._id)}
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
              onClick={onClose}
              className="flex items-center justify-center px-6 py-3 text-sm font-medium transition-colors rounded-full text-base-content bg-base-300 hover:bg-base-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 mr-2"
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
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
