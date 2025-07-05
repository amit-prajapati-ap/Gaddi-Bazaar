import React, { useEffect, useState } from 'react'
import { assets, dummyDashboardData } from '../../assets/assets'
import { Title } from '../../components/owner'
import { Loader } from '../../components'

const Dashboard = () => {
  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0
  })
  const [dataFetched, setDataFetched] = useState(false)
  const currency = import.meta.env.VITE_CURRENCY

  const dashboardCard = [
    {
      title: "Total Cars",
      value: data.totalCars,
      icon: assets.carIconColored
    },
    {
      title: "Total Bookings",
      value: data.totalBookings,
      icon: assets.listIconColored
    },
    {
      title: "Pending",
      value: data.pendingBookings,
      icon: assets.cautionIconColored
    },
    {
      title: "Confirmed",
      value: data.completedBookings,
      icon: assets.listIconColored
    },
  ]

  const fetchDashboardData = () => {
    setTimeout(() => {
      setData(dummyDashboardData)
      setDataFetched(true)
    }, 2000);
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  return (
    <div className='px-4 pt-10 md:px-10 flex-1'>
      <Title title={"Admin Dahsboard"} subTitle={"Monitor overall plattform performance including total cars, bookings, revenue and recent activities"}/>

      {dataFetched ? <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8 max-w-[1600px]'>
        {dashboardCard.map((card, index) => (
          <div key={index} className='flex gap-2 items-center justify-between p-4 rounded-md border border-borderColor'>
            <div>
              <h1 className='text-xs text-gray-500'>{card.title}</h1>
              <p className='text-lg font-semibold'>{card.value}</p>
            </div>

            <div className='flex items-center justify-center
             w-10 h-10 rounded-full bg-primary/10'>
              <img src={card.icon} className='h-4 w-4' alt="" />
            </div>
          </div>
        ))}
      </div> : <Loader/>}

      { dataFetched && <div className='flex max-xl:flex-wrap items-start gap-6 mb-8 max-w-[1600px]'>
        {/* Recent Bookings  */}
        <div className='p-4 md:p-6 border border-borderColor rounded-md max-w-xl 2xl:max-w-5xl w-full'>
          <h1 className='text-lg font-medium'>Recent Bookings</h1>
          <p className='text-gray-500'>Latest customer bookings</p>
          {data.recentBookings.map((booking, index) => (
            <div key={index} className='mt-4 flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <div className='hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10'>
                  <img src={assets.listIconColored} className='h-5 w-5' alt="" />
                </div>

                <div>
                  <p>{booking.car.brand} {booking.car.model}</p>
                  <p className='text-sm text-gray-500'>{booking.createdAt.split('T')[0]}</p>
                </div>

              </div>

              <div className='flex items-center gap-2 font-medium'>
                <p className='text-sm text-gray-500'>{currency}{booking.price}</p>
                <p className={`px-3 py-0.5 border border-borderColor rounded-full text-sm w-24 text-center ${booking.status === "pending" ? "text-yellow-500" : "text-green-500"}`}>{booking.status}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Monthly Revenue  */}
        <div className='p-4 md:p-6 mb-6 border border-borderColor rounded-md w-full md:max-w-xs'>
          <h1 className='text-lg font-medium'>Monthly Revenue</h1>
          <p className='text-gray-500'>revenue for current month</p>
          <p className='text-3xl mt-6 font-semibold text-primary'>{currency}{data.monthlyRevenue}</p>
        </div>
      </div>}
    </div>
  )
}

export default Dashboard
