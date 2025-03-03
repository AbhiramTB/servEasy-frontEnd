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
    skills: object[]; // Adjust the type of skills as needed
    socialMedia: string;
    updatedAt: string;
    __v: number;
    _id: string;
}

const initialState: UserState = {
    createdAt: "",
    description: "",
    document: "",
    experience: 0,
    isVerified: "pending",
    location: "",
    profileImage: "",
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

const serviceProviderSlice = createSlice({
    name: "serviceProvider",
    initialState,
    reducers: {
        addServiceProvider: (state, action: PayloadAction<UserState>) => {
            return { ...state, ...action.payload }; 
        },
        clearServiceProvider: () => initialState 
    }
});

export const { addServiceProvider, clearServiceProvider } = serviceProviderSlice.actions;
export default serviceProviderSlice.reducer;
