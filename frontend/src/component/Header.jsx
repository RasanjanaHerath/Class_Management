// src/Header.js
import React from 'react';
import notification from "../assets/notification.jpg";
import logo from "../assets/logo1.png";
import dp from "../assets/dp1.jpg";


const Header = () => {
  return (
    <header className="flex justify-between items-center p-6 bg-white shadow md:ml-64">
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Logo" className="w-14 h-auto" />
        <h1 className="text-xl font-bold">Class Master</h1>
      </div>

      <div className="flex items-center space-x-4">
        <input type="text" placeholder="Search..." className="border p-2 rounded" />
        <div className="relative">
          <div className="absolute right-0 top-0 bg-red-500 text-white text-xs rounded-full px-1">3</div>
          <img src={notification} alt="Notifications" className="w-8 h-8 rounded-full" />
        </div>
        <img src={dp} alt="User" className="w-10 h-10 rounded-full border" />
        <div>Jane Cooper</div>
      </div>
    </header>
  );
};

export default Header;
