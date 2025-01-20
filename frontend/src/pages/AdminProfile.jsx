// import React from 'react';

// function Dashboard() {
//   return (
//     <div className="min-h-screen bg-gray-100 flex md:ml-64 ml-0">
//       {/* Main Content */}
//       <main className="flex-1 p-6 bg-white">
//         <header className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold">Dashboard</h1>
//           <div className="flex items-center space-x-4">
//             <span className="text-sm font-medium">Admin 123</span>
//             <button className="text-gray-600 hover:text-gray-900">
//               <i className="fas fa-bell"></i>
//             </button>
//             <span className="bg-red-500 rounded-full w-4 h-4"></span>
//           </div>
//         </header>

//         <section className="grid grid-cols-3 gap-4 mb-6">
//           <div className="p-4 bg-gray-200 rounded-lg shadow">
//             <h2 className="text-lg font-medium">Classes</h2>
//           </div>
//           <div className="p-4 bg-gray-200 rounded-lg shadow">
//             <h2 className="text-lg font-medium">Teachers</h2>
//           </div>
//           <div className="p-4 bg-gray-200 rounded-lg shadow">
//             <h2 className="text-lg font-medium">Students</h2>
//           </div>
//           <div className="p-4 bg-gray-200 rounded-lg shadow">
//             <h2 className="text-lg font-medium">Ratings</h2>
//           </div>
//           <div className="p-4 bg-gray-200 rounded-lg shadow">
//             <h2 className="text-lg font-medium">Today Income</h2>
//           </div>
//           <div className="p-4 bg-gray-200 rounded-lg shadow">
//             <h2 className="text-lg font-medium">Total Users</h2>
//           </div>
//         </section>

//         <section className="bg-white p-6 rounded-lg shadow">
//           <h2 className="text-lg font-medium mb-4">Performance Overview</h2>
//           {/* Insert your chart component here */}
//           <div className="h-64 bg-gray-100"></div>
//         </section>
//       </main>
//     </div>
//   );
// }

// export default Dashboard;

import React from 'react';

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex md:ml-64 ml-0">
      {/* Main Content */}
      <main className="flex-1 p-6 bg-white">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900">
              <i className="fas fa-bell"></i>
            </button>
          </div>
        </header>

        <section className="grid grid-cols-3 gap-6 mb-6">
          <div className="p-6 bg-gray-200 rounded-lg shadow-lg">
            <h2 className="text-lg font-medium mb-2">Classes</h2>
            <div className="text-3xl font-bold text-gray-700">25</div>
          </div>
          <div className="p-6 bg-gray-200 rounded-lg shadow-lg">
            <h2 className="text-lg font-medium mb-2">Teachers</h2>
            <div className="text-3xl font-bold text-gray-700">10</div>
          </div>
          <div className="p-6 bg-gray-200 rounded-lg shadow-lg">
            <h2 className="text-lg font-medium mb-2">Students</h2>
            <div className="text-3xl font-bold text-gray-700">200</div>
          </div>
          <div className="p-6 bg-gray-200 rounded-lg shadow-lg">
            <h2 className="text-lg font-medium mb-2">Ratings</h2>
            <div className="text-3xl font-bold text-gray-700">4.5</div>
          </div>
          <div className="p-6 bg-gray-200 rounded-lg shadow-lg">
            <h2 className="text-lg font-medium mb-2">Today Income</h2>
            <div className="text-3xl font-bold text-gray-700">$1,200</div>
          </div>
          <div className="p-6 bg-gray-200 rounded-lg shadow-lg">
            <h2 className="text-lg font-medium mb-2">Total Users</h2>
            <div className="text-3xl font-bold text-gray-700">350</div>
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



