import jwt from "jsonwebtoken";
import User from "../models/sp_user_master.js";
import UserLoginHistory from "../models/sp_user_login_history.js";
import dotenv from 'dotenv';
dotenv.config();

// Helper function to extract token from authorization header
const extractToken = (authHeader) => {
    if (!authHeader) return null;
    const parts = authHeader.split(' ');
    return parts.length === 2 && parts[0] === 'Bearer' ? parts[1] : null;
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            msg: "Bad request. Please add email and password in the request body",
        });
    }

    try {
        const foundUser = await User.findOne({ email });
        if (foundUser) {
            const isMatch = await foundUser.comparePassword(password);

            if (isMatch) {
                // Generate JWT token
                const token = jwt.sign(
                    { id: foundUser._id, name: foundUser.name },
                    process.env.JWT_SECRET,
                    { expiresIn: "1d" }
                );

                // Record login history
                await UserLoginHistory.createLoginRecord(email, token, {
                    ipAddress: req.ip,
                    userAgent: req.headers['user-agent'],
                    deviceType: req.headers['user-agent'] ? 
                        (req.headers['user-agent'].includes('Mobile') ? 'mobile' : 'desktop') 
                        : 'unknown'
                });

                return res.status(200).json({ msg: "User logged in", token });
            } else {
                return res.status(400).json({ msg: "Bad password" });
            }
        } else {
            return res.status(400).json({ msg: "Bad credentials" });
        }
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ msg: "Server error during login" });
    }
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

export const register = async (req, res) => {
    const { name, email, phoneNumber, password } = req.body;
    if (!name || !email || !phoneNumber || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const newUser = new User({
            name,
            email,
            phoneNumber,
            password,
        });

        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        // Record initial login after registration
        await UserLoginHistory.createLoginRecord(email, token, {
            ipAddress: req.ip,
            userAgent: req.headers['user-agent'],
            deviceType: req.headers['user-agent'] ? 
                (req.headers['user-agent'].includes('Mobile') ? 'mobile' : 'desktop') 
                : 'unknown'
        });

        res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
        console.error("Error during registration:", error.message);
        res.status(500).json({ error: "Server error" });
    }
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