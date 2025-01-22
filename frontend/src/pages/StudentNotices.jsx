import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaPaperPlane } from "react-icons/fa";

const StudentMesseges = () => {
  const BASE_URL = "http://localhost:3000/api/students/messeges";
  const [receivedMesseges, setReceivedMesseges] = useState([]);
  const [sentMesseges, setSentMesseges] = useState([]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showMessegeModal, setShowMessegeModal] = useState(false);
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [rating, setRating] = useState(0);
  const [messege, setMessege] = useState("");
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

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback submitted:", { class: selectedClass, rating });
    setShowFeedbackModal(false);
  };

  const handleSendMessege = (e) => {
    e.preventDefault();
    console.log("Messege sent:", { recipientRole, recipientName, messege });
    setSentMesseges((prev) => [
      ...prev,
      { recipientRole, recipientName, messege, date: new Date() },
    ]);
    setShowMessegeModal(false);
  };

  const cardColors = ["bg-yellow-200", "bg-blue-300", "bg-green-300", "bg-red-200", "bg-purple-300"];

console.log("blaa",receivedMesseges)




useEffect(() => {
  const fetchMyClasses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:3000/api/class_card/get-all-my`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("My classes:", response.data);
      setMyClasses(response.data);
    } catch (error) {
      console.error("Error fetching my classes:", error);
      setMyClasses([]);
    }
  };

  fetchMyClasses();
}, []);

  return (
    <div className="bg-gray-100 min-h-screen p-8 flex md:ml-64 flex-row gap-8">
      
        <div className="w-1/2 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Received Messeges</h2>
          <div className="space-y-4">
            {receivedMesseges
          .filter((msg) => msg.role === "student")
          .map((msg, index) => (
            <div
              key={msg.id}
              className={`p-4 rounded-lg shadow-md text-gray-700 ${cardColors[index % cardColors.length]}`}
            >
              <h3 className="text-lg font-semibold">{msg.title}</h3>
              <p>{msg.message}</p>
              {/* <p className="text-sm text-gray-500">
            Sent on: {new Date(msg.date).toLocaleDateString()}
              </p> */}
            </div>
          ))}
          </div>
        </div>

        {/* Right Section */}
      <div className="w-1/2 bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col gap-6">
          <button
            className="bg-blue-500 text-white py-3 px-6 rounded-md flex items-center justify-center hover:bg-blue-600"
            onClick={() => setShowFeedbackModal(true)}
          >
            <FaEdit className="mr-2" /> Give Feedback
          </button>
          <button
            className="bg-green-500 text-white py-3 px-6 rounded-md flex items-center justify-center hover:bg-green-600"
            onClick={() => setShowMessegeModal(true)}
          >
            <FaPaperPlane className="mr-2" /> Send Messege
          </button>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Sent Messeges</h2>
        <div className="space-y-4">
          {sentMesseges.map((msg, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg shadow-md text-gray-700 ${cardColors[index % cardColors.length]}`}
            >
              <h3 className="text-lg font-semibold">To: {msg.recipientName}</h3>
              <p>{msg.messege}</p>
              <p className="text-sm text-gray-500">
                Sent on: {new Date(msg.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback Modal */}
      {showFeedbackModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
      <h2 className="text-xl font-bold mb-4">Give Feedback</h2>
      <form onSubmit={handleFeedbackSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Select Class:</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Choose Class</option>
            {enrolledClasses.map((cls) => (
              <option key={cls.id} value={cls.name}>
                {cls.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Rating:</label>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-2xl mr-2 ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
            >
              ★
            </button>
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Comments:</label>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md resize-none"
             rows="4"
            placeholder="Write your feedback here..."
          ></textarea>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            onClick={() => setShowFeedbackModal(false)}
          >
            Cancel
          </button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
)}


      {/* Messege Modal */}
      {showMessegeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Send Messege</h2>
            <form onSubmit={handleSendMessege}>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Select Class:</label>
                <select
                  value={recipientRole}
                  onChange={(e) => setRecipientRole(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Choose Class</option>
                  {myClasses.map((cls) => (
                    <option key={cls.classObject.id} value={cls.classObject.institute.city}>
                      {cls.classObject.institute.name}  {cls.classObject.institute.city} {cls.classObject.subject}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Title:</label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter recipient name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Messege:</label>
                <textarea
                  value={messege}
                  onChange={(e) => setMessege(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows="4"
                  placeholder="Enter your messege"
                ></textarea>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                  onClick={() => setShowMessegeModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentMesseges;
