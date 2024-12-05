import jwt from "jsonwebtoken";
import User from "../models/sp_user_master.js"; // Ensure the correct path to your User model
import dotenv from 'dotenv';
dotenv.config();
 
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      msg: "Bad request. Please add email and password in the request body",
    });
  }

  const foundUser = await User.findOne({ email });
  if (foundUser) {
    const isMatch = await foundUser.comparePassword(password);

    if (isMatch) {
      const token = jwt.sign(
        { id: foundUser._id, name: foundUser.name },
        process.env.JWT_SECRET,
        {
          expiresIn: "30d",
        }
      );

      return res.status(200).json({ msg: "User logged in", token });
    } else {
       
      return res.status(400).json({ msg: "Bad password" });
    }
  } else {
    return res.status(400).json({ msg: "Bad credentials" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params; // Get user ID from URL parameters

    // Find the user by their ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user details
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
  console.log(req.body)
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
      expiresIn: "1h",
    });
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error("Error during registration:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { userId } = req.params; // Assumes user ID is passed in the URL
    const updateFields = req.body; // Capture all fields from the request body

    // Example authorization check (assuming JWT-based authentication)
    // const userFromToken = req.user; // Assuming the decoded user from the token is in req.user
    // if (userFromToken.id !== userId) {
    //   return res.status(403).json({ message: 'Not authorized to update this profile' });
    // }

    // Update user profile with dynamic fields
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true, runValidators: true } // Options to return the updated document and run validators
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully', updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
