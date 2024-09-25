// src/Header.js
import React from 'react';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-6 bg-white shadow">
      <h1 className="text-xl font-bold">Welcome Back 👋</h1>
      <div className="flex items-center space-x-4">
        <input type="text" placeholder="Search..." className="border p-2 rounded" />
        <div className="relative">
          <div className="absolute right-0 top-0 bg-red-500 text-white text-xs rounded-full px-1">3</div>
          <img src="https://via.placeholder.com/40" alt="Notifications" className="w-8 h-8 rounded-full" />
        </div>
        <img src="https://via.placeholder.com/40" alt="User" className="w-10 h-10 rounded-full border" />
        <div>Jane Cooper</div>
      </div>
    </header>
  );
};

export default Header;
