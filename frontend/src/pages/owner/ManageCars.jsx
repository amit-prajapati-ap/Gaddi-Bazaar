import React, { useEffect, useState } from 'react'
import { assets, dummyCarData } from '../../assets/assets'
import { Loader } from '../../components'
import { Title } from '../../components/owner'

const ManageCars = () => {
  const [cars, setCars] = useState(null)
  const currency = import.meta.env.VITE_CURRENCY

  const fetchOwnerCars = async() => {
    setTimeout(() => {
      setCars(dummyCarData)
    }, 2000);
  }

  useEffect(() => {
    fetchOwnerCars()
  }, [])

  return (
    <div className='px-4 pt-10 md:px-10 w-full'>
      <Title title={"Manage Cars"} subTitle={"View all listed cars, update their details, or remove them from the booking platform."}/>
      {cars ? <div className='max-w-7xl w-full rounded-md overflow-hidden border border-borderColor mt-6'>
        <table className='w-full border-collapse text-left text-sm text-gray-600'>
          <thead className='text-gray-500'>
            <tr>
              <th className='p-3 font-medium'>Car</th>
              <th className='p-3 font-medium max-[830px]:hidden'>Category</th>
              <th className='p-3 font-medium pl-6'>Price</th>
              <th className='p-3 font-medium pl-7 max-[500px]:hidden'>Status</th>
              <th className='p-3 font-medium pl-7'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr key={index} className='border-t border-borderColor'>
                <td className='p-3 flex items-center gap-3'>
                  <img src={car.image} alt="" className='h-12 w-12 aspect-square rounded-md object-cover' />
                  <div className='max-sm:hidden'>
                    <p className='font-medium'>{car.brand} {car.model}</p>
                    <p className='font-medium text-gray-500'>{car.seating_capacity} • {car.transmission}</p>
                  </div>
                </td>
                <td className='p-3 max-[830px]:hidden'>{car.category}</td>
                <td className='p-3'>{currency}{car.pricePerDay}/day</td>
                <td className='p-3 max-[500px]:hidden'>
                  <span className={`px-3 py-1 rounded-full text-xs ${car.isAvaliable ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>{car.isAvaliable ? "Available" : "Unavailable"}</span>
                </td>
                <td className='p-3 flex items-center'>
                  <img src={car.isAvaliable ? assets.eye_close_icon : assets.eye_icon} alt="" className='cursor-pointer' />
                  <img src={assets.delete_icon} alt="" className='cursor-pointer' />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> : <Loader/>}
    </div>
  )
}

export default ManageCars
