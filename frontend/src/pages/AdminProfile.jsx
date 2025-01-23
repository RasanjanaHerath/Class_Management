import React, {useState,useEffect} from 'react';
import axios from 'axios';

function Dashboard() {


  //received notice preview
  const BASE_URL = "http://localhost:3000/api/students/messeges";
    const [receivedMesseges, setReceivedMesseges] = useState([]);
    const [sentMesseges, setSentMesseges] = useState([]);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [showMessegeModal, setShowMessegeModal] = useState(false);
    const [enrolledClasses, setEnrolledClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState("");
    const [rating, setRating] = useState(0);
    const [messege, setMessege] = useState("");
     const [title, setTitle] = useState("");
    const [recipientRole, setRecipientRole] = useState("");
    const [recipientName, setRecipientName] = useState("");
    const [myClasses, setMyClasses] = useState([]);
    const [comments, setComments] = useState("");

    useEffect(() => {
      axios
        .get(`http://localhost:3000/api/notice/all`)
        .then((response) => setReceivedMesseges(response.data))
        .catch((error) => console.error("Error fetching received messeges:", error));
  
      axios
        .get(`http://localhost:3000/api/student_messeges/all`)
        .then((response) => setSentMesseges(response.data))
        .catch((error) => console.error("Error fetching sent messeges:", error));
  
      axios
        .get("http://localhost:3000/api/classes/enrolled")
        .then((response) => setEnrolledClasses(response.data))
        .catch((error) => console.error("Error fetching enrolled classes:", error));
    }, []);


    // get greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };
  
  //update dashboard layout
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalClasses, setTotalClasses] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const totalUser = totalTeachers + totalStudents;


  useEffect(() => {
    axios
      .get("http://localhost:3000/api/institute/institutes-stat")
      .then((response) => {
        setTotalTeachers(response.data.statistics.totalTeachers);
        setTotalClasses(response.data.statistics.totalClasses);
        setTotalStudents(response.data.statistics.totalStudents);
      })
      .catch((error) => {
        console.error("Error fetching institute statistics:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex md:ml-64 ml-0">
      <main className="flex-1 p-6 bg-gray-50">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-2">
              {getGreeting()}, Kanishka
            </h2>
            <p className="text-gray-600 text-xl">Welcome to Institute dashboard</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900">
              <i className="fas fa-bell"></i>
            </button>
          </div>
        </header>

        <section className="grid grid-cols-3 gap-6 mb-6">
          <div className="p-6 bg-gray-200 rounded-lg shadow-lg">
            <h2 className="text-lg font-medium mb-2">Classes</h2>
            <div className="text-3xl font-bold text-gray-700 ">{totalClasses}</div>
          </div>
          <div className="p-6 bg-gray-200 rounded-lg shadow-lg">
            <h2 className="text-lg font-medium mb-2">Teachers</h2>
            <div className="text-3xl font-bold text-gray-700">{totalTeachers}</div>
          </div>
          <div className="p-6 bg-gray-200 rounded-lg shadow-lg">
            <h2 className="text-lg font-medium mb-2">Students</h2>
            <div className="text-3xl font-bold text-gray-700">{totalStudents}</div>
          </div>
          <div className="p-6 bg-gray-200 rounded-lg shadow-lg">
            <h2 className="text-lg font-medium mb-2">Ratings</h2>
            <div className="text-3xl font-bold text-gray-700">4.5</div>
          </div>
          <div className="p-6 bg-gray-200 rounded-lg shadow-lg">
            <h2 className="text-lg font-medium mb-2">Today Income</h2>
            <div className="text-3xl font-bold text-gray-700">$1,200</div>
          </div>
          <div className="p-6 bg-gray-200 rounded-lg shadow-lg">
            <h2 className="text-lg font-medium mb-2">Total Users</h2>
            <div className="text-3xl font-bold text-gray-700">{totalUser}</div>
          </div>
        </section>
        
        <section className="bg-blue-100 p-6 rounded-lg shadow-2xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <i className="fas fa-bullhorn mr-2"></i> Admin Panel Notices
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {receivedMesseges.filter((msg) => msg.role === "student").length > 0 ? (
              receivedMesseges
                .filter((msg) => msg.role === "student")
                .map((msg, index) => (
                  <div
                    key={msg.id}
                    className={`p-4 mb-4 rounded-lg shadow-md text-gray-700 border bg-white hover:bg-gray-400 hover:text-white transition-all`}
                  >
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">{msg.title}</h3>
                    <p className="mb-2 text-gray-600">{msg.message}</p>
                    <div className="text-sm text-gray-500 flex justify-between">
                      <span>Role: {msg.role}</span>
                      <span>
                        Sent on: {new Date(msg.date).toLocaleDateString("en-US")}
                      </span>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-gray-500">No notices available.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;









