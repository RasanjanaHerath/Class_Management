import React, { useState } from 'react';

const StudentClass = () => {
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
    const [user, setUser] = useState(null);

  return (
    <div className="bg-gray-100 min-h-screen p-6 ml-64">
      {/* Student Name */}
      <h1 className="text-center text-2xl font-bold text-blue-800 mb-8">Welcome {user ? user.firstName : "Guest"}</h1>
      
      {/* Payments Section */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Payments</h2>
        
        <div className="flex justify-between items-center mb-4">
          <div className="bg-gray-200 w-3/4 p-4 rounded-lg text-gray-500">Calendar which shows payment history</div>
          <button
            onClick={() => setPaymentModalOpen(true)}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Pay for New Month
          </button>
        </div>
        
        {/* Previous Payments Table */}
        <table className="w-full bg-gray-100 rounded-lg">
          <thead>
            <tr className="bg-gray-300 text-gray-700">
              <th className="py-2 px-4">Payment Date</th>
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4">Payment ID</th>
            </tr>
          </thead>
          <tbody>
            {/* Replace these rows with dynamic data */}
            <tr className="text-gray-600">
              <td className="py-2 px-4">2024-10-01</td>
              <td className="py-2 px-4">$100</td>
              <td className="py-2 px-4">#123456</td>
            </tr>
          </tbody>
        </table>
      </section>
      
      {/* Attendance Section */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Attendance</h2>
        
        <div className="w-full bg-gray-300 h-6 rounded-lg overflow-hidden mb-4">
          <div className="bg-green-500 h-full text-center text-white font-bold" style={{ width: '85%' }}>85%</div>
        </div>
        
        <div className="bg-gray-200 w-full p-4 rounded-lg text-gray-500">Attendance sheet/calendar</div>
      </section>
      
      {/* Homework Section */}
      <section className="bg-blue-50 p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Home Works</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="bg-gray-200 w-3/4 p-4 rounded-lg text-gray-500">Assignment name</div>
            <div className="space-x-2">
              <button className="bg-blue-600 text-white py-1 px-3 rounded-lg hover:bg-blue-700">Upload Submission</button>
              <button className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600">Delete</button>
            </div>
          </div>
          {/* Repeat assignment row as needed */}
        </div>
      </section>
      
      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-lg font-semibold mb-4">New Payment</h3>
            <p className="text-gray-600 mb-6">Enter payment details here.</p>
            <button
              onClick={() => setPaymentModalOpen(false)}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentClass;
