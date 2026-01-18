import {configureStore} from '@reduxjs/toolkit'
import userReducer  from './slices/userSlice'
import adminReducer  from './slices/adminSlice'
<<<<<<< HEAD

=======
import subscriptionReducer from "./slices/subscriptionSlice"
>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6
import serviceProviderReducer from './slices/serviceProvider'
export const store= configureStore({
    reducer:{
        user:userReducer,
        serviceProvider:serviceProviderReducer,
<<<<<<< HEAD
        admin:adminReducer
=======
        admin:adminReducer,
        subscriptionModal: subscriptionReducer,

>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;