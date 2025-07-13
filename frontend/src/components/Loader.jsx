import React from 'react'

const Loader = () => {
  return (
    <div className='flex justify-center items-center h-[80vh]'>
      <div className='spinner'></div>
      <p className='text-2xl text-gray-600 ml-4'>Loading...</p>
    </div>
  )
}

export default Loader
