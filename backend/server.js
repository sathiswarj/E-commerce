import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import 'dotenv/config';

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true,
}));

// Test route
app.get("/test", (req, res) => {
  res.send("Backend is reachable");
});

// Admin login route
app.post("/api/adminlogin", (req, res) => {
  const { email, password } = req.body;
  const adminEmail = "admin@gmail.com";
  const adminPassword = "admin@gmail.com";

  if (email === adminEmail && password === adminPassword) {
    const token = jwt.sign(
      { role: "admin", email: adminEmail },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      token,
      message: "Admin logged in successfully",
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Invalid admin credentials",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
