import {configureStore} from '@reduxjs/toolkit'
import userReducer  from './slices/userSlice'
import adminReducer  from './slices/adminSlice'
import subscriptionReducer from "./slices/subscriptionSlice"
import serviceProviderReducer from './slices/serviceProvider'
export const store= configureStore({
    reducer:{
        user:userReducer,
        serviceProvider:serviceProviderReducer,
        admin:adminReducer,
        subscriptionModal: subscriptionReducer,

    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;