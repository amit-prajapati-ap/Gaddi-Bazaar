import { User } from "../models/User.model.js";
import jwt from 'jsonwebtoken';
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from 'bcryptjs'

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      return res.status(400).json(new ApiError(400, "Name, Email or Password is required"))
    }

    if (password.length < 6) {
      return res.status(400).json(new ApiError(400, "Password must be at least 6 characters long"))
    }

    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) === false) {
      return res.status(400).json(new ApiError(400, "Please enter a valid email"))
    }

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

    res.status(200).json(new ApiResponse(200, { token, user }, "Registered Successfully"))
  } catch (error) {
    console.log(error)
    res.status(500).json(new ApiError(500, "Server error occured while registering the user", error))
  }
}

const login = async (req, res) => {

  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json(new ApiError(400, "Email and Password is required"))
    }

    // Find user by email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json(new ApiError(401, `User not found`))
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).json(new ApiError(401, `Invalid Credentials`))
    }

    // Generate token
    const token = generateToken(user._id);

    user = await User.findById(user._id).select('-password')

    res.status(200).json(new ApiResponse(200, { user, token }, "Login Successfully"))
  } catch (error) {
    console.log(error)
    res.status(500).json(new ApiError(500, "Server error occured while login the user", error))
  }
}

const getUserData = async(req, res) => {
  try {
    const user = req.user
    res.status(200).json(new ApiResponse(200, { user }, "User fetched successfully"))
  } catch (error) {
    console.log(error)
    res.status(500).json(new ApiError(500, "Server error occured while fetching the user", error))
  }
}

export { register, login, getUserData };