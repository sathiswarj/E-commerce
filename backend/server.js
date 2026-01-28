import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import connectDB from "./config/mongodb.js";
import userRoutes from './routes/userRoute.js';
import productRoutes from './routes/productRoute.js';
import adminRoutes from './routes/adminRoute.js'
import orderRoutes from './routes/orderRoute.js'
import connectCloudinary from "./config/cloudinary.js";
import cartRoutes from './routes/cartRoute.js'

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

connectDB();
connectCloudinary();

app.use("/api/users", userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/', adminRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});