import { configureStore } from "@reduxjs/toolkit";
import houseReducer from "./houseSlice";
import userReducer from "./userSlice";

const appStore = configureStore({
  reducer: { house: houseReducer, user: userReducer },
});

export default appStore;
