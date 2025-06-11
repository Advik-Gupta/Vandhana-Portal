import User from "../models/userModel.js";

import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcryptjs";

import asyncHandler from "../middleware/asyncHandler.js";
import transporter from "./mailer.js";

import jwt from "jsonwebtoken";
import generator from "random-password";

// @desc    Register a new user (first time login)
// @route   POST /api/v1/users/register
// @access  Public

export const registerUser = asyncHandler(async (req, res) => {
  const { email, name, phoneNumber } = req.body;

  const user = await User.findOne({
    email,
  });

  if (user) {
    res.status(400);
    throw new Error("User already exists please login");
  }

  const userRandomPassword = generator(10);

  transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your password for Vandhana Test Site Portal",
    text: `Thank you for registering. Please find your password: ${userRandomPassword}`,
  });

  const salt = await bcrypt.genSalt(10);
  const newUser = await User.create({
    email,
    name,
    phoneNumber,
    password: bcrypt.hashSync(userRandomPassword, salt), // Store the random password
    role: "engineer", // Default role
  });

  if (!newUser) {
    res.status(400);
    throw new Error("Invalid user data");
  } else {
    res.status(201).json({
      _id: newUser._id,
      email: newUser.email,
      name: newUser.name,
      phoneNumber: newUser.phoneNumber,
      role: newUser.role,
    });
  }
});

// @desc    Auth user & get token
// @route   POST /api/v1/users/login
// @access  Public

export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  });

  if (user && (await user.matchPassword(password))) {
    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    // Set token in cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "Strict", // Prevent CSRF attacks
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Logout user & clear cookie
// @route   POST /api/v1/users/logout
// @access  Private

export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0), // Clear the cookie
  });
  res.status(200).json({ message: "User logged out successfully" });
});

// @desc    Update user
// @route   PUT /api/v1/users/profile
// @access  Private

export const updateUser = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const jwtToken = req.cookies.jwt;
  if (!jwtToken) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
  const userId = decoded.id;

  const user = await User.findById(userId);
  let updatedUser = null;

  if (user && (await user.matchPassword(oldPassword))) {
    const salt = await bcrypt.genSalt(10);
    updatedUser = await User.findByIdAndUpdate(
      decoded.id,
      {
        password: bcrypt.hashSync(newPassword, salt),
      },
      { new: true, runValidators: true }
    );
  } else {
    res.status(401);
    throw new Error("Invalid old password");
  }

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    phoneNumber: updatedUser.phoneNumber,
    role: updatedUser.role,
  });
});

// @desc    Get user profile
// @route   GET /api/v1/users/profile
// @access  Private

export const getUserProfile = asyncHandler(async (req, res) => {
  res.send("User profile");
});

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Admin

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");
  if (users.length === 0) {
    res.status(404);
    throw new Error("No users found");
  }
  res.json(users);
});

// @desc    Get user by ID
// @route   GET /api/v1/users/:id
// @access  Admin

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      notifications: user.notifications,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Delete user
// @route   DELETE /api/v1/users/:id
// @access  Admin

export const deleteUser = asyncHandler(async (req, res) => {
  res.send("User deleted");
});
