import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

function Layout() {
  const location = useLocation()
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <Outlet key={location.pathname} />
      </main>
      <Footer />
    </div>
  )
}

export default Layout 