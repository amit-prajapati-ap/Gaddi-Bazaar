import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  brand: {
    type: String,
    required: [true, 'Car brand is required.'],
  },
  model: {
    type: String,
    required: [true, 'Car model is required.'],
  },
  year: {
    type: Number,
    required: [true, 'Car year is required.'],
  },
  image: {
    type: String,
    required: [true, 'Car image is required.'],
  },
  category: {
    type: String,
    required: [true, 'Car category is required.'],
  },
  seating_capacity: {
    type: Number,
    required: [true, 'Car seating capacity is required.'],
  },
  fuel_type: {
    type: String,
    required: [true, 'Car fuel type is required.'],
  },
  transmission: {
    type: String,
    required: [true, 'Car transmission is required.'],
  },
  pricePerDay: {
    type: Number,
    required: [true, 'Car pricePerDay is required.'],
  },
  location: {
    type: String,
    required: [true, 'Car location is required.'],
  },
  description: {
    type: String,
    required: [true, 'Car description is required.'],
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true
});

export const Car = mongoose.model('Car', carSchema);