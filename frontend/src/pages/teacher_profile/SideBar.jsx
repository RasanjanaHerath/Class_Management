import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserGraduate, faChalkboardTeacher, faCog, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Toggle Button for small screens */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-gray-700 text-white focus:outline-none"
      >
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 h-full w-64 bg-white shadow-xl rounded-r-md overflow-hidden transition-transform duration-300 ease-in-out z-10 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 '
        }`}
      >
        {/* <div className="flex items-center justify-center h-20 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-700">Class Master</h1>
        </div> */}
        <nav className="flex-grow">
          <ul className="flex flex-col p-4 space-y-4">
            <li>
              <Link
                to="/teacher_profile"
                className="flex items-center mt-5 p-2 text-gray-700 hover:bg-gray-200 rounded-md transition"
              >
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/students"
                className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded-md transition"
              >
                <FontAwesomeIcon icon={faUserGraduate} className="mr-2" />
                Students
              </Link>
            </li>
            <li>
              <Link
                to="/teachers"
                className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded-md transition"
              >
                <FontAwesomeIcon icon={faChalkboardTeacher} className="mr-2" />
                Teachers
              </Link>
            </li>
            <li>
              <Link
                to="/admin"
                className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded-md transition"
              >
                <FontAwesomeIcon icon={faCog} className="mr-2" />
                Admin
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
