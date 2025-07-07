import { imagekit } from "../config/imagekit.config.js";
import { User } from "../models/User.model.js";
import { Car } from "../models/Car.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import fs from 'fs'

const changeRoleToOwner = async(req, res) => {
  try {
    const {_id} = req.user
    await User.findByIdAndUpdate(_id, {role: 'owner'})
    res.status(200).json(new ApiResponse(200, "", "Now you can list cars"))
  } catch (error) {
    console.log(error)
    res.status(500).json(new ApiError(500, "Server error occured while updating the role", error))
  }
}

const addCar = async(req, res) => {
  try {
    const {_id} = req.user
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
        {width: '1280'},
        {quality: 'auto'},
        {format: 'webp'},
      ]
    })

    const image = optimizedImageUrl

    await Car.create({...car, image, owner: _id})

    res.status(200).json(new ApiResponse(200, "", "Your new car added for rental"))
  } catch (error) {
    console.log(error)
    res.status(500).json(new ApiError(500, "Server error occured while adding new car", error))
  }
}

export { changeRoleToOwner, addCar };