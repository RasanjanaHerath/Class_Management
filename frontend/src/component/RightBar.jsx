import React, { useState } from "react";

const ProfileDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      
      <button className="md:hidden p-4" onClick={toggleDrawer}>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>

      
      <div
        className={`w-full md:w-64 bg-white border-l border-gray-200 h-screen fixed right-0 top-0 p-4 transition-transform transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex flex-col items-center text-center">
          
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
            <img
              src="https://via.placeholder.com/200"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          
          <h2 className="text-xl font-semibold mb-2">John Doe</h2>
          <p className="text-sm text-gray-500 mb-4">Role: admin</p>

          
          <div className="text-left w-full">
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">First Name:</span> John
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Last Name:</span> Doe
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Parents' Phone:</span> +123 456 7890
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Email:</span> john.doe@example.com
            </p>
          </div>
        </div>
      </div>

      
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
          onClick={toggleDrawer}
        ></div>
      )}
    </div>
  );
};

export default ProfileDrawer;
