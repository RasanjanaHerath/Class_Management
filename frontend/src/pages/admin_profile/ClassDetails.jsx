import React, { useState, useEffect } from 'react';
import NewClass from '../../component/model/NewClass';
import EditClass from '../../component/model/EditClass';
import DeleteClass from '../../component/model/DeleteClass';
import axios from 'axios';

const ClassDetails = () => {
  const [classes, setClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch class data from backend API on component mount
  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/classes');
      setClasses(response.data); // Assuming your API sends the class list in the response
    } catch (error) {
      console.error('Error fetching class data:', error);
    }
  };

  // Add new class
  const addNewClass = async (newClassData) => {
    try {
      const response = await axios.post('http://localhost:3000/api/classes', newClassData);
      setClasses([...classes, response.data]); // Update the list with the new class
    } catch (error) {
      console.error('Error adding class:', error);
    }
  };

  // Update class
  const updateClass = async (updatedClassData) => {
    try {
      // Perform the PUT request to update the class
      await axios.put(`http://localhost:3000/api/classes/${updatedClassData.id}`, updatedClassData);
      
      // Update the local state immediately with the updated class data
      setClasses(classes.map((classItem) =>
        classItem.id === updatedClassData.id ? updatedClassData : classItem
      ));
    } catch (error) {
      console.error('Error updating class:', error);
    }
  };
  
  // Delete class
  const deleteClass = async (classId) => {
    try {
      await axios.delete(`http://localhost:3000/api/classes/${classId}`);
      setClasses(classes.filter((classItem) => classItem.id !== classId));
    } catch (error) {
      console.error('Error deleting class:', error);
    }
  };

  // Filter classes based on search term
  const filteredClasses = classes.filter((classItem) =>
    (classItem.subject?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen bg-gray-100 p-10 md:ml-64 md:mr-64">
    <h1 className="text-2xl font-bold mb-6 text-center">Class Details</h1>
    <div className="mb-8 flex justify-between items-center"> {/* Flex container */}
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-1/3 p-3 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
      />
      
      {/* Button to trigger new class modal */}
      {/* <NewClass onSubmit={addNewClass} /> */}
    </div>
  
    <div className="overflow-x-auto p-6">
      <table className="table-auto w-full bg-white shadow-lg rounded-lg">
        <thead className="bg-gray-400 text-white">
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
          {filteredClasses.map((classItem) => (
            <tr key={classItem.id}>
              <td className="px-4 py-2 border-b">{classItem.id}</td>
              <td className="px-4 py-2 border-b">{classItem.subject}</td>
              <td className="px-4 py-2 border-b">{classItem.batch}</td>
              <td className="px-4 py-2 border-b">{classItem.dateTime}</td>
              <td className="px-4 py-2 border-b">{classItem.numberOfStudents}</td>
              <td className="px-4 py-2 border-b">
                <EditClass classData={classItem} onSubmit={updateClass} />
              </td>
              <td className="px-4 py-2 border-b">
                <DeleteClass className={classItem.subject} onDelete={() => deleteClass(classItem.id)} />
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
