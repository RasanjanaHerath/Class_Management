// src/Header.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom for routing
import notification from "../assets/notification.jpg";
import logo from "../assets/logo1.png";
import dp from "../assets/dp1.jpg";
import { use } from "react";

const Header = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const navigate = useNavigate();

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const user2 = JSON.parse(localStorage.getItem("user"));
  // console.log("user from detials", user2);

  // Mock user data
  const user = {
    name: `${user2.firstName}`,
    email: `${user2.email}`,
    profilePicture: dp,
  };

  return (
    <header className="flex justify-between items-center p-6 bg-white shadow-md md:ml-64 h-20">
      {/* Left Section: Logo and Title */}
      <div className="flex items-center space-x-4">
        <img src={logo} alt="Logo" className="w-16 h-auto" />
        <h1 className="text-2xl font-bold text-gray-700 tracking-wide">
          Class Master
        </h1>
      </div>

      {/* Center Section: Navigation Links */}
      <div className="flex items-center space-x-20 ml-80"></div>

      {/* Right Section: Notifications and User Profile */}
      <div className="flex items-center space-x-8 ml-0">
        {/* Notifications */}
        {/* <div className="relative">
          <div className="absolute right-0 top-0 bg-red-500 text-white text-xs rounded-full px-1 py-0.5">3</div>
          <img
            src={notification}
            alt="Notifications"
            className="w-8 h-8 rounded-full cursor-pointer hover:opacity-75 transition duration-300"
          />
        </div> */}

        {/* User Profile */}
        <div className="relative">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={togglePopup}
          >
            {/* <img
              src={user.profilePicture}
              alt="User"
              className="w-10 h-10 rounded-full border-2 border-gray-300 shadow-sm hover:opacity-80 transition duration-300"
            /> */}
            <div className="w-5 h-5  bg-gray-300 flex justify-center items-center p-4 rounded-full">{user.name[0]}</div>
            <span className="text-sm text-gray-700">{user.name}</span>
          </div>

          {/* Popup Window */}
          {isPopupVisible && (
            <>
              <div
                className="fixed inset-0 bg-black opacity-50 z-40"
                onClick={closePopup}
              ></div>
              <div
                className="absolute right-0 mt-4 w-80 bg-white border border-gray-200 shadow-lg rounded-lg z-50"
                onMouseLeave={closePopup}
              >
                <div className="p-6 text-center">
                  {/* Greeting */}
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Hi, {user.name}!
                  </h3>
                  {/* Larger Profile Picture */}
                  {/* <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-4 border-gray-300 shadow-lg mx-auto mb-4"
                  /> */}
                    <div className="w-24 h-24 bg-gray-300 flex justify-center items-center p-4 rounded-full text-4xl mb-4 mx-auto">{user.name[0]}</div>
                  {/* User Name and Email */}
                  <h3 className="text-xl font-bold text-gray-800">
                    {user.name}
                  </h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <hr className="my-4 border-gray-300" />
                  {/* Action Buttons */}
                  <div className="space-y-4">
                    {/* <button
                      className="py-2 px-4 w-full text-white bg-blue-500 hover:bg-blue-600 transition rounded-lg"
                      onClick={() => {
                        console.log('View Profile clicked');
                        closePopup();
                      }}
                    >
                      View Profile
                    </button> */}
                    <button
                      className="py-2 px-4 w-full text-white bg-red-500 hover:bg-red-600 transition rounded-lg"
                      onClick={() => {
                        console.log("Logout clicked");
                        closePopup();
                        navigate("/");
                        // Add your logout logic here
                      }}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
