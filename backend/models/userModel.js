import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const userSchema = new mongoose.Schema(

  {
    userId: {
      type: String,
      default: uuidv4,  
      unique: true     
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    cartData: {
      type: Object,
      default: {},
    },
    phone: {
      type: String,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
    },
    streetAddress: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    zipCode: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    paymentMethod: {
      type: String,
      enum: ["Credit Card", "Debit Card", "PayPal", "Bank Transfer"],
     },
    cardNumber: {
      type: String,
      trim: true,
    },
    cardExpiry: {
      type: String,
      trim: true,
    },
    cardCVV: {
      type: String,
      trim: true,
    },
    newsletter: {
      type: Boolean,
      default: true,
    },
    notifications: {
      type: Boolean,
      default: true,
    },
    orderUpdates: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    minimize: false,
  }
);

const userModel = mongoose.models.users || mongoose.model("users", userSchema);

export default userModel;