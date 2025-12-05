import { ILocation } from "./ILocation";


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

  startDate: string; // ISO string
  endDate: string;   // ISO string

  views: number;
  clicks: number;
  status: "active" | "inactive" | "expired"|string;

  createdAt: string;
  updatedAt: string;
}
