import { User } from "../models/User.model.js";
import { Car } from "../models/Car.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Booking } from "../models/Booking.model.js";

const checkAvailability = async (car, pickupDate, returnDate) => {
    const bookings = await Booking.find({ car, pickupDate: { $lte: returnDate }, returnDate: { $gte: pickupDate } });

    return bookings.length === 0
}

const checkAvailabilityOfCar = async (req, res) => {
    try {
        const { location, pickupDate, returnDate } = req.body
        const cars = await Car.find({ location, isAvailable: true })

        const availableCarsPromise = cars.map(async (car) => {
            const isAvailable = await checkAvailability(car._id, pickupDate, returnDate)
            return { ...car._doc, isAvailable: isAvailable }
        })
        let availableCars = await Promise.all(availableCarsPromise)

        availableCars = availableCars.filter((car) => car.isAvailable === true)

        res.status(200).json(new ApiResponse(200, availableCars, "Available cars fetched successfully"))
    } catch (error) {
        console.log(error)
        res.status(500).json(new ApiError(500, "Server error occured while fetching available cars", error))
    }
}

const createBooking = async (req, res) => {
    try {
        const { _id } = req.user
        const { carId, pickupDate, returnDate } = req.body

        const isAvailable = await checkAvailability(carId, pickupDate, returnDate)

        if (!isAvailable) {
            return res.status(400).json(new ApiError(400, "Car is not available"))
        }

        const carData = await Car.findById(carId)

        const picked = new Date(pickupDate)
        const returned = new Date(returnDate)
        const noOfdays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24))
        const price = carData.pricePerDay * noOfdays

        await Booking.create({ car: carId, user: _id, owner: carData.owner, pickupDate, returnDate, price })

        res.status(200).json(new ApiResponse(200, "", "Booking created successfully"))
    } catch (error) {
        console.log(error)
        res.status(500).json(new ApiError(500, "Server error occured while creating booking", error))
    }
}

const getUserBookings = async (req, res) => {
    try {
        const { _id } = req.user

        const bookings = await Booking.find({ user: _id }).populate('car').sort({createdAt: -1})

        res.status(200).json(new ApiResponse(200, bookings, "User Bookings fetched successfully"))
    } catch (error) {
        console.log(error)
        res.status(500).json(new ApiError(500, "Server error occured while fetching user bookings", error))
    }
}

const getOwnerBookings = async (req, res) => {
    try {
        const { _id, role } = req.user

        if (role !== 'owner') {
            return res.status(400).json(new ApiError(400, "Unauthorized access"))
        }

        const bookings = await Booking.find({ owner: _id }).populate('car user').sort({createdAt: -1}).select('-user.password')

        res.status(200).json(new ApiResponse(200, bookings, "Owner Bookings fetched successfully"))
    } catch (error) {
        console.log(error)
        res.status(500).json(new ApiError(500, "Server error occured while fetching owner bookings", error))
    }
}

const changeBookingStatus = async (req, res) => {
    try {
        const { _id } = req.user

        const { bookingId, status } = req.body

        const booking = await Booking.findById(bookingId)
        if (booking.owner.toString() !== _id.toString()) {
            return res.status(400).json(new ApiError(400, "You are not authorized to update this booking"))
        }

        booking.status = status.toLowerCase()
        await booking.save()

        res.status(200).json(new ApiResponse(200, "", "Booking status updated successfully"))
    } catch (error) {
        console.log(error)
        res.status(500).json(new ApiError(500, "Server error occured while updating booking status", error))
    }
}

export { checkAvailabilityOfCar, createBooking, getUserBookings, getOwnerBookings, changeBookingStatus };