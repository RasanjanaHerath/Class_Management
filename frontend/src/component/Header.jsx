// src/Header.js
import React, {useState} from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for routing
import notification from "../assets/notification.jpg";
import logo from "../assets/logo1.png";
import dp from "../assets/dp1.jpg";


const Header = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <header className="flex justify-between items-center p-6 bg-white shadow-md md:ml-64 h-20">
      {/* Left Section: Logo and Title */}
      <div className="flex items-center space-x-4">
        <img src={logo} alt="Logo" className="w-16 h-auto" />
        <h1 className="text-2xl font-bold text-gray-700 tracking-wide">Class Master</h1>
      </div>

      {/* Center Section: Navigation Links (placed near to the search bar) */}
      <div className="flex items-center space-x-20 ml-80">
        
      </div>

      {/* Right Section: Search Bar, Notifications, and User Profile */}
      <div className="flex items-center space-x-8 ml-0">

        <div className="relative">
          <div className="absolute right-0 top-0 bg-red-500 text-white text-xs rounded-full px-1 py-0.5">3</div>
          <img
            src={notification}
            alt="Notifications"
            className="w-8 h-8 rounded-full cursor-pointer hover:opacity-75 transition duration-300"
          />
        </div>

        <div className="flex items-center space-x-2">
          <img
            src={dp}
            alt="User"
            className="w-10 h-10 rounded-full border-2 border-gray-300 shadow-sm cursor-pointer hover:opacity-80 transition duration-300"
          />
          <span className="text-sm text-gray-700">Jane Cooper</span>
        </div>
      </div>
    </header>
  );
};

export default Header;




