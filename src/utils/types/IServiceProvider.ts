<<<<<<< HEAD
import {  IService} from "../../redux/slices/serviceProvider";
=======
import { IService } from '../../redux/slices/serviceProvider';
import { ISubscription } from './ISubscription';
>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6

export type IServiceProviderStatus = 'verified' | 'pending' | 'rejected';

export interface IServiceProvider {
  _id: string;
  serviceProviderName: string;
  serviceProviderEmail: string;
  serviceProviderPhone: string;
  description: string;
  socialMedia: string;
<<<<<<< HEAD
  services: string[]; 
  skills: string[]; 
  location: {
    type?: string;
    coordinates?: [number, number]; 
    address?: string;
  };
  experience: number;
  profileImage: string;
  document: string;
  isVerified: 'verified' | 'pending' | 'rejected'|"idle"; 
=======
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
<<<<<<< HEAD
  isVerified: IServiceProviderStatus;
=======
  isVerified: 'verified' | 'pending' | 'rejected' | 'idle';
>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6
>>>>>>> 9a5a590b2c07a625cfd50f400a3c18919d5bad68
  userId: string;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
<<<<<<< HEAD
  bankDetails?: BankDetails;
    allServices: IService[]; 
}

=======
  isProServiceProvider: boolean;
  bankDetails?: BankDetails;
  allServices: IService[];
  subscriptions?: ISubscription[];
}

<<<<<<< HEAD
=======

>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6
>>>>>>> 9a5a590b2c07a625cfd50f400a3c18919d5bad68
export interface BankDetails {
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
<<<<<<< HEAD
}
=======
}
>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6
