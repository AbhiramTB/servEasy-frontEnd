import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRequest } from '../../../utils/makeRequestInstance';
import { apiEndPoint } from '../../../utils/constant';
import Card from '../../ui/Card';
import ServiceDetailsCard from '../../ui/ServiceDetailsCard';
import { IReview } from '../../../utils/types/IReview';
import ReviewList from '../../ui/review/ReviewList';
import EmptyState from '../../ui/EmptyState';
import { IAdDTO } from '../../../utils/types/IAd';
import AdCard from '../../ui/ad/AdCard';
import ServiceDetailsSkeleton from '../../../Skeleton/ServiceDetailsSkeleton';
import { IServiceServiceDetailsDTO } from '../../../utils/types/DTO/IServiceDetailsDTO';

const SingleServiceCard = () => {
  const [service, setService] = useState<IServiceServiceDetailsDTO>();
  const [reviews, setReviews] = useState<[IReview] | []>([]);
  const { id } = useParams();
  const [ads, setAds] = useState<IAdDTO[] | []>([]);
  const [loading, setLoading] = useState(true);
  const getAds = async () => {
    try {
      const res = await getRequest('/ads/recommend?count=4');
      if (res.status === 200) {
        console.log(res.data);
        setAds(res.data.ads);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAds();
    getService();
  }, []);
  const getService = async () => {
    try {
      setLoading(true);
      const res = await getRequest(`${apiEndPoint.getSingleService}/${id}`);

      console.log(res.data.service);
      if (res.status == 200) {
        setService(res.data.service[0] || null);
        setReviews(res.data.reviews || []);
      }
    } catch (error) {
      console.error('Error fetching service:', error);
    } finally {
      setLoading(false);
    }
  };
  const navigate = useNavigate();
  const bookService = async (id: string) => {
    navigate(service?.serviceType === 'Online' ? '/bookService-online/' + id : '/bookService/' + id);
  };

  if (loading) {
    return <ServiceDetailsSkeleton />;
  } else if (!service) {
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
    <div className="min-h-screen pb-10 ">
      <div className="container px-4 mx-auto mt-8 bg-base-100 shadow-sm">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 items-start">
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className=" rounded-2xl overflow-hidden ">
              <ServiceDetailsCard
                serviceDescription={service.description}
                serviceImage={service.serviceImage}
                serviceName={service.serviceName}
                servicePrice={service.estimatedPrice}
                serviceType={service.serviceType}
              />
              <div className="divider"></div>
            </div>

            {service.reviewDetails && (
              <div className="shadow-sm  p-6">
                <ReviewList
                  reviews={reviews}
                  averageRating={service.reviewDetails.avgRating}
                  totalReviews={service.reviewDetails.totalReviews}
                />
              </div>
            )}
          </div>

          <div className="md:col-span-1">
            <div className="sticky top-8">
              <Card
                bookService={() => bookService(service._id)}
                title={service.serviceProviderDetails.serviceProviderName}
                description={service.description}
                image={service.serviceProviderDetails.profileImage}
                price={service.estimatedPrice + ''}
                location={service.location.address}
                reviewsCount={service?.reviewDetails?.totalReviews || 0}
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

        {ads.length > 0 && (
          <section className="mt-12 pt-8 border-t border-base-content">
            <h2 className="text-xl font-bold mb-6 px-2 text-base-content text-center md:text-left">Sponsored Ads</h2>

            <div
              className={` flex gap-6 pb-4 px-2 overflow-x-auto snap-x snap-mandatory scrollbar-hide ${ads.length <= 3 ? 'justify-center' : 'justify-start'}`}
            >
              {ads.map(ad => (
                <div key={ad._id} className="snap-center flex-shrink-0 w-full max-w-[320px]">
                  <AdCard ad={ad} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default SingleServiceCard;
