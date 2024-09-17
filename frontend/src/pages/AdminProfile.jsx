import React from 'react';

function Dashboard() {
  return (
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

      {/* Main Content */}
      <main className="flex-1 p-6 bg-white">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">Admin 123</span>
            <button className="text-gray-600 hover:text-gray-900">
              <i className="fas fa-bell"></i>
            </button>
            <span className="bg-red-500 rounded-full w-4 h-4"></span>
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


