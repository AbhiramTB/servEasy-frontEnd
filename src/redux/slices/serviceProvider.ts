import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    createdAt: string;
    description: string;
    document: string;
    experience: number;
    isVerified: string;
    location: string;
    profileImage: string;
    serviceProviderEmail: string;
    serviceProviderName: string;
    serviceProviderPhone: string;
    services: string[];
    allServices: IService[]; 
    skills: object[]; 
    socialMedia: string;
    updatedAt: string;
    userId:string
    __v: number;
    _id: string;
    isBlocked:boolean
}

const initialState: UserState = {
    createdAt: "",
    description: "",
    document: "",
    experience: 0,
    isVerified: "pending",
    location: "",
    profileImage: "",
    isBlocked:false,
    allServices: [],
    userId:"",
    serviceProviderEmail: "",
    serviceProviderName: "",
    serviceProviderPhone: "",
    services: [],
    skills: [],
    socialMedia: "",
    updatedAt: "",
    __v: 0,
    _id: ""
};
export interface Location {
    address: string;
    latitude: number;
    longitude: number;
  }
  
 
  
  export interface IService {
    _id:string,
    serviceName: string;
    description: string;
    serviceType: string;
    category: string;
    location: Location;
    estimatedPrice: number;
    serviceProviderId:string;
    isActive?: boolean;
    // review?: Review[];
    serviceImage: string;
  }

const serviceProviderSlice = createSlice({
    name: "serviceProvider",
    initialState,
    reducers: {
        addServiceProvider: (state, action: PayloadAction<UserState>) => {
            return { ...state, ...action.payload }; 
        },
        clearServiceProvider: () => initialState ,
        addServices: (state, action: PayloadAction<IService[]>) => {
            state.allServices= action.payload; 
          },
    },
   
});

export const { addServiceProvider, clearServiceProvider,addServices } = serviceProviderSlice.actions;
export default serviceProviderSlice.reducer;
