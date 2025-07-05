import React, { useEffect, useState } from 'react'
import {CarCard, Loader, Title} from './index'
import { assets, dummyCarData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const FeaturedSection = () => {
  const navigate = useNavigate()
  const [cars, setCars] = useState(null);
  
    const fetchCars = async () => {
      setTimeout(() => {
        setCars(dummyCarData);
      }, 2000);
    };
  
    useEffect(() => {
      fetchCars();
    }, []);
  return (
    <div className='flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32 max-w-window mx-auto'>
      <div>
        <Title title={"Featured Cars"} subTitle={"Explore our selection of premium vehicles available for your next adventure."}/>
      </div>

      {cars ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18'>
        {dummyCarData.slice(0, 6).map(car => (
            <div key={car._id}>
                <CarCard car={car} />
            </div>
        ))}
      </div>
      ) : <Loader/>}

      { cars && <button onClick={() => {navigate('/cars') ; scrollTo(0, 0)}} className='flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer'>Explore all cars <img src={assets.arrow_icon} alt="arrow" /></button>}
    </div>
  )
}

export default FeaturedSection
