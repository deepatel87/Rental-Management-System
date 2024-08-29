import { createSlice } from "@reduxjs/toolkit";

const requestSLice = createSlice({
  name: "request",
  initialState: {
    requests: [],
    requestDetails: null,
    currRequest:null ,
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
        state.requests = state.requests.filter((req)=>req._id!==action.payload)


    } , 
    setcurrRequest:(state , action)=>{
        state.currRequest = action.payload ;
    }

   
  },
});

export const { setRequests, setRequestsDetails  , setcurrRequest  , removeRequest} = requestSLice.actions;
export default requestSLice.reducer;