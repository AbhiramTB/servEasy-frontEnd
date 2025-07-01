import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRequest, postRequest } from "../../../utils/makeRequestInstance";
import { apiEndPoint, serviceEndPoint } from "../../../utils/constant";
import Card from "../../ui/Card";
import ServiceProviderDetailsCard from "../../ui/ServiceProviderDetailsCard";
import ServiceDetailsCard from "../../ui/ServiceDetailsCard";
import { IReview } from "../../../utils/types/IReview";
import ServiceProviderAvailability from "../../ui/ServiceProviderAvailability";


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
  services: any[];
  skills: any[];
  location: { address: string; latitude: string; longitude: string };
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




const SingleServiceCard = () => {
  const [service, setService] = useState<Service>();
  const [reviews, setReviews] = useState<[IReview] | []>();

  const { id } = useParams();

  useEffect(() => {
    getService();
  }, []);
  const getService = async () => {
    try {
      const res = await getRequest(`${apiEndPoint.getSingleService}/${id}`);

      console.log(res.data);

      setService(res.data.services[0] || null);
      setReviews(res.data.review || null);
    } catch (error) {
      console.error("Error fetching service:", error);
    }
  };
  const navigate = useNavigate();
  const bookService = async (id: string) => {
    navigate(
      service?.serviceType === "Online"
        ? "/bookService-online/" + id
        : "/bookService/" + id
    );
    postRequest(serviceEndPoint.bookservice, { serviceId: id });
  };

  if (!service) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base">
        <div className="w-12 h-12 border-t-2 border-b-2 rounded-full animate-spin border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-10 bg-base">
      <div className="container px-4 mx-auto mt-5">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <ServiceDetailsCard service={service} />

            <div className="w-full max-w-4xl mx-auto">
              <h2 className="pb-2 mb-6 text-2xl font-bold border-b text-inherit">
                Customer Reviews
              </h2>

              <div className="space-y-4">
                {reviews?.map((review) => (
                  <div
                    key={review._id}
                    className="p-4 rounded-lg shadow-md bg-base hover:shadow-lg"
                  >
                    <div className="flex items-center gap-2">
                      {/* <div className="flex items-center justify-center w-10 h-10 font-bold text-blue-800 bg-blue-100 rounded-full">
          {review.rating}
        </div> */}

                      <div className="flex">
                        {[...Array(Math.floor(review.rating))].map((_, i) => (
                          <svg
                            key={i}
                            className="w-5 h-5 text-yellow-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}

                        {[...Array(5 - Math.ceil(review.rating))].map(
                          (_, i) => (
                            <svg
                              key={i}
                              className="w-5 h-5 text-gray-300"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          )
                        )}
                      </div>
                    </div>

                    <div className="mt-3">
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* <div className="p-6 rounded-lg shadow-md bg-base-200">
              <h3 className="mb-4 text-lg font-semibold text-primary">Recommended for you</h3>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {recommendedServices.map(service => (
                  <div key={service.id} className="cursor-pointer group">
                    <div className="relative mb-2 overflow-hidden rounded-lg">
                      <img 
                        src={service.image} 
                        alt={service.name}
                        className="object-cover w-full h-32 transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 transition-all duration-300 bg-opacity-0 bg-primary group-hover:bg-opacity-20"></div>
                    </div>
                    <h4 className="text-sm font-medium text-primary">{service.name}</h4>
                    <p className="text-xs text-gray-600">{service.provider}</p>
                    <div className="flex items-center mt-1">
                      <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <span className="ml-1 text-xs text-gray-600">{service.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
          </div>

          <div className="md:col-span-1">
            <Card
              bookService={() => bookService(service._id)}
              title={service.serviceProviderDetails.serviceProviderName}
              description={service.description}
              image={service.serviceProviderDetails.profileImage}
              price={service.estimatedPrice + ""}
              location={service.location.address}
              reviewsCount={24}
              serviceProviderUserId={service.serviceProviderDetails.userId}
              handleChat={() =>
                navigate("/chat/" + service.serviceProviderDetails.userId)
              }
              checkAvliblity={service.serviceProviderDetails._id}
            />

            <ServiceProviderDetailsCard
              email={service.serviceProviderDetails.serviceProviderEmail}
              phone={service.serviceProviderDetails.serviceProviderPhone}
              experience={service.serviceProviderDetails.experience}
              location={service.serviceProviderDetails.location.address}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleServiceCard;  
