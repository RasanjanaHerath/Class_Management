import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";

const ClassManagement = () => {
  const [classes, setClasses] = useState([
    {
      subject: "Maths",
      grade: "11",
      instituteName: "Susipone",
      scheduleDay: "Monday",
      startTime: "10:00",
      endTime: "11:00",
      feePerMonth: "1500",
      numerOnumberOfStudents: "15",
    },
  ]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    subject: "",
    grade: "",
    instituteName: "",
    scheduleDay: "",
    startTime: "",
    endTime: "",
    feePerMonth: "",
    numerOnumberOfStudents: "",
  });

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (classItem) => {
    setFormData(classItem);
    setIsEditing(true);
    togglePopup();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setClasses((prevClasses) =>
        prevClasses.map((c) => (c.id === formData.id ? formData : c))
      );
    } else {
      setClasses([...classes, { ...formData, id: Date.now() }]);
    }
    togglePopup();
    setFormData({
      id: null,
      subject: "",
      grade: "",
      instituteName: "",
      scheduleDay: "",
      startTime: "",
      endTime: "",
      feePerMonth: "",
    });
    setIsEditing(false);
  };



  return (
    <div className="flex flex-col lg:flex-row min-h-screen md:ml-64 ml-0">
      <div className="flex-grow p-4">
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Class Management</h2>
          <button
            onClick={togglePopup}
            className="bg-blue-500 text-white px-4 py-2 rounded-full mb-4 shadow-lg transition transform hover:scale-105"
          >
            <FontAwesomeIcon icon={faPlus} /> Add New Class
          </button>
          <div className="overflow-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Subject</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Grade</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Institute</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Schedule Day</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Start Time</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">End Time</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Fee Per Month</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Number Of Students</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((classItem) => (
                  <tr key={classItem.id}>
                    <td className="py-2 px-4 border-b border-gray-200">{classItem.subject}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{classItem.grade}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{classItem.instituteName}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{classItem.scheduleDay}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{classItem.startTime}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{classItem.endTime}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{classItem.feePerMonth}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{classItem.numerOnumberOfStudents}</td>
                    <td className="py-2 px-4 border-b border-gray-200 text-right">
                      <button
                        onClick={() => handleEdit(classItem)}
                        className="text-blue-500 hover:underline"
                      >
                        <FontAwesomeIcon icon={faEdit} /> Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? "Edit Class" : "Add New Class"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Grade</label>
                <input
                  type="text"
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Institute</label>
                <input
                  type="text"
                  name="instituteName"
                  value={formData.instituteName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Schedule Day</label>
                <select
                  name="scheduleDay"
                  value={formData.scheduleDay}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                >
                  <option value="">Select Day</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Start Time</label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">End Time</label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Fee Per Month</label>
                <input
                  type="number"
                  name="feePerMonth"
                  value={formData.feePerMonth}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={togglePopup}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassManagement;

