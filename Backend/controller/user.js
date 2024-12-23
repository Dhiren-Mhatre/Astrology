import jwt from "jsonwebtoken";
import User from "../models/sp_user_master.js";
import { OTP } from "../models/sp_user_master.js";
import UserLoginHistory from "../models/sp_user_login_history.js";

const generateToken = (userId, name) => {
  return jwt.sign({ id: userId, name }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
// Add these helper functions at the top with other imports

const generateTransactionId = (phoneNumber) => {
  const now = new Date();
  const formatted = now
    .toISOString()
    .replace(/[-:]/g, "") // Remove dashes and colons
    .replace(/\..+/, ""); // Remove milliseconds and timezone
  return `${formatted}${phoneNumber}`;
};

// Update generateOTP function to be more secure
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
// Update sendOTP function
export const sendOTP = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
      return res.status(400).json({ error: "Phone number is required" });
    }

    // Generate new OTP and transactionId
    const otp = generateOTP();
    const transactionId = generateTransactionId(phoneNumber);

    // Create new OTP record - first invalidate any existing pending OTPs
    await OTP.updateMany(
      {
        phoneNumber,
        status: "pending",
      },
      {
        status: "expired",
      }
    );

    // Create new OTP record
    const otpRecord = new OTP({
      phoneNumber,
      otp,
      transactionId,
      status: "pending",
      createdAt: new Date(),
    });

    await otpRecord.save();

    console.log("New OTP record created:", {
      phoneNumber,
      otp,
      transactionId,
    }); // Debug log

    res.status(200).json({
      message: "OTP sent successfully",
      transactionId,
      otp, // Only for testing
    });
  } catch (error) {
    console.error("Send OTP error:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
}; // Add new endpoint to check user existence
export const checkUser = async (req, res) => {
  try {
      const { phoneNumber } = req.body;
      const user = await User.findOne({ phoneNumber });
      
      return res.status(200).json({
          exists: !!user
      });
  } catch (error) {
      console.error("Check user error:", error);
      res.status(500).json({ error: "Server error" });
  }
};
export const login = async (req, res) => {
  const { phoneNumber, password } = req.body;
  const user = await User.findOne({ phoneNumber });
  if (!user) {
    return res.status(404).json({ 
      error: "Invalid user/Credentials." 
    });
  }

  if (!phoneNumber || !password) {
    return res.status(400).json({
      error: "Please provide phone number and password",
    });
  }

  try {
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(400).json({ error: "Phone number not verified" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user._id, user.name);

    // Record login history
    await UserLoginHistory.createLoginRecord(phoneNumber, token, {
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
      deviceType: req.headers["user-agent"].includes("Mobile")
        ? "mobile"
        : "desktop",
    });

    // Return both token and userId in the response
    res.status(200).json({
      token,
      userId: user._id.toString(), // Convert ObjectId to string
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error during login" });
  }
};
export const register = async (req, res) => {
  try {
    const { name, phoneNumber, password, email, otp, transactionId } = req.body;

    // Validate required fields
    if (!name || !phoneNumber || !password) {
      return res.status(400).json({
        error: "Name, phone number, and password are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(400).json({
        error: "Phone number already registered",
      });
    }

    // Verify OTP status
    const otpRecord = await OTP.findOne({
      phoneNumber,
      otp,
      transactionId,
      status: "verified", // Changed from 'pending' to 'verified'
    });

    if (!otpRecord) {
      return res.status(400).json({
        error: "Please verify your OTP first",
      });
    }

    // Create new user
    const user = new User({
      name,
      phoneNumber,
      password,
      email: email || null, // Change undefined to null
      isVerified: true,
    });

    await user.save();

    // Generate token
    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      success: true,
      token,
      userId: user._id.toString(),
      message: "Registration successful",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        error: "Email already exists"
      });
    }
    console.error("Registration error:", error);
    res.status(500).json({
      error: error.message || "Server error during registration",
    });
  }
};
export const forgotPassword = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    
    // First check if user exists
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({ error:"Invalid user" });
    }

    // Generate new OTP and transactionId
    const otp = generateOTP();
    const transactionId = generateTransactionId(phoneNumber);

    // Invalidate any existing pending OTPs
    await OTP.updateMany(
      {
        phoneNumber,
        status: "pending",
      },
      {
        status: "expired",
      }
    );

    // Create new OTP record
    const otpRecord = new OTP({
      phoneNumber,
      otp,
      transactionId,
      status: "pending",
      createdAt: new Date(),
    });

    await otpRecord.save();

    res.status(200).json({
      message: "OTP sent successfully",
      transactionId,
      otp, // Only for testing
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ error: "Server error while processing request" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { phoneNumber, otp, transactionId, newPassword } = req.body;

    // Validate input
    if (!phoneNumber || !otp || !newPassword || !transactionId) {
      return res.status(400).json({ 
        error: "Please provide all required fields: phone number, OTP, new password, and transaction ID" 
      });
    }

    // First check if user exists
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({ error: "No account found with this phone number" });
    }

    // Verify OTP
    const otpRecord = await OTP.findOne({
      phoneNumber,
      otp,
      transactionId,
      status: 'pending'
    });

    if (!otpRecord) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    // Check OTP expiration
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    if (otpRecord.createdAt < fiveMinutesAgo) {
      otpRecord.status = 'expired';
      await otpRecord.save();
      return res.status(400).json({ error: "OTP has expired" });
    }

    try {
      // Update password directly without requiring old password
      user.password = newPassword; // This will trigger the pre-save hook for hashing
      await user.save();

      // Mark OTP as verified only after password is successfully updated
      otpRecord.status = 'verified';
      await otpRecord.save();

      // Invalidate any other pending OTPs for this phone number
      await OTP.updateMany(
        {
          phoneNumber,
          status: "pending",
          _id: { $ne: otpRecord._id }
        },
        {
          status: "expired"
        }
      );

      // Log out all existing sessions for this user (optional but recommended)
      await UserLoginHistory.updateMany(
        { 
          phoneNumber: user.phoneNumber,
          logoutTime: null 
        },
        { 
          logoutTime: new Date(),
          logoutReason: 'password_reset'
        }
      );

      res.status(200).json({ 
        success: true,
        message: "Password reset successfully" 
      });
    } catch (error) {
      console.error("Password update error:", error);
      return res.status(500).json({ error: "Failed to update password" });
    }
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ error: "Failed to process password reset" });
  }
};

// Let's also update the verifyOTP function to support password reset
export const verifyOTP = async (req, res) => {
  try {
    const { phoneNumber, otp, transactionId } = req.body;
    
    if (!phoneNumber || !otp || !transactionId) {
      return res.status(400).json({ 
        error: "Please provide phone number, OTP, and transaction ID" 
      });
    }

    const otpRecord = await OTP.findOne({
      phoneNumber,
      otp,
      transactionId,
      status: 'pending'
    });

    if (!otpRecord) {
      return res.status(400).json({ 
        error: "Invalid OTP" 
      });
    }

    // Check expiration
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    if (otpRecord.createdAt < fiveMinutesAgo) {
      otpRecord.status = 'expired';
      await otpRecord.save();
      return res.status(400).json({ 
        error: "OTP has expired" 
      });
    }

    // Mark OTP as verified
    otpRecord.status = 'verified';
    await otpRecord.save();

    res.status(200).json({ 
      success: true,
      message: "OTP verified successfully" 
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ 
      error: "Failed to verify OTP" 
    });
  }
};


// Keep existing logout and other functions...

// Helper function to extract token from authorization header
const extractToken = (authHeader) => {
  if (!authHeader) return null;
  const parts = authHeader.split(" ");
  return parts.length === 2 && parts[0] === "Bearer" ? parts[1] : null;
};

// New logout endpoint to properly track logout events
// Update the logout endpoint with better error handling and logging
export const logout = async (req, res) => {
  try {
    const token = extractToken(req.headers.authorization);
    if (!token) {
      return res.status(200).json({ msg: "Logged out successfully" });
    }

    try {
      // Try to update login history
      await UserLoginHistory.updateLogoutTime(token);
    } catch (error) {
      console.error("Error updating login history:", error);
      // Continue with logout even if history update fails
    }

    return res.status(200).json({ msg: "Successfully logged out" });
  } catch (error) {
    console.error("Logout error:", error);
    // Still return success to client
    return res.status(200).json({ msg: "Logged out successfully" });
  }
};
// Middleware to handle forced logouts (token expiration)
export const handleTokenExpiration = async (req, res, next) => {
  try {
    const token = extractToken(req.headers.authorization);
    if (!token) return next();

    // Verify token and check expiration
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err && err.name === "TokenExpiredError") {
        // Record forced logout due to token expiration
        await UserLoginHistory.updateLogoutTime(token, true);
      }
    });
    next();
  } catch (error) {
    console.error("Token expiration handling error:", error);
    next();
  }
};

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  const users = await User.find({});
  return res.status(200).json({ users });
};

export const updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const updateFields = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Profile updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
