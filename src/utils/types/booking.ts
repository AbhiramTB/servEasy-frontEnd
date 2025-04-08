export interface ServiceAddress {
    description: string;
    houseName: string;
    landmark: string;
    name: string;
    phone: string;
    pincode: string;
    state: string;
    _id: string;
  }
  
  export interface PaymentInfo {
    convenienceFee: number;
    inspectionCost: number;
    materialCost: number | null;
    serviceCost: number;
    total: number;
    travelCost: number;
  }
  
  export interface BookingData {
    _id: string;
    estimatedServiceTime: string;
    payment?: PaymentInfo;
    paymentStatus: string;
    paymentType: string;
    profileImage: string;
    serviceBills: string[];
    serviceBookedAddress: ServiceAddress;
    serviceImage: string;
    serviceName: string;
    serviceProviderEmail: string;
    serviceProviderName: string;
    serviceStatus: string;
    serviceType: string;
    userEmail: string;
    userName: string;
    userProfile: string;
  }
  