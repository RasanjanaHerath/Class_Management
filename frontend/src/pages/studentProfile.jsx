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

const BASE_URL = "http://localhost:3000/api/class";

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
  const [user, setUser] = useState(null);
  
  // Selection states
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedInstitute, setSelectedInstitute] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  
  // Available options states
  const [availableCities, setAvailableCities] = useState([]);
  const [availableInstitutes, setAvailableInstitutes] = useState([]);
  const [availableClasses, setAvailableClasses] = useState([]);
  const [availableTeachers, setAvailableTeachers] = useState([]);
  
  // All classes data
  const [classes, setClasses] = useState([]);
  const [myClasses, setMyClasses] = useState([]);

  useEffect(() => {
    // Fetch user data from localStorage
    const userItem = localStorage.getItem("user");
    const userData = userItem ? JSON.parse(userItem) : null;
    setUser(userData);

    // Fetch classes data
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/get-all`);
        const validClasses = response.data.filter(cls => 
          cls && 
          cls.institute && 
          cls.institute.city && 
          cls.institute.id 
        );
        setClasses(validClasses);
        
        // Extract unique cities from valid classes
        const uniqueCities = [...new Set(validClasses
          .map(cls => cls.institute?.city)
          .filter(city => city)
        )];
        setAvailableCities(uniqueCities);
      } catch (error) {
        console.error("Error fetching classes:", error);
        setClasses([]);
        setAvailableCities([]);
      }
    };

    fetchClasses();
  }, []);

  // Update institutes when city is selected
  useEffect(() => {
    if (selectedCity && classes.length > 0) {
      const filteredInstitutes = classes
        .filter(cls => cls.institute?.city === selectedCity)
        .map(cls => ({
          id: cls.institute?.id,
          name: cls.institute?.name || `Institute ${cls.institute?.id}`,
          phoneNumber: cls.institute?.phoneNumber || 'N/A'
        }))
        .filter(inst => inst.id); // Only include institutes with valid IDs
      
      // Remove duplicates based on institute ID
      const uniqueInstitutes = Array.from(
        new Map(filteredInstitutes.map(item => [item.id, item])).values()
      );
      
      setAvailableInstitutes(uniqueInstitutes);
      setSelectedInstitute("");
      setSelectedClass("");
      setSelectedTeacher("");
    }
  }, [selectedCity, classes]);

  // Update classes when institute is selected
  useEffect(() => {
    if (selectedInstitute && classes.length > 0) {
      const filteredClasses = classes.filter(
        cls => cls.institute?.id?.toString() === selectedInstitute
      );
      setAvailableClasses(filteredClasses);
      setSelectedClass("");
      setSelectedTeacher("");
    }
  }, [selectedInstitute, classes]);

  // Update teachers when class is selected
  useEffect(() => {
    if (selectedClass && availableClasses.length > 0) {
      const selectedClassData = availableClasses.find(
        cls => cls.id?.toString() === selectedClass
      );
      if (selectedClassData?.teacher) {
        setAvailableTeachers([selectedClassData.teacher]);
      } else {
        setAvailableTeachers([]);
      }
    }
  }, [selectedClass, availableClasses]);

  const handleEnroll = () => {
    if (selectedCity && selectedInstitute && selectedClass && selectedTeacher) {
      alert(
        `Enrolled in class at ${selectedCity} institute with teacher ID ${selectedTeacher}`
      );
      setShowModal(false);
      
      // Reset selections
      setSelectedCity("");
      setSelectedInstitute("");
      setSelectedClass("");
      setSelectedTeacher("");
    } else {
      alert("Please complete all selections before enrolling.");
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-50 gap-10 p-4 md:ml-64 ml-0">
      {/* Main Section */}
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
          {myClasses.map((cls) => cls && cls.institute && (
            <Link
              to={`/institute-${cls.institute.id}-${cls.subject?.toLowerCase()}`}
              key={cls.id}
            >
              <button className="w-full bg-gray-500 p-6 text-center font-bold rounded-lg shadow-lg hover:bg-gray-400">
                {cls.institute.city} <br /> 
                Institute {cls.institute.id} <br />
                {cls.subject} - Grade {cls.grade}
              </button>
            </Link>
          ))}
        </div>

        <div className="h-2/3 bg-gray-600 p-2 mt-5 flex-grow rounded-lg">
          <ResultsHistogram />
        </div>
      </div>

      {/* Enrollment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Enroll in a Course</h2>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Select City:</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
              >
                <option value="">Choose City</option>
                {availableCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Select Institute:</label>
              <select
                value={selectedInstitute}
                onChange={(e) => setSelectedInstitute(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                disabled={!selectedCity}
              >
                <option value="">Choose Institute</option>
                {availableInstitutes.map((inst) => (
                  <option key={inst.id} value={inst.id}>
                  {inst.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Select Class:</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                disabled={!selectedInstitute}
              >
                <option value="">Choose Class</option>
                {availableClasses.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.subject} - Grade {cls.grade} ({cls.scheduleDay} {cls.startTime}-{cls.endTime})
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Teacher:</label>
              <select
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                disabled={!selectedClass}
              >
                <option value="">Choose Teacher</option>
                {availableTeachers.map((teacher) => (
                  <option key={teacher.teacherId} value={teacher.teacherId}>
                    {teacher.name}
                  </option>
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
                disabled={!selectedTeacher}
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