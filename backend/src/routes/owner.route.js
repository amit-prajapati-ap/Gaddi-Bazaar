import express from 'express'
import { addCar, changeRoleToOwner, deleteCar, getDashboardData, getOwnerCars, toggleCarAvailability, updateUserImage } from '../controllers/ownerController.js';
import { authenticate } from '../middleware/auth.middleware.js';
import {upload} from '../middleware/multer.middleware.js';

const ownerRoute = express.Router()

// Change role
ownerRoute.put('/role', authenticate, changeRoleToOwner);

// Add car
ownerRoute.post('/add-car', upload.single('image'), authenticate, addCar);

// delete car
ownerRoute.delete('/delete-car', authenticate, deleteCar);

// Dashboard data
ownerRoute.get('/dashboard', authenticate, getDashboardData);

// Toggle car availability
ownerRoute.put('/toggle-car', authenticate, toggleCarAvailability);

// Get all cars
ownerRoute.get('/cars', authenticate, getOwnerCars);

// Update user profile image
ownerRoute.put('/update-image', authenticate, upload.single('image'), updateUserImage);

export {ownerRoute};