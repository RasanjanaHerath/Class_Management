import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt, FaEdit } from "react-icons/fa"; // Importing FontAwesome icons

const Announcement = () => {
  const BASE_URL = "http://localhost:3000/api/notice";
  const [notices, setNotices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [classesVerified, setClassesVerified] = useState([]);
  const [noticeIdToUpdate, setNoticeIdToUpdate] = useState(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [newNotice, setNewNotice] = useState({
    classId: "",
    title: "",
    message: "",
  });

  const fetchNotices = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${BASE_URL}/all-my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotices(response.data);
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  const fetchClasses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3000/api/class/get-by-teacher",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setClassesVerified(response.data.verifiedClasses);
      // console.log("data from veri: ",(response.data.verifiedClasses[0].isverify));
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  useEffect(() => {
    fetchNotices();
    fetchClasses();
  }, []);

  const openModal = (notice = { classId: "", title: "", message: "" }) => {
    setNewNotice(notice);
    setNoticeIdToUpdate(notice.id || null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setNoticeIdToUpdate(null);
  };

  const handleSave = () => {
    const noticeData = {
      ...newNotice,
      role: "student", // Set visibilityRole as student
    };

    const token = localStorage.getItem("token");

    if (noticeIdToUpdate) {
      axios
        .put(`${BASE_URL}/update/${noticeIdToUpdate}`, noticeData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
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
        .post(`${BASE_URL}/create`, noticeData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setNotices((prevNotices) => [...prevNotices, response.data]);
          closeModal();
          fetchNotices(); // Refresh the notices list
        })
        .catch((error) => console.error("Error adding notice:", error));
    }
  };

  const handleDelete = (noticeId) => {
    if (window.confirm("Are you sure you want to delete this notice?")) {
      axios
        .delete(`${BASE_URL}/delete/${noticeId}`)
        .then(() =>
          setNotices((prevNotices) =>
            prevNotices.filter((n) => n.id !== noticeId)
          )
        )
        .catch((error) => console.error("Error deleting notice:", error));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10 md:ml-64">
      <div className="w-full max-w-8xl bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-700">Announcement</h1>
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
            onClick={() => openModal()}
          >
            Add Announcement
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="p-6 rounded-lg shadow-lg text-gray-700 bg-gray-200"
            >
              <h3 className="text-xl font-bold mb-2">{notice.title}</h3>
              <p className="mb-2">{notice.message}</p>
              <p className="text-sm text-gray-600">Class: {notice.classes}</p>
              <div className="flex justify-end gap-4 mt-4">
                <button
                  className="flex items-center bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                  onClick={() => openModal(notice)}
                >
                  <FaEdit className="mr-2" /> Update
                </button>
                <button
                  className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
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
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {noticeIdToUpdate ? "Edit Notice" : "Add Notice"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-1">
                  Class
                </label>
                <select
                  value={newNotice.classId}
                  onChange={(e) =>
                    setNewNotice({ ...newNotice, classId: e.target.value })
                  }
                  className="w-full p-2 border rounded-md focus:outline-blue-500"
                >
                  <option value="">Select class</option>
                  {Array.isArray(classesVerified) &&
                    classesVerified.map((classItem) => (
                      <option key={classItem.id} value={classItem.id}>
                        {`${classItem.institute.name} ${classItem.subject} Grade ${classItem.grade} Start at ${classItem.startTime}`}
                      </option>
                    ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newNotice.title}
                  onChange={(e) =>
                    setNewNotice({ ...newNotice, title: e.target.value })
                  }
                  className="w-full p-2 border rounded-md focus:outline-blue-500"
                  placeholder="Enter the title"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-1">
                  Message
                </label>
                <textarea
                  value={newNotice.message}
                  onChange={(e) =>
                    setNewNotice({ ...newNotice, message: e.target.value })
                  }
                  className="w-full p-2 border rounded-md focus:outline-blue-500"
                  rows="4"
                  placeholder="Enter the message"
                ></textarea>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
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

export default Announcement;
