import React from 'react';

const student = {
  name: "John Doe",
  profilePicture: "https://via.placeholder.com/150",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  bio: "A passionate learner who is always eager to explore new fields. Currently studying Computer Science.",
  courses: [
    { name: "React for Beginners", progress: 80 },
    { name: "Advanced JavaScript", progress: 60 },
    { name: "Data Structures", progress: 90 },
  ],
};

const StudentProfile = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        <div className="flex items-center">
          <img
            src={student.profilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-full shadow-md"
          />
          <div className="ml-6">
            <h2 className="text-3xl font-bold text-gray-900">{student.name}</h2>
            <p className="text-gray-600">{student.email}</p>
            <p className="text-gray-600">{student.phone}</p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800">About</h3>
          <p className="text-gray-600 mt-2">{student.bio}</p>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800">Courses</h3>
          <ul className="mt-4">
            {student.courses.map((course, index) => (
              <li key={index} className="mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-800">{course.name}</span>
                  <div className="w-2/3 bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-blue-500 h-4 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <span className="ml-4 text-gray-600">{course.progress}%</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
