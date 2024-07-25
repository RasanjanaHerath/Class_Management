import React from 'react';

const teacher = {
  name: "Jane Smith",
  profilePicture: "https://via.placeholder.com/150",
  email: "jane.smith@example.com",
  phone: "+1 (555) 987-6543",
  bio: "Experienced educator with a passion for teaching and technology. Specializes in computer science and mathematics.",
  courses: [
    { name: "Introduction to Programming", students: 120 },
    { name: "Calculus I", students: 90 },
    { name: "Web Development", students: 150 },
  ],
};

const TeacherProfile = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        <div className="flex items-center">
          <img
            src={teacher.profilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-full shadow-md"
          />
          <div className="ml-6">
            <h2 className="text-3xl font-bold text-gray-900">{teacher.name}</h2>
            <p className="text-gray-600">{teacher.email}</p>
            <p className="text-gray-600">{teacher.phone}</p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800">About</h3>
          <p className="text-gray-600 mt-2">{teacher.bio}</p>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800">Courses</h3>
          <ul className="mt-4">
            {teacher.courses.map((course, index) => (
              <li key={index} className="mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-800">{course.name}</span>
                  <span className="ml-4 text-gray-600">{course.students} students</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
