import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IServiceProvider } from '../../utils/types/IServiceProvider';

export interface IService {
  _id: string;
  serviceName: string;
  description: string;
  serviceType: string;
  category: string;
  location: Location;
  estimatedPrice: number;
  serviceProviderId: string;
  isActive?: boolean;
  // review?: Review[];
  serviceImage: string;
}

const initialState: IServiceProvider = {
  _id: '',
  serviceProviderName: '',
  serviceProviderEmail: '',
  serviceProviderPhone: '',
  description: '',
  socialMedia: '',
  allServices: [] as IService[],
  services: [],
  skills: [],
  location: {
    type: '',
    coordinates: [0, 0],
    address: '',
  },
  experience: 0,
  profileImage: '',
  document: '',
  isVerified: 'idle',
  userId: '',
  isBlocked: false,
  createdAt: '',
  isProServiceProvider: false,

  updatedAt: '',
  bankDetails: {
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
  },
};
export interface Location {
  address: string;
  latitude: number;
  longitude: number;
}





const serviceProviderSlice = createSlice({
  name: 'serviceProvider',
  initialState,
  reducers: {
    addServiceProvider: (state, action: PayloadAction<IServiceProvider>) => {
      return { ...state, ...action.payload };
    },
    clearServiceProvider: () => initialState,
    addServices: (state, action: PayloadAction<IService[]>) => {
      state.allServices = action.payload;
    },
  },
});

export const { addServiceProvider, clearServiceProvider, addServices } = serviceProviderSlice.actions;
export default serviceProviderSlice.reducer;
