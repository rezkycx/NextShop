import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    stocks: JSON.parse(localStorage.getItem('stocks')) || [],
    isLoading: false,
    error: null
  },
  reducers: {
    decrementStock: (state, action) => {
      state.stocks = state.stocks.map(item => {
        const productInCart = action.payload.find(p => p.id === item.id);
        if (productInCart) {
          item.stock -= productInCart.qty;
        }
        return item
      });
      localStorage.setItem('stocks', JSON.stringify(state.stocks))
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      const products = action.payload;
      if (state.stocks.length === 0) {
        const stocks = products.map(product => ({id: product.id, stock: 20}))
        localStorage.setItem('stocks', JSON.stringify(stocks))
        state.stocks = stocks;
      }
      state.products = products;
    })
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    })
  }
})

export const {decrementStock} = productSlice.actions;

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const {data} = await axios.get("https://fakestoreapi.com/products");
    return data;
  }
);

export default productSlice.reducer;