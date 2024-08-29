import { configureStore } from "@reduxjs/toolkit";
import houseReducer from "./houseSlice";
import userReducer from "./userSlice";
import requestReducer from "./requestSlice"

const appStore = configureStore({
  reducer: { house: houseReducer, user: userReducer  , request:requestReducer },
});

export default appStore;
