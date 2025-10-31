import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./../components/Sidebar";
import DashboardNavbar from "./../components/DashboardNavbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navbar */}
      <DashboardNavbar />

      {/* Main content with sidebar */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 ml-6">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      <ToastContainer />
    </div>
  );
};

export default DashboardLayout;
