import React, { useState } from 'react'
import {assets, cityList} from '../assets/assets'
import { useAppContext } from '../store/AppContext'
import {motion} from 'motion/react'

const Hero = () => {
    const [pickupLocation, setPickupLocation] = useState("")
    const {pickupDate, returnDate, setPickupDate, setReturnDate, navigate} = useAppContext()

    const handleSearch = (e) => {
      e.preventDefault()
      navigate('/cars?pickuplocation=' + pickupLocation + '&pickupdate=' + pickupDate + '&returndate=' + returnDate)
    }
  return (
    <motion.div initial={{opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: 0.8}} className='xl:h-[800px] h-screen flex flex-col items-center justify-center gap-14 bg-light text-center '>
      <motion.h1 initial={{y: 50, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: 0.8, delay: 0.2}} className='text-4xl md:text-5xl font-semibold'>Luxury Cars on Rent</motion.h1>

      <motion.form initial={{y: 50, opacity: 0, scale: 0.95}} animate={{y: 0, opacity: 1, scale: 1}} transition={{duration: 0.8, delay: 0.4}} onSubmit={handleSearch} className='flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200 bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]'>
        <div className='flex flex-col md:flex-row items-start md:items-center gap-10 min-md:ml-8'>
            <div>
                <select required value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} className='outline-none cursor-pointer' >
                    <option value="">Pickup Location</option>
                    {cityList.map(city => <option key={city} value={city}>{city}</option>)}
                </select>
                <p className='pl-1 text-sm text-left text-gray-500'>{pickupLocation ? pickupLocation : "Pleae select location"}</p>
            </div>
            <div>
                <label htmlFor="pickup-date">Pick-up Date</label>
                <input value={pickupDate} placeholder='mm-dd-yyyy' onChange={(e) => setPickupDate(e.target.value)} type="date" id='pickup-date' min={new Date().toISOString().split("T")[0]} className='text-sm cursor-pointer text-gray-500 border rounded-sm border-gray-200 px-2 max-md:ml-2' required />
            </div>
            <div>
                <label htmlFor="return-date">Return Date</label>
                <input value={returnDate} onChange={(e) => setReturnDate(e.target.value)} placeholder='mm-dd-yyyy' type="date" id='return-date' min={pickupDate ? pickupDate : new Date().toISOString().split("T")[0]} className='text-sm cursor-pointer border rounded-sm border-gray-200 px-2 text-gray-500 max-md:ml-3.5' required />
            </div>
        </div>
            <motion.button whileHover={{scale: 1.05}} whileTap={{scale: 0.95}} className='flex items-center justify-center gap-1 px-9 py-3 max-md:mt-4 bg-primary hover:bg-primary-dull text-white rounded-full cursor-pointer'><img src={assets.search_icon} alt="search" className='brightness-300' />Search</motion.button>
      </motion.form>

      <motion.img initial={{y: 100, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: 0.8, delay: 0.6}} src={assets.main_car} alt="car" className='max-h-72' />
    </motion.div>
  )
}

export default Hero
