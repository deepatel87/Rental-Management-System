import { createSlice } from "@reduxjs/toolkit";

const houseSlice = createSlice({
  name: "house",
  initialState: {
    houses: [],
    houseDetails: null,
    rentedRoom:null
  },
  reducers: {
    setHouses: (state, action) => {
      state.houses=action.payload ;
    },
    setHouseDetails: (state, action) => {
      state.houseDetails = action.payload;
    },

    addHouse:(state , action)=>{
      state.houses.push(action.payload)
    } ,
    removeHouse:(state , action)=>{
      state.houses=state.houses.filter((house)=>house._id !==action.payload)
    } ,

    setRentedRoom :(state , action)=>{
      state.rentedRoom = action.payload ;
    }
  },
});

export const { setHouses, setHouseDetails , addHouse  , removeHouse , setRentedRoom} = houseSlice.actions;
export default houseSlice.reducer;
