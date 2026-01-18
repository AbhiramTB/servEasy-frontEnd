import { IService } from '../../redux/slices/serviceProvider';
import { ISubscription } from './ISubscription';

export type IServiceProviderStatus = 'verified' | 'pending' | 'rejected';

export interface IServiceProvider {
  _id: string;
  serviceProviderName: string;
  serviceProviderEmail: string;
  serviceProviderPhone: string;
  description: string;
  socialMedia: string;
  services: string[];
  skills: string[];
  location: {
    type?: string;
    coordinates?: [number, number];
    address?: string;
  };

  experience: number;
  profileImage: string;
  document?: string[];
  isVerified: IServiceProviderStatus;
  userId: string;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
  isProServiceProvider: boolean;
  bankDetails?: BankDetails;
  allServices: IService[];
  subscriptions?: ISubscription[];
}

export interface BankDetails {
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
}
