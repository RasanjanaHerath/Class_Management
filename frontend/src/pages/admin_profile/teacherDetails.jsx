import React, { useState, useEffect } from "react";
import axios from "axios";

const TeacherDetails = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch teacher data from the API
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get("/api/teacher/");
        console.log("API Response:", response.data); // Debugging
        const data = Array.isArray(response.data) ? response.data : [];
        setTeachers(data);
      } catch (err) {
        console.error("Error fetching teachers:", err); // Debugging
        setError("Failed to fetch teachers.");
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-lg text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Teacher Details</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Teacher ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">NIC</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Qualification</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Experience</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Phone</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Subjects</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(teachers) && teachers.map((teacher, index) => (
              <tr
                key={teacher.teacherId}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="border border-gray-300 px-4 py-2">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {teacher.user?.firstName} {teacher.user?.lastName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {teacher.nic}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {teacher.qualification || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {teacher.experience || 0} years
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {teacher.phoneNumber || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {teacher.subjects || "N/A"}
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
