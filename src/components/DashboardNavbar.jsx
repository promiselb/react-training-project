import React from "react";
import { HiOutlineBell } from "react-icons/hi";
import logo from '../assets/images/logo.png';

const DashboardNavbar = () => {
  return (
    <nav className="bg-indigo-700 border-b border-indigo-500 sticky top-0 z-10">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Left: Search bar */}
          {/* Left: Logo / Title */}
            <div className="flex items-center space-x-3">
            <img
                src={logo}
                alt="GearRent Logo"
                className="h-10 w-auto"
            />
            <span className="text-white text-2xl font-bold hidden md:block">
                GearRent Admin
            </span>
            </div>

          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-indigo-600 text-white placeholder-gray-200 border border-indigo-500 rounded-lg pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-white focus:outline-none"
            />
            <span className="absolute left-3 top-2.5 text-gray-200">🔍</span>
          </div>

          {/* Right: Notification + Profile */}
          <div className="flex items-center gap-6">
            <button className="text-white hover:text-gray-200 relative">
              <HiOutlineBell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
                3
              </span>
            </button>

            <img
              src="/assets/staff-avatar.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
