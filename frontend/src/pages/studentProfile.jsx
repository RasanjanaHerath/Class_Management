import React, { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ResultsHistogram = () => {
  const data = {
    labels: ['Science', 'Mathematics', 'Literature', 'Sinhala', 'English'],
    datasets: [
      {
        label: 'Scores',
        data: [85, 90, 75, 80, 95],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: { title: { display: true, text: 'Classes' } },
      y: { beginAtZero: true, title: { display: true, text: 'Scores' } },
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
  const BASE_URL = "http://localhost:3000/api/";
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedInstitute, setSelectedInstitute] = useState('');
  const [institutes , setInstitutes] = useState();

 // const courses = ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'History'];
 //const institutes = ['Institute 1', 'Institute 2', 'Institute 3'];

  useEffect(() => {
    axios.get(`${BASE_URL}institute`)
      .then(response => {
        setInstitutes(response.data);
      })
      .catch(error => console.error("Error fetching institutes:", error));
  }, []);



  
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEnroll = () => {
    if (selectedCourse && selectedInstitute) {
      alert(`Enrolled in ${selectedCourse} at ${selectedInstitute}`);
      setShowModal(false);
    } else {
      alert("Please select both a course and an institute.");
    }
  };

  const cardColors = ["bg-yellow-200", "bg-blue-300", "bg-green-300","bg-red-200","bg-purple-300"];


  console.log("instituesss: ",institutes)
  return (
    <div className="flex min-h-screen bg-zinc-50 gap-10 p-4 md:ml-64 ml-0">
      {/* Middle Section */}
      <div className="w-3/4 bg-gray-200 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome Student Name</h2>

        {/* Enroll in Course Button */}
        <div className="text-center mb-4">
          <button
            className="bg-blue-500 text-white py-4 px-6 rounded-md text-lg font-semibold hover:bg-blue-600"
            onClick={handleOpenModal}
          >
            Enroll in Course
          </button>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-3 gap-6 h-[calc(33.33%-50px)]">
          <Link to="/institute-1-science">
            <button className="w-full bg-gray-500 p-6 text-center font-bold rounded-lg shadow-lg hover:bg-gray-400">
              Institute 1 <br /> Science
            </button>
          </Link>
          <Link to="/institute-2-mathematics">
            <button className="w-full bg-gray-500 p-6 text-center font-bold rounded-lg shadow-lg hover:bg-gray-400">
              Institute 2 <br /> Mathematics
            </button>
          </Link>
          <Link to="/institute-3-science">
            <button className="w-full bg-gray-500 p-6 text-center font-bold rounded-lg shadow-lg hover:bg-gray-400">
              Institute 3 <br /> Science
            </button>
          </Link>
          <Link to="/institute-2-literature">
            <button className="w-full bg-gray-500 p-6 text-center font-bold rounded-lg shadow-lg hover:bg-gray-400">
              Institute 2 <br /> Literature
            </button>
          </Link>
          <Link to="/institute-3-sinhala">
            <button className="w-full bg-gray-500 p-6 text-center font-bold rounded-lg shadow-lg hover:bg-gray-400">
              Institute 3 <br /> Sinhala
            </button>
          </Link>
        </div>

        <div className="h-2/3 bg-gray-600 p-2 mt-5 flex-grow rounded-lg">
          <ResultsHistogram />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/4 bg-gray-200 p-4 rounded-lg">
        <div className="flex flex-col items-center mb-4 gap-7">
          <div className="w-24 h-24 rounded-full bg-gray-400 mb-4 "></div>
          <h3 className="text-lg font-bold mb-2">Student Name</h3>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Student ID Number:</p>
          <p>123456789</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">NIC Number:</p>
          <p>987654321V</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Mobile Number:</p>
          <p>+94 771234567</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Parents' Number:</p>
          <p>+94 771234568</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Address:</p>
          <p>123, Street Name, City</p>
        </div>
      </div>

      {/* Enroll in Course Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Enroll in a Course</h2>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Select City:</label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
              >
                <option value="">Choose City</option>
                {institutes.map((institute) => (
                  <option key={institute.id} value={institute}>
                    {institute.city}
                  </option>
                ))}
              </select>
            </div>

            {/* Institute Dropdown */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Select an Institute:</label>
              <select
                value={selectedInstitute}
                onChange={(e) => setSelectedInstitute(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
              >
                <option value="">Choose an institute</option>
                {institutes.map((institute) => (
                  <option key={institute.id} value={institute} >
                    {institute.name}
                  </option>
                ))}
                
              </select>
            </div>

            {/* Course Dropdown */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Select Class:</label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
              >
                <option value="">Choose a course</option>
                {institutes.map((institute) => (
                  <option key={institute.id} value={institute}>
                    {institute.classes}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-between">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                onClick={handleCloseModal}
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
