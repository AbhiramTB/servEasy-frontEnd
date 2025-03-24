import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRequest } from "../../../utils/makeRequestInstance";
import { apiEndPoint } from "../../../utils/constant";

interface Location {
  _id: string;
  address: string;
  latitude: number;
  longitude: number;
}

interface ServiceProviderDetails {
  _id: string;
  serviceProviderName: string;
  serviceProviderEmail: string;
  serviceProviderPhone: string;
  description: string;
  socialMedia: string;
  services: any[]; // Define proper type if available
  skills: any[]; // Define proper type if available
  location: any; // Define proper type if available
  experience: number;
  profileImage: string;
  document: string;
  isVerified: string;
  userId: string;
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

interface Service {
  _id: string;
  serviceName: string;
  description: string;
  serviceType: string;
  category: string;
  location: Location;
  estimatedPrice: number;
  serviceProviderId: string;
  isActive: boolean;
  serviceImage: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  serviceProviderDetails: ServiceProviderDetails;
}

interface Review {
  id: string;
  username: string;
  rating: number;
  comment: string;
  date: string;
}

interface RecommendedService {
  id: string;
  name: string;
  provider: string;
  image: string;
  rating: number;
}

const SingleServiceCard = () => {
  const [service, setService] = useState<Service>();
  const { id } = useParams();
  
  useEffect(() => {
    getService();
  }, []);
  
  const getService = async () => {
    try {
      const res = await getRequest(`${apiEndPoint.getSingleService}/${id}`);
      setService(res.data.service[0]);
    } catch (error) {
      console.error("Error fetching service:", error);
    }
  };

  // Mock reviews data
  const reviews: Review[] = [
    {
      id: "1",
      username: "John Smith",
      rating: 5,
      comment: "Excellent service! Very professional and completed the work efficiently.",
      date: "March 15, 2025"
    },
    {
      id: "2",
      username: "Sarah Johnson",
      rating: 4,
      comment: "Good work and reasonable price. Would recommend for electrical repairs.",
      date: "March 10, 2025"
    },
    {
      id: "3",
      username: "Michael Brown",
      rating: 5,
      comment: "Fixed my electrical issues quickly. Very knowledgeable and friendly.",
      date: "March 5, 2025"
    }
  ];

  // Mock recommended services
  const recommendedServices: RecommendedService[] = [
    {
      id: "1",
      name: "Electrical Wiring",
      provider: "ElectriPro",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3",
      rating: 4.8
    },
    {
      id: "2",
      name: "Circuit Repair",
      provider: "PowerFix",
      image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45d7?ixlib=rb-4.0.3",
      rating: 4.7
    },
    {
      id: "3",
      name: "Light Installation",
      provider: "BrightSpark",
      image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3",
      rating: 4.9
    },
    {
      id: "4",
      name: "Emergency Repairs",
      provider: "QuickFix",
      image: "https://images.unsplash.com/photo-1581092921461-7031e4bfb83a?ixlib=rb-4.0.3",
      rating: 4.6
    }
  ];

  const calculateYearsActive = (dateString: string) => {
    const created = new Date(dateString);
    const now = new Date();
    return now.getFullYear() - created.getFullYear();
  };

  if (!service) {
    return (
      <div className="bg-base min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-base min-h-screen pb-10">
      {/* <div className="bg-base-300 bg-opacity-60  backdrop-blur-md text-base   mb-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex items-center">
              <img 
                src={service.serviceProviderDetails.profileImage} 
                alt={service.serviceProviderDetails.serviceProviderName}
                className="w-16 h-16 rounded-full mr-4 object-cover border-2 border-white"
              />
              <div className=" text-black ">
                <h2 className="text-xl font-semibold">{service.serviceProviderDetails.serviceProviderName}</h2>
                <div className="flex items-center mt-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm  ml-2">5.0 ({reviews.length} reviews)</span>
                </div>
                <p className="text-sm mt-1">{service.serviceProviderDetails.description || "I specialize in Electrical and Electrical Maintenance."}</p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
   
      <div className="container mx-auto mt-5 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-base-200 rounded-lg shadow-md overflow-hidden mb-6">
              <div className="relative ">
                <img 
                  src={service.serviceImage} 
                  alt={service.serviceName}
                  className="w-full h-64 object-cover"
                />
                
              </div>
              <div className="p-6">
                <h1 className="text-2xl font-bold text-primary mb-4">{service.serviceName}</h1>
                <p className="text-gray-700 mb-6">{service.description}</p>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-primary mb-4">What do people love about this service?</h3>
                  
                  <div className="space-y-6">
                    {reviews.map(review => (
                      <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                        <div className="flex items-center mb-2">
                          <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                            {review.username.charAt(0)}
                          </div>
                          <span className="font-medium">{review.username}</span>
                          <div className="flex ml-3">
                            {[...Array(review.rating)].map((_, i) => (
                              <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm text-gray-500 ml-3">{review.date}</span>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-base-200 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Recommended for you</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {recommendedServices.map(service => (
                  <div key={service.id} className="cursor-pointer group">
                    <div className="mb-2 overflow-hidden rounded-lg relative">
                      <img 
                        src={service.image} 
                        alt={service.name}
                        className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-primary bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                    </div>
                    <h4 className="font-medium text-sm text-primary">{service.name}</h4>
                    <p className="text-xs text-gray-600">{service.provider}</p>
                    <div className="flex items-center mt-1">
                      <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <span className="text-xs text-gray-600 ml-1">{service.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <div className="bg-base-200 rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Service Details</h3>
              
              <div className="flex items-center">
              <img 
                src={service.serviceProviderDetails.profileImage} 
                alt={service.serviceProviderDetails.serviceProviderName}
                className="w-16 h-16 rounded-full mr-4 object-cover border-2 border-white"
              />
              <div className=" text-black ">
                <h2 className="text-xl font-semibold">{service.serviceProviderDetails.serviceProviderName}</h2>
                <div className="flex items-center mt-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm  ml-2">5.0 ({reviews.length} reviews)</span>
                </div>
                <p className="text-sm mt-1">{service.serviceProviderDetails.description || "I specialize in Electrical and Electrical Maintenance."}</p>
              </div>
            </div>
            
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-semibold text-primary">${service.estimatedPrice} / hour</p>
                </div>
                
                
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p>{service.category}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p>{service.location.address}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Service Type</p>
                  <p>{service.serviceType}</p>
                </div>
                
                {/* Contact Actions */}
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <button className="py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition duration-200 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call
                  </button>
                  <button className="py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition duration-200 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Chat
                  </button>
                </div>
                
                <button className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition duration-200 mt-3">
                  Book Now
                </button>
              </div>
            </div>
            
            <div className="bg-base-200 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-primary mb-4">About the Service Provider</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Experience</p>
                    <p className="text-primary">{service.serviceProviderDetails.experience} years</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Member since</p>
                    <p>{service.serviceProviderDetails.createdAt ? calculateYearsActive(service.serviceProviderDetails.createdAt.toString()) : '1'} years</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p>{service.serviceProviderDetails.location?.address || service.location.address}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-sm truncate max-w-[180px]">{service.serviceProviderDetails.serviceProviderEmail}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p>{service.serviceProviderDetails.serviceProviderPhone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleServiceCard;