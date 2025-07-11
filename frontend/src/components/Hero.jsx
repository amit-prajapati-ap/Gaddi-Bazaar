import React, { useState } from 'react'
import {assets, cityList} from '../assets/assets'
import { useAppContext } from '../store/AppContext'

const Hero = () => {
    const [pickupLocation, setPickupLocation] = useState("")
    const {pickupDate, returnDate, setPickupDate, setReturnDate, navigate} = useAppContext()

    const handleSearch = (e) => {
      e.preventDefault()
      navigate('/cars?pickuplocation=' + pickupLocation + '&pickupdate=' + pickupDate + '&returndate=' + returnDate)
    }
  return (
    <div className='xl:h-[800px] h-screen flex flex-col items-center justify-center gap-14 bg-light text-center '>
      <h1 className='text-4xl md:text-5xl font-semibold'>Luxury Cars on Rent</h1>

      <form onSubmit={handleSearch} className='flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200 bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]'>
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
                <input value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} type="date" id='pickup-date' min={new Date().toISOString().split("T")[0]} className='text-sm cursor-pointer text-gray-500' required />
            </div>
            <div>
                <label htmlFor="return-date">Return Date</label>
                <input value={returnDate} onChange={(e) => setReturnDate(e.target.value)} type="date" id='return-date' min={pickupDate ? pickupDate : new Date().toISOString().split("T")[0]} className='text-sm cursor-pointer text-gray-500' required />
            </div>
        </div>
            <button className='flex items-center justify-center gap-1 px-9 py-3 max-sm:mt-4 bg-primary hover:bg-primary-dull text-white rounded-full cursor-pointer'><img src={assets.search_icon} alt="search" className='brightness-300' />Search</button>
      </form>

      <img src={assets.main_car} alt="car" className='max-h-72' />
    </div>
  )
}

export default Hero
