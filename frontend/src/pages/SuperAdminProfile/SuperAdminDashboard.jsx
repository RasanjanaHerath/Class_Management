import React, { useState,useEffect } from "react";
import { Tab, Tabs, Box } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import Calendar from "react-calendar"; // Ensure this line is at the top
import axios from 'axios';

const SuperAdminDashboard = () => {
  const [tabIndexNotifications, setTabIndexNotifications] = useState(0); // For Notifications & Messages tabs
  const [tabIndexInstitutes, setTabIndexInstitutes] = useState(0); // For Popular Institutes & Teachers tabs

  const [userData,setUserData] = useState([]);
  const [totalInstitutes, setTotalInstitutes] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalApprovedinstitutes, setTotalApprovedinstitutes] = useState(0);
  const [totalPendinginstitutes, setTotalPendinginstitutes] = useState(0);




  const genderData = [
    { name: "Male", value: 55 },
    { name: "Female", value: 45 },
  ];

  const studentAttendance = [
    { name: "Week 1", attendance: 80 },
    { name: "Week 2", attendance: 75 },
    { name: "Week 3", attendance: 85 },
    { name: "Week 4", attendance: 90 },
  ];

  const totalIncome = 50000;

  const popularInstitutes = ["Institute A", "Institute B", "Institute C"];
  const popularTeachers = ["Teacher 1", "Teacher 2", "Teacher 3"];

  const feedbackData = [
    { name: "John Doe", rating: 4, feedback: "Great platform, very user-friendly!" },
    { name: "Jane Smith", rating: 5, feedback: "Excellent tools for managing classes." },
    { name: "Mark Lee", rating: 3, feedback: "Good, but needs more customization options." },
  ];

  // Handle tab change for Notifications & Messages
  const handleTabChangeNotifications = (event, newValue) => {
    setTabIndexNotifications(newValue);
  };

  // Handle tab change for Popular Institutes & Teachers
  const handleTabChangeInstitutes = (event, newValue) => {
    setTabIndexInstitutes(newValue);
  };

  useEffect(() => {
    document.title = "Dashboard | Super Admin";
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/api/admin/statistics')
      .then((response) => {
        setTotalInstitutes(response.data.totalInstitutes);
        setTotalTeachers(response.data.totalTeachers);
        setTotalStudents(response.data.totalStudents);
        setTotalApprovedinstitutes(response.data.approvedinstitutes);
        setTotalPendinginstitutes(response.data.rejectedInstitutes);
        console.log(response.data);
        // Update userData for the pie chart
        setUserData([
          { name: "Active", value: response.data.approvedInstitutes },
          { name: "Pending", value: response.data.rejectedInstitutes }
        ]);

      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:ml-64">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-semibold text-gray-700">Total Institutes</h3>
          <p className="text-3xl font-bold text-indigo-600">{totalInstitutes}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-semibold text-gray-700">Total Teachers</h3>
          <p className="text-3xl font-bold text-green-600">{totalTeachers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-semibold text-gray-700">Total Students</h3>
          <p className="text-3xl font-bold text-blue-600">{totalStudents}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-semibold text-gray-700">Total Income</h3>
          <p className="text-3xl font-bold text-yellow-600">${totalIncome}</p>
        </div>
      </div>

      {/* First Row: Gender, Active/Inactive Users, Student Attendance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Students by Gender</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={genderData} dataKey="value" nameKey="name" outerRadius={100} fill="#8884d8">
                {genderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? "#1E40AF" : "#F59E0B"} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Active/Inactive Institutes</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={userData} dataKey="value" nameKey="name" outerRadius={100} fill="#8884d8">
                {userData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? "#4CAF50" : "#FF6347"} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Student Attendance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={studentAttendance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="attendance" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Popular Institutes & Teachers</h2>
          <Tabs value={tabIndexInstitutes} onChange={handleTabChangeInstitutes} centered>
            <Tab label="Institutes" />
            <Tab label="Teachers" />
          </Tabs>

          <Box sx={{ padding: 3 }}>
            {/* Tab Panel 1: Popular Institutes */}
            {tabIndexInstitutes === 0 && (
              <div>
                <ul className="space-y-2">
                  {popularInstitutes.map((institute, index) => (
                    <li key={index} className="text-gray-600">{institute}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tab Panel 2: Popular Teachers */}
            {tabIndexInstitutes === 1 && (
              <div>
                <ul className="space-y-2">
                  {popularTeachers.map((teacher, index) => (
                    <li key={index} className="text-gray-600">{teacher}</li>
                  ))}
                </ul>
              </div>
            )}
          </Box>
        </div>
      </div>

      {/* Second Row: Notifications, Messages, Popular Institutes & Teachers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Notifications and Messages */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full lg:w-3/3">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Notifications & Messages</h2>
          <Tabs value={tabIndexNotifications} onChange={handleTabChangeNotifications} centered>
            <Tab label="Notifications" />
            <Tab label="Messages" />
          </Tabs>

          <Box sx={{ padding: 3 }}>
            {/* Tab Panel 1: Notifications */}
            {tabIndexNotifications === 0 && (
              <div>
                <ul className="space-y-4">
                  <li className="flex justify-between">
                    <span className="font-semibold">New Registration: John Doe</span>
                    <span className="text-sm text-gray-500">5 mins ago</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-semibold">System Update: New Features</span>
                    <span className="text-sm text-gray-500">10 mins ago</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-semibold">User Approved: Jane Smith</span>
                    <span className="text-sm text-gray-500">30 mins ago</span>
                  </li>
                </ul>
              </div>
            )}

            {/* Tab Panel 2: Messages */}
            {tabIndexNotifications === 1 && (
              <div>
                <ul className="space-y-4">
                  <li className="flex justify-between">
                    <span className="font-semibold">Message from Admin: Welcome</span>
                    <span className="text-sm text-gray-500">10 mins ago</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-semibold">Message from Teacher: Homework</span>
                    <span className="text-sm text-gray-500">20 mins ago</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-semibold">Message from Student: Query</span>
                    <span className="text-sm text-gray-500">1 hour ago</span>
                  </li>
                </ul>
              </div>
            )}
          </Box>
        </div>
        {/* Feedback Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Feedback</h2>
          <ul className="space-y-4">
            {feedbackData.map((feedback, index) => (
              <li key={index} className="flex justify-between">
                <div>
                  <span className="font-semibold">{feedback.name}</span>
                  <p className="text-sm text-gray-500">{feedback.feedback}</p>
                </div>
                <span className="text-lg text-yellow-500">Rating: {feedback.rating} / 5</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Event Calendar */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Upcoming events</h2>
          <div className="bg-gray-100 p-6 rounded-lg">
            <ul className="space-y-4">
              <li className="text-gray-600">Event 1 - June 15, 2023</li>
              <li className="text-gray-600">Event 2 - July 5, 2023</li>
              <li className="text-gray-600">Event 3 - August 20, 2023</li>
            </ul>
          </div>
        </div>

        {/* React Calendar */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Calendar</h2>
          <Calendar className="react-calendar rounded-lg shadow-md" />
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
