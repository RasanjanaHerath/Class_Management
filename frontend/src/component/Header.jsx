// // src/Header.js
// import React from 'react';
// import notification from "../assets/notification.jpg";
// import logo from "../assets/logo1.png";
// import dp from "../assets/dp1.jpg";


// const Header = () => {
//   return (
//     <header className="flex justify-between items-center p-6 bg-white shadow md:ml-64">
//       <div className="flex items-center space-x-2">
//         <img src={logo} alt="Logo" className="w-14 h-auto" />
//         <h1 className="text-xl font-bold">Class Master</h1>
//       </div>

//       <div className="flex items-center space-x-4">
//         <input type="text" placeholder="Search..." className="border p-2 rounded" />
//         <div className="relative">
//           <div className="absolute right-0 top-0 bg-red-500 text-white text-xs rounded-full px-1">3</div>
//           <img src={notification} alt="Notifications" className="w-8 h-8 rounded-full" />
//         </div>
//         <img src={dp} alt="User" className="w-10 h-10 rounded-full border" />
//         <div>Jane Cooper</div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { useState } from 'react';
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
    <header className="flex justify-between items-center p-6 bg-white shadow md:ml-64">
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Logo" className="w-14 h-auto" />
        <h1 className="text-xl font-bold">Class Master</h1>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="absolute right-0 top-0 bg-red-500 text-white text-xs rounded-full px-1">3</div>
          <img src={notification} alt="Notifications" className="w-8 h-8 rounded-full" />
        </div>
        <div className="relative">
          <img
            src={dp}
            alt="User"
            className="w-12 h-12 rounded-full border cursor-pointer"
            onClick={togglePopup}
          />
          {isPopupVisible && (
            <div className="absolute right-0 mt-2 w-96 bg-gray-800 text-white rounded-xl shadow-2xl p-8">
              <div className="flex items-center space-x-6 mb-6">
                <img src={dp} alt="User" className="w-16 h-16 rounded-full border" />
                <div>
                  <h3 className="text-lg font-semibold">Hi, Jane Cooper!</h3>
                  <p className="text-sm text-gray-400">jane.cooper@example.com</p>
                </div>
              </div>
              <hr className="border-gray-600 mb-6" />
              <button
                className="block w-full text-left text-lg text-gray-400 hover:text-white mb-3"
                onClick={closePopup}
              >
                Close
              </button>
              <button className="block w-full text-left text-lg text-gray-400 hover:text-white">
                Sign out
              </button>
              <hr className="border-gray-600 mt-6 mb-4" />
              <p className="text-xs text-gray-500 text-center">Privacy Policy • Terms of Service</p>
            </div>
          )}
        </div>
        <div>Jane Cooper (ID: 123456)</div>
      </div>
    </header>
  );
};

export default Header;




