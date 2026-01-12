import { MapPin } from 'lucide-react';

interface ServiceDetailsCardProps {
  serviceName: string;
  serviceDescription: string;
  serviceImage: string;
  servicePrice: number;
  serviceType?: 'Online' | 'Offline';
  distance?: string;
}

const ServiceDetailsCard = ({
  serviceName,
  serviceDescription,
  serviceImage,
  servicePrice,
  serviceType,
  distance = '—',
}: ServiceDetailsCardProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="card bg-base-100 shadow-xl">
          <figure className="h-96 ">
            <img src={serviceImage} alt={serviceName} className="w-full h-full object-cover" />
          </figure>

          <div className="card-body space-y-3">
            {distance && (
              <div className="flex items-center gap-2 text-sm text-base-content/70">
                <MapPin className="w-4 h-4" />
                <span>{distance} away</span>
              </div>
            )}

            <div className="group relative w-fit">
              <span className="text-xs text-base-content/60 cursor-help underline-offset-2 group-hover:underline">
                Average price :<span className="ml-1 text-sm font-semibold text-primary">₹{servicePrice}</span>
              </span>

              <div className="absolute left-0 top-full z-10 mt-1 hidden w-60 rounded-md bg-base-100 p-2 text-xs text-base-content shadow-lg group-hover:block">
                Final cost may vary based on your service needs and requirements.
              </div>
            </div>

            <h2 className="card-title text-2xl">{serviceName}</h2>

            <p className="text-base-content/70">{serviceDescription}</p>

            <div>
              <span className="badge badge-outline">
                {serviceType === 'Online' ? 'Online Service' : 'On-site Service'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsCard;
