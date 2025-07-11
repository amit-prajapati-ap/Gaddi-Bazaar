import React, { useEffect, useState } from 'react'
import { Loader } from '../../components';
import { Title } from '../../components/owner';
import { useAppContext } from '../../store/AppContext';

const ManageBookings = () => {
  const [bookings, setBookings] = useState(null)
  const {currency, axios, toast} = useAppContext()

  const fetchOwnerBookings = async() => {
    try {
      const {data} = await axios.get('/api/booking/owner-bookings')
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

  const changeBookingStatus = async(bookingId, status) => {
    try {
      const {data} = await axios.put('/api/booking/change-status', {bookingId, status})
      if (data.success) {
        toast.success(data.message)
        fetchOwnerBookings()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    fetchOwnerBookings()
  }, [])

  return(
    <div className='px-4 pt-10 md:px-10 w-full'>
      <Title title={"Manage Bookings"} subTitle={"Track all customer bookings, approve or cancel requests, and manage booking statuses."}/>
      {bookings ? <div className='max-w-7xl w-full rounded-md overflow-hidden border border-borderColor mt-6'>
        <table className='w-full border-collapse text-left text-sm text-gray-600'>
          <thead className='text-gray-500'>
            <tr>
              <th className='p-3 font-medium'>booking.car</th>
              <th className='p-3 font-medium max-[830px]:hidden'>Date Range</th>
              <th className='p-3 font-medium'>Total</th>
              <th className='p-3 font-medium max-[490px]:hidden'>Payment</th>
              <th className='p-3 font-medium pl-7'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index} className='border-t border-borderColor'>
                <td className='p-3 flex items-center gap-3'>
                  <img src={booking.car.image} alt="" className='h-12 w-12 aspect-square rounded-md object-cover' />
                  <div className='max-[400px]:hidden'>
                    <p className='font-medium'>{booking.car.brand} {booking.car.model}</p>
                  </div>
                </td>
                <td className='p-3 max-[830px]:hidden'>{booking.pickupDate.split("T")[0]} to {booking.returnDate.split("T")[0]}</td>
                <td className='p-3'>{currency}{booking.price}</td>
                <td className='p-3 max-[490px]:hidden'>
                  <span className='bg-gray-100 px-3 py-1 rounded-full text-xs'>offline</span>
                </td>
                <td className='p-3 flex items-center'>
                  {booking.status === "pending" ? (
                    <select onChange={(e) => changeBookingStatus(booking._id, e.target.value)} value={booking.status} className='px-2 py-1.5 mt-1 text-gray-500 border border-borderColor rounded-md outline-none'>
                      <option value="pending">Pending</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Confirmed">Confirmed</option>
                    </select>
                  ) : (
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === 'confirmed' ? 'bg-gray-100 text-green-500' : 'bg-red-100 text-red-500'}`}>{booking.status}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> : <Loader/>}
    </div>
  )
}

export default ManageBookings
