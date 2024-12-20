import express from "express";
import { 
    login, 
    register, 
    getAllUsers, 
    getUserById, 
    updateProfile,
    logout,
    handleTokenExpiration 
} from "../controller/user.js";

const router = express.Router();

// Apply token expiration middleware to all routes
router.use(handleTokenExpiration);

// Authentication routes
router.post("/login", login);
router.post("/logout", logout);
router.post("/register", register);

// User management routes
router.get("/users", getAllUsers);
router.get("/user/:userId", getUserById);
router.put('/updateProfile/:userId', updateProfile);

export default router;