import { configureStore } from "@reduxjs/toolkit";
import houseReducer from "./houseSlice";

const appStore = configureStore({
  reducer: { house: houseReducer },
});

export default appStore;
