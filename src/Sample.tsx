// interface Review {
//   id: number;
//   name: string;
//   avatar: string;
//   rating: number;
//   comment: string;
// }

// interface ServiceProvider {
//   name: string;
//   avatar: string;
//   priceRange: string;
//   experience: string;
//   priceRange8: string;
//   memberSince: string;
//   joinedSince: string;
//   email: string;
//   alternateEmail: string;
//   phone: string;
// }

// interface SponsoredAd {
//   id: number;
//   name: string;
//   avatar: string;
//   description: string;
//   badge?: string;
// }

// const ServiceDetailsPage: React.FC = () => {
//   const provider: ServiceProvider = {
//     name: 'sirman',
//     avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
//     priceRange: '₹500 - ₹1200',
//     experience: '5+ years',
//     priceRange8: 'Price 8 range:',
//     memberSince: 'Member Since:',
//     joinedSince: 'Jan 2020',
//     email: 'siman.elisck@email.com',
//     alternateEmail: '+91 Bingnail.com',
//     phone: '+91 9897665 4210',
//   };

//   const reviews: Review[] = [
//     // {
//     //   id: 1,
//     //   name: 'Dat Havlen',
//     //   avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
//     //   rating: 4,
//     //   comment:
//     //     'Frrolod lncas nckoy the vamathd. Stlt lme teing n Welt tatsed. Apctee d the Meullins and eporat anv lts merl Glvaher liigs.',
//     // },
//     // {
//     //   id: 2,
//     //   name: 'Fion Vtech Jmplicy',
//     //   avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
//     //   rating: 4,
//     //   comment:
//     //     'At et Edltorns fo de re vocn wan esmd. stndocdcng the thsat ed and easiasy a m Stoa lt atpeat uo tmd the',
//     // },
//     // {
//     //   id: 3,
//     //   name: 'Licet Mawgly',
//     //   avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
//     //   rating: 4,
//     //   comment: 'Alll foal lo th speh furza and carcrs toyase bsten ad the hall isend.',
//     // },
//     // {
//     //   id: 4,
//     //   name: 'Hep Meattlon',
//     //   avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
//     //   rating: 4,
//     //   comment: 'Txs Morre tro yor trniry trve ftogltrern lint ge yol uooe ene canty.',
//     // },
//   ];

//   const sponsoredAds: SponsoredAd[] = [
//     {
//       id: 1,
//       name: 'Ciaing narlbit',
//       avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop',
//       description:
//         'Lourmit imce eo toote lo capernhitts. poe tlcvltons tp ooris orcanity tovs wile toe txatrrn s ired nouse kiee pecbet youir cnttstcmd an and to thenieset.',
//       badge: 'VERIFIED',
//     },
//     {
//       id: 2,
//       name: 'Sponsored Ads',
//       avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop',
//       description: '',
//     },
//   ];

//   const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
//     return (
//       <div className="flex gap-1">
//         {[...Array(5)].map((_, i) => (
//           <Star
//             key={i}
//             className={`w-4 h-4 ${i < rating ? 'fill-warning text-warning' : 'fill-gray-300 text-gray-300'}`}
//           />
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-base-200 p-6">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold text-base-content mb-6">Service Details</h1>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left Column - Main Content */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Service Image and Details */}
//             <div className="card bg-base-100 shadow-xl">
//               <figure className="h-96">
//                 <img
//                   src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&h=400&fit=crop"
//                   alt="Electrical Service"
//                   className="w-full h-full object-cover"
//                 />
//               </figure>
//               <div className="card-body">
//                 <div className="flex items-center gap-2 text-base-content/70 mb-2">
//                   <MapPin className="w-5 h-5" />
//                   <span>15 km away</span>
//                 </div>
//                 <h2 className="card-title text-2xl text-base-content">Electrical Inspectorate</h2>
//                 <p className="text-base-content/70">
//                   Comprehensive electrical inpen, wiring spair services for residential empirai and commercial
//                   properties.
//                 </p>
//               </div>
//             </div>

//             {/* Customer Reviews */}
//             <div className="card bg-base-100 shadow-xl">
//               <div className="card-body">
//                 <h3 className="text-2xl font-bold text-base-content mb-4">Customer Reviews</h3>
//                 <div className="flex items-center gap-2 mb-6">
//                   <StarRating rating={4} />
//                   <span className="text-base-content/70">(558k reviews)</span>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {reviews.map(review => (
//                     <div key={review.id} className="border border-base-300 rounded-lg p-4">
//                       <div className="flex items-center gap-3 mb-3">
//                         <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
//                         <div>
//                           <h4 className="font-semibold text-base-content">{review.name}</h4>
//                           <StarRating rating={review.rating} />
//                         </div>
//                       </div>
//                       <p className="text-sm text-base-content/70">{review.comment}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Sponsored Ads */}
//             <div className="card bg-base-100 shadow-xl">
//               <div className="card-body">
//                 <h3 className="text-2xl font-bold text-base-content mb-4">Sponsored Ads</h3>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {sponsoredAds.map(ad => (
//                     <div key={ad.id} className="border border-base-300 rounded-lg p-4">
//                       {ad.badge && (
//                         <div className="flex justify-end mb-2">
//                           <span className="badge badge-info badge-sm">{ad.badge}</span>
//                         </div>
//                       )}
//                       <div className="flex items-start gap-3">
//                         <img src={ad.avatar} alt={ad.name} className="w-16 h-16 rounded-full object-cover" />
//                         <div className="flex-1">
//                           <h4 className="font-semibold text-base-content mb-2">{ad.name}</h4>
//                           {ad.description && <p className="text-sm text-base-content/70">{ad.description}</p>}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Provider Details */}
//           <div className="lg:col-span-1">
//             <div className="card bg-base-100 shadow-xl sticky top-6">
//               <div className="card-body">
//                 <h3 className="text-xl font-bold text-base-content mb-4">Service Provider Details</h3>

//                 {/* Provider Profile */}
//                 <div className="flex items-center gap-3 mb-4">
//                   <img src={provider.avatar} alt={provider.name} className="w-16 h-16 rounded-full object-cover" />
//                   <div>
//                     <h4 className="font-bold text-lg text-base-content">{provider.name}</h4>
//                     <p className="text-base-content/70">{provider.priceRange}</p>
//                   </div>
//                 </div>

//                 {/* Experience Badge */}
//                 <div className="flex items-center gap-2 mb-4">
//                   <CheckCircle className="w-5 h-5 text-primary" />
//                   <span className="badge badge-success badge-lg text-white">{provider.experience}</span>
//                 </div>

//                 {/* Provider Info */}
//                 <div className="space-y-2 mb-4 text-sm text-base-content/70">
//                   <p>{provider.priceRange8}</p>
//                   <p>{provider.memberSince}</p>
//                   <p>{provider.joinedSince}</p>
//                 </div>

//                 <div className="divider"></div>

//                 {/* Contact Information */}
//                 <div className="space-y-2 mb-4">
//                   <h5 className="font-semibold text-base-content mb-2">Experience:</h5>
//                   <div className="flex items-center gap-2 text-sm text-base-content/70">
//                     <Mail className="w-4 h-4" />
//                     <span>Email: {provider.email}</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm text-base-content/70">
//                     <Mail className="w-4 h-4" />
//                     <span>Email: {provider.alternateEmail}</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm text-base-content/70">
//                     <Phone className="w-4 h-4" />
//                     <span>Phone: {provider.phone}</span>
//                   </div>
//                 </div>

//                 {/* Video Call Notice */}
//                 <div className="alert alert-info mb-4">
//                   <Video className="w-5 h-5" />
//                   <span className="text-sm">Book Service: Video Call</span>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex gap-3">
//                   <button className="btn btn-success flex-1 text-white">
//                     <MessageCircle className="w-5 h-5" />
//                     Chat
//                   </button>
//                   <button className="btn btn-error flex-1 text-white">
//                     <Video className="w-5 h-5" />
//                     Video Call
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// interface ServiceDetailsCardProps {
//   serviceImage: string;
// }

// interface ServiceDetailsCardProps {
//   serviceName: string;
//   serviceDescription: string;
//   serviceImage: string;
//   servicePrice: number;
//   serviceType?: 'online' | 'offline';
//   distance?: string;
// }

// export const ServiceDetailsCardSample = ({
//   serviceName,
//   serviceDescription,
//   serviceImage,
//   servicePrice,
//   serviceType,
//   distance = '—',
// }: ServiceDetailsCardProps) => {
//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//       <div className="lg:col-span-2 space-y-6">
//         <div className="card bg-base-100 shadow-xl">
//           <figure className="h-96 ">
//             <img src={serviceImage} alt={serviceName} className="w-full h-full object-cover" />
//           </figure>

//           <div className="card-body space-y-3">
//             {distance && (
//               <div className="flex items-center gap-2 text-sm text-base-content/70">
//                 <MapPin className="w-4 h-4" />
//                 <span>{distance} away</span>
//               </div>
//             )}

//             {/* Price info */}
//             <div className="group relative w-fit">
//               <span className="text-xs text-base-content/60 cursor-help underline-offset-2 group-hover:underline">
//                 Average price :<span className="ml-1 text-sm font-semibold text-primary">₹{servicePrice}</span>
//               </span>

//               <div className="absolute left-0 top-full z-10 mt-1 hidden w-60 rounded-md bg-base-100 p-2 text-xs text-base-content shadow-lg group-hover:block">
//                 Final cost may vary based on your service needs and requirements.
//               </div>
//             </div>

//             <h2 className="card-title text-2xl">{serviceName}</h2>

//             <p className="text-base-content/70">{serviceDescription}</p>

//             <div>
//               <span className="badge badge-outline">
//                 {serviceType === 'online' ? 'Online Service' : 'On-site Service'}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// interface Review {
//   id: number;
//   username: string;
//   rating: number;
//   date: string;
//   comment: string;
// }

// export const ReviewCard = () => {
//   const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
//     return (
//       <div className="flex gap-1">
//         {[...Array(5)].map((_, i) => (
//           <Star
//             key={i}
//             className={`w-4 h-4 ${i < rating ? 'fill-warning text-warning' : 'fill-gray-300 text-gray-300'}`}
//           />
//         ))}
//       </div>
//     );
//   };

//   const reviews = [
//     {
//       id: 1,
//       name: 'Rahul Nair',
//       avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop',
//       rating: 5,
//       comment:
//         'Excellent service! The electrician arrived on time and fixed the issue quickly. Very professional and polite.',
//     },
//     {
//       id: 2,
//       name: 'Anjali Menon',
//       avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
//       rating: 4,
//       comment: 'Good experience overall. Pricing was fair and the work was done neatly. Would definitely recommend.',
//     },
//     {
//       id: 3,
//       name: 'Suresh Kumar',
//       avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop',
//       rating: 5,
//       comment: 'Very skilled professional. Explained the problem clearly and completed the work efficiently.',
//     },
//     {
//       id: 4,
//       name: 'Neha Sharma',
//       avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop',
//       rating: 4,
//       comment: 'Service was good, but arrived a little late. However, the quality of work was excellent.',
//     },
//   ];

//   return (
//     <>
//       <div className="card bg-base-100 shadow-xl">
//         <div className="card-body">
//           <h3 className="text-2xl font-bold text-base-content mb-4">Customer Reviews</h3>
//           <div className="flex items-center gap-2 mb-6">
//             <StarRating rating={4} />
//             <span className="text-base-content/70">(558k reviews)</span>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {reviews.map(review => (
//               <div key={review.id} className="border border-base-300 rounded-lg p-4">
//                 <div className="flex items-center gap-3 mb-3">
//                   <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
//                   <div>
//                     <h4 className="font-semibold text-base-content">{review.name}</h4>
//                     <StarRating rating={review.rating} />
//                   </div>
//                 </div>
//                 <p className="text-sm text-base-content/70">{review.comment}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

import React from 'react';
import { Star, MapPin, Mail, Phone, Video, MessageCircle, CheckCircle } from 'lucide-react';

export interface IServiceListing {
  id: number;
  title: string;

  rating: number; // e.g. 4.7
  reviews: string; // e.g. "312K"

  providerName: string;
  providerImage: string; // image URL

  experience: string; // e.g. "10+ years"

  priceMin: number;
  priceMax: number;

  serviceImage: string; // banner / cover image URL
  distance: string; // e.g. "12 km away"

  serviceType: string; // e.g. "Custom Furniture & Repairs"
}

const mockServices: any[] = [
  {
    _id: '65a1b2c3d4e5f6g7h8i901',
    serviceName: 'Professional Interior Photography',
    description: 'High-end real estate and interior photography with professional lighting and post-processing.',
    serviceType: 'Offline',
    experience: 8,
    location: {
      type: 'Point',
      coordinates: [-118.2437, 34.0522],
      address: 'Downtown, Los Angeles, CA',
      _id: 'loc_001',
    },
    estimatedPrice: 250,
    serviceImage: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=800&auto=format&fit=crop',
    createdAt: '2024-03-15T10:00:00Z',
    serviceProviderName: 'Alex Rivera',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
    category: 'Photography',
  },
  {
    _id: '65a1b2c3d4e5f6g7h8i902',
    serviceName: 'Full Stack Web Development',
    description: 'Custom React and Node.js development for startups. Scalable architecture and clean code.',
    serviceType: 'Online',
    experience: 5,
    location: {
      type: 'Point',
      coordinates: [-0.1276, 51.5074],
      address: 'Remote / London, UK',
      _id: 'loc_002',
    },
    estimatedPrice: 60,
    serviceImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop',
    createdAt: '2024-03-18T14:30:00Z',
    serviceProviderName: 'Sarah Chen',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
    category: 'Technology',
  },
  {
    _id: '65a1b2c3d4e5f6g7h8i903',
    serviceName: 'Personal Fitness Coaching',
    description: 'One-on-one strength training and nutritional guidance tailored to your body goals.',
    serviceType: 'Offline',
    experience: 12,
    location: {
      type: 'Point',
      coordinates: [-73.9352, 40.7306],
      address: 'Brooklyn, New York, NY',
      _id: 'loc_003',
    },
    estimatedPrice: 85,
    serviceImage: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop',
    createdAt: '2024-03-20T09:15:00Z',
    serviceProviderName: 'Marcus Thorne',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    category: 'Health & Fitness',
  },
  {
    _id: '65a1b2c3d4e5f6g7h8i904',
    serviceName: 'Digital Marketing Strategy',
    description: "Data-driven SEO, SEM, and social media strategy to boost your brand's online presence.",
    serviceType: 'Online',
    experience: 6,
    location: {
      type: 'Point',
      coordinates: [144.9631, -37.8136],
      address: 'Remote / Melbourne, AU',
      _id: 'loc_004',
    },
    estimatedPrice: 120,
    serviceImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    createdAt: '2024-03-22T11:45:00Z',
    serviceProviderName: 'Elena Rodriguez',
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    category: 'Business',
  },
];

export default function Sample() {
  return <HomePage />;
  // return (
  //   <div className="min-h-screen bg-gray-100 py-8 px-4">
  //     <div className="max-w-6xl mx-auto space-y-6">
  //       <h1 className="text-3xl font-bold text-gray-800 mb-8">Service Listings</h1>
  //       {mockServices.map(service => (
  //         <ServiceCard key={service.id} service={service} />
  //       ))}
  //     </div>
  //   </div>
  // );
}

const ServiceCard = ({ service }: { service: any }) => {
  return (
    <div className="max-w-4xl bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header Section */}
      <div className="p-6 flex items-start justify-between">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{service.title}</h2>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-red-500 text-red-500" />
              <span className="font-semibold text-gray-800">{service.rating}</span>
              <span className="text-gray-500">({service.reviews})</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <img
              src={service.providerImage}
              alt={service.providerName}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-lg text-gray-800">{service.providerName}</h3>
              <span className="inline-block bg-slate-800 text-emerald-400 text-sm px-3 py-1 rounded-full">
                {service.experience}
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-gray-600 text-sm mb-1">Price Range:</p>
          <p className="text-2xl font-bold text-gray-800">₹{service.estimatedPrice}</p>
        </div>
      </div>

      {/* Image Section */}
      <div className="relative h-80">
        <img src={service.serviceImage} alt={service.serviceImage} className="w-full h-full object-cover" />
      </div>

      {/* Footer Section */}
      <div className="p-6 flex items-center justify-between bg-gray-50">
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-5 h-5" />
          {service?.distance && <span className="font-medium">{service.distance}</span>}{' '}
          <span className="ml-2 text-gray-800 font-semibold">{service.serviceName}</span>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-gray-800">{service.serviceType}</p>
        </div>
      </div>

      {/* Service Tag */}
      <div className="px-6 pb-6 bg-gray-50">
        <p className="text-gray-500 text-sm">Service</p>
      </div>
    </div>
  );
};

import { useEffect, useState } from 'react';
import axios from 'axios';
import FilterSortComponent, { FilterSortState } from './components/User/home/FilterCard';
import { IServiceHome } from './utils/types/IserviceHome';
import { apiEndPoint } from './utils/constant';
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonHomeCard from './Skeleton/SkeletonHome';
import { Link } from 'react-router-dom';
import ServiceListingCards from './components/User/home/ServiceListingCards';
import CustomerTestimonials from './components/User/home/CustomerTestimonials';
import WhyChooseServEasy from './components/User/home/WhyCooseServEasy';
import HowItWorks from './components/User/home/HowItWorks';
import ServiceSearchBar from './components/User/home/ServiceSearch';
import LocationSearchBar from './components/User/home/LocationSearchBar';
import BrowseCategories from './components/User/home/BrowseCategories';
import FilterSortComponentSample from './FilterSortComponentSample';
import LandingPage from './Sample1';

interface Location {
  address: string;
  latitude: number;
  longitude: number;
}

interface BannerData {
  imageUrl: string;
  title: string;
  subtitle: string;
  isActive: boolean;
  _id: string;
}

interface Banners {
  homeBanner: BannerData;
  footerBanner: BannerData;
}

