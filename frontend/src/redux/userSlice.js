import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isAdmin:false ,
    tenants:[] ,
  
  },

  reducers: {
    addUser: (state, action) => {
      console.log(action.payload)
      state.user = action.payload;
    },
    removeUser: (state , action) => {
      state.user = null;
    },
    setUserType:(state , action)=>{
      state.isAdmin = action.payload ;

    }  ,
    setTenants:(state , action ) => {
      state.tenants=action.payload ;

    } ,

    addTenant:(state , action)=>{
      if(!state.tenants){
        state.tenants = []
      }
      state.tenants.push(action.payload)

    } ,
    removeTenant:(state , action)=>{
      console.log(action.payload)
      state.tenants = state.tenants.filter((ten)=>(ten._id.toString())!==(action.payload.toString()))
    }
  },
});

export const { addUser, removeUser , setUserType , removeTenant ,addTenant , setTenants } = userSlice.actions;

export default userSlice.reducer;
