import React from 'react';
import { FaSearch} from "react-icons/fa";
import { IoNotificationsCircle } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

function Dashboard() {
  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gray-100 flex md:ml-64 ml-0">
=======
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="px-6 py-4">
          <h2 className="text-xl font-bold text-gray-800">ClassMaster</h2>
        </div>
        <nav className="mt-10">
          <ul>
            <li className="mb-2">
              <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
                Dashboard
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
                Class details
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
                Teacher details
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
                Student details
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
                Payment history
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
                Analytics and Report
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
                Notification
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
                Settings
              </a>
            </li> 
          </ul>
        </nav>
      </aside>

>>>>>>> 3e16898 (create frontend of the admin profile)
      {/* Main Content */}
      <main className="flex-1 p-6 bg-white">
        <header className="flex justify-between items-center mb-6 bg-white h-14 border-b border-gray-200">
          <div className="relative">
            <FaSearch fontSize={20} className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-3"/>
            <input type="text" placeholder="Search..." className="text-sm focus:outline-none active:outline-none h-10 w-[24rem] border border-gray-300 rounded-sm pl-11 px-4"/>

          </div>
          <div className="flex items-center gap-2 mr-2 ml-10">
            <IoNotificationsCircle fontSize={24}/>
            <CgProfile fontSize={24}/>
          </div>
        </header>

        <section className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-gray-200 rounded-lg shadow">
            <h2 className="text-lg font-medium">Classes</h2>
          </div>
          <div className="p-4 bg-gray-200 rounded-lg shadow">
            <h2 className="text-lg font-medium">Teachers</h2>
          </div>
          <div className="p-4 bg-gray-200 rounded-lg shadow">
            <h2 className="text-lg font-medium">Students</h2>
          </div>
          <div className="p-4 bg-gray-200 rounded-lg shadow">
            <h2 className="text-lg font-medium">Ratings</h2>
          </div>
          <div className="p-4 bg-gray-200 rounded-lg shadow">
            <h2 className="text-lg font-medium">Today Income</h2>
          </div>
          <div className="p-4 bg-gray-200 rounded-lg shadow">
            <h2 className="text-lg font-medium">Total Users</h2>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Performance Overview</h2>
          {/* Insert your chart component here */}
          <div className="h-64 bg-gray-100"></div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;


