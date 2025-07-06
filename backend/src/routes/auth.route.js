import express from 'express'
import { authenticate } from '../middleware/auth.middleware.js';
import { register, login, getUser, logout } from '../controllers/auth.controller.js';

const authRouter = express.Router()

// Register
authRouter.post('/register', register);

// Login
authRouter.post('/login', login);

// Get current user
authRouter.get('/me', authenticate, getUser);
authRouter.get('/logout', authenticate, logout);

export {authRouter};