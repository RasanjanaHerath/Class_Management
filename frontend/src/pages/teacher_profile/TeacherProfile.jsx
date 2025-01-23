
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChartBar, faBell, faChalkboardTeacher, faEnvelope, faEdit } from '@fortawesome/free-solid-svg-icons';
// import profilePicture from '../../assets/TEACHER.jpg'; // Default profile picture

// const TeacherProfile = () => {
//   const [teacher, setTeacher] = useState({});
//   const [showEditForm, setShowEditForm] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [upcomingClasses, setUpcomingClasses] = useState([]);
//   const [performanceMetrics, setPerformanceMetrics] = useState(null);

//   const user = localStorage.getItem('user');
//   const parsedUser = JSON.parse(user); // Convert JSON string to object

//   useEffect(() => {
//     const fetchTeacherData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/teacher/${parsedUser.id}`);
//         setTeacher(response.data);
//       } catch (error) {
//         console.error('Error fetching teacher data:', error);
//       }
//     };

//     const fetchNotifications = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/notifications`);
//         setNotifications(response.data);
//       } catch (error) {
//         console.error('Error fetching notifications:', error);
//       }
//     };

//     const fetchUpcomingClasses = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/upcoming-classes`);
//         setUpcomingClasses(response.data);
//       } catch (error) {
//         console.error('Error fetching upcoming classes:', error);
//       }
//     };

//     const fetchPerformanceMetrics = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/performance-metrics`);
//         setPerformanceMetrics(response.data);
//       } catch (error) {
//         console.error('Error fetching performance metrics:', error);
//       }
//     };

//     fetchTeacherData();
//     fetchNotifications();
//     fetchUpcomingClasses();
//     fetchPerformanceMetrics();
//   }, [parsedUser.id]);

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.put(`http://localhost:3000/teacher/${teacher.id}`, teacher);
//       setTeacher(response.data);
//       setShowEditForm(false);
//     } catch (error) {
//       console.error('Error updating teacher data:', error);
//     }
//   };

//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen md:ml-64 ml-0">
//       {/* Profile display */}
//       <div className="flex-grow p-4">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2 bg-white shadow-lg rounded-lg p-6 mb-8">
//             <h2 className="text-2xl font-bold mb-4">Teacher Profile</h2>
//             <p className="text-gray-500 mb-6">Welcome, {teacher.name || 'Teacher'}!</p>

//             {/* Performance Metrics */}
//             <div className="bg-gray-50 p-4 rounded-lg mb-8">
//               <h3 className="font-bold text-lg mb-4">Performance Metrics</h3>
//               <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
//                 {performanceMetrics ? (
//                   <p>{performanceMetrics.summary}</p>
//                 ) : (
//                   <p>Loading metrics...</p>
//                 )}
//               </div>
//             </div>

//             {/* Upcoming Schedule */}
//             <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
//               <h3 className="font-bold text-lg mb-4">Upcoming Schedule</h3>
//               <ul>
//                 {upcomingClasses.map((cls) => (
//                   <li key={cls.id} className="mb-2">
//                     {cls.name} - {cls.time}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Notifications */}
//             <div className="bg-white shadow-lg rounded-lg p-6">
//               <h3 className="font-bold text-lg mb-4">Notifications</h3>
//               <ul>
//                 {notifications.map((notification) => (
//                   <li key={notification.id} className="mb-2">
//                     {notification.message}
//                   </li>
//                 ))}
//               </ul>
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
//               <p className="text-gray-500">{teacher.description || 'Add a description'}</p>
//             </div>
//             <div className="mb-6">
//               <p className="font-bold">Contact Information</p>
//               <p className="text-gray-500">{teacher.email}</p>
//               <p className="text-gray-500">{teacher.contact || 'Add a contact number'}</p>
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
//               <button onClick={() => setShowEditForm(false)} className="text-red-500">
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TeacherProfile;

import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the calendar styles
import axios from 'axios';

const Dashboard = () => {
  const [totalStudents, setTotalStudents] = useState();
  const [totalClasses, setTotalClasses] = useState();
  const [monthlyIncome, setMonthlyIncome] = useState(50000);
  const [attendanceData, setAttendanceData] = useState([
    { className: 'Math', attendance: 85 },
    { className: 'Science', attendance: 90 },
    { className: 'History', attendance: 80 },
    { className: 'Geography', attendance: 75 }
  ]); // Current month's attendance per class
  const [attendanceComparison, setAttendanceComparison] = useState([
    { month: 'Jan', Math: 85, Science: 90, History: 80, Geography: 75 },
    { month: 'Feb', Math: 87, Science: 92, History: 78, Geography: 76 },
    { month: 'Mar', Math: 90, Science: 95, History: 85, Geography: 78 }
  ]); // Attendance comparison of different months
  const [studentsByGender, setStudentsByGender] = useState([
    { name: 'Male', value: 2000 },
    { name: 'Female', value: 1500 }
  ]);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New Registration: John Doe' },
    { id: 2, message: 'System Update: New Features' },
    { id: 3, message: 'User Approved: Jane Smith' }
  ]);
  const [upcomingClasses, setUpcomingClasses] = useState([
    { date: '2025-01-15', startTime: '10:00 AM', endTime: '12:00 PM', name: 'Math Class' },
    { date: '2025-01-16', startTime: '2:00 PM', endTime: '4:00 PM', name: 'Science Class' },
    { date: '2025-01-17', startTime: '9:00 AM', endTime: '11:00 AM', name: 'History Class' }
  ]);

  useEffect(() => {

    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:3000/api/teacher/get-stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      })
      .then((response) => {
      console.log(response.data);
      setTotalClasses(response.data.totalClasses);
      setTotalStudents(response.data.totalStudents);
      })
      .catch((error) => {
      console.error("Error fetching institute statistics:", error);
      });
  }, []);
  return (
    <div className="flex flex-col lg:flex-row min-h-screen p-6 bg-gray-100 md:ml-64 ml-0 h-full">
      {/* Main Content */}
      <div className="flex-grow bg-white p-6 shadow-lg rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-6">Teacher Dashboard</h2>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          {/* Total Students */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="font-bold text-xl mb-4">Total Students</h3>
            <p className="text-2xl font-semibold">{totalStudents}</p>
          </div>

          {/* Total Classes */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="font-bold text-xl mb-4">Total Classes</h3>
            <p className="text-2xl font-semibold">{totalClasses}</p>
          </div>

          {/* Total Income */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="font-bold text-xl mb-4">Total Income</h3>
            <p className="text-2xl font-semibold">Rs.{monthlyIncome}</p>
          </div>  
        </div>

        {/* Students by Gender and Notifications */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
     
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="font-bold text-lg mb-4">Students by Gender</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={studentsByGender}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  fill="#8884d8"
                >
                  <Cell key="male" fill="#4CAF50" />
                  <Cell key="female" fill="#FF6347" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

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
        </div> */}

        {/* Attendance Graphs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Current Month Attendance per Class (Bar Chart) */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="font-bold text-lg mb-4">Current Month Attendance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="className" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="attendance" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Attendance Comparison Graph for Multiple Months */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="font-bold text-lg mb-4">Attendance Comparison (Past 3 Months)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceComparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Math" stroke="#82ca9d" />
                <Line type="monotone" dataKey="Science" stroke="#8884d8" />
                <Line type="monotone" dataKey="History" stroke="#FF6347" />
                <Line type="monotone" dataKey="Geography" stroke="#4CAF50" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Upcoming Classes */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h3 className="font-bold text-lg mb-4">Upcoming Classes</h3>
          <ul>
            {upcomingClasses.map((cls) => (
              <li key={cls.date} className="mb-4">
                <p><strong>{cls.name}</strong></p>
                <p>{cls.date} - {cls.startTime} to {cls.endTime}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Calendar */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="font-bold text-lg mb-4">Calendar</h3>
          <Calendar className="shadow-lg rounded-lg" />
        </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;