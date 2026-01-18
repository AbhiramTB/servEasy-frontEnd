export interface ICreateAdDTO {
  caption: string;
  description: string;
  serviceId: string;
  startDate: string;
  endDate: string;

  targetLocation: {
    type: 'Point';
    coordinates: [number, number];
    address:string
  } | null;

  radiusKm: number | null;
  image: string | null;
}
