import { IAdStatus } from './IAdminAd';
import { ILocation } from './ILocation';

export interface IAd {
  _id?: string;

  serviceId: string;
  providerId: string;

  caption: string;
  description: string;
  image?: string;

  // Location targeting
  targetLocation?: ILocation;

  radiusKm?: number;

  planType: 'basic' | 'pro' | 'premium';

  // Stats
  views?: number;
  clicks?: number;

  // Status
  status?: IAdStatus;

  // Dates (stored as ISO strings on frontend)
  startDate?: string;
  endDate?: string;

  createdAt?: string;
  updatedAt?: string;
}

export interface IAdDTO {
  _id: string;
  caption: string;
  description: string;
  image: string;
  serviceId: string;
  providerId: string;
  profileImage: string;
}
