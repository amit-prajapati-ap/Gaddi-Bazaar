import express from 'express'
import { authenticate } from '../middleware/auth.middleware.js';
import { changeBookingStatus, checkAvailabilityOfCar, createBooking, getOwnerBookings, getUserBookings } from '../controllers/booking.controller.js';

const bookingRouter = express.Router()

// Check availability
bookingRouter.post('/check-availability', checkAvailabilityOfCar);

// Create booking
bookingRouter.post('/create-booking', authenticate, createBooking);

// Get user bookings
bookingRouter.get('/user-bookings', authenticate, getUserBookings);

// Get owner bookings
bookingRouter.get('/owner-bookings', authenticate, getOwnerBookings);

// Change status
bookingRouter.put('/change-status', authenticate, changeBookingStatus);

export {bookingRouter};