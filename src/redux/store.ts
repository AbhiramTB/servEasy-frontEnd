import {configureStore} from '@reduxjs/toolkit'
import userReducer  from './slices/userSlice'
import serviceProviderReducer from './slices/serviceProvider'
export const store= configureStore({
    reducer:{
        user:userReducer,
        serviceProvider:serviceProviderReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;