import {  IService} from "../../redux/slices/serviceProvider";

export interface IServiceProvider {
  _id: string;
  serviceProviderName: string;
  serviceProviderEmail: string;
  serviceProviderPhone: string;
  description: string;
  socialMedia: string;
  services: string[]; // Assuming it's an array of service names or IDs
  skills: string[]; // Assuming it's an array of skill names or IDs
  location: {
    // Define as per your location structure, example below
    type?: string;
    coordinates?: [number, number]; // [longitude, latitude]
    address?: string;
  };
  experience: number;
  profileImage: string;
  document: string;
  isVerified: 'verified' | 'pending' | 'rejected'; // Adjust if there are other statuses
  userId: string;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
  bankDetails?: BankDetails;
    allServices: IService[]; 
}

export interface BankDetails {
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
}