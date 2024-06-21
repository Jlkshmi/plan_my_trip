import { createSlice } from "@reduxjs/toolkit";
export const initialState={
    username:"",
    name:"",
    email:"",
    phone:"",
    address:"",
    
}
const userSlice= createSlice({
    name:'user',
    initialState:initialState,
    reducers:{
        updateUser:(state,action)=>{
            console.log(action.payload)
            state.username=action.payload.username
            state.name=action.payload.name
            state.email=action.payload.email
            state.phone=action.payload.phone
            state.address=action.payload.address
            
        }
    },
})
export const {updateUser}=userSlice.actions
export default userSlice.reducer

