import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {assets} from '../assets/assets'
import {Loader} from '../components'
import { useAppContext } from '../store/AppContext'
import {motion} from 'motion/react'

const CarDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const {cars, axios, toast, currency, setPickupDate, setReturnDate, returnDate, pickupDate} = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(isLoading) return null
    try {
      setIsLoading(true)
      const {data} = await axios.post('/api/booking/create-booking', {carId: id, pickupDate, returnDate})
      if (data.success) {
        toast.success(data.message)
        navigate('/my-bookings')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    cars && setCar(cars.find(car => car._id === id))
  }, [id, cars])
  
  return car ? (
    <div className='px-6 mx-auto md:px-16 lg:px-24 xl:px-32 my-16 max-w-window'>
      <button onClick={() => navigate(-1)} className='flex items-center gap-2 mb6 text-gray-500 cursor-pointer mb-4'>
        <img src={assets.arrow_icon} alt="arrow" className='rotate-180 opacity-65' />
        Back to all cars
      </button>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>
        {/* Left: Car Image & Details  */}
        <motion.div initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6}} className='lg:col-span-2'>
          <motion.img initial={{opacity: 0, scale: 0.98}} animate={{opacity: 1, scale: 1}} transition={{duration: 0.5}} src={car.image} alt="" className='w-full h-auto md:max-h-100 object-cover rounded-xl shadow-md' />
          <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.5, delay: 0.2}} className='space-y-6'>
            <div>
              <h1 className='text-3xl font-bold'>{car.brand} {car.model}</h1>
              <p className='text-gray-500 text-lg' >{car.category} * {car.year}</p>
            </div>

            <hr className='border-borderColor my-6'/>

            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
              {[
                {icon: assets.users_icon, text: `${car.seating_capacity} Seats`},
                {icon: assets.fuel_icon, text: `${car.fuel_type}`},
                {icon: assets.car_icon, text: `${car.transmission}`},
                {icon: assets.location_icon, text: `${car.location}`},
              ].map(({icon, text}) => (
                <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{duration: 0.4}} className='flex flex-col items-center bg-light p-4 rounded-lg' key={text}>
                  <img src={icon} alt="" className='h-5 mb-2' />
                  {text}
                </motion.div>
              ))}
            </div>

            {/* Description  */}
            <div>
              <h1 className='text-xl font-medium mb-3'>Description</h1>
              <p className='text-gray-500'>{car.description}</p>
            </div>

            {/* Features  */}
            <div>
              <h1 className='text-xl font-medium mb-3'>Features</h1>
              <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                {
                  ["360 Camera", "Bluetooth", "Air Conditioner", "GPS", "USB", "Wifi"].map((feature, index) => (
                    <li className='flex items-center gap-2 text-gray-500' key={index}>
                      <img src={assets.check_icon} alt="" className='h-4 mr-2' />
                      {feature}
                    </li>
                  ))
                }
              </ul>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Colomn  */}
        <motion.form initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6, delay: 0.3}} onSubmit={handleSubmit} className='shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500'>
          <p className='flex items-center justify-between text-2xl text-gray-800 font-semibold'>{currency + car.pricePerDay}<span className='text-base text-gray-400 font-normal'>per day</span></p>

          <hr className='border border-borderColor my-6'/>

          <div className='flex flex-col gap-2'>
            <label htmlFor="pickup-date">Pickup Date</label>
            <input onChange={(e) => setPickupDate(e.target.value)} value={pickupDate} type="date" className='border border-borderColor px-3 py-2 rounded-lg cursor-pointer' required id="pickup-date" min={new Date().toISOString().split("T")[0]} />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="return-date">Return Date</label>
            <input onChange={(e) => setReturnDate(e.target.value)} value={returnDate} type="date" className='border border-borderColor px-3 py-2 rounded-lg cursor-pointer' required id="return-date" min={pickupDate ? pickupDate : new Date().toISOString().split("T")[0]} />
          </div>

          <button className={`w-full bg-primary hover:bg-primary-dull transition-all py-3 font-medium text-white rounded-xl ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`} type='submit' disabled={isLoading}>{ isLoading ? "Loading..." : "Book Now"}</button>

          <p className='text-center text-sm'>No credit card required to reserve</p>
        </motion.form>
      </div>
    </div>
  ) : <Loader />
}

export default CarDetails
