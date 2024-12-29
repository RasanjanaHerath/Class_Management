// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChartBar, faCreditCard, faUser, faEdit } from '@fortawesome/free-solid-svg-icons';
// import profilePicture from '../../assets/TEACHER.jpg'; // Replace with the actual image path

// const TeacherProfile = () => {
//   return (

//     <div className="flex flex-col lg:flex-row min-h-screen md:ml-64 ml-0">

//       <div className="flex-grow p-4">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2">
//             <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
//               <h2 className="text-2xl font-bold mb-4">Teacher Profile</h2>
//               <p className="text-gray-500 mb-6">Morning and happy classes, Thushari!</p>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//                 <div className="p-4 bg-gray-100 rounded-lg text-center">
//                   <h3 className="text-lg font-semibold">Revenue</h3>
//                   <p className="text-2xl font-bold">Rs.10,000.00</p>
//                   <p className="text-green-500">+5.1%</p>
//                 </div>
//                 <div className="p-4 bg-gray-100 rounded-lg text-center">
//                   <h3 className="text-lg font-semibold">New Students</h3>
//                   <p className="text-2xl font-bold">318</p>
//                   <p className="text-green-500">+2.9%</p>
//                 </div>
//                 <div className="p-4 bg-gray-100 rounded-lg text-center">
//                   <h3 className="text-lg font-semibold">Average Rating</h3>
//                   <p className="text-2xl font-bold">4.9/10</p>
//                   <p className="text-green-500">+0.7%</p>
//                 </div>
//               </div>
//               <div className="bg-gray-50 p-4 rounded-lg mb-6">
//                 <h3 className="font-bold text-lg mb-4">Classes Activity</h3>
//                 {/* Placeholder for chart */}
//                 <div className="h-48 bg-gray-200 rounded-lg"></div>
//               </div>
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h3 className="font-bold text-lg mb-4">Payment History</h3>
//                 <div className="overflow-auto">
//                   <table className="min-w-full bg-white">
//                     <thead>
//                       <tr>
//                         <th className="py-2 px-4 border-b border-gray-200 text-left">Student</th>
//                         <th className="py-2 px-4 border-b border-gray-200 text-left">Course</th>
//                         <th className="py-2 px-4 border-b border-gray-200 text-left">Date</th>
//                         <th className="py-2 px-4 border-b border-gray-200 text-right">Amount</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td className="py-2 px-4 border-b border-gray-200">Kristin Watson</td>
//                         <td className="py-2 px-4 border-b border-gray-200">English Language Arts</td>
//                         <td className="py-2 px-4 border-b border-gray-200">12 Jan 2023</td>
//                         <td className="py-2 px-4 border-b border-gray-200 text-right">$129.00</td>
//                       </tr>
//                       <tr>
//                         <td className="py-2 px-4 border-b border-gray-200">Barbara Cooper</td>
//                         <td className="py-2 px-4 border-b border-gray-200">Math</td>
//                         <td className="py-2 px-4 border-b border-gray-200">12 Jan 2023</td>
//                         <td className="py-2 px-4 border-b border-gray-200 text-right">$165.00</td>
//                       </tr>
//                       {/* Add more rows as needed */}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white shadow-lg rounded-lg p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-xl font-bold">Account Info</h3>
//               <button className="text-blue-500 hover:underline">
//                 <FontAwesomeIcon icon={faEdit} /> Edit profile
//               </button>
//             </div>
//             <div className="text-center mb-6">
//               <img src={profilePicture} alt="Teacher" className="w-24 h-24 rounded-full mx-auto mb-4" />
//               <h4 className="font-bold text-lg">Thushari Rajasekara</h4>
//               <p className="text-gray-500">Senior Teacher at Kingswood College</p>
//             </div>
//             <div className="mb-6">
//               <p className="text-gray-700 mb-2">
//                 Hello, my name is Thushari Rajasekara. I came from Gampaha. I graduated from DoMi and got a PhD degree. My major is Academic Studies. I have 6 years of teaching experience.
//               </p>
//             </div>
//             <div className="mb-6">
//               <p className="font-bold">Contact Information</p>
//               <p className="text-gray-700">thushari@gamil.com</p>
//               <p className="text-gray-700">+94 77568769</p>
//             </div>
//             <div className="flex items-center justify-between mb-6">
//               <p className="font-bold">Open to work</p>
//               <label className="relative inline-flex items-center cursor-pointer">
//                 <input type="checkbox" value="" className="sr-only peer" checked />
//                 <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
//               </label>
//             </div>
//             <div className="text-center">
//               <button className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg transition transform hover:scale-105">
//                 Manage Subscriptions
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TeacherProfile;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChartBar, faCreditCard, faUser, faEdit } from '@fortawesome/free-solid-svg-icons';
// import profilePicture from '../../assets/TEACHER.jpg'; // Default profile picture

// const TeacherProfile = () => {
//   const [teacher, setTeacher] = useState({});
//   const [showEditForm, setShowEditForm] = useState(false);
//   const user = localStorage.getItem("user");
//   const parsedUser = JSON.parse(user); // Convert JSON string to object
  
//   console.log("Parsed User", parsedUser); // This will display the object
//   console.log("User Role", parsedUser.role); // Access the role property
  
//   useEffect(() => {
//     const fetchTeacherData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/teacher/teacherId`);
//         setTeacher(response.data);
//       } catch (error) {
//         console.error("Error fetching teacher data:", error);
//       }
//     };
//     fetchTeacherData();
//   }, []);

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.put(`http://localhost:3000/teacher/${teacher.id}`, teacher);
//       setTeacher(response.data);
//       setShowEditForm(false);
      
 
//     } catch (error) {
//       console.error("Error updating teacher data:", error);
//     }
//   };

//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen md:ml-64 ml-0">
//       {/* Profile display */}
//       <div className="flex-grow p-4">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2 bg-white shadow-lg rounded-lg p-6 mb-8">
//             <h2 className="text-2xl font-bold mb-4">Teacher Profile</h2>
//             <p className="text-gray-500 mb-6">Welcome, {teacher.name || "Teacher"}!</p>
//             {/* Profile data */}
//             <div className="bg-gray-50 p-4 rounded-lg">
//               <h3 className="font-bold text-lg mb-4">Classes Activity</h3>
//               {/* Chart placeholder */}
//               <div className="h-48 bg-gray-200 rounded-lg"></div>
//             </div>
            
//           </div>
//           {/* Account Info */}
//           <div className="bg-white shadow-lg rounded-lg p-6">
//             <div>
//               {/* Edit Profile Button */}
//               <button onClick={() => setShowEditForm(true)} className="text-blue-500 hover:underline">
//                 <FontAwesomeIcon icon={faEdit} /> Edit profile
//               </button>
//             </div>
//             <div className="text-center mb-6">
//               <img src={profilePicture} alt="Teacher" className="w-24 h-24 rounded-full mx-auto mb-4" />
//               <h4 className="font-bold text-lg">{teacher.name}</h4>
//               <p className="text-gray-500">{teacher.description || "Add a description"}</p>
//             </div>
//             <div className="mb-6">
//               <p className="font-bold">Contact Information</p>
//               <p className="text-gray-500">{teacher.email}</p>
//               <p className="text-gray-500">{teacher.contact || "Add a contact number"}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Edit Profile Form Modal */}
//       {showEditForm && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <form onSubmit={handleEditSubmit} className="bg-white p-6 rounded-lg w-80">
//             <h3 className="text-lg font-bold mb-4">Edit Profile</h3>
//             <label>
//               Name:
//               <input
//                 type="text"
//                 value={teacher.name || ''}
//                 onChange={(e) => setTeacher({ ...teacher, name: e.target.value })}
//                 className="w-full p-2 mt-2 border rounded"
//               />
//             </label>
//             <label>
//               Description:
//               <input
//                 type="text"
//                 value={teacher.description || ''}
//                 onChange={(e) => setTeacher({ ...teacher, description: e.target.value })}
//                 className="w-full p-2 mt-2 border rounded"
//               />
//             </label>
//             <label>
//               Contact:
//               <input
//                 type="text"
//                 value={teacher.contact || ''}
//                 onChange={(e) => setTeacher({ ...teacher, contact: e.target.value })}
//                 className="w-full p-2 mt-2 border rounded"
//               />
//             </label>
//             <div className="mt-4 flex justify-between">
//               <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//                 Save
//               </button>
//               <button onClick={() => setShowEditForm(false)} className="text-red-500">Cancel</button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TeacherProfile;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faBell, faChalkboardTeacher, faEnvelope, faEdit } from '@fortawesome/free-solid-svg-icons';
import profilePicture from '../../assets/TEACHER.jpg'; // Default profile picture

const TeacherProfile = () => {
  const [teacher, setTeacher] = useState({});
  const [showEditForm, setShowEditForm] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [performanceMetrics, setPerformanceMetrics] = useState(null);

  const user = localStorage.getItem('user');
  const parsedUser = JSON.parse(user); // Convert JSON string to object

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/teacher/${parsedUser.id}`);
        setTeacher(response.data);
      } catch (error) {
        console.error('Error fetching teacher data:', error);
      }
    };

    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/notifications`);
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    const fetchUpcomingClasses = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/upcoming-classes`);
        setUpcomingClasses(response.data);
      } catch (error) {
        console.error('Error fetching upcoming classes:', error);
      }
    };

    const fetchPerformanceMetrics = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/performance-metrics`);
        setPerformanceMetrics(response.data);
      } catch (error) {
        console.error('Error fetching performance metrics:', error);
      }
    };

    fetchTeacherData();
    fetchNotifications();
    fetchUpcomingClasses();
    fetchPerformanceMetrics();
  }, [parsedUser.id]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/teacher/${teacher.id}`, teacher);
      setTeacher(response.data);
      setShowEditForm(false);
    } catch (error) {
      console.error('Error updating teacher data:', error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen md:ml-64 ml-0">
      {/* Profile display */}
      <div className="flex-grow p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white shadow-lg rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Teacher Profile</h2>
            <p className="text-gray-500 mb-6">Welcome, {teacher.name || 'Teacher'}!</p>

            {/* Performance Metrics */}
            <div className="bg-gray-50 p-4 rounded-lg mb-8">
              <h3 className="font-bold text-lg mb-4">Performance Metrics</h3>
              <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                {performanceMetrics ? (
                  <p>{performanceMetrics.summary}</p>
                ) : (
                  <p>Loading metrics...</p>
                )}
              </div>
            </div>

            {/* Upcoming Schedule */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
              <h3 className="font-bold text-lg mb-4">Upcoming Schedule</h3>
              <ul>
                {upcomingClasses.map((cls) => (
                  <li key={cls.id} className="mb-2">
                    {cls.name} - {cls.time}
                  </li>
                ))}
              </ul>
            </div>

            {/* Notifications */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="font-bold text-lg mb-4">Notifications</h3>
              <ul>
                {notifications.map((notification) => (
                  <li key={notification.id} className="mb-2">
                    {notification.message}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div>
              {/* Edit Profile Button */}
              <button onClick={() => setShowEditForm(true)} className="text-blue-500 hover:underline">
                <FontAwesomeIcon icon={faEdit} /> Edit profile
              </button>
            </div>
            <div className="text-center mb-6">
              <img src={profilePicture} alt="Teacher" className="w-24 h-24 rounded-full mx-auto mb-4" />
              <h4 className="font-bold text-lg">{teacher.name}</h4>
              <p className="text-gray-500">{teacher.description || 'Add a description'}</p>
            </div>
            <div className="mb-6">
              <p className="font-bold">Contact Information</p>
              <p className="text-gray-500">{teacher.email}</p>
              <p className="text-gray-500">{teacher.contact || 'Add a contact number'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Form Modal */}
      {showEditForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <form onSubmit={handleEditSubmit} className="bg-white p-6 rounded-lg w-80">
            <h3 className="text-lg font-bold mb-4">Edit Profile</h3>
            <label>
              Name:
              <input
                type="text"
                value={teacher.name || ''}
                onChange={(e) => setTeacher({ ...teacher, name: e.target.value })}
                className="w-full p-2 mt-2 border rounded"
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                value={teacher.description || ''}
                onChange={(e) => setTeacher({ ...teacher, description: e.target.value })}
                className="w-full p-2 mt-2 border rounded"
              />
            </label>
            <label>
              Contact:
              <input
                type="text"
                value={teacher.contact || ''}
                onChange={(e) => setTeacher({ ...teacher, contact: e.target.value })}
                className="w-full p-2 mt-2 border rounded"
              />
            </label>
            <div className="mt-4 flex justify-between">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Save
              </button>
              <button onClick={() => setShowEditForm(false)} className="text-red-500">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default TeacherProfile;

