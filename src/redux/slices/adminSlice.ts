import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  _id?: string;
  userName: string;
  email?: string;
  phone?: string;
  password: string;
  isVerified: boolean;
  isBlocked?: boolean;
  serviceProvider?: string;
  isAdmin?: boolean;
  profileImage?: string;
  serviceProviders: ServiceProvider[];
  users: User[];
  allServices: IService[];
}

interface User {
  _id: string;
  userName: string;
  email: string;
  phone: string;
  password: string;
  isVerified: boolean;
  isBlocked?: boolean;
  profileImage?: string;
  isAdmin?: boolean;
}

export interface Location {
  address: string;
  latitude: number;
  longitude: number;
}

 interface IBankDetails {
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
}
export interface ServiceProvider {
  createdAt: string;
  description: string;
  document: string[];
    experience: number;
  isVerified: string;
  location: Location;
  profileImage: string;
  serviceProviderEmail: string;
  serviceProviderName: string;
  serviceProviderPhone: string;
  services: string[];
  skills: object[];
  bankDetails:IBankDetails,
  socialMedia: string;
  updatedAt: string;
  isBlocked?: boolean;
  __v: number;
  _id: string;
  
<<<<<<< HEAD
=======
  
>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6
}

const initialState: UserState = {
  userName: "",
  password: "",
  profileImage:"",
  isVerified: false,
  serviceProviders: [],
  users: [],
  allServices: [],
};

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
  serviceProviderDetails: ServiceProvider[];
}

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    addServiceProviders: (state, action: PayloadAction<ServiceProvider[]>) => {
      state.serviceProviders = action.payload;
    },
    addProfile: (state, action: PayloadAction<User>) => {
      const { userName, email, phone, password, isVerified, isBlocked,profileImage } =
        action.payload;
      state.userName = userName;
      state.email = email;
      state.phone = phone;
      state.password = password;
      state.isVerified = isVerified;
      state.isBlocked = isBlocked;
      state.profileImage=profileImage
    },
    addUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },

    verifyServiceProvider: (state, action: PayloadAction<string>) => {
      const provider = state.serviceProviders.find(
        (sp) => sp._id === action.payload
      );
      if (provider) {
        provider.isVerified = "verified";
      }
    },
    rejectServiceProvider: (state, action: PayloadAction<string>) => {
      const provider = state.serviceProviders.find(
        (sp) => sp._id === action.payload
      );
      if (provider) {
        provider.isVerified = "rejected";
      }
    },
    addServices: (state, action: PayloadAction<IService[]>) => {
      state.allServices = action.payload;
    },
  },
});

export const {
  addProfile,
  addUsers,
  addServiceProviders,
  verifyServiceProvider,
  rejectServiceProvider,
  addServices,
} = adminSlice.actions;

export default adminSlice.reducer;
