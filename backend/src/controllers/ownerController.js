import { imagekit } from "../config/imagekit.config.js";
import { User } from "../models/User.model.js";
import { Car } from "../models/Car.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import fs from 'fs'
import { Booking } from "../models/Booking.model.js";

const changeRoleToOwner = async (req, res) => {
  try {
    const { _id } = req.user
    await User.findByIdAndUpdate(_id, { role: 'owner' })
    res.status(200).json(new ApiResponse(200, "", "Now you can list cars"))
  } catch (error) {
    console.log(error)
    res.status(500).json(new ApiError(500, "Server error occured while updating the role", error))
  }
}

const addCar = async (req, res) => {
  try {
    const { _id } = req.user
    let car = JSON.parse(req.body.carData)
    const imageFile = req.file
    const fileBuffer = fs.readFileSync(imageFile.path)
    const resposne = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: '/cars'
    })

    let optimizedImageUrl = imagekit.url({
      path: resposne.filePath,
      transformation: [
        { width: '1280' },
        { quality: 'auto' },
        { format: 'webp' },
      ]
    })

    const image = optimizedImageUrl

    await Car.create({ ...car, image, owner: _id })

    res.status(200).json(new ApiResponse(200, "", "Your new car added for rental"))
  } catch (error) {
    console.log(error)
    res.status(500).json(new ApiError(500, "Server error occured while adding new car", error))
  }
}

const getOwnerCars = async (req, res) => {
  try {
    const { _id } = req.user
    const cars = await Car.find({ owner: _id })
    res.status(200).json(new ApiResponse(200, cars, "All Cars fetched successfully"))
  } catch (error) {
    console.log(error)
    res.status(500).json(new ApiError(500, "Server error occured while fetching cars", error))
  }
}


const toggleCarAvailability = async (req, res) => {
  try {
    const { _id } = req.user
    const { carId } = req.body
    const car = await Car.findById(carId)
    if (car.owner.toString() !== _id.toString()) {
      return res.status(400).json(new ApiError(400, "You are not authorized to update this car"))
    }

    car.isAvailable = !car.isAvailable
    await car.save()

    res.status(200).json(new ApiResponse(200, car, "Availability updated successfully"))
  } catch (error) {
    console.log(error)
    res.status(500).json(new ApiError(500, "Server error occured while updating availability", error))
  }
}

const deleteCar = async (req, res) => {
  try {
    const { _id } = req.user
    const { carId } = req.body
    const car = await Car.findById(carId)
    if (car.owner.toString() !== _id.toString()) {
      return res.status(400).json(new ApiError(400, "You are not authorized to update this car"))
    }

    car.owner = null
    car.isAvailable = false
    await car.save()

    res.status(200).json(new ApiResponse(200, car, "Car deleted successfully"))
  } catch (error) {
    console.log(error)
    res.status(500).json(new ApiError(500, "Server error occured while deleting car", error))
  }
}

const getDashboardData = async (req, res) => {
  try {
    const { _id, role } = req.user

    if (role !== 'owner') {
      return res.status(400).json(new ApiError(400, "Unauthorized access"))
    }

    const cars = await Car.find({ owner: _id })
    const bookings = await Booking.find({ owner: _id}).populate('car').sort({createdAt: -1})

    const pendingBookings = await Booking.find({owner: _id, status: 'pending'})
    const completedBookings = await Booking.find({owner: _id, status: 'confirmed'})

    const monthlyRevenue = bookings.slice().filter(booking => booking.status === 'confirmed').reduce((acc, booking) => acc + booking.price, 0)

    const dashboardData = {
      totalCars: cars.length,
      totalBookings: bookings.length,
      pendingBookings: pendingBookings.length,
      completedBookings: completedBookings.length,
      recentBookings: bookings.slice(0, 3),
      monthlyRevenue
    }

    res.status(200).json(new ApiResponse(200, dashboardData, "Dashboard data fetched successfully"))
  } catch (error) {
    console.log(error)
    res.status(500).json(new ApiError(500, "Server error occured while fetching dashboard data", error))
  }
}

const updateUserImage = async (req, res) => {
  try {
    const { _id } = req.user
    const imageFile = req.file
    const fileBuffer = fs.readFileSync(imageFile.path)
    const resposne = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: '/users'
    })

    const optimizedImageUrl = imagekit.url({
      path: resposne.filePath,
      transformation: [
        { width: '400' },
        { quality: 'auto' },
        { format: 'webp' },
      ]
    })

    const image = optimizedImageUrl

    await User.findByIdAndUpdate(_id, { image })
    res.status(200).json(new ApiResponse(200, "", "Image updated successfully"))
  } catch (error) {
    console.log(error)
    res.status(500).json(new ApiError(500, "Server error occured while updating user image", error))
  }
}

export { changeRoleToOwner, addCar, getOwnerCars, toggleCarAvailability, deleteCar, getDashboardData,updateUserImage };