import React, { useEffect, useState } from 'react'
import {CarCard, Loader, Title} from './index'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../store/AppContext'
import {motion} from 'motion/react'

const FeaturedSection = () => {
  const navigate = useNavigate()
  const {cars} = useAppContext()
  return (
    <motion.div initial={{opacity: 0, y: 40}} whileInView={{y: 0, opacity: 1}} transition={{duration: 1, ease: "easeOut"}} className='flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32 max-w-window mx-auto'>
      <motion.div initial={{opacity: 0, y: 20}} whileInView={{y: 0, opacity: 1}} transition={{duration: 1, delay: 0.5}}>
        <Title title={"Featured Cars"} subTitle={"Explore our selection of premium vehicles available for your next adventure."}/>
      </motion.div>

      {cars ? (
        <motion.div initial={{opacity: 0, y: 100}} whileInView={{y: 0, opacity: 1}} transition={{duration: 1, delay: 0.5}} className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18'>
        {cars.slice(0, 6).map(car => (
            <motion.div initial={{opacity: 0,scale: 0.95}} whileInView={{scale: 1, opacity: 1}} transition={{duration: 0.4, ease: "easeOut"}} key={car._id}>
                <CarCard car={car} />
            </motion.div>
        ))}
      </motion.div>
      ) : <Loader/>}

      { cars && <motion.button initial={{opacity: 0, y: 20}} whileInView={{y: 0, opacity: 1}} transition={{duration: 0.6, delay: 0.4}} onClick={() => {navigate('/cars') ; scrollTo(0, 0)}} className='flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer'>Explore all cars <img src={assets.arrow_icon} alt="arrow" /></motion.button>}
    </motion.div>
  )
}

export default FeaturedSection
