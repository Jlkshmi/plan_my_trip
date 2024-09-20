import { createSlice } from "@reduxjs/toolkit";
export const initialState={
    username:"",
    name:"",
    id:"",
    email:"",
    phone:"",
    address:"",
    type:"",
    reviews:[],
    is_blocked: false,
    

}
const userSlice= createSlice({
    name:'user',
    initialState:initialState,
    reducers:{
        updateUser:(state,action)=>{
            console.log(action.payload)
            state.username=action.payload.username
            state.name=action.payload.name
            state.id=action.payload.id
            state.email=action.payload.email
            state.phone=action.payload.phone
            state.address=action.payload.address
            state.type=action.payload.type
            state.is_blocked=action.payload.is_blocked;
        }
    },
})
export const {updateUser}=userSlice.actions

export default userSlice.reducer

