import React, { useEffect, useState } from 'react'
import {assets, dummyMyBookingsData} from '../assets/assets'
import { Loader, Title } from '../components'
import { useAppContext } from '../store/AppContext'
import { motion } from 'motion/react'

const MyBookings = () => {
  const [bookings, setBookings] = useState(null)
  const {currency, axios, toast, user, navigate, setShowLogin} = useAppContext()

  const fetcMyBookings = async () => {
    try {
      const {data} = await axios.get('/api/booking/user-bookings')
      if (data.success) {
        setBookings(data.data)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }
  
  useEffect(() => {
    if (user) {
      fetcMyBookings()
    } else {
      toast.error("Please login to view your bookings")
      navigate('/')
      setShowLogin(true)
    }
  }, [user])

  return (
    <motion.div initial={{y: 30, opacity: 0}} whileInView={{y: 0, opacity: 1}} transition={{duration: 0.6}} className='px-6 min-h-[70vh] md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-window mx-auto'>
      <Title title={"My Bookings"} subTitle={"Explore our selection of premium vehicles available for your next adventure."} align={'left'}/>

      {bookings ? (
        <div>
        {bookings.map((booking, index) => (
          <motion.div initial={{opacity: 0, y: 20}} whileInView={{y: 0, opacity: 1}} transition={{duration: 0.4, delay: index * 0.3}} key={index} className='grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-borderColor rounded-lg mt-5 first:mt-12 last:mb-32'>

            {/* Car Image + Info  */}
            <div className='md:col-span-1'>
              <div className='rounded-md overflow-hidden mb-3'>
                <img src={booking.car.image} alt="" className='w-full h-auto aspect-video object-cover' />
              </div>

              <p className='text-lg font-medium mt-2'>{booking.car.brand} {booking.car.model}</p>
              <p className='text-gray-500'>{booking.car.year} • {booking.car.category} • {booking.car.location}</p>
            </div>

            {/* Booking Details */}
            <div className='md:col-span-2'>
              <div className='flex items-center gap-2'>
                <p className='px-3 py-1.5 bg-light rounded'>Booking #{index + 1}</p>
                <p className={`px-3 py-1 text-xs rounded-full ${booking.status === 'confirmed' ? 'bg-green-400/15 text-gray-600' : 'bg-red-400/15 text-red-600'}`}>{booking.status}</p>
              </div>

              <div className='flex items-start gap-2 mt-3'>
                <img src={assets.calendar_icon_colored} alt="" className='w-4 h-4 mt-0.5' />
                <div>
                  <p className='text-gray-500'>Rental Period</p>
                  <p>{booking.pickupDate.split('T')[0]} To {booking.returnDate.split('T')[0]}</p>
                </div>
              </div>

              <div className='flex items-start gap-2 mt-3'>
                <img src={assets.location_icon_colored} alt="" className='w-4 h-4 mt-0.5' />
                <div>
                  <p className='text-gray-500'>Pickup Location</p>
                  <p>{booking.car.location}</p>
                </div>
              </div>
            </div>

            {/* Price  */}
            <div className='md:col-span-1 flex flex-col justify-between gap-6'>
              <div className='text-sm text-gray-500 text-right'>
                <p>Total Price</p>
                <h1 className='text-2xl font-semibold text-primary'>{currency}{booking.price}</h1>
                <p>Booked on {booking.createdAt.split('T')[0]}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      ) : <Loader/>}
    </motion.div>
  )
}

export default MyBookings
