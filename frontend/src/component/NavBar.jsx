import React from 'react'
import logo from '../assets/1.png';
import { Link } from 'react-router-dom';

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
          <Link to="/" className="text-gray-800 hover:text-blue-500 pr-11">HOME</Link>
          <Link to="/about" className="text-gray-800 hover:text-blue-500 pr-11">About</Link>
          <Link to="/contact" className="text-gray-800 hover:text-blue-500 pr-11">CONTACT US</Link>
        </div>
        
      </div>
    </nav>
    </div>
    </div>
  )
}

export default NavBar