import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRequestGet } from "../../data/service/ApiRequestGet";

 export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async (_, thunkAPI) => {
    try {
      const response = await ApiRequestGet.getAllProducts();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

 export const fetchOneProduct = createAsyncThunk(
  'products/fetchOneProduct',
  async (productId, thunkAPI) => {
    try {
      const response = await ApiRequestGet.getOneProduct(productId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    selectedProduct: null,
    loading: false,
    error: null
  },
  extraReducers: (builder) => {
    builder
       .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

       .addCase(fetchOneProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOneProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchOneProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default productsSlice.reducer;
