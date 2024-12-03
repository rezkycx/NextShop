import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialAuthState = {
  isLogin: localStorage.access_token ? true : false,
  isLoading: false,
  access_token: localStorage.access_token || '',
  username: localStorage.username || '',
  error: null,
  cart: JSON.parse(localStorage.getItem('cart')) || []
}

const authReducer = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    logout: (state) => {
      state = initialAuthState;
      return state;
    },
    addToCart: (state, action) => {
      const index = state.cart.findIndex(item => item.id === action.payload.id);
      if (index > -1) {
        state.cart[index].qty++;
      } else {
        state.cart.push({id: action.payload.id, qty: 1})
      }
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    decrementQtyCart: (state, action) => {
      const cartIndex = state.cart.findIndex(item => item.id === action.payload.id);
      state.cart[cartIndex].qty--;
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    incrementQtyCart: (state, action) => {
      const cartIndex = state.cart.findIndex(item => item.id === action.payload.id);
      state.cart[cartIndex].qty++;
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeItemCart: (state, action) => {
      const cartIndex = state.cart.findIndex(item => item.id == action.payload);
      state.cart.splice(cartIndex, 1);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    checkoutCart: (state) => {
      state.cart = state.cart.filter(item => item.isOverMax);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    overMaxStockStatus: (state, action) => {
      const cartIndex = state.cart.findIndex(item => item.id === action.payload.id);
      state.cart[cartIndex].isOverMax = action.payload.status ? true : false;
      localStorage.setItem('cart', JSON.stringify(state.cart));
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLogin = true;
      state.access_token = action.payload.token;
      state.username = action.payload.username;
      localStorage.setItem('access_token', action.payload.token);
      localStorage.setItem('username', action.payload.username);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Login failed";
    })
  }
})

export const {logout, addToCart, decrementQtyCart, incrementQtyCart, removeItemCart, checkoutCart, overMaxStockStatus} = authReducer.actions;

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const {data} = await axios.post('https://fakestoreapi.com/auth/login', {
        "username": credentials.username,
        "password": credentials.password,
      })
      return {token: data.token, username: credentials.username}
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export default authReducer.reducer;