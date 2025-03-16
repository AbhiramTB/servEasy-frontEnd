import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
    _id?: string;
    userName: string;
    email?: string;
    phone?: string;
    password: string;
    googleId?: string;
    isVerified: boolean;
    isBlocked?: boolean;
    serviceProvider?: string;
    profileImage?: string;
    isAdmin?: boolean;
}

const initialState: UserState = {
    _id: "",
    userName: "",
    email: "",
    phone: "",
    password: "",
    googleId: "",
    isVerified: true,
    isBlocked: undefined,
    serviceProvider: undefined,
    profileImage: "",
    isAdmin: undefined,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<UserState>) => {
            state.userName = action.payload.userName;
            state.email = action.payload.email;
            state.serviceProvider = action.payload.serviceProvider;
            state.profileImage = action.payload.profileImage;
            state._id = action.payload._id;
        },
        clearUser: (state) => {
            state.userName = "";
            state.email = "";
            state.phone = "";
            state.password = "";
            state.googleId = "";
            state.isVerified = true;
            state.isBlocked = undefined;
            state.serviceProvider = undefined;
            state.profileImage = "";
            state.isAdmin = undefined;
        },
    },
});

export const { addUser, clearUser } = userSlice.actions;
export default userSlice.reducer;



