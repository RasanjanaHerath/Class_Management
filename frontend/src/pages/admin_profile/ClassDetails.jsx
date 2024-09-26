import React from 'react';
import NewClass from '../../component/model/NewClass';
import EditClass from '../../component/model/EditClass';
import DeleteClass from '../../component/model/DeleteClass';

const ClassDetails = () => {
  const classes = [
    { id: 1, subject: 'Mathematics', batch: 'Batch A', dateTime: 'Monday 10:00 AM', numberOfStudents: 30 },
    { id: 2, subject: 'Physics', batch: 'Batch B', dateTime: 'Wednesday 2:00 PM', numberOfStudents: 25 },
    // Add more class data here if needed
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-10 md:ml-64 md:mr-64">
      <div className="mb-8 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search..."
          className="w-1/3 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
        />

        {/* Button to trigger new class modal */}
        <NewClass />
      </div>

      <div className="overflow-x-auto p-6">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Subject</th>
              <th className="px-4 py-2 border-b">Batch</th>
              <th className="px-4 py-2 border-b">Date & Time</th>
              <th className="px-4 py-2 border-b">Number of Students</th>
              <th className="px-4 py-2 border-b">EDIT</th>
              <th className="px-4 py-2 border-b">DELETE</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((classItem) => (
              <tr key={classItem.id}>
                <td className="px-4 py-2 border-b">{classItem.id}</td>
                <td className="px-4 py-2 border-b">{classItem.subject}</td>
                <td className="px-4 py-2 border-b">{classItem.batch}</td>
                <td className="px-4 py-2 border-b">{classItem.dateTime}</td>
                <td className="px-4 py-2 border-b">{classItem.numberOfStudents}</td>
                <td className="px-4 py-2 border-b">
                  <EditClass />
                </td>
                <td className="px-4 py-2 border-b">
                  <DeleteClass />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassDetails;
