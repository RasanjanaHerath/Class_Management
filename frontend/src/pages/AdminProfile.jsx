import React from 'react';

function Dashboard() {
  return (
<<<<<<< HEAD
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
=======
    <div className="min-h-screen bg-gray-100 flex md:ml-64 ml-0 mr-0 md:mr-64">
>>>>>>> 79c2c8d (feat:create user details showing area)
      {/* Main Content */}
      <main className="flex-1 p-6 bg-white">
        
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


