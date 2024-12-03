import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./feature/productSlice";
import authReducer from "./feature/authSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer
  }
})

export default store;