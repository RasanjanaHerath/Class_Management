// src/Sidebar.js
import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen">
      <div className="p-6 text-2xl font-bold">Class Master</div>
      <nav>
        <ul>
          <li className="p-4 hover:bg-gray-700"><a href="#">Dashboard</a></li>
          <li className="p-4 hover:bg-gray-700"><a href="#">Students</a></li>
          <li className="p-4 hover:bg-gray-700"><a href="#">Teachers</a></li>
          <li className="p-4 hover:bg-gray-700"><a href="#">Exam</a></li>
          <li className="p-4 hover:bg-gray-700"><a href="#">Events</a></li>
          <li className="p-4 hover:bg-gray-700"><a href="#">Analytics</a></li>
          <li className="p-4 hover:bg-gray-700"><a href="#">Help Center</a></li>
          <li className="p-4 hover:bg-gray-700"><a href="#">Notice</a></li>
          <li className="p-4 hover:bg-gray-700"><a href="#">Settings</a></li>
          <li className="p-4 hover:bg-gray-700"><a href="#">Logout</a></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
