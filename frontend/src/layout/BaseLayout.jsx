import React from 'react'
import { Outlet } from "react-router-dom";
import NavBar from '../component/NavBar';
import Footer from '../component/Footer';
import { useLocation } from 'react-router-dom';
import Sidebar from '../pages/teacher_profile/SideBar';

const BaseLayout = () => {

  const location = useLocation();

  // Check if the current route matches the Teacher Profile page
  const isTeacherProfilePage = location.pathname === '/teacher_profile';

  return (
    
    <div className="flex flex-col h-screen">
    {/* Header */}
    <div className="w-full fixed top-0 left-0 right-0 z-20">
      <NavBar />
    </div>

    {/* Main content and sidebar container */}
    <div className="flex flex-1 overflow-hidden pt-16">
      {/* Sidebar - Conditional Rendering */}
      {isTeacherProfilePage && (
        <div className="w-64 fixed top-20 left-0 bottom-0 bg-white shadow-xl z-10">
          <Sidebar />
        </div>
      )}

      {/* Main Content Area */}
      <div
    className={`flex-1 bg-slate-100 flex flex-col overflow-auto ${
      isTeacherProfilePage ? 'ml-64' : ''
    }`}
  >
    <div className="py-14 px-7 flex-grow">
      <Outlet />
    </div>

    {/* Footer - Conditional Rendering */}
    {!isTeacherProfilePage && (
      <footer className="bg-gray-200 py-4 text-center">
        <Footer />
      </footer>
    )}
  </div>
</div>
</div>


  )
}

export default BaseLayout