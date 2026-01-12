import React from 'react';
import { Star, MapPin, Mail, Phone, Video, MessageCircle, CheckCircle } from 'lucide-react';

const ServiceCard = ({ service }: { service: IServiceListing }) => {
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
          <p className="text-2xl font-bold text-gray-800">
            ₹{service.priceMin} - ₹{service.priceMax}
          </p>
        </div>
      </div>

      {/* Image Section */}
      <div className="relative h-80">
        <img src={service.serviceImage} alt={service.title} className="w-full h-full object-cover" />
      </div>

      {/* Footer Section */}
      <div className="p-6 flex items-center justify-between bg-gray-50">
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-5 h-5" />
          <span className="font-medium">{service.distance}</span>
          <span className="ml-2 text-gray-800 font-semibold">{service.title}</span>
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

// Mock Data
const mockServices: IServiceListing[] = [
  {
    id: 1,
    title: 'Electrical Inspectorate',
    rating: 4.8,
    reviews: '568K',
    providerName: 'sirman',
    providerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    experience: '5+ years',
    priceMin: 500,
    priceMax: 1200,
    serviceImage: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&h=400&fit=crop',
    distance: '15 km away',
    serviceType: 'Electrician & Wiring Services',
  },
  {
    id: 2,
    title: 'Plumbing Services',
    rating: 4.9,
    reviews: '423K',
    providerName: 'rahul_plumber',
    providerImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    experience: '7+ years',
    priceMin: 300,
    priceMax: 900,
    serviceImage: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&h=400&fit=crop',
    distance: '8 km away',
    serviceType: 'Residential & Commercial Plumbing',
  },
  {
    id: 3,
    title: 'Carpentry & Furniture',
    rating: 4.7,
    reviews: '312K',
    providerName: 'kumar_wood',
    providerImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop',
    experience: '10+ years',
    priceMin: 800,
    priceMax: 2500,
    serviceImage: 'https://images.unsplash.com/photo-1608532051206-e8c6774c0e4d?w=800&h=400&fit=crop',
    distance: '12 km away',
    serviceType: 'Custom Furniture & Repairs',
  },
];

// Main App Component
export default function Sample() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Service Listings</h1>
        {mockServices.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
      <ServiceDetailsPage />
    </div>
  );
}

interface Review {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
}

interface ServiceProvider {
  name: string;
  avatar: string;
  priceRange: string;
  experience: string;
  priceRange8: string;
  memberSince: string;
  joinedSince: string;
  email: string;
  alternateEmail: string;
  phone: string;
}

interface SponsoredAd {
  id: number;
  name: string;
  avatar: string;
  description: string;
  badge?: string;
}

const ServiceDetailsPage: React.FC = () => {
  const provider: ServiceProvider = {
    name: 'sirman',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    priceRange: '₹500 - ₹1200',
    experience: '5+ years',
    priceRange8: 'Price 8 range:',
    memberSince: 'Member Since:',
    joinedSince: 'Jan 2020',
    email: 'siman.elisck@email.com',
    alternateEmail: '+91 Bingnail.com',
    phone: '+91 9897665 4210',
  };

  const reviews: Review[] = [
    // {
    //   id: 1,
    //   name: 'Dat Havlen',
    //   avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    //   rating: 4,
    //   comment:
    //     'Frrolod lncas nckoy the vamathd. Stlt lme teing n Welt tatsed. Apctee d the Meullins and eporat anv lts merl Glvaher liigs.',
    // },
    // {
    //   id: 2,
    //   name: 'Fion Vtech Jmplicy',
    //   avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    //   rating: 4,
    //   comment:
    //     'At et Edltorns fo de re vocn wan esmd. stndocdcng the thsat ed and easiasy a m Stoa lt atpeat uo tmd the',
    // },
    // {
    //   id: 3,
    //   name: 'Licet Mawgly',
    //   avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    //   rating: 4,
    //   comment: 'Alll foal lo th speh furza and carcrs toyase bsten ad the hall isend.',
    // },
    // {
    //   id: 4,
    //   name: 'Hep Meattlon',
    //   avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    //   rating: 4,
    //   comment: 'Txs Morre tro yor trniry trve ftogltrern lint ge yol uooe ene canty.',
    // },
  ];

  const sponsoredAds: SponsoredAd[] = [
    {
      id: 1,
      name: 'Ciaing narlbit',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop',
      description:
        'Lourmit imce eo toote lo capernhitts. poe tlcvltons tp ooris orcanity tovs wile toe txatrrn s ired nouse kiee pecbet youir cnttstcmd an and to thenieset.',
      badge: 'VERIFIED',
    },
    {
      id: 2,
      name: 'Sponsored Ads',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop',
      description: '',
    },
  ];

  const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? 'fill-warning text-warning' : 'fill-gray-300 text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-base-content mb-6">Service Details</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Image and Details */}
            <div className="card bg-base-100 shadow-xl">
              <figure className="h-96">
                <img
                  src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&h=400&fit=crop"
                  alt="Electrical Service"
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="card-body">
                <div className="flex items-center gap-2 text-base-content/70 mb-2">
                  <MapPin className="w-5 h-5" />
                  <span>15 km away</span>
                </div>
                <h2 className="card-title text-2xl text-base-content">Electrical Inspectorate</h2>
                <p className="text-base-content/70">
                  Comprehensive electrical inpen, wiring spair services for residential empirai and commercial
                  properties.
                </p>
              </div>
            </div>

            {/* Customer Reviews */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="text-2xl font-bold text-base-content mb-4">Customer Reviews</h3>
                <div className="flex items-center gap-2 mb-6">
                  <StarRating rating={4} />
                  <span className="text-base-content/70">(558k reviews)</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reviews.map(review => (
                    <div key={review.id} className="border border-base-300 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
                        <div>
                          <h4 className="font-semibold text-base-content">{review.name}</h4>
                          <StarRating rating={review.rating} />
                        </div>
                      </div>
                      <p className="text-sm text-base-content/70">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sponsored Ads */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="text-2xl font-bold text-base-content mb-4">Sponsored Ads</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sponsoredAds.map(ad => (
                    <div key={ad.id} className="border border-base-300 rounded-lg p-4">
                      {ad.badge && (
                        <div className="flex justify-end mb-2">
                          <span className="badge badge-info badge-sm">{ad.badge}</span>
                        </div>
                      )}
                      <div className="flex items-start gap-3">
                        <img src={ad.avatar} alt={ad.name} className="w-16 h-16 rounded-full object-cover" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-base-content mb-2">{ad.name}</h4>
                          {ad.description && <p className="text-sm text-base-content/70">{ad.description}</p>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Provider Details */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-xl sticky top-6">
              <div className="card-body">
                <h3 className="text-xl font-bold text-base-content mb-4">Service Provider Details</h3>

                {/* Provider Profile */}
                <div className="flex items-center gap-3 mb-4">
                  <img src={provider.avatar} alt={provider.name} className="w-16 h-16 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-lg text-base-content">{provider.name}</h4>
                    <p className="text-base-content/70">{provider.priceRange}</p>
                  </div>
                </div>

                {/* Experience Badge */}
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="badge badge-success badge-lg text-white">{provider.experience}</span>
                </div>

                {/* Provider Info */}
                <div className="space-y-2 mb-4 text-sm text-base-content/70">
                  <p>{provider.priceRange8}</p>
                  <p>{provider.memberSince}</p>
                  <p>{provider.joinedSince}</p>
                </div>

                <div className="divider"></div>

                {/* Contact Information */}
                <div className="space-y-2 mb-4">
                  <h5 className="font-semibold text-base-content mb-2">Experience:</h5>
                  <div className="flex items-center gap-2 text-sm text-base-content/70">
                    <Mail className="w-4 h-4" />
                    <span>Email: {provider.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-base-content/70">
                    <Mail className="w-4 h-4" />
                    <span>Email: {provider.alternateEmail}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-base-content/70">
                    <Phone className="w-4 h-4" />
                    <span>Phone: {provider.phone}</span>
                  </div>
                </div>

                {/* Video Call Notice */}
                <div className="alert alert-info mb-4">
                  <Video className="w-5 h-5" />
                  <span className="text-sm">Book Service: Video Call</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="btn btn-success flex-1 text-white">
                    <MessageCircle className="w-5 h-5" />
                    Chat
                  </button>
                  <button className="btn btn-error flex-1 text-white">
                    <Video className="w-5 h-5" />
                    Video Call
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
