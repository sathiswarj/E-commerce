import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import cartItemSchema from './cartModel.js';
 
const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: uuidv4,  
      unique: true,
      index: true   
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
      index: true,   
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']  
    },
    password: {
      type: String,
      required: true,
      minlength: 6,   
      select: false  
    },
    role: {
      type: String,
      enum: ["customer", "admin", "super_admin", "order_manager", "support", "inventory_manager", "finance_manager"],
      default: "customer"
    },
    cartData: {
      type: [cartItemSchema],
      default: {}
    },
    phone: {
      type: String,
      trim: true,
      match: [/^[0-9]{10,15}$/, 'Please enter a valid phone number']
    },
    dateOfBirth: {
      type: Date,
    },
    otp: {
      type: String,
      required: false,
    },
    otpExpiresAt: {
      type: Date,
      required: false,
    },
    address: {
      street: {
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
        default: "India"
      }
    },
    paymentMethod: {
      type: String,
      enum: ["Credit Card", "Debit Card", "PayPal", "UPI", "Bank Transfer", "Cash on Delivery"],
    },
    stripeCustomerId: {
      type: String,
      trim: true,
    },
    razorpayCustomerId: {
      type: String,
      trim: true,
    },
    preferences: {
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
      }
    },
    isActive: {
      type: Boolean,
      default: true
    },
    isEmailVerified: {
      type: Boolean,
      default: false
    },
    isPhoneVerified: {
      type: Boolean,
      default: false
    },
    lastLogin: {
      type: Date
    }
  },
  {
    minimize: false,
    timestamps: true  
  }
);

userSchema.index({ email: 1 });
userSchema.index({ userId: 1 });
userSchema.index({ phone: 1 });

const userModel = mongoose.models.users || mongoose.model("users", userSchema);

export default userModel;