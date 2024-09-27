import React from "react";
import { useNavigate } from 'react-router-dom';
import {useEffect, useState} from "react";
import axios from "axios";

const AdminNotices = () => {

const BASE_URL = "http://localhost:3000/api/";
const [notice, setNotice] = useState([]);
const [loading, setLoading] = useState(false);
const navigate  = useNavigate();
const [showModal, setShowModal] = useState(false);
const [role,setRole] = useState("");
const [title, setTitle] = useState("");
const [message, setMessage] = useState("");
const [notices, setNotices] = useState([]);
const [noticeIdToUpdate, setNoticeIdToUpdate] = useState(null);
const [isUpdateMode, setIsUpdateMode] = useState(false);

useEffect(() => {
  axios
    .get("http://localhost:3000/api/notice") 
    .then((response) => {
      setNotices(response.data); 
      console.log("Response: " + JSON.stringify(response.data, null, 2)); // Pretty-print the response
    })
    .catch((error) => {
      console.error("There was an error fetching the notices!", error);
    });

}, []);




  // Function to open the modal
  const openModal = (notice = null) => {

    if (notice) {
      // Populate the form with the selected notice's data for updating
      setRole(notice.role);
      setTitle(notice.title);
      setMessage(notice.message);
      setNoticeIdToUpdate(notice.id);
      setIsUpdateMode(true); // Enable update mode
    } else {
      // Clear the form for adding a new notice
      setRole("");
      setTitle("");
      setMessage("");
      setIsUpdateMode(false);
    }

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNotice = {
      role: role,
      title: title,
      message: message,
    };

    if (isUpdateMode && noticeIdToUpdate) {
      // Update notice (PUT request)
      axios
        .put(`${BASE_URL}notice/${noticeIdToUpdate}`, newNotice)
        .then((response) => {
          console.log(JSON.stringify(response.data, null, 2));
          setNotices((prevNotices) =>
            prevNotices.map((n) => (n.id === noticeIdToUpdate ? response.data : n))
          );
          closeModal();
        })
        .catch((error) => {
          console.error("Error updating notice:", error);
        });
    } else {
      // Add new notice (POST request)
      axios
        .post(`${BASE_URL}notice`, newNotice)
        .then((response) => {
          console.log(JSON.stringify(response.data, null, 2));
          setNotices((prevNotices) => [...prevNotices, response.data]);
          closeModal();
        })
        .catch((error) => {
          console.error("Error adding notice:", error);
        });
    };

    // axios
    // .post(`${BASE_URL}notice`, newNotice) // POST request to add a new notice
    // .then((response) => {
    //   console.log(JSON.stringify(response.data, null, 2));
    //   setNotices((prevNotices) => [...prevNotices, response.data]); // Update the notices list
    //   closeModal(); // Close the modal after adding the notice
    // })
    // .catch((error) => {
    //   console.error("Error adding notice:", error);
    // });
};

  // Function to delete a notice
  const handleDelete = (noticeId) => {
    if (window.confirm("Are you sure you want to delete this notice?")) {
      axios
        .delete(`${BASE_URL}notice/${noticeId}`)
        .then((response) => {
          console.log(JSON.stringify(response.data, null, 2));  // Log the response to check
          // After successful deletion, update the local state
          setNotices((prevNotices) => prevNotices.filter((n) => n.id !== noticeId));
        })
        .catch((error) => {
          console.error("Error deleting the notice:", error);  // Log any errors
        });
    }
  };
  

  return (
    <div className="overflow-auto bg-gradient-to-br from-blue-500 to-indigo-300 flex justify-center items-start p-10">
      <div className="w-full overflow-auto max-w-6xl bg-white shadow-lg rounded-lg p-10">
        {/* Add Notice Button */}
        <div className="text-center mb-12">
          <button
            className="bg-gray-400 text-black w-full py-6 text-3xl font-bold rounded-md hover:bg-gray-500 " onClick={openModal}
          >
            + Add Notice Here
          </button>


                {/* Modal */}
      {showModal && (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Add New Notice</h2>

            {/* Form for adding notice */}
            <form onSubmit={handleSubmit}>
              
              <div className="mb-4">
              <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Role:
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              >
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="institute">Institute</option>
              </select>
            </div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Title:
                </label>
                <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                      placeholder="Enter title"
                    />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Notice:
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  rows="4"
                  placeholder="Enter your notice"
                ></textarea>
              </div>
              
              

              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                >
                  Add Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}



        </div>

        {/* Previous Notices */}
        <div className="bg-gray-200 p-10 rounded-lg">
          <h2 className="text-2xl font-semibold text-center mb-8">Previous Notices</h2>
          <ul className="space-y-8">
            {notices.map((notice) => (
              <li
                key={notice}
                className="bg-white p-6 rounded-lg flex justify-between items-center shadow-md"
              >
                {/* Notice Text */}
                <div className="text-lg text-gray-700 flex-grow pr-6">
                <p>For : {notice.role}</p>
                {notice.title}: {notice.message}
                </div>
                
                
                <div className="space-x-4 flex">
                  <button
                    className="bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600"
                    onClick={() => openModal(notice)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600"
                    onClick={() => handleDelete(notice.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminNotices;


