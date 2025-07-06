import { User } from "../models/User.model.js";
import jwt from 'jsonwebtoken';
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from 'bcryptjs'
import {cookieName} from '../constants.js';

const isProd = process.env.NODE_ENV === 'production'

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json(new ApiResponse(400, 'User already exists with this email'));
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    await User.create({ name, email, password: hashedPassword })

    const user = await User.findOne({ email }).select('-password')

    // Generate token
    const token = generateToken(user._id);

    res.cookie(cookieName, token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "strict" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    }).status(200).json(new ApiResponse(200, user, "Registered Successfully"))
  } catch (error) {
    res.status(500).json(new ApiError(500, "Server error occured while registering the user", error))
  }
}

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json(new ApiError(400, "Email and Password is required"))
  }

  try {

    // Find user by email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json(new ApiError(401, `Invalid email ID`))
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).json(new ApiError(401, `Invalid Password`))
    }

    // Generate token
    const token = generateToken(user._id);

    user = await User.findById(user._id).select('-password')

    res.cookie(cookieName, token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "strict" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    }).status(200).json(new ApiResponse(200, user, "Login Successfully"))
  } catch (error) {
    console.log(error)
    res.status(500).json(new ApiError(500, "Server error occured while login the user", error))
  }
}

const getUser = async (req, res) => {
  try {
    const userId = req.userId
    const user = await User.findById(userId).select('-password')
    res.status(200).json(new ApiResponse(200, user, "User Authenticated"))
  } catch (error) {
    res.status(500).json(new ApiError(500, "Server error occured while checking the user authenticity", error))
  }
}

const logout = async (_, res) => {
  try {
    res.cookie(cookieName, "", {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "strict" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    }).status(200).json(new ApiResponse(200, [], "User Logout Successfully"))
  } catch (error) {
    res.status(500).json(new ApiError(500, "Server error occured while checking the user logout", error))
  }
}

export { register, login, getUser, logout };