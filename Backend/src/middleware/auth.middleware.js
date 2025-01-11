import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";
import Driver from "../models/driver.model.js";
import User from "../models/user.model.js";

const protect = (role) => {
  return async (req, res, next) => {

    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded) {
        return res.status(401).json({ message: "Access Denied. Invalid Token" });
      }

      let user;
      switch (role) {
        case "admin":
          user = await Admin.findById(decoded.userId).select("-password");
          break;
        case "driver":
          user = await Driver.findById(decoded.userId).select("-password");
          break;
        case "user":
          user = await User.findById(decoded.userId).select("-password");
          break;
        default:
          return res.status(400).json({ message: "Invalid role specified." });
      }

      if (!user) {
        return res.status(401).json({ message: "Invalid token or user not found." });
      }

      req.user = user;
      req.userRole = role;
      next();
    } catch (error) {
      console.error("Error verifying token:", error);
      res.status(400).json({ message: "Invalid token." });
    }
  };
};

export { protect };  
