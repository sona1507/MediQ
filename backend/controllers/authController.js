import bcrypt from "bcryptjs";
import User from "../models/User.js";

// @desc   Register a new user
// @route  POST /api/auth/register
// @access Public
export const registerUser = async (req, res) => {
  console.log("🔧 Register route hit!");

  try {
    const { name, email, mobile, password, role } = req.body;

    // ✅ Sanitize input
    const cleanName = name?.trim();
    const cleanEmail = email?.trim().toLowerCase();
    const cleanMobile = mobile?.trim();
    const cleanPassword = password?.trim();
    const cleanRole = role?.trim().toLowerCase() || "user";

    // ✅ Validate input
    if (!cleanName || !cleanEmail || !cleanMobile || !cleanPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // ✅ Generate unique userId like U001
    const count = await User.countDocuments();
    const userId = `U${String(count + 1).padStart(3, "0")}`;

    // ✅ Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(cleanPassword, salt);

    // ✅ Create user
    const user = new User({
      userId,
      name: cleanName,
      email: cleanEmail,
      mobile: cleanMobile,
      password: hashedPassword,
      role: cleanRole
    });

    await user.save();

    // ✅ Respond with user data (excluding password)
    res.status(201).json({
      user: {
        _id: user._id,
        userId: user.userId,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role
      },
      message: "Registration successful"
    });
  } catch (error) {
    console.error("❌ Register error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Login a user
// @route  POST /api/auth/login
// @access Public
export const loginUser = async (req, res) => {
  console.log("🔐 Login route hit!");

  try {
    const { email, password } = req.body;

    // ✅ Sanitize input
    const cleanEmail = email?.trim().toLowerCase();
    const cleanPassword = password?.trim();

    // ✅ Validate input
    if (!cleanEmail || !cleanPassword) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // ✅ Find user by email
    const user = await User.findOne({ email: cleanEmail });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // ✅ Compare password
    const isValid = await bcrypt.compare(cleanPassword, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // ✅ Respond with user data
    res.status(200).json({
      user: {
        _id: user._id,
        userId: user.userId,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role
      },
      message: "Login successful"
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
