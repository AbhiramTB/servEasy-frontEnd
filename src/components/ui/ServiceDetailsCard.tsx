import React from 'react';
import { Star } from 'lucide-react';

// Type definitions for service and review
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

// Component Props interface
interface ServiceDetailsCardProps {
  service: Service;
  reviews?: Review[];
}

const ServiceDetailsCard: React.FC<ServiceDetailsCardProps> = ({ service, reviews }) => {
  return (
    <div className="bg-base-200 rounded-lg shadow-md overflow-hidden mb-6">
      <div className="relative">
        <img 
          src={service.serviceImage} 
          alt={service.serviceName}
          className="w-full h-64 object-cover"
        />
      </div>
      
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary mb-4">
          {service.serviceName}
        </h1>
        
        <p className="text-gray-700 mb-6">
          {service.description}
        </p>
        
     { reviews && <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-primary mb-4">
        What do people love about this service?
        </h3> 
        
        <div className="space-y-6">
        {reviews && reviews.map(review => (
            <div 
            key={review.id} 
            className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
            >
            <div className="flex items-center mb-2">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
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
                
                <span className="text-sm text-gray-500 ml-3">
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