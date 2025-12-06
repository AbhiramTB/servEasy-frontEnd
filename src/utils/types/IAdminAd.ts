import { ILocation } from "./ILocation";

 export type IAdStatus ="active" | "inactive" | "expired";

export interface IAdminAd {
  _id: string;
  serviceId: string;
  providerId: string;

  serviceProviderName: string;
  profileImage: string;

  caption: string;
  description: string;
  image: string;

  targetLocation: ILocation

  radiusKm: number;

  startDate: string; 
  endDate: string;   
status:IAdStatus
  views: number;
  clicks: number;

  createdAt: string;
  updatedAt: string;
}
