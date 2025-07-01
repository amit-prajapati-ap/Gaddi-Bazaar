import React, { useState } from 'react'
import { CarCard, Title } from '../components'
import { assets, dummyCarData } from '../assets/assets'

const Cars = () => {
  const [input, setInput] = useState("")
  return (
    <div className='max-w-window mx-auto mb-20'>
      <div className='flex flex-col items-center py-20 bg-light max-md:px-4'>
          <Title title={"Browse Cars"} subTitle=  {"Explore our selection of premium  vehicles available for your next adventure."}/>

          <div className='flex items-center bg-white px-4 mt-6 w-full h-12 rounded-full shadow max-w-140'>
            <img src={assets.search_icon} alt="" className='w-4.5 h-4.5 mr-2' />
            <input type="text" placeholder='Search by make, model, or features' className='w-full h-full outline-none text-gray-500' onChange={(e) => setInput(e.target.value)} value={input} />
            <img src={assets.filter_icon} alt="" className='w-4.5 h-4.5 mr-2 cursor-pointer' />
          </div>
        </div>
      <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10  max-w-7xl mx-auto'>
        <p className='text-gray-500 xl:px-20 max-w-7xl mx-auto'>Showing {dummyCarData.length} Cars</p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20'>
          {dummyCarData.map(car => (
            <div key={car._id}>
              <CarCard car={car} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Cars
