import {createSlice,PayloadAction} from "@reduxjs/toolkit"


interface UserState{
    name:string,
    email:string,
    profileImage:string|null,
    serviceProvider?:string,
    _id:string
}
const initialState:UserState={
    email:'',
    name:'',
    profileImage:'',
    serviceProvider:'',
    _id:''
}

const userSlice= createSlice({
    name:"user",
    initialState,
    reducers:{
        addUser:(state,action:PayloadAction<UserState>)=>{
            state.name=action.payload.name,
            state.email=action.payload.email
            state.serviceProvider=action.payload.serviceProvider
            state.profileImage=action.payload.profileImage
            state._id=action.payload._id
        },
        clearUser:(state)=>{
            state.name="",
            state.email=""
        }

    }
})

export const {addUser,clearUser}=userSlice.actions
export default userSlice.reducer