import React from 'react'



const StudentDetails = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-10 md:ml-64 md:mr-64">
      <h1 className="text-2xl font-bold mb-6 text-center">Student Details</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-gray-400 text-white">
            <tr>
              <th className="p-4">Student ID</th>
              <th className="p-4">Student Name</th>
              <th className="p-4">Subjects</th>
              <th className="p-4">Class Time</th>
              <th className="p-4">Payment For This Month</th>
            </tr>
          </thead>
          {/* <tbody>
            
          </tbody> */}
        </table>
      </div>
    </div>
  )
}

export default StudentDetails;