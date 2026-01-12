import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Mail, Phone, Video, MessageCircle, MapPin, CalendarClock } from 'lucide-react';
import ServiceProviderAvailability from './ServiceProviderAvailability';
import { IReviewDetails } from '../../utils/types/IReview';
import dayjs from 'dayjs';

interface ServiceProviderCardProps {
  image?: string;
  title: string;
  subtitle?: string;
  description?: string;
  price?: string;
  location?: string;
  serviceType?: string;
  reviewsCount?: number;
  profileImage?: string;
  serviceProviderName?: string;
  estimatedPrice?: number;
  bookService?: () => void;
  handleChat?: () => void;
  serviceProviderUserId: string;
  checkAvliblity?: string;
  reviewDetails?: IReviewDetails | null;
  email?: string;
  phone?: string;
  experience?: string;
  memberSince?: string;
  alternateEmail?: string;
  createdAt?: Date;
}

const ServiceProviderCard: React.FC<ServiceProviderCardProps> = ({
  serviceProviderUserId,
  image,
  profileImage,
  title,
  serviceProviderName,
  description,
  price,
  estimatedPrice,
  location,
  serviceType,
  handleChat,
  bookService,
  checkAvliblity,
  reviewDetails,
  email,
  phone,
  experience = '5+ years',
  memberSince,
  alternateEmail,
  createdAt,
}) => {
  const priceRange = estimatedPrice
    ? `₹${Math.round(estimatedPrice * 0.8)} - ₹${estimatedPrice}`
    : price
      ? `₹${price}`
      : 'Price on request';

  return (
    <div className="card bg-base-100 shadow-xl  ">
      <div className="card-body">
        <h3 className="text-xl font-bold text-base-content mb-4">Service Provider Details</h3>

        {/* Provider Profile */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={profileImage || image || 'https://via.placeholder.com/150'}
            alt={serviceProviderName || title}
            className="w-16 h-16 rounded-full object-cover ring-2 ring-primary ring-offset-2"
          />
          <div className="flex-1">
            <h4 className="font-bold text-lg text-base-content">{serviceProviderName || title}</h4>
            <p className="text-base-content/70 text-sm">{priceRange}</p>
          </div>
        </div>

        {/* Rating Section */}
        {reviewDetails && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(reviewDetails?.avgRating || 0) ? 'text-warning' : 'text-base-content/20'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-base-content/70">
              {reviewDetails.avgRating.toFixed(1)} ({reviewDetails.totalReviews} reviews)
            </span>
          </div>
        )}

        {/* Experience Badge */}
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="w-5 h-5 text-success" />
          <span className="badge badge-success badge-lg text-white gap-2">{experience}</span>
        </div>

        {/* Description */}
        {description && <p className="text-sm text-base-content/70 mb-4">{description}</p>}

        {/* Provider Info */}
        <div className="space-y-2 mb-4">
          {estimatedPrice && (
            <div className="flex justify-between text-sm">
              <span className="text-base-content/70">Hourly Rate:</span>
              <span className="font-semibold text-base-content">₹{estimatedPrice}/hr</span>
            </div>
          )}
          {memberSince && (
            <div className="flex justify-between text-sm">
              <span className="text-base-content/70">Member Since:</span>
              <span className="text-base-content">{memberSince}</span>
            </div>
          )}
          {location && (
            <div className="flex items-center gap-2 text-sm text-base-content/70">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          )}

          {createdAt && (
            <div className="flex items-center gap-2 text-sm text-base-content/70">
              <CalendarClock className="w-4 h-4" />
              <span> Provider since : {dayjs(createdAt).format('MMMM YYYY')}</span>
            </div>
          )}
          {serviceType && (
            <div className="flex justify-between text-sm">
              <span className="text-base-content/70">Service Type:</span>
              <span className="text-base-content">{serviceType}</span>
            </div>
          )}
        </div>

        {/* Availability Check */}
        {checkAvliblity && (
          <div className="mb-4">
            <ServiceProviderAvailability serviceProviderId={checkAvliblity} />
          </div>
        )}

        <div className="divider my-2"></div>
        {/* Contact Information */}
        {(email || phone || alternateEmail) && (
          <div className="space-y-2 mb-4">
            <h5 className="font-semibold text-base-content mb-2">Contact:</h5>
            {email && (
              <div className="flex items-center gap-2 text-sm text-base-content/70">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{email}</span>
              </div>
            )}
            {alternateEmail && (
              <div className="flex items-center gap-2 text-sm text-base-content/70">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{alternateEmail}</span>
              </div>
            )}
            {phone && (
              <div className="flex items-center gap-2 text-sm text-base-content/70">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>{phone}</span>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-3 mb-3">
          <button onClick={handleChat} className="btn btn-success flex-1 text-white gap-2">
            <MessageCircle className="w-5 h-5" />
            Chat
          </button>
          <Link to={`/video-call/${serviceProviderUserId}`} className="flex-1">
            <button className="btn btn-error w-full text-white gap-2">
              <Video className="w-5 h-5" />
              Video Call
            </button>
          </Link>
        </div>
        {bookService && (
          <button onClick={bookService} className="btn btn-primary w-full text-white">
            Book Now
          </button>
        )}
      </div>
    </div>
  );
};

export default ServiceProviderCard;
