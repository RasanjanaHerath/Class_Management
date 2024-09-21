import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from '../assets/logo.png';


const Drawer = () => {
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
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:translate-x-0 md:block`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Class Master</h2>
            <button className="md:hidden p-2" onClick={toggleDrawer}>
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
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div className="flex-1">
          <ul className="mt-4">
            <li>
              <NavLink
                to="/admin_profile"
                className={({ isActive }) =>
                  `py-2 px-4 block hover:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
                onClick={toggleDrawer}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/class_details"
                className={({ isActive }) =>
                  `py-2 px-4 block hover:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
                onClick={toggleDrawer}
              >
                Class Details
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/teacher_details"
                className={({ isActive }) =>
                  `py-2 px-4 block hover:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
                onClick={toggleDrawer}
              >
                Teacher Details
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/student_details"
                className={({ isActive }) =>
                  `py-2 px-4 block hover:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
                onClick={toggleDrawer}
              >
                Student Details
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/payment_details"
                className={({ isActive }) =>
                  `py-2 px-4 block hover:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
                onClick={toggleDrawer}
              >
                Payment Details
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/reports"
                className={({ isActive }) =>
                  `py-2 px-4 block hover:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
                onClick={toggleDrawer}
              >
                Analytics and Reports
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/notification"
                className={({ isActive }) =>
                  `py-2 px-4 block hover:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
                onClick={toggleDrawer}
              >
                Notifications
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/add-property"
                className={({ isActive }) =>
                  `py-2 px-4 block hover:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
                onClick={toggleDrawer}
              >
                Notices
              </NavLink>
            </li>
          </ul>
          </div>
          <ul className="mt-56 flex-1 ">
            <li>
              <NavLink
                to="/add-property"
                className={({ isActive }) =>
                  `py-2 px-4 block hover:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
                onClick={toggleDrawer}
              >
                Settings
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/add-property"
                className={({ isActive }) =>
                  `py-2 px-4 block hover:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
                onClick={toggleDrawer}
              >
                Help & Support
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `py-2 px-4 block hover:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
                onClick={toggleDrawer}
              >
                
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Drawer;