import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Users, IndianRupee, Video, CalendarCheck, Menu } from 'lucide-react';


function Sidebar({tabSelected, setTabSelected, collapsed, setCollapsed}) {


  useEffect(() => {
    const checkScreenSize = () => {
      setCollapsed(window.innerWidth < 768); // Tailwind's md breakpoint = 768px
    };

    checkScreenSize(); // Run on mount
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className={`bg-white shadow-lg transition-all duration-300 h-screen  ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4 flex justify-between items-center border-b ">
        {!collapsed && <h1 className="text-xl font-bold text-gray-800">Dance Studio</h1>}
        <button onClick={() => setCollapsed(!collapsed)} className="p-1 hover:bg-gray-100 rounded">
          <Menu className="w-5 h-5" />
        </button>
      </div>
      
      <nav className="p-4">

      <button
          onClick={() => setTabSelected("Fees_Management")}
          className={
            `flex items-center p-3 mb-2 rounded-lg transition-colors ${
              tabSelected === "Fees_Management" ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'
            }`
          }
        >
          <IndianRupee className="w-3 h-3 md:w-4 md:h-4" />
          {!collapsed && <p className="ml-3">Fees Management</p>}
        </button>

        <button
          onClick={() => setTabSelected("Batches")}
          className={
            `flex items-center p-3 mb-2 rounded-lg transition-colors ${
              tabSelected === "Batches" ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'
            }`
          }
        >
          <Users className="w-3 h-3 md:w-4 md:h-4 " />
          {!collapsed && <span className="ml-3">Batch Management</span>}
        </button>


        <button
          onClick={() => setTabSelected("UploadVideos")}
          className={
            `flex items-center p-3 mb-2 rounded-lg transition-colors ${
              tabSelected === "UploadVideos" ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'
            }`
          }
        >
          <Video className="w-3 h-3 md:w-4 md:h-4 " />
          {!collapsed && <span className="ml-3">Uplaod Videos</span>}
        </button>


        <button
          onClick={() => setTabSelected("Payment")}
          className={
            `flex items-center p-3 mb-2 rounded-lg transition-colors ${
              tabSelected === "Payment" ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'
            }`
          }
        >
          <Users className="w-3 h-3 md:w-4 md:h-4 " />
          {!collapsed && <span className="ml-3">Payment</span>}
        </button>


    

        <NavLink
          to="/attendance"
          className={
            `flex items-center p-3 mb-2 rounded-lg transition-colors ${
              tabSelected === "Attendance" ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'
            }`
          }
        >
          <CalendarCheck className="w-5 h-5" />
          {!collapsed && <span className="ml-3">Attendance</span>}
        </NavLink>
        {/* <NavLink
          to="/payment"
          onClick={() => setTabSelected("Payment")}
          className={
            `flex items-center p-3 mb-2 rounded-lg transition-colors ${
              tabSelected === "Payment" ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'
            }`
          }
        >
          <CalendarCheck className="w-5 h-5" />
          {!collapsed && <span className="ml-3">Payment</span>}
        </NavLink> */}
      </nav>
    </div>
  );
}

export default Sidebar