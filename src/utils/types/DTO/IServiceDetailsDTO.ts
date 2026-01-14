import { IReviewDetails } from '../IReview';

interface Location {
  _id: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface IServiceProviderDetailsServiceDetailsDTO {
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

export interface IServiceServiceDetailsDTO {
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
  serviceProviderDetails: IServiceProviderDetailsServiceDetailsDTO;
  reviewDetails?: IReviewDetails;
}
