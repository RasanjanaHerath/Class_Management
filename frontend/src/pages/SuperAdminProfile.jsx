// src/DashboardContent.js
import React from 'react';

const SuperAdminProfile = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex md:ml-64 ml-0">
      <div className="p-6 bg-gray-100 flex-1">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Total Students</div>
          <div className="text-2xl font-bold">2500</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Total Teachers</div>
          <div className="text-2xl font-bold">150</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Total Institutes</div>
          <div className="text-2xl font-bold">600</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Total Earnings</div>
          <div className="text-2xl font-bold">$10,000</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Total Students by Gender</div>
          <div className="text-2xl font-bold">2500</div>
          <div className="mt-4">
            <div className="flex justify-between text-sm">
              <span>Boys: 1500</span>
              <span>Girls: 1000</span>
            </div>
            <div className="h-24 bg-blue-500 w-3/4 mt-2"></div>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Attendance</div>
          <div className="mt-4 flex justify-between text-sm">
            <span>This Week</span>
            <span>Class 10</span>
          </div>
          <div className="mt-4 h-24 bg-green-500"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Notice Board</div>
          <ul className="mt-4 space-y-2">
            <li>School annual sports day celebration 2023</li>
            <li>Annual Function celebration 2023-24</li>
            <li>Mid-term examination routine published</li>
            <li>Inter-school annual painting competition</li>
          </ul>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Event Calendar</div>
          <div className="mt-4 h-24 bg-yellow-500"></div>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default SuperAdminProfile;
