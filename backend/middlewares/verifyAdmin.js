import jwt from "jsonwebtoken";

const verifyAdmin = (req, res, next) => {
  try {
     const token = req.headers.authorization?.split(' ')[1] || req.headers.token;

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Authentication required. No token provided.' 
      });
    }

     const decoded = jwt.verify(token, process.env.JWT_SECRET);

     const allowedRoles = ["admin", "super_admin", "order_manager", "support", "inventory_manager", "finance_manager"];
    
    if (!allowedRoles.includes(decoded.role)) {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied. Admin privileges required.' 
      });
    }

     req.user = decoded;
    
    next();
  } catch (error) {
     if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Token expired. Please login again.' 
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token.' 
      });
    }

    console.error('Admin verification error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error during authentication.' 
    });
  }
};

export default verifyAdmin;