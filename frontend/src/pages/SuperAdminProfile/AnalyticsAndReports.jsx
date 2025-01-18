import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AnalyticsAndReports = () => {
  // Dummy data for charts
  const data = [
    { name: 'Jan', userGrowth: 30 },
    { name: 'Feb', userGrowth: 50 },
    { name: 'Mar', userGrowth: 70 },
    { name: 'Apr', userGrowth: 90 },
    { name: 'May', userGrowth: 120 },
  ];

  const [dateRange, setDateRange] = useState('This Month');
  const [userType, setUserType] = useState('All Users');

  // Handle date range change
  const handleDateRangeChange = (e) => {
    setDateRange(e.target.value);
  };

  // Handle user type change
  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:ml-64">
      {/* <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">Analytics & Reports</h1> */}

      {/* Filter Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Date Range */}
          <div>
            <label htmlFor="dateRange" className="block text-sm font-semibold text-gray-700">Date Range</label>
            <select
              id="dateRange"
              value={dateRange}
              onChange={handleDateRangeChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="This Month">This Month</option>
              <option value="Last Month">Last Month</option>
              <option value="This Year">This Year</option>
              <option value="Custom Range">Custom Range</option>
            </select>
          </div>

          {/* User Type */}
          <div>
            <label htmlFor="userType" className="block text-sm font-semibold text-gray-700">User Type</label>
            <select
              id="userType"
              value={userType}
              onChange={handleUserTypeChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="All Users">All Users</option>
              <option value="Students">Students</option>
              <option value="Teachers">Teachers</option>
            </select>
          </div>

          {/* Export Button */}
          <div className="flex justify-end items-center">
            <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Charts and Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {/* User Growth Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">User Growth ({dateRange})</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="userGrowth" stroke="#4F46E5" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Active Users Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700">Active Users</h3>
          <p className="text-3xl font-bold text-blue-600">1,234</p>
        </div>

        {/* New Registrations Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700">New Registrations</h3>
          <p className="text-3xl font-bold text-green-600">300</p>
        </div>
      </div>

      {/* Detailed Reports Table */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Detailed Reports</h2>
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">User ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Date Registered</th>
              <th className="p-3 text-left">User Type</th>
            </tr>
          </thead>
          <tbody>
            {/* Sample Data for Table */}
            <tr className="border-b">
              <td className="p-3">U12345</td>
              <td className="p-3">John Doe</td>
              <td className="p-3">johndoe@example.com</td>
              <td className="p-3">2023-05-12</td>
              <td className="p-3">Student</td>
            </tr>
            <tr className="border-b">
              <td className="p-3">U12346</td>
              <td className="p-3">Jane Smith</td>
              <td className="p-3">janesmith@example.com</td>
              <td className="p-3">2023-05-15</td>
              <td className="p-3">Teacher</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnalyticsAndReports;
