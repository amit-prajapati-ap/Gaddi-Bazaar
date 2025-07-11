import React, { useEffect } from 'react'
import { NavbarOwner, Sidebar } from '../../components/owner'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../store/AppContext'

const Layout = () => {
  const {isOwner, navigate} = useAppContext()

  useEffect(() => {
    if (!isOwner) {
      navigate('/')
    }
  }, [isOwner])
  
  return (
    <div className='flex flex-col'>
      <NavbarOwner/>
      <div className='flex'>
        <Sidebar/>
        <Outlet/>
      </div>
    </div>
  )
}

export default Layout
