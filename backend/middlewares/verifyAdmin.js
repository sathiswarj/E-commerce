import jwt from "jsonwebtoken";


const verifyAdmin = (req, res, next) => {
  try {
     if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    if (req.user.role !== 'admin' && req.user.role !== 'super_admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export default verifyAdmin;
