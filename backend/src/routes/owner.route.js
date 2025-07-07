import express from 'express'
import { addCar, changeRoleToOwner } from '../controllers/ownerController.js';
import { authenticate } from '../middleware/auth.middleware.js';
import {upload} from '../middleware/multer.middleware.js';

const ownerRoute = express.Router()

// Change role
ownerRoute.post('/role', authenticate, changeRoleToOwner);

// Add car
ownerRoute.post('/add-car', upload.single('image'), authenticate, addCar);

export {ownerRoute};