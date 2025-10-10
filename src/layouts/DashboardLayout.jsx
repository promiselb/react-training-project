import React from 'react'
import Sidebar from "../components/Sidebar"
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'


const DashboardLayout = () => {
  return (
    <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4">
        <Outlet />
        </main>
        <ToastContainer />
    </div>
  )
}

export default DashboardLayout