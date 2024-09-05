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

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import logo from '../assets/1.png';
// // import logo from '../../assets/logo.png'; // Replace with your actual logo path

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div>
//       <nav className="bg-white shadow-md px-4 py-3.5">
//         <div className="container mx-auto flex justify-between items-center">
//           {/* Logo and Title */}
//           <div className="flex items-center">
//             <img src={logo} alt="Logo" className="h-8 w-24 mr-4" />
//             <span className="font-bold text-2xl text-blue-800">Class Master</span>
//           </div>

//           {/* Hamburger Menu Button */}
//           <button
//             onClick={toggleMenu}
//             className="lg:hidden text-gray-800 focus:outline-none"
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h16m-7 6h7"
//               />
//             </svg>
//           </button>

//           {/* Navigation Links */}
//           <div
//             className={`lg:flex lg:space-x-6 ${isOpen ? 'block' : 'hidden'} lg:block`}
//           >
//             <Link to="/" className="text-gray-800 hover:text-blue-500 pr-6">
//               HOME
//             </Link>
//             <Link to="/about" className="text-gray-800 hover:text-blue-500 pr-6">
//               About
//             </Link>
//             <Link to="/contact" className="text-gray-800 hover:text-blue-500 pr-6">
//               CONTACT US
//             </Link>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <div
//           className={`lg:hidden fixed inset-0 bg-white shadow-md transition-transform duration-300 ease-in-out ${
//             isOpen ? 'translate-y-0' : '-translate-y-full'
//           }`}
//         >
//           <div className="flex flex-col p-4 space-y-4">
//             <Link to="/" className="text-gray-800 hover:text-blue-500">
//               HOME
//             </Link>
//             <Link to="/about" className="text-gray-800 hover:text-blue-500">
//               About
//             </Link>
//             <Link to="/contact" className="text-gray-800 hover:text-blue-500">
//               CONTACT US
//             </Link>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;
