import React from "react";

interface CardProps {
    image?: string;
    title: string;
    subtitle?: string;
    description?: string;
    price?: string;
    category?: string;
    location?: string;
    serviceType?: string;
    rating?: number;
    reviewsCount?: number;
    profileImage?: string;
    serviceProviderName?: string;
    estimatedPrice?: number;
    bookService?: () => void;
    
}

const Card: React.FC<CardProps> = ({
    image,
    profileImage,
    title,
    serviceProviderName,
    subtitle,
    description,
    price,
    estimatedPrice,
    category,
    location,
    serviceType,
    rating = 5,
    reviewsCount = 0,
    bookService
}) => {
    return (
        <div className="bg-base-200 rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-primary mb-4">Service Details</h3>
            
            {/* Service Provider Section */}
            <div className="flex items-center mb-4">
                <img
                    src={profileImage || image}
                    alt={serviceProviderName || title}
                    className="w-16 h-16 rounded-full mr-4 object-cover border-2 border-white"
                />
                <div>
                    <h2 className="text-xl font-semibold">{serviceProviderName || title}</h2>
                    
                    {/* Rating Section */}
                    <div className="flex items-center mt-1">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <svg 
                                    key={i} 
                                    className={`w-4 h-4 ${i < rating ? 'text-yellow-300' : 'text-gray-300'}`} 
                                    fill="currentColor" 
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                            ))}
                        </div>
                        <span className="text-sm ml-2">{rating.toFixed(1)} ({reviewsCount} reviews)</span>
                    </div>
                    
                    {/* Description */}
                    <p className="text-sm mt-1">
                        {description || "No description available"}
                    </p>
                </div>
            </div>

            {/* Details Section */}
            <div className="space-y-4">
                {/* Price */}
                {(price || estimatedPrice) && (
                    <div>
                        <p className="text-sm text-gray-500">Price</p>
                        <p className="font-semibold text-primary">
                            ${estimatedPrice || price} / hour
                        </p>
                    </div>
                )}

                {/* Category */}
                {category && (
                    <div>
                        <p className="text-sm text-gray-500">Category</p>
                        <p>{category}</p>
                    </div>
                )}

                {/* Location */}
                {location && (
                    <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p>{location}</p>
                    </div>
                )}

                {/* Service Type */}
                {serviceType && (
                    <div>
                        <p className="text-sm text-gray-500">Service Type</p>
                        <p>{serviceType}</p>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 mt-2">
                    <button className="py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition duration-200 flex items-center justify-center">
                        Call
                    </button>
                    <button className="py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition duration-200 flex items-center justify-center">
                        Chat
                    </button>
                </div>

                {/* Book Service Button */}
                {bookService && (
                    <button 
                        className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition duration-200 mt-3" 
                        onClick={bookService}
                    >
                        Book Now
                    </button>
                )}
            </div>
        </div>
    );
};

export default Card;