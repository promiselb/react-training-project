import React from 'react'
import { useChangeTitle } from '../hooks/useChangeTitle';



const DashboardHome = () => {
  useChangeTitle("Private - Dashboard Home");
  return (
    <>
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard Home</h1>
      <p>Welcome to your dashboard! Here you can manage your rentals, view statistics, and update your inventory.</p>
    </div>
      <div className="p-6 space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {/* <StatCard title="Active Rentals" value="45" />
        <StatCard title="Revenue (This Month)" value="$8,420" />
        <StatCard title="Items Available" value="134" /> */}
      </div>

      {/* <RecentRentalsTable />
      <RevenueChart /> */}
    </div>
    </>
  )
}

export default DashboardHome