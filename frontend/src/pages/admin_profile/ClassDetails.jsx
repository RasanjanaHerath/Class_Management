import React from 'react';
import NewClass from '../../component/model/NewClass';


const ClassDetails = () => {

  const users = [
    { id: 1, username: 'Ved Prakash N', email: 'ved@gmail.com', password: '1234569' },
    { id: 2, username: 'funda', email: 'funda@gmail.com', password: '1234' },
    { id: 3, username: 'Funda of WEB IT', email: 'gmail@example.com', password: '123456' },
    { id: 4, username: 'Ved 2', email: 'ved2@gmail.com', password: '1236' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-10 md:ml-64 md:mr-64">
      <div className="mb-8 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search..."
          className="w-1/3 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
        />

        {/* <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600">
          New+
        </button> */}
        <NewClass/>

      </div>

      <div className="overflow-x-auto p-6">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">ID</th>
            <th className="px-4 py-2 border-b">Username</th>
            <th className="px-4 py-2 border-b">Email</th>
            <th className="px-4 py-2 border-b">Password</th>
            <th className="px-4 py-2 border-b">EDIT</th>
            <th className="px-4 py-2 border-b">DELETE</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-4 py-2 border-b">{user.id}</td>
              <td className="px-4 py-2 border-b">{user.username}</td>
              <td className="px-4 py-2 border-b">{user.email}</td>
              <td className="px-4 py-2 border-b">{user.password}</td>
              <td className="px-4 py-2 border-b">
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                  EDIT
                </button>
              </td>
              <td className="px-4 py-2 border-b">
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                  DELETE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    </div>
  );
}

export default ClassDetails;  
