export interface IAd {
  _id?: string;

  serviceId: string;
  providerId: string;

  caption: string;
  description: string;
  image?: string;

  // Location targeting
  targetLocation?: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };

  radiusKm?: number;

  planType: 'basic' | 'pro' | 'premium';

  // Stats
  views?: number;
  clicks?: number;

  // Status
  status?: 'pending' | 'approved' | 'rejected' | 'expired';

  // Dates (stored as ISO strings on frontend)
  startDate?: string;
  endDate?: string;

  createdAt?: string;
  updatedAt?: string;
}
