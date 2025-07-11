import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/User.model.js';

export const authenticate = async (req, res, next) => {
  let token = req.headers.authorization
  
  if (!token) {
    return res.status(401).json(new ApiError(401, "Not Authorized. Please Login"))
  }

  try {
    token = token.split(' ')[1]
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)

    if (tokenDecode.userId) {
      const user = await User.findById(tokenDecode.userId).select('-password')

      req.user = user   
    } else {
      return res.status(401).json(new ApiError(401, "Not Authorized. Login Again"))
    }

    next()
  } catch (error) {
    console.log(error)
    res.status(500).json(new ApiError(500, "Server error occured while accessing the token", error))
  }
};