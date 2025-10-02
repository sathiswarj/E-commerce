import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
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
      type: [String], // e.g. ["S", "M", "L"]
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
