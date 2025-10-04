import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.warn("🚫 No token provided in Authorization header");
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      console.warn("🚫 Token decoded but missing user ID");
      return res.status(401).json({ message: "Invalid token payload" });
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      console.warn(`🚫 No user found for ID: ${decoded.id}`);
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("❌ Auth error:", err.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
