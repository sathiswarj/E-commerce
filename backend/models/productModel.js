import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sizes: {
      type: [String], // e.g. ["S", "M", "L"]
      required: true,
    },
    images: {
      type: [String], // array of image URLs or filenames
      required: true,
    },
    bestSeller: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
