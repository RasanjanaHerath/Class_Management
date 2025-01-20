import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTrashAlt, FaEdit } from "react-icons/fa"; // Importing FontAwesome icons


const AdminNotices = () => {
  const BASE_URL = "http://localhost:3000/api/notice";
  const [notices, setNotices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [role, setRole] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [noticeIdToUpdate, setNoticeIdToUpdate] = useState(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/all`)
      .then((response) => {
        setNotices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching notices:", error);
      });
  }, []);

  const openModal = (notice = null) => {
    if (notice) {
      setRole(notice.role);
      setTitle(notice.title);
      setMessage(notice.message);
      setNoticeIdToUpdate(notice.id);
      setIsUpdateMode(true);
    } else {
      setRole("");
      setTitle("");
      setMessage("");
      setIsUpdateMode(false);
    }
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNotice = { role, title, message };
    if (isUpdateMode && noticeIdToUpdate) {
      axios
        .put(`${BASE_URL}/update${noticeIdToUpdate}`, newNotice)
        .then((response) => {
          setNotices((prevNotices) =>
            prevNotices.map((n) =>
              n.id === noticeIdToUpdate ? response.data : n
            )
          );
          closeModal();
        })
        .catch((error) => console.error("Error updating notice:", error));
    } else {
      axios
        .post(`${BASE_URL}/create`, newNotice)
        .then((response) => {
          setNotices((prevNotices) => [...prevNotices, response.data]);
          closeModal();
        })
        .catch((error) => console.error("Error adding notice:", error));
    }
  };

  const handleDelete = (noticeId) => {
    if (window.confirm("Are you sure you want to delete this notice?")) {
      axios
        .delete(`${BASE_URL}notice/${noticeId}`)
        .then(() => {
          setNotices((prevNotices) =>
            prevNotices.filter((n) => n.id !== noticeId)
          );
        })
        .catch((error) => console.error("Error deleting notice:", error));
    }
  };

  const cardColors = ["bg-yellow-200", "bg-blue-300", "bg-green-300","bg-red-200","bg-purple-300"]; // Custom colors for cards

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-start p-10 ml-64">
      <div className="max-w-6xl w-full bg-white p-10 rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <button
            className="bg-blue-500 text-white py-4 px-6 rounded-md text-lg font-semibold hover:bg-blue-600"
            onClick={openModal}
            
          >
            + Add Notice
          </button>
        </div>

        {/* Notices Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 "
        >
          {notices.map((notice, index) => (
            <div 
              key={notice.id}
              className={`p-6 rounded-lg shadow-lg text-gray-700 font-medium ${
                cardColors[index % cardColors.length]
              }`} 
            >
              <h3 className="text-2xl font-semibold mb-4">{notice.title}</h3>
              <p className="mb-4">{notice.message}</p>
              <p className="text-sm">Posted on: {new Date().toISOString().split('T')[0]}</p>
              <div className="flex justify-between mt-4">
                <button
                  className="flex items-center bg-slate-200 px-4 py-2 rounded-md hover:bg-slate-300"
                  onClick={() => openModal(notice)}
                >
                  <FaTrashAlt className="mr-2" /> Update Notice
                </button>
                <button
                   className="flex items-center bg-red-400 px-4 py-2 rounded-md hover:bg-red-500"
                   onClick={() => handleDelete(notice.id)}
                >
                  <FaEdit className="mr-2" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">
                {isUpdateMode ? "Update Notice" : "Add New Notice"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Role:
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                  >
                    <option value="">Select Role</option>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="institute">Institute</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Title:
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                    placeholder="Enter title"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Notice:
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                    rows="4"
                    placeholder="Enter notice"
                  />
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    {isUpdateMode ? "Update" : "Add"} Notice
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNotices;
