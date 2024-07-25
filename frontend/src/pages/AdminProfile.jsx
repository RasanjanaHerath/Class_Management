import React from 'react';

const admin = {
  name: "Alex Johnson",
  profilePicture: "https://via.placeholder.com/150",
  email: "alex.johnson@example.com",
  phone: "+1 (555) 123-4567",
  role: "Site Administrator",
  bio: "Experienced administrator overseeing the management of online education platforms, ensuring smooth operation and user satisfaction.",
  responsibilities: [
    "Managing user accounts and permissions",
    "Overseeing platform maintenance and updates",
    "Ensuring data security and compliance",
    "Coordinating with instructors and students",
    "Handling support queries and troubleshooting",
  ],
};

const AdminProfile = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        <div className="flex items-center">
          <img
            src={admin.profilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-full shadow-md"
          />
          <div className="ml-6">
            <h2 className="text-3xl font-bold text-gray-900">{admin.name}</h2>
            <p className="text-gray-600">{admin.role}</p>
            <p className="text-gray-600">{admin.email}</p>
            <p className="text-gray-600">{admin.phone}</p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800">About</h3>
          <p className="text-gray-600 mt-2">{admin.bio}</p>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800">Responsibilities</h3>
          <ul className="mt-4 list-disc list-inside">
            {admin.responsibilities.map((responsibility, index) => (
              <li key={index} className="text-gray-600">{responsibility}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
