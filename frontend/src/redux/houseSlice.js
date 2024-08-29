import { createSlice } from "@reduxjs/toolkit";

const houseSlice = createSlice({
  name: "house",
  initialState: {
    houses: [],
    houseDetails: null,
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
    }
  },
});

export const { setHouses, setHouseDetails , addHouse } = houseSlice.actions;
export default houseSlice.reducer;
