import React from 'react'
import PublicNavbar from "../components/PublicNavbar"
// import { Footer } from "../components/Footer"
import Footer from "../components/Footer"
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const PublicLayout = () => {
  return (
    <>
    <PublicNavbar />
    <Outlet />
    <Footer />
    <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="light" 
    />
    </>
  )
}

export default PublicLayout