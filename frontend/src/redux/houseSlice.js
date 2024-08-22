import { createSlice } from "@reduxjs/toolkit";

const houseSlice = createSlice({
  name: "house",
  initialState: {
    houses: [],
    houseDetails: null,
  },
  reducers: {
    setHouses: (state, action) => {
      state.houses.push(action.payload);
    },
    setHouseDetails: (state, action) => {
      state.houseDetails = action.payload;
    },
  },
});

export const { setHouses, setHouseDetails } = houseSlice.actions;
export default houseSlice.reducer;
