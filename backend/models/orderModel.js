import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

 const orderItemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  itemTotal: {
    type: Number,
    required: true
  }
}, { _id: true });

 const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      default: uuidv4,
      unique: true,
      index: true
    },
    userId: {
      type: String,
      required: true,
      index: true
    },
    userEmail: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      required: true
    },
    orderItems: {
      type: [orderItemSchema],
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending"
    },
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    },
    paymentMethod: {
      type: String,
      default: "Cash on Delivery"
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending"
    },
    deliveryDate: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

 orderSchema.pre('save', function(next) {
  if (this.isNew && !this.deliveryDate) {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 4);
    this.deliveryDate = deliveryDate;
  }
  next();
});

const orderModel = mongoose.models.orders || mongoose.model("orders", orderSchema);

export default orderModel;