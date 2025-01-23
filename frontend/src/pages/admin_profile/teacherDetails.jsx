import React, { useState, useEffect } from "react";
import axios from "axios";

const TeacherDetails = () => {

  return (
    <div className="min-h-screen bg-gray-100 p-10 md:ml-64 ">
      <h1 className="text-2xl font-bold mb-6 text-center">Teacher Details</h1>
      
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-gray-400 text-white">
            <tr>
              <th className="p-4">Teacher ID</th>
              <th className="p-4">Teacher Name</th>
              <th className="p-4">Subject</th>
              <th className="p-4">Phone Number</th>
              <th className="p-4">NIC</th>
              <th className="px-4 py-2 border-b">EDIT</th>
              <th className="px-4 py-2 border-b">DELETE</th>
            </tr>
          </thead>
            <td className="p-4">{teacher.id}</td>
            <td className="p-4">{teacher.name}</td>
            <td className="p-4">{teacher.phoneNumber}</td>
            <td className="p-4">{teacher.nic}</td>
            <td className="p-4">
            <button
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
            onClick={() => openModal()}>
            EDIT
            </button>
            </td>
            <td className="p-4">
            <button
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
            onClick={() => openModal()}>
            DELETE
            </button>
            </td>
        </table>
      </div>
    </div>
  );
};

export default TeacherDetails;
