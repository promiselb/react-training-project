import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiBarChart2, FiCalendar, FiPackage } from "react-icons/fi";

const Sidebar = () => {
  const [width, setWidth] = useState(240); // default width
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef(null);

  const startResizing = () => setIsResizing(true);
  const stopResizing = () => setIsResizing(false);

  const handleResizing = (e) => {
    if (!isResizing) return;
    let newWidth = e.clientX;
    if (newWidth < 60) newWidth = 60;     // minimum (only icons)
    if (newWidth > 260) newWidth = 260;   // maximum (full)
    setWidth(newWidth);
  };

  React.useEffect(() => {
    window.addEventListener("mousemove", handleResizing);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", handleResizing);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [isResizing]);

  const isCollapsed = width <= 80;

  return (
    <div
      ref={sidebarRef}
      className="bg-gray-100 border-r border-gray-300 h-screen flex flex-col relative transition-all duration-200"
      style={{ width }}
    >
      <h2 className={`font-bold text-lg p-4 ${isCollapsed ? "hidden" : "block"}`}>
        Dashboard
      </h2>

      <nav className="flex-1 space-y-2 p-2">
        <SidebarLink to="/" icon={<FiHome />} label="Catalogue" collapsed={isCollapsed} />
        <SidebarLink to="/dashboard" icon={<FiBarChart2 />} label="Overview" collapsed={isCollapsed} />
        <SidebarLink to="/dashboard/bookings" icon={<FiCalendar />} label="Bookings" collapsed={isCollapsed} />
        <SidebarLink to="/dashboard/inventory" icon={<FiPackage />} label="Inventory" collapsed={isCollapsed} />
      </nav>

      {/* draggable resize handle */}
      <div
        onMouseDown={startResizing}
        className="h-full absolute top-0 right-0 w-2 cursor-col-resize bg-gray-300 hover:bg-gray-400 transition-colors"
      ></div>
    </div>
  );
};

const SidebarLink = ({ to, icon, label, collapsed }) => (
  <Link
    to={to}
    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors"
  >
    <span className="text-xl">{icon}</span>
    {!collapsed && <span className="text-sm font-medium">{label}</span>}
  </Link>
);

export default Sidebar;
