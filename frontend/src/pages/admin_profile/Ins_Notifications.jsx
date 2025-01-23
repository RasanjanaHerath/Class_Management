import React from 'react'

const Ins_Notifications = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-10 md:ml-64">
      <h1 className="text-2xl font-bold mb-6 text-center">Students and Teachers Requests</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Requests */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4 text-blue-500">Student Requests</h2>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-gray-400 text-white">
              <tr>
                <th className="p-2">Student ID</th>
                <th className="p-2">Student Name</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* {studentRequests.map((request) => (
                <tr key={request.id} className="text-center border-t">
                  <td className="p-2">{request.id}</td>
                  <td className="p-2">{request.name}</td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => handleApprove("student", request.id)}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDelete("student", request.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>

        {/* Teacher Requests */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4 text-blue-500">Class Requests</h2>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-gray-400 text-white">
              <tr>
                <th className="p-2">Teacher ID</th>
                <th className="p-2">Teacher Name</th>
                <th className="p-2">Subject</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* {teacherRequests.map((request) => (
                <tr key={request.id} className="text-center border-t">
                  <td className="p-2">{request.id}</td>
                  <td className="p-2">{request.name}</td>
                  <td className="p-2">{request.subject}</td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => handleApprove("teacher", request.id)}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDelete("teacher", request.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Ins_Notifications;