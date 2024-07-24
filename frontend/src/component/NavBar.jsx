import React from 'react'
import logo from '../assets/1.png';

const NavBar = () => {
  return (
    <div>
      <div>
      <nav className="bg-white shadow-md px-24 py-3.5">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 w-24 mr-4" />
          <span className="font-bold text-2xl text-blue-800 ">Class Master</span>
        </div>
        <div className="flex space-x-6 ">
          <a href="#home" className="text-gray-800 hover:text-blue-500 pr-11">HOME</a>
          <a href="#about" className="text-gray-800 hover:text-blue-500 pr-11">ABOUT</a>
          <a href="#contact us" className="text-gray-800 hover:text-blue-500 pr-11">CONTACT US</a>
        </div>
        
      </div>
    </nav>
    </div>
    </div>
  )
}

export default NavBar