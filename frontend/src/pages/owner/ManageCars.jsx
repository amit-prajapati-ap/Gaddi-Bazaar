import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import { Loader } from '../../components'
import { Title } from '../../components/owner'
import { useAppContext } from '../../store/AppContext'

const ManageCars = () => {
  const [cars, setCars] = useState(null)
  const {axios, toast, currency, isOwner} = useAppContext()
  const [isLoading, setIsLoading] = useState(false)

  const fetchOwnerCars = async() => {
    try {
      const {data} = await axios.get('/api/owner/owner-cars')
      if (data.success) {
        setCars(data.data)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  const toggleAvailability = async(carId) => {
    
    try {
      if (isLoading) {
        return null
      }
      setIsLoading(true)
      const {data} = await axios.put('/api/owner/toggle-car', {carId})
      if (data.success) {
        toast.success(data.message)
        fetchOwnerCars()
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

  const deleteCar = async(carId) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete this car?")
      if (!confirm) return null;
      if (isLoading) {
        return null
      }
      setIsLoading(true)
      const {data} = await axios.post('/api/owner/delete-car', {carId})
      if (data.success) {
        toast.success(data.message)
        fetchOwnerCars()
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
    isOwner && fetchOwnerCars()
  }, [isOwner])

  return (
    <div className='px-4 pt-10 md:px-10 w-full'>
      <Title title={"Manage Cars"} subTitle={"View all listed cars, update their details, or remove them from the booking platform."}/>
      {cars ? <div className='max-w-7xl w-full rounded-md overflow-hidden border border-borderColor mt-6'>
        <table className='w-full border-collapse text-left text-sm text-gray-600'>
          <thead className='text-gray-500'>
            <tr>
              <th className='p-3 font-medium'>Car</th>
              <th className='p-3 font-medium max-[830px]:hidden'>Category</th>
              <th className='p-3 font-medium max-[950px]:hidden'>Location</th>
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
                <td className='p-3 max-[950px]:hidden'>{car.location}</td>
                <td className='p-3'>{currency}{car.pricePerDay}/day</td>
                <td className='p-3 max-[500px]:hidden'>
                  <span className={`px-3 py-1 rounded-full text-xs ${car.isAvailable ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>{car.isAvailable ? "Available" : "Unavailable"}</span>
                </td>
                <td className='p-3 flex items-center'>
                  <img onClick={() => !isLoading && toggleAvailability(car._id)} src={car.isAvaliable ? assets.eye_close_icon : assets.eye_icon} alt="" className={`${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`} />
                  <img onClick={() => !isLoading && deleteCar(car._id)} src={assets.delete_icon} alt="" className={`${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`} />
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