const HomePage = () => {
  const [banners, setBanners] = useState<Banners | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeServiceNames, setActiveServiceNames] = useState<string[] | []>([]);
  const [filterState, setFilterState] = useState<FilterSortState>({
    priceSort: 'none',
    category: '',
    experienceSort: 'none',
    ratingFilter: null,
  });

  const [allServices, setAllServices] = useState<IServiceHome[]>([]);
  const [categories, setCategories] = useState<{ id: string; category: string }[] | []>([]);
  const [loading, setLoading] = useState(false);
  const LIMIT = 3;
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    setAllServices([]);
    setCursor(null);
    setHasMore(true);
  }, [filterState, location, searchQuery]);

  useEffect(() => {
    if (allServices.length === 0 && hasMore) {
      fetchData();
    }
  }, [allServices.length, hasMore]);

  const fetchData = async () => {
    if (!hasMore) return;

    try {
      setLoading(true);
      const { priceSort, category, experienceSort } = filterState;

      const filters: Record<string, string> = {};
      if (category?.trim()) filters.category = category;
      if (experienceSort !== 'none') filters.experience = experienceSort.toString();
      if (priceSort !== 'none') filters.priceSort = priceSort;
      if (searchQuery?.trim()) filters.searchQuery = searchQuery;

      const params: Record<string, any> = {
        filters,
        limit: LIMIT,
        cursor,
      };

      if (location?.longitude != null && location?.latitude != null) {
        params.longitude = location.longitude;
        params.latitude = location.latitude;
      }

      const res = await axios.get(`${backendUrl}${apiEndPoint.getServices}/`, {
        params,
      });
      console.log(res.data);
      console.log(res.data.allFilterServices[0]);
      setActiveServiceNames(res.data.activeServiceNames);
      const data = res.data.allFilterServices?.services ?? [];
      const nextCursor = res.data.allFilterServices.nextCursor;

      setCursor(nextCursor);

      setAllServices(prev => [...prev, ...data]);
      setHasMore(data.length === LIMIT);

      if (res.data.categories) {
        setCategories(res.data.categories);
      }
    } catch (error) {
      console.error('Error while fetching filtered services:', error);
    } finally {
      setLoading(false);
    }
  };

  // const fetchBanners = async () => {
  //   try {
  //     const backendUrl = import.meta.env.VITE_BACKEND_URL;
  //     const res = await axios.get(backendUrl + apiEndPoint.getBanners);
  //     setBanners(res.data);
  //   } catch (error) {
  //     console.error('Failed to fetch banners:', error);
  //   }
  // };

  useEffect(() => {
    // fetchBanners();
  }, []);

  return (
    <div className="flex flex-col gap-10">
      {/* Hero Banner */}
      <section className="relative bg-base-200">
        <img
          className="object-cover w-full h-[450px]"
          src={
            banners?.homeBanner?.imageUrl ||
            'https://www.apple.com/v/iphone-17-pro/d/images/overview/cameras/zoom/200mm__c8kya18imsqe_large.jpg'
          }
          alt={banners?.homeBanner?.title}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-4 bg-base-100/60 backdrop-blur-sm">
          <div className="text-center text-base-content">
            <h1 className="text-[50px] font-bold">{banners?.homeBanner?.title || 'SERVEASY'}</h1>
            <p className="mt-2 text-lg">
              {banners?.homeBanner?.subtitle ||
                'Find trusted service providers near you—fast, reliable, and effortless.'}
            </p>
          </div>
          <div className="relative z-20 flex items-center w-full max-w-2xl overflow-visible border rounded-full shadow-xl border-base-100 bg-base-200">
            <div className="relative z-30 flex items-center w-1/3 gap-2 px-4">
              <LocationSearchBar onLocationSelect={setLocation} />
            </div>
            <div className="w-px h-6 mx-2 bg-gray-300" />
            <div className="flex items-center w-2/3 gap-2 px-4 py-2">
              <ServiceSearchBar onSearch={setSearchQuery} activeServiceNames={activeServiceNames} />
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-base bg-opacity-80 backdrop-blur-md">
        <div className="absolute inset-0">
          <div className="absolute rounded-full top-20 left-10 w-72 h-72 bg-primary/10 blur-3xl animate-pulse"></div>
          <div className="absolute rounded-full bottom-20 right-10 w-72 h-72 bg-secondary/10 blur-3xl animate-pulse"></div>
          <div className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 w-96 h-96 bg-accent/5 blur-3xl"></div>
        </div>

        <div className="container px-4 pt-10 mx-auto min-h-[150vh]">
          <h2 className="mb-6 text-3xl font-bold text-center">Services Near You</h2>

          <InfiniteScroll
            dataLength={allServices.length}
            next={fetchData}
            hasMore={hasMore}
            scrollThreshold={0.85} // Trigger when 85% of page scrolled
            loader={
              <div className="flex items-center justify-center py-6">
                <svg
                  className="w-6 h-6 mr-2 animate-spin text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l4-4-4-4v4a8 8 0 00-8 8z" />
                </svg>
                <span className="text-sm text-gray-500">Loading more services...</span>
              </div>
            }
            endMessage={<p className="py-4 text-center text-gray-500">No more services to show</p>}
          >
            <FilterSortComponentSample setFilters={setFilterState} filters={filterState} categories={categories} />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {allServices.length === 0 ? (
                loading ? (
                  <>
                    <SkeletonHomeCard />
                    <SkeletonHomeCard />

                    <SkeletonHomeCard />

                    <SkeletonHomeCard />

                    <SkeletonHomeCard />
                  </>
                ) : (
                  <div className="card  w-full h-[500px] group  ">
                    <p className="text-center text-gray-500">No services found.</p>
                  </div>
                )
              ) : (
                mockServices.map(service => <ServiceCard key={service._id} service={service} />)
              )}
            </div>
          </InfiniteScroll>
        </div>
      </section>

      {hasMore && <div className="h-[200px]" />}

      {!hasMore && (
        <>
          <CustomerTestimonials />
          <WhyChooseServEasy />
          <HowItWorks />
        </>
      )}

      <LandingPage />
    </div>
  );
};
