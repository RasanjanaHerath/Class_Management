import React, { useState, useEffect } from "react";
import axios from "axios";

const MarkAttendance = () => {
  const BASE_URL = "http://localhost:3000/api"; 
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedInstitute, setSelectedInstitute] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const userr = JSON.parse(localStorage.getItem("user"));
      console.log(userr.id);
      const user = await axios.get(`http://localhost:3000/api/user/getById/${userr.id}`, {
        role: "institute"
      });
      console.log(user.data);
      const instituteId = user.data.institute?.id;
      console.log(instituteId);

      if (!instituteId) {
        return;
      }

      const result = await axios.get(`http://localhost:3000/api/class/get-all-by-inst/${instituteId}`);
      console.log(result.data);
      setClasses(result.data);
    };

    fetchUserData();
  }, []);

  const fetchClasses = (instituteId) => {
    setSelectedClass("");
    setStudents([]);
    axios
      .get(`${BASE_URL}/class?institute=${instituteId}`)
      .then((response) => setClasses(response.data))
      .catch((error) => console.error("Error fetching classes:", error));
  };

  const fetchStudents = (classId) => {
    setAttendance({});
    axios
      .get(`http://localhost:3000/api/class_card/get-students-by-class/${classId}`)
      .then((response) => {
        const students = response.data.map((student) => ({
          id: student.student.id,
          name: student.student.user.firstName,
        }));
        setStudents(students);
      })
      .catch((error) => console.error("Error fetching students:", error));
  };

  const handleAttendanceChange = (studentId) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  };

  const handleSubmit = () => {
    const presentStudents = Object.entries(attendance)
      .filter(([id, isPresent]) => isPresent)
      .map(([id]) => id);

    axios
      .post(`${BASE_URL}/attendance`, {
        instituteId: selectedInstitute,
        classId: selectedClass,
        students: presentStudents,
      })
      .then(() => alert("Attendance submitted successfully!"))
      .catch((error) => console.error("Error submitting attendance:", error));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center ml:md-64 ml-0">


      {/* Class Selector */}
      <div className="mb-4 w-full max-w-md">
        <label htmlFor="class" className="block text-gray-800 font-bold mb-2">
          Select Class:
        </label>
        <select
          id="class"
          value={selectedClass}
          onChange={(e) => {
            setSelectedClass(e.target.value);
            fetchStudents(e.target.value);
          }}
          className="w-full p-3 border border-gray-300 rounded-md"
        >
          <option value="">Choose Class</option>
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.subject}
            </option>
          ))}
        </select>
      </div>

      {/* Attendance List */}
      {students.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Attendance for Class {selectedClass}
          </h2>
          <ul className="divide-y divide-gray-200">
            {students.map((student) => (
              <li key={student.id} className="flex justify-between items-center py-4">
                <span className="text-lg font-medium text-gray-700">{student.name}</span>
                <input
                  type="checkbox"
                  checked={attendance[student.id] || false}
                  onChange={() => handleAttendanceChange(student.id)}
                  className="w-6 h-6"
                />
              </li>
            ))}
          </ul>
          <div className="text-center mt-6">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-600"
            >
              Submit Attendance
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarkAttendance;
