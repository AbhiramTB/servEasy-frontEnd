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
  serviceProviders: ServiceProvider[]; // Array to hold service providers
  users: User[]; // Array to hold multiple users
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
  isAdmin?:boolean;

}

interface ServiceProvider {
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
  skills: object[];
  socialMedia: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

const initialState: UserState = {
  userName: "",
  password: "",
  isVerified: false,
  serviceProviders: [],
  users: [], 
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    addProfile: (state, action: PayloadAction<User>) => {
      const { userName, email, phone, password, isVerified, isBlocked } = action.payload;
      state.userName = userName;
      state.email = email;
      state.phone = phone;
      state.password = password;
      state.isVerified = isVerified;
      state.isBlocked = isBlocked;
    },
    addUsers: (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
    },
    clearUser: (state) => {
      state.userName = "";
      state.email = "";
      state.phone = "";
      state.password = "";
      state.isVerified = false;
      state.isBlocked = undefined;
    },
    addServiceProvider: (state, action: PayloadAction<ServiceProvider>) => {
      state.serviceProviders.push(action.payload);
    },
    verifyServiceProvider: (state, action: PayloadAction<string>) => {
      const provider = state.serviceProviders.find((sp) => sp._id === action.payload);
      if (provider) {
        provider.isVerified = "verified";
      }
    },
    rejectServiceProvider: (state, action: PayloadAction<string>) => {
      const provider = state.serviceProviders.find((sp) => sp._id === action.payload);
      if (provider) {
        provider.isVerified = "rejected";
      }
    },
  },
});

export const {
  addProfile,
  addUsers,
  clearUser,
  addServiceProvider,
  verifyServiceProvider,
  rejectServiceProvider,
} = adminSlice.actions;

export default adminSlice.reducer;
