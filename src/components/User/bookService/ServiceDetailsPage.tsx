import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRequest, postRequest } from '../../../utils/makeRequestInstance';
import { apiEndPoint, serviceEndPoint } from '../../../utils/constant';
import Card from '../../ui/Card';
import ServiceProviderDetailsCard from '../../ui/ServiceProviderDetailsCard';
import ServiceDetailsCard from '../../ui/ServiceDetailsCard';
import { IReview, IReviewDetails } from '../../../utils/types/IReview';

import ReviewList from '../../ui/review/ReviewList';
import { ServiceDetailsCardSample, ReviewCard } from '../../../Sample';
import EmptyState from '../../ui/EmptyState';

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
  serviceType: 'Online' | 'Offline';
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
  reviewDetails: IReviewDetails;
}

const SingleServiceCard = () => {
  const [service, setService] = useState<Service>();
  const [reviews, setReviews] = useState<[IReview] | []>([]);
  const { id } = useParams();

  useEffect(() => {
    getService();
  }, []);
  const getService = async () => {
    try {
      const res = await getRequest(`${apiEndPoint.getSingleService}/${id}`);

      console.log(res.data);
      if (res.status == 200) {
        setService(res.data.services[0] || null);
        setReviews(res.data.review || []);
      }
    } catch (error) {
      console.error('Error fetching service:', error);
    }
  };
  const navigate = useNavigate();
  const bookService = async (id: string) => {
    navigate(service?.serviceType === 'Online' ? '/bookService-online/' + id : '/bookService/' + id);
    postRequest(serviceEndPoint.bookservice, { serviceId: id });
  };

  if (!service) {
    return (
      <div className="mt-5">
        <EmptyState
          actionText="service not found"
          icon="deep-search"
          message="service not found"
          title="service not found"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-10 bg-base">
      <div className="container px-4 mx-auto mt-5">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="">
            <ServiceDetailsCard
              serviceDescription={service.description}
              serviceImage={service.serviceImage}
              serviceName={service.serviceName}
              servicePrice={service.estimatedPrice}
              serviceType={service.serviceType}
            />
          </div>

          <div className="md:col-span-1">
            <Card
              bookService={() => bookService(service._id)}
              title={service.serviceProviderDetails.serviceProviderName}
              description={service.description}
              image={service.serviceProviderDetails.profileImage}
              price={service.estimatedPrice + ''}
              location={service.location.address}
              reviewsCount={service.reviewDetails.totalReviews}
              serviceProviderUserId={service.serviceProviderDetails.userId}
              handleChat={() => navigate('/chat/' + service.serviceProviderDetails.userId)}
              checkAvliblity={service.serviceProviderDetails._id}
              reviewDetails={service.reviewDetails}
              createdAt={service.serviceProviderDetails.createdAt}
              email={service.serviceProviderDetails.serviceProviderEmail}
              phone={service.serviceProviderDetails.serviceProviderPhone}
            />
          </div>
        </div>
      </div>

      <ReviewList
        reviews={reviews}
        averageRating={service.reviewDetails.avgRating}
        totalReviews={service.reviewDetails.totalReviews}
      />
    </div>
  );
};

export default SingleServiceCard;
