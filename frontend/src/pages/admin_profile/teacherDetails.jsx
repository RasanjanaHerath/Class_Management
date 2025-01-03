import React from 'react';

const TeacherDetails = () => {
  const teachers = ["Teacher 01", "Teacher 01", "Teacher 01", "Teacher 01", "Teacher 01", "Teacher 01"];

  return (
    <div className="p-6 md:ml-64">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Teacher Details</h2>
        <button className="bg-blue-300 text-black px-4 py-2 rounded-md">ADD ME</button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {teachers.map((teacher, index) => (
          <div key={index} className="bg-blue-950 text-white p-4 rounded-lg shadow-lg">
            <h3 className="text-lg mb-4">{teacher}</h3>
            <div className="flex justify-end">
              <button className="bg-gray-200 text-black px-4 py-1 mx-2 rounded-md">edit</button>
              <button className="bg-gray-200 text-black px-4 py-1 mx-2 rounded-md">delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherDetails;
