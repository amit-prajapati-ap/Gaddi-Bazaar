import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import { CarDetails, Cars, Home, MyBookings } from './pages'
import {ToastContainer} from 'react-toastify'
import { Footer } from './components'

const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  const isOwnerPath = useLocation().pathname.startsWith('/owner')
  return (
    <>
      {!isOwnerPath && <Navbar setShowLogin={setShowLogin}/>}
      <ToastContainer/>      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/car-details/:id' element={<CarDetails/>}/>
        <Route path='/cars' element={<Cars/>}/>
        <Route path='/my-bookings' element={<MyBookings/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
