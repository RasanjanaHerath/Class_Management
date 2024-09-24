import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,faSignOutAlt, faUserGraduate,faCreditCard, faChalkboardTeacher, faCog,faClipboardList,faChartBar,faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Histogram component
const ResultsHistogram = () => {
  // Sample data for histogram
  const data = {
    labels: ['Science', 'Mathematics', 'Literature', 'Sinhala', 'English'], // X-axis (classes)
    datasets: [
      {
        label: 'Scores',
        data: [85, 90, 75, 80, 95], // Sample scores
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Bar color
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Classes',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Scores',
        },
      },
    },
  };

  return (
    <div className="bg-gray-200 rounded-lg shadow-md h-300">
      <h2 className="text-xl font-bold mb-4 text-center">Class Results</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

const StudentProfile = () => {

  // const [date, setDate] = useState(new Date());
  return (
    <div className="flex min-h-screen bg-zinc-50 gap-10 p-4 md:ml-64 ml-0">
      {/* Sidebar
      <div className="w-1/8 bg-gray-200 p-4 flex flex-col gap-8 rounded-lg ">
        <h2 className="text-lg font-bold mb-4">Student Dashboard</h2>
        <Link to="/home" className="mb-4">
          <button className="w-full py-2 px-4 bg-blue-400 text-white rounded-md hover:bg-blue-600">
          <FontAwesomeIcon icon={faHome} />
           Home
          </button>
        </Link>
        <Link to="/lms" className="mb-4">
          <button className="w-full py-2 px-4 bg-blue-400 text-white rounded-md hover:bg-blue-600">
          <FontAwesomeIcon icon={faUserGraduate} />
            LMS
          </button>
        </Link>
        <Link to="/upcoming-exams" className="mb-4">
          <button className="w-full py-2 px-4 bg-blue-400 text-white rounded-md hover:bg-blue-600">
          <FontAwesomeIcon icon={faClipboardList} />
            Upcoming Exams
            
          </button>
        </Link>
        <Link to="/results" className="mb-4">
          <button className="w-full py-2 px-4 bg-blue-400 text-white rounded-md hover:bg-blue-600">
          <FontAwesomeIcon icon={faChartBar} />
            Results
          </button>
        </Link>
        <Link to="/attendance" className="mb-4">
          <button className="w-full py-2 px-4 bg-blue-400 text-white rounded-md hover:bg-blue-600">
          <FontAwesomeIcon icon={faUserCheck} />
            Attendance
          </button>
        </Link>
        <Link to="/payments-history" className="mb-4">
          <button className="w-full py-2 px-4 bg-blue-400 text-white rounded-md hover:bg-blue-600">
          <FontAwesomeIcon icon={faCreditCard} />
            Payments History
          </button>
        </Link>
        <Link to="/logout" className="mt-auto">
          <button className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600">
          <FontAwesomeIcon icon={faSignOutAlt} />
            Logout
          </button>
        </Link>
      </div> */}

      {/* Middle Section */}
      <div className="w-3/4 bg-gray-200 p-6 rounded-lg shadow-lg">
      
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome Student Name</h2>
        <div className="grid grid-cols-3 gap-6 h-[calc(33.33%-50px)] ">
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
    </div>
  );
};

export default StudentProfile;
