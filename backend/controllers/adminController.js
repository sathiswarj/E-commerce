import jwt from 'jsonwebtoken';

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const adminEmail = "admin@gmail.com";
    const adminPassword = "admin@gmail.com";

    if (email === adminEmail && password === adminPassword) {
      const token = jwt.sign(
        { role: "admin", email: adminEmail },
        process.env.JWT_SECRET || "defaultsecret",
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
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { adminLogin };
