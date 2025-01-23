import React, { useState, useEffect } from 'react';
import axios from 'axios';

let userItem = localStorage.getItem("user");
const user = userItem ? JSON.parse(userItem) : null;

const StudentDetails = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch student data from backend API on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3000/api/institute/students`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      setStudents(response.data); // Assuming your API sends the student list in the response
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  // Update student
  const updateStudent = async (updatedStudentData) => {
    try {
      await axios.put(`http://localhost:3000/api/students/${updatedStudentData.id}`, updatedStudentData);
      setStudents(students.map((student) =>
        student.id === updatedStudentData.id ? updatedStudentData : student
      ));
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  // Delete student
  const deleteStudent = async (studentId) => {
    try {
      await axios.delete(`http://localhost:3000/api/students/${studentId}`);
      setStudents(students.filter((student) => student.id !== studentId));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  // Filter students based on search term
  const filteredStudents = students.filter((student) =>
    (student.name?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-10 md:ml-64 ">
      <h1 className="text-2xl font-bold mb-6 text-center">Student Details</h1>
      <div className="mb-8 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/3 p-3 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>

      <div className="overflow-x-auto p-6">
        <table className="table-auto w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-gray-400 text-white">
            <tr>
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Phone</th>
              <th className="px-4 py-2 border-b">Grade</th>
              <th className="px-4 py-2 border-b">EDIT</th>
              <th className="px-4 py-2 border-b">DELETE</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td className="px-4 py-2 border-b">{student.id}</td>
                <td className="px-4 py-2 border-b">{student.name}</td>
                <td className="px-4 py-2 border-b">{student.email}</td>
                <td className="px-4 py-2 border-b">{student.phone}</td>
                <td className="px-4 py-2 border-b">{student.grade}</td>
                <td className="px-4 py-2 border-b">
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    onClick={() => console.log('Edit student')}
                  >
                    Edit
                  </button>
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    onClick={() => deleteStudent(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDetails;
