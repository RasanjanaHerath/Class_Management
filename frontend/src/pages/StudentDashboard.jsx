import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BASE_URL = "http://localhost:3000/api/";

const DashboardPage = () => {
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [assignmentMarks, setAssignmentMarks] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchEnrolledClasses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}class_card/get-all-my`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEnrolledClasses(response.data);

        // Fetch assignment marks for each enrolled class
        const marksPromises = response.data.map((cls) =>
          axios.get(`${BASE_URL}assignments/marks/${cls.classObject.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        );
        const marksResponses = await Promise.all(marksPromises);
        const marks = marksResponses.map((res) => res.data.mark || 0);
        setAssignmentMarks(marks);

        // Fetch attendance percentages for each enrolled class
        const attendancePromises = response.data.map((cls) =>
          axios.get(`${BASE_URL}attendance/percentage/${cls.classObject.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        );
        const attendanceResponses = await Promise.all(attendancePromises);
        const attendance = attendanceResponses.map((res) => res.data.percentage || 0);
        setAttendanceData(attendance);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchEnrolledClasses();
  }, []);

  // Prepare data for the histogram
  const histogramData = {
    labels: enrolledClasses.map((cls) => cls.classObject.subject),
    datasets: [
      {
        label: "Assignment Marks",
        data: assignmentMarks,
        backgroundColor: [
          "rgba(255, 206, 86, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const histogramOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Last Assignment Marks",
      },
    },
    scales: {
      x: { title: { display: true, text: "Classes" } },
      y: { beginAtZero: true, title: { display: true, text: "Marks" } },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center md:ml-64 ml-0">
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>

      {/* Histogram Section */}
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md mb-8">
        <Bar data={histogramData} options={histogramOptions} />
      </div>

      {/* Attendance Section */}
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Attendance Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enrolledClasses.map((cls, index) => (
            <div
              key={cls.id}
              className="bg-gray-200 p-4 rounded-lg shadow-md text-center"
            >
              <h3 className="text-xl font-semibold mb-2">
                {cls.classObject.subject} - Grade {cls.classObject.grade}
              </h3>
              <p>
                Attendance:{" "}
                <span className="font-bold">
                  {attendanceData[index] || 0}%
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
