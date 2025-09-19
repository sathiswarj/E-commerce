import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import connectDB from "./config/mongodb.js";
import userRoutes from './routes/userRoute.js';
import productRoutes from './routes/productRoute.js';
import adminRoutes from './routes/adminRoute.js'
import connectCloudinary from "./config/cloudinary.js";

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect DB
connectDB();


// Connect to Cloudinary
connectCloudinary();

// Test route
// app.get("/test", (req, res) => {
//   res.json({ message: "Backend is reachable" });
// });

// User routes
app.use("/api/users", userRoutes);
app.use('/api/products', productRoutes)
app.use('/api/', adminRoutes)

 app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
