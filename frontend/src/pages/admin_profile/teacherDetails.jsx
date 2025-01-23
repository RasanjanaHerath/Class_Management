import React, { useState, useEffect } from "react";
import axios from "axios";
let userItem = localStorage.getItem("user");
const user = userItem ? JSON.parse(userItem) : null;

const TeacherDetails = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/institute/classes/user/${user.id}`);
        console.log(response.data);
        setClasses(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10 md:ml-64 ">
      <h1 className="text-2xl font-bold mb-6 text-center">Teacher Classes</h1>
      
      <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-gray-400 text-white">
          <tr>
            <th className="p-4">Teacher Id</th>
            <th className="p-4">Teacher Name</th>
            <th className="p-4">Subject</th>
            <th className="p-4">NIC</th>
            <th className="p-4">Phone Number</th>
            <th className="px-4 py-2 border-b">EDIT</th>
            <th className="px-4 py-2 border-b">DELETE</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classItem) => (
            <tr key={classItem.id} className="border-b">
              <td className="p-4">{classItem.teacher.teacherId || '-'}</td>
              <td className="p-4">{classItem.teacher.name || '-'}</td>
              <td className="p-4">{classItem.teacher?.subjects || '-'}</td>
              <td className="p-4">{classItem.teacher.nic || '-'}</td>
              <td className="p-4">{classItem.teacher?.phoneNumber || '-'}</td>
              <td className="px-4 py-2 border-b">
                <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={() => openModal()}>
                Edit
                </button>
                {/* <EditClass classData={classItem} onSubmit={updateClass} /> */}
              </td>
              <td className="px-4 py-2 border-b">
                <button
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={() => openModal()}>
                Delete
                </button>
                {/* <DeleteClass className={classItem.subject} onDelete={() => deleteClass(classItem.id)} /> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default TeacherDetails;