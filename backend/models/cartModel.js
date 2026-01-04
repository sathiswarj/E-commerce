import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    cartId: {
      type: String,
      required: false
    },
    userId: {
      type: String,
      required: false
    },
    productId: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: false
    },
    price: {
      type: Number,
      required: false
    },
    category: {
      type: String
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    },
    image: {
      type: String,
      required: false
    },
    size: {
      type: String,
      required: false
    },
    color: {
      type: String,
      required: false
    }
  },
  {
    _id: false
  }
);

export default cartItemSchema;