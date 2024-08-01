import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faCreditCard, faUser, faEdit } from '@fortawesome/free-solid-svg-icons';
import profilePicture from '../../assets/teacher.jpeg'; // Replace with the actual image path
// import Sidebar from './SideBar';

const TeacherProfile = () => {
  return (

    <div className="flex flex-col lg:flex-row min-h-screen">

      <div className="flex-grow p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Teacher Profile</h2>
              <p className="text-gray-500 mb-6">Morning and happy classes, Theresa!</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-gray-100 rounded-lg text-center">
                  <h3 className="text-lg font-semibold">Revenue</h3>
                  <p className="text-2xl font-bold">$4,179.00</p>
                  <p className="text-green-500">+5.1%</p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg text-center">
                  <h3 className="text-lg font-semibold">New Students</h3>
                  <p className="text-2xl font-bold">318</p>
                  <p className="text-green-500">+2.9%</p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg text-center">
                  <h3 className="text-lg font-semibold">Average Rating</h3>
                  <p className="text-2xl font-bold">4.9/10</p>
                  <p className="text-green-500">+0.7%</p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-bold text-lg mb-4">Classes Activity</h3>
                {/* Placeholder for chart */}
                <div className="h-48 bg-gray-200 rounded-lg"></div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-4">Payment History</h3>
                <div className="overflow-auto">
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b border-gray-200 text-left">Student</th>
                        <th className="py-2 px-4 border-b border-gray-200 text-left">Course</th>
                        <th className="py-2 px-4 border-b border-gray-200 text-left">Date</th>
                        <th className="py-2 px-4 border-b border-gray-200 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2 px-4 border-b border-gray-200">Kristin Watson</td>
                        <td className="py-2 px-4 border-b border-gray-200">English Language Arts</td>
                        <td className="py-2 px-4 border-b border-gray-200">12 Jan 2023</td>
                        <td className="py-2 px-4 border-b border-gray-200 text-right">$129.00</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b border-gray-200">Barbara Cooper</td>
                        <td className="py-2 px-4 border-b border-gray-200">Math</td>
                        <td className="py-2 px-4 border-b border-gray-200">12 Jan 2023</td>
                        <td className="py-2 px-4 border-b border-gray-200 text-right">$165.00</td>
                      </tr>
                      {/* Add more rows as needed */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Account Info</h3>
              <button className="text-blue-500 hover:underline">
                <FontAwesomeIcon icon={faEdit} /> Edit profile
              </button>
            </div>
            <div className="text-center mb-6">
              <img src={profilePicture} alt="Teacher" className="w-24 h-24 rounded-full mx-auto mb-4" />
              <h4 className="font-bold text-lg">Theresa Flores</h4>
              <p className="text-gray-500">Senior Teacher at Tiger School</p>
            </div>
            <div className="mb-6">
              <p className="text-gray-700 mb-2">
                Hello, my name is Theresa Flores. I come from Australia. I graduated from DoMi and got a PhD degree. My major is Academic Studies. I have 4 years of teaching experience.
              </p>
            </div>
            <div className="mb-6">
              <p className="font-bold">Contact Information</p>
              <p className="text-gray-700">theresaflores@voit.team</p>
              <p className="text-gray-700">+1 (000) 000 0000</p>
            </div>
            <div className="flex items-center justify-between mb-6">
              <p className="font-bold">Open to work</p>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" checked />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="text-center">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg transition transform hover:scale-105">
                Manage Subscriptions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherProfile;
