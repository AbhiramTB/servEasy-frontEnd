export interface IServiceHome {
  _id: string;
  serviceName: string;
  description: string;
  serviceType: 'Online' | 'Offline' | string;
  experience?: number;
  distance: number;
  location: {
    type: 'Point';
    coordinates: [number, number];
    address: string;
    _id: string;
  };
  estimatedPrice: number;
  serviceImage: string;
  createdAt: string;
  serviceProviderName: string;
  profileImage: string;
  category: string;
}
