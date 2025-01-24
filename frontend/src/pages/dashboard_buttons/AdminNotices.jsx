import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

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
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(`${BASE_URL}/all-my`, config)
      .then((response) => setNotices(response.data))
      .catch((error) => console.error("Error fetching notices:", error));
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

  const closeModal = () => {
    setShowModal(false);
    setNoticeIdToUpdate(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNotice = { role, title, message };
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (isUpdateMode && noticeIdToUpdate) {
      axios
        .put(`${BASE_URL}/update/${noticeIdToUpdate}`, newNotice, config)
        .then((response) => {
          setNotices((prevNotices) =>
            prevNotices.map((n) =>
              n.id === noticeIdToUpdate ? response.data : n
            )
          );
          closeModal();
          window.location.reload();
        })
        .catch((error) => console.error("Error updating notice:", error));
    } else {
      axios
        .post(`${BASE_URL}/create`, newNotice, config)
        .then((response) => {
          setNotices((prevNotices) => [...prevNotices, response.data]);
          closeModal();
          window.location.reload();
        })
        .catch((error) => console.error("Error adding notice:", error));
    }
  };

  const handleDelete = (noticeId) => {
    if (window.confirm("Are you sure you want to delete this notice?")) {
      axios
        .delete(`${BASE_URL}/delete/${noticeId}`)
        .then(() => {
          setNotices((prevNotices) =>
            prevNotices.filter((n) => n.id !== noticeId)
          );
        })
        .catch((error) => console.error("Error deleting notice:", error));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 to-pink-100 p-10 md:ml-64">
      <div className="w-full max-w-8xl bg-white rounded-xl shadow-2xl p-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Admin Notices :</h1>
          <button
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition duration-300"
            onClick={() => openModal()}
          >
            + Add Notice
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="p-6 rounded-xl shadow-lg bg-white transition transform hover:scale-105 hover:shadow-xl"
            >
              <h3 className="text-xl font-bold text-gray-600 mb-2 text-center">
                {notice.title}
              </h3>
              <p className="text-sm text-gray-500 italic font-bold">
                Role: {notice.role}
              </p>
              <p className="text-gray-600 mb-2">{notice.message}</p>
              <div className="flex justify-end gap-4 mt-4">
                <button
                  className="flex items-center bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 rounded-lg hover:shadow-md hover:shadow-lg transform hover:scale-105"
                  onClick={() => openModal(notice)}
                >
                  <FaEdit className="mr-2" /> Update
                </button>
                <button
                  className="flex items-center bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:shadow-md hover:shadow-lg transform hover:scale-105"
                  onClick={() => handleDelete(notice.id)}
                >
                  <FaTrashAlt className="mr-2" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {isUpdateMode ? "Update Notice" : "Add Notice"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-500"
                >
                  <option value="">Select Role</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="institute">Institute</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-500"
                  placeholder="Enter the title"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-500"
                  rows="4"
                  placeholder="Enter the message"
                ></textarea>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="hover:shadow-lg transform hover:scale-105 bg-gray-400 text-white px-4 py-2 rounded-lg hover:shadow-md"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="hover:shadow-lg transform hover:scale-105 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:shadow-md"
                >
                  {isUpdateMode ? "Update" : "Add"} Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNotices;
