import React from 'react';
import { Star } from 'lucide-react';

interface Service {
  serviceImage: string;
  serviceName: string;
  description: string;
}

interface Review {
  id: number;
  username: string;
  rating: number;
  date: string;
  comment: string;
}

interface ServiceDetailsCardProps {
  service: Service;
  reviews?: Review[];
}

const ServiceDetailsCard: React.FC<ServiceDetailsCardProps> = ({ service, reviews }) => {
  return (
    <div className="mb-6 overflow-hidden rounded-lg shadow-md bg-base-200">
      <div className="relative">
        <img 
          src={service.serviceImage} 
          alt={service.serviceName}
          className="object-cover w-full h-64"
        />
      </div>
      
      <div className="p-6">
        <h1 className="mb-4 text-2xl font-bold text-primary">
          {service.serviceName}
        </h1>
        
        <p className="mb-6 text-gray-700">
          {service.description}
        </p>
        
     { reviews && <div className="pt-6 border-t border-gray-200">
        <h3 className="mb-4 text-lg font-semibold text-primary">
        What do people love about this service?
        </h3> 
        
        <div className="space-y-6">
        {reviews && reviews.map(review => (
            <div 
            key={review.id} 
            className="pb-6 border-b border-gray-200 last:border-b-0 last:pb-0"
            >
            <div className="flex items-center mb-2">
                <div className="flex items-center justify-center w-8 h-8 mr-3 text-white rounded-full bg-primary">
                {review.username.charAt(0)}
                </div>
                
                <span className="font-medium">{review.username}</span>
                
                <div className="flex ml-3">
                {[...Array(review.rating)].map((_, i) => (
                    <Star 
                    key={i} 
                    className="w-4 h-4 text-yellow-400 fill-current"
                    />
                ))}
                </div>
                
                <span className="ml-3 text-sm text-gray-500">
                {review.date}
                </span>
            </div>
            
            <p className="text-gray-700">
                {review.comment}
            </p>
            </div>
        ))}
        </div>
    </div>}
      </div>
    </div>
  );
};

export default ServiceDetailsCard;