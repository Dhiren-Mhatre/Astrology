import express from "express";
import {
    login,
    register,
    getAllUsers,
    getUserById,
    updateProfile,
    logout,
    handleTokenExpiration,
    sendOTP,
    verifyOTP,
    forgotPassword,
    resetPassword
} from "../controller/user.js";

const router = express.Router();

// Apply token expiration middleware to all routes
router.use(handleTokenExpiration);

// Authentication routes
router.post("/login", login);
router.post("/logout", logout);
router.post("/register", register);
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// User management routes
router.get("/users", getAllUsers);
router.get("/user/:userId", getUserById);
router.put('/updateProfile/:userId', updateProfile);

export default router;