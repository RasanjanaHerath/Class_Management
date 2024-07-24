import React from 'react'
import logo from '../assets/1.png';

const NavBar = () => {
  return (
    <div>
      <div>
      <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 w-8 mr-2" />
          <span className="font-bold text-lg text-gray-800">ClassMaster</span>
        </div>
        <div className="flex space-x-6">
          <a href="#demos" className="text-gray-800 hover:text-blue-500">HOME</a>
          <a href="#features" className="text-gray-800 hover:text-blue-500">ABOUT</a>
          <a href="#pages" className="text-gray-800 hover:text-blue-500">CONTACT US</a>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            SIGN IN
          </button>
        </div>
      </div>
    </nav>
    </div>
    </div>
  )
}

export default NavBar