import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import { CarDetails, Cars, Home, MyBookings } from './pages'
import {ToastContainer} from 'react-toastify'
import { Footer, Login } from './components'
import { AddCar, Dashboard, Layout, ManageBookings, ManageCars } from './pages/owner/index'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './store/AppContext'

const App = () => {
  const {showLogin} = useAppContext()
  const isOwnerPath = useLocation().pathname.startsWith('/owner')
  return (
    <>
    <Toaster/>
      {showLogin && <Login/>}
      {!isOwnerPath && <Navbar/>}
      <ToastContainer/>      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/car-details/:id' element={<CarDetails/>}/>
        <Route path='/cars' element={<Cars/>}/>
        <Route path='/my-bookings' element={<MyBookings/>}/>
        <Route path='/owner' element={<Layout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='add-car' element={<AddCar/>}/>
          <Route path='manage-cars' element={<ManageCars/>}/>
          <Route path='manage-bookings' element={<ManageBookings/>}/>
        </Route>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
