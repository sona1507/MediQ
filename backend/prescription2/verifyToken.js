import jwt from "jsonwebtoken";
import User from "../models/User.js";

export default async function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    // ✅ Check for Authorization header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.warn("⚠️ Missing or malformed Authorization header");
      return res.status(401).json({
        success: false,
        message: "Authorization header missing or malformed"
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token || token.length < 10) {
      console.warn("⚠️ Token missing or too short");
      return res.status(401).json({ success: false, message: "Token not found or invalid" });
    }

    // ✅ Load JWT secret
    const secret = process.env.JWT_SECRET || "mediq-auth-2025-secret";
    if (!secret || typeof secret !== "string" || secret.length < 10) {
      console.error("❌ JWT_SECRET is missing or invalid");
      return res.status(500).json({
        success: false,
        message: "Server misconfiguration: missing JWT secret"
      });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, secret);
    console.log("🔐 Decoded token:", decoded);

    if (!decoded._id) {
      console.warn("⚠️ Token decoded but missing user ID");
      return res.status(401).json({ success: false, message: "Token missing user ID" });
    }

    // ✅ Fetch user from DB
    const user = await User.findById(decoded._id);
    if (!user) {
      console.warn("⚠️ Token valid but user not found");
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // ✅ Attach user to request
    req.user = user;
    next();
  } catch (err) {
    console.error("❌ Token verification failed:", err.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      error: err.message
    });
  }
}
