import { ApiRequestGet } from "../../data/service/ApiRequestGet";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchAllProducts = createAsyncThunk  (
    'products/fetchAllProducts',
    async(_,thunkAPI) =>{
        try {
            const response = await ApiRequestGet.getAllProducts()
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data || error.message)
        }
    }
) 

const productsSlice = createSlice({
    name:'products',
    initialState:{
        items:[],
        loading: false,
        error:null
    },
    extraReducers:(builder) =>{
        builder
        .addCase(fetchAllProducts.pending,(state)=>{
            state.loading = true;
            state.error =  null
        })
             .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    }
})

export default productsSlice.reducer;