import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ResultsHistogram = () => {
  const data = {
    labels: ["Science", "Mathematics", "Literature", "Sinhala", "English"],
    datasets: [
      {
        label: "Scores",
        data: [85, 90, 75, 80, 95],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: { title: { display: true, text: "Classes" } },
      y: { beginAtZero: true, title: { display: true, text: "Scores" } },
    },
  };

  return (
    <div className="bg-gray-200 rounded-lg shadow-md h-300">
      <h2 className="text-xl font-bold mb-4 text-center">Last Exam Results</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

const StudentProfile = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedInstitute, setSelectedInstitute] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [cities, setCities] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from localStorage
    const userItem = localStorage.getItem("user");
    const userData = userItem ? JSON.parse(userItem) : null;
    setUser(userData);

    // Fetch cities data
    axios.get("http://localhost:3000/api/cities")
      .then((response) => {
        setCities(response.data);
      })
      .catch((error) => console.error("Error fetching cities:", error));
  }, []);

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setSelectedInstitute("");
    setSelectedCourse("");
    setSelectedTeacher("");

    axios.get(`http://localhost:3000/api/institutes?city=${city}`)
      .then((response) => {
        setInstitutes(response.data);
      })
      .catch((error) => console.error("Error fetching institutes:", error));
  };

  const handleInstituteChange = (institute) => {
    setSelectedInstitute(institute);
    setSelectedCourse("");
    setSelectedTeacher("");

    axios.get(`http://localhost:3000/api/courses?institute=${institute}`)
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => console.error("Error fetching courses:", error));
  };

  const handleCourseChange = (course) => {
    setSelectedCourse(course);
    setSelectedTeacher("");

    axios.get(`http://localhost:3000/api/teachers?course=${course}`)
      .then((response) => {
        setTeachers(response.data);
      })
      .catch((error) => console.error("Error fetching teachers:", error));
  };

  const handleEnroll = () => {
    if (selectedCity && selectedInstitute && selectedCourse && selectedTeacher) {
      alert(
        `Enrolled in ${selectedCourse} at ${selectedInstitute} with ${selectedTeacher}`
      );
      setShowModal(false);
    } else {
      alert("Please complete all selections before enrolling.");
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-50 gap-10 p-4 md:ml-64 ml-0">
      <div className="w-3/4 bg-gray-200 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Welcome {user ? user.firstName : "Guest"}
        </h2>

        <div className="text-center mb-4">
          <button
            className="bg-blue-500 text-white py-4 px-6 rounded-md text-lg font-semibold hover:bg-blue-600"
            onClick={() => setShowModal(true)}
          >
            Enroll in Course
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6 h-[calc(33.33%-50px)]">
          {institutes.flatMap((inst) =>
            courses.map((course, index) => (
              <Link
                to={`/institute-${inst.id}-${course.name.toLowerCase()}`}
                key={`${inst.id}-${course.name}-${index}`}
              >
                <button className="w-full bg-gray-500 p-6 text-center font-bold rounded-lg shadow-lg hover:bg-gray-400">
                  {inst.city} <br /> {inst.name} <br /> {course.name}
                </button>
              </Link>
            ))
          )}
        </div>

        <div className="h-2/3 bg-gray-600 p-2 mt-5 flex-grow rounded-lg">
          <ResultsHistogram />
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Enroll in a Course</h2>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Select City:</label>
              <select
                value={selectedCity}
                onChange={(e) => handleCityChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
              >
                <option value="">Choose City</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Select Institute:</label>
              <select
                value={selectedInstitute}
                onChange={(e) => handleInstituteChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
              >
                <option value="">Choose Institute</option>
                {institutes.map((inst) => (
                  <option key={inst.id} value={inst.name}>{inst.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Select Class:</label>
              <select
                value={selectedCourse}
                onChange={(e) => handleCourseChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
              >
                <option value="">Choose Class</option>
                {courses.map((course, index) => (
                  <option key={index} value={course.name}>{course.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Select Teacher:</label>
              <select
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
              >
                <option value="">Choose Teacher</option>
                {teachers.map((teacher, index) => (
                  <option key={index} value={teacher}>{teacher}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-between">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={handleEnroll}
              >
                Enroll
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
