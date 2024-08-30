import { createSlice } from "@reduxjs/toolkit";

const requestSLice = createSlice({
  name: "request",
  initialState: {
    requests: [],
    requestDetails: null,
    currRequest:null ,
    currTenant:null ,
  },
  reducers: {
    setRequests: (state, action) => {
        console.log("request")
      state.requests=action.payload ;
    },
    setRequestsDetails: (state, action) => {
      state.requestDetails = action.payload;
    },

    removeRequest:(state , action) =>{
      if(action.payload.req==="accept")
        state.requests = state.requests.filter((req)=>req.userId._id!==action.payload.userId)
      else
      state.requests = state.requests.filter((req)=>req._id!==action.payload.reqId)




    } , 
    setcurrRequest:(state , action)=>{
        state.currRequest = action.payload ;
    } ,

    setCurrTenant:(state , action)=>{
      state.currTenant = action.payload
    }

   
  },
});

export const { setRequests, setRequestsDetails  , setcurrRequest  , removeRequest , setCurrTenant} = requestSLice.actions;
export default requestSLice.reducer;