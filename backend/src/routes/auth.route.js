import express from 'express'
import { register, login, getUserData } from '../controllers/auth.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const authRouter = express.Router()

// Register
authRouter.post('/register', register);

// Login
authRouter.post('/login', login);

// Get User
authRouter.get('/me', authenticate, getUserData)

export {authRouter};