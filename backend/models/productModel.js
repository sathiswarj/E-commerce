import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      default: uuidv4,
      unique: true,
      index: true
    },
    name: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: false,
    },
    subCategory: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: false,
    },
    sizes: {
      type: [String], 
      required: false,
    },
    images: {
      type: [String],
      required: false,
    },
    bestSeller: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
