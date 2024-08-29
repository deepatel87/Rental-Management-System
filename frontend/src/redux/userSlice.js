import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isAdmin:false ,
  
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
      state.isAdmin = action.payload

    }
  },
});

export const { addUser, removeUser , setUserType } = userSlice.actions;

export default userSlice.reducer;
