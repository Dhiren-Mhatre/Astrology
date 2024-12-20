import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import callRoute from "./routes/call.js";
import categoryRoute from "./routes/category.js";
import astrologerRoute from "./routes/astrologer.js";
import bannerRoute from "./routes/banners.js";
import userRoute from "./routes/user.js";
import https from "https";
import { seedAstrologers, seedbanners, seedCategories, seedCollections } from "./seed.js";
import { handleTokenExpiration } from "./controller/user.js";
import click2callRoute from "./routes/click2call.js";
dotenv.config();

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Global token expiration middleware
app.use(handleTokenExpiration);

// Routes
app.use("/api/categories", categoryRoute);
app.use("/api/astrologer", astrologerRoute);
app.use("/api/banner", bannerRoute);
app.use("/api/user", userRoute);
app.use("/api/calls", callRoute);
app.use("/api/click2call", click2callRoute);
// Enhanced error handling
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    
    // Log error for debugging
    console.error(`Error: ${status} - ${message}`);
    if (err.stack) console.error(err.stack);

    return res.status(status).json({ 
        success: false, 
        status, 
        message,
        // Include more details in development environment
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// Default route
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to StarPandit API" });
});

// MongoDB connection with enhanced error handling
const connectDB = async () => {
    try {
        mongoose.set("strictQuery", true);
        await mongoose.connect(process.env.MONGO_URL, { 
            dbName: "astrology",
            // Additional connection options for better stability
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:");
        console.error(error);
        // Exit process with failure
        process.exit(1);
    }
};

// Server startup function
const startServer = async () => {
    try {
        // Connect to database
        await connectDB();
        
        // Seed data
        await seedCollections();
        await seedAstrologers();
        await seedbanners();
        await seedCategories();

        // Start server
        const PORT = process.env.PORT || 8080;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
        });

        // Server health check
        if (process.env.OPO) {
            const serverURL = process.env.OPO;
            setInterval(() => {
                https.get(serverURL, (res) => {
                    console.log(`Health check: ${res.statusCode}`);
                }).on("error", (err) => {
                    console.error("Health check failed:", err.message);
                });
            }, 600000); // 10 minutes
        }

    } catch (error) {
        console.error("Server startup failed:");
        console.error(error);
        process.exit(1);
    }
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

// Start the server
startServer();