import { configureStore } from "@reduxjs/toolkit";
import productReducer from './Product/productReducer'

export const store = configureStore({
    reducer:{
        products: productReducer
    }
})
