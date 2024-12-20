import jwt from "jsonwebtoken";
import User from "../models/sp_user_master.js";
import { OTP } from "../models/sp_user_master.js";
import UserLoginHistory from "../models/sp_user_login_history.js";

const generateToken = (userId, name) => {
  return jwt.sign(
    { id: userId, name },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

// Helper to generate OTP (currently hardcoded as 12345)
const generateOTP = () => "12345";

export const sendOTP = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
      return res.status(400).json({ error: "Phone number is required" });
    }

    // Generate OTP
    const otp = generateOTP();
    
    // Save OTP to database
    await OTP.findOneAndUpdate(
      { phoneNumber },
      { otp },
      { upsert: true, new: true }
    );

    // In production, you would send the OTP via SMS here
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

export const verifyOTP = async (req, res) => {
  try {
      const { phoneNumber, otp } = req.body;
      
      if (!phoneNumber || !otp) {
          return res.status(400).json({ 
              error: "Phone number and OTP are required" 
          });
      }

      const otpRecord = await OTP.findOne({ phoneNumber, otp });

      if (!otpRecord) {
          return res.status(400).json({ 
              error: "Invalid OTP" 
          });
      }

      // For existing users, update verification status
      const user = await User.findOne({ phoneNumber });
      if (user) {
          user.isVerified = true;
          await user.save();
      }

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

export const login = async (req, res) => {
  const { phoneNumber, password } = req.body;

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
      userAgent: req.headers['user-agent'],
      deviceType: req.headers['user-agent'].includes('Mobile') ? 'mobile' : 'desktop'
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Server error during login" });
  }
};


export const register = async (req, res) => {
  const { name, phoneNumber, password, email } = req.body;
  
  try {
      // Validate required fields
      if (!name || !phoneNumber || !password) {
          return res.status(400).json({ 
              error: "Name, phone number, and password are required" 
          });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ phoneNumber });
      if (existingUser) {
          return res.status(400).json({ 
              error: "Phone number already registered" 
          });
      }

      // Verify if phone number is verified (check OTP validation)
      const otpRecord = await OTP.findOne({ phoneNumber });
      if (!otpRecord) {
          return res.status(400).json({ 
              error: "Phone number not verified. Please verify OTP first" 
          });
      }

      // Create new user
      const user = new User({
          name,
          phoneNumber,
          password,
          email,
          isVerified: true // Set to true since OTP is verified
      });

      await user.save();

      // Generate token
      const token = generateToken(user._id, user.name);

      // Delete OTP record after successful registration
      await OTP.deleteOne({ phoneNumber });

      res.status(201).json({ 
          success: true,
          token,
          message: "Registration successful"
      });

  } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ 
          error: "Server error during registration" 
      });
  }
};
export const forgotPassword = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate and send OTP
    await sendOTP({ body: { phoneNumber } }, res);

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { phoneNumber, otp, newPassword } = req.body;
    
    // Verify OTP
    const otpRecord = await OTP.findOne({ phoneNumber, otp });
    if (!otpRecord) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // Update password
    const user = await User.findOne({ phoneNumber });
    user.password = newPassword;
    await user.save();

    // Delete OTP record
    await OTP.deleteOne({ phoneNumber, otp });

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to reset password" });
  }
};

// Keep existing logout and other functions...

// Helper function to extract token from authorization header
const extractToken = (authHeader) => {
    if (!authHeader) return null;
    const parts = authHeader.split(' ');
    return parts.length === 2 && parts[0] === 'Bearer' ? parts[1] : null;
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
            if (err && err.name === 'TokenExpiredError') {
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

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateFields,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Profile updated successfully', updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};