import {createSlice,PayloadAction} from "@reduxjs/toolkit"


interface UserState{
    name:string,
    email:string,
}
const initialState:UserState={
    email:'',
    name:''
}

const userSlice= createSlice({
    name:"user",
    initialState,
    reducers:{
        addUser:(state,action:PayloadAction<UserState>)=>{
            state.name=action.payload.name,
            state.email=action.payload.email
        },
        clearUser:(state)=>{
            state.name="",
            state.email=""
        }

    }
})

export const {addUser,clearUser}=userSlice.actions
export default userSlice.reducer