import React, { useState } from "react";
import Select from "react-select";

const Announcement = () => {
  // State for announcements
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      institute: "Institute A",
      class: "Class 1",
      topic: "Holiday Notice",
      details: "There will be a holiday on Friday due to an event.",
    },
    {
      id: 2,
      institute: "Institute B",
      class: "Class 2",
      topic: "Exam Schedule",
      details: "The midterm exams will start next Monday.",
    },
  ]);

  // Dropdown options
  const instituteOptions = [
    { value: "Institute A", label: "Institute A" },
    { value: "Institute B", label: "Institute B" },
    { value: "Institute C", label: "Institute C" },
  ];
  const classOptions = [
    { value: "Class 1", label: "Class 1" },
    { value: "Class 2", label: "Class 2" },
    { value: "Class 3", label: "Class 3" },
  ];

  // Popup states
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    institute: null,
    class: null,
    topic: "",
    details: "",
  });
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);

  // Handle save for add
  const handleAddSave = () => {
    if (
      newAnnouncement.institute &&
      newAnnouncement.class &&
      newAnnouncement.topic &&
      newAnnouncement.details
    ) {
      setAnnouncements((prev) => [
        ...prev,
        {
          id: Date.now(),
          institute: newAnnouncement.institute.label,
          class: newAnnouncement.class.label,
          topic: newAnnouncement.topic,
          details: newAnnouncement.details,
        },
      ]);
      setNewAnnouncement({
        institute: null,
        class: null,
        topic: "",
        details: "",
      });
      setShowAddPopup(false);
    } else {
      alert("Please fill in all fields.");
    }
  };

  // Handle save for edit
  const handleEditSave = () => {
    if (
      editingAnnouncement.institute &&
      editingAnnouncement.class &&
      editingAnnouncement.details
    ) {
      setAnnouncements((prev) =>
        prev.map((announcement) =>
          announcement.id === editingAnnouncement.id
            ? {
                ...announcement,
                institute: editingAnnouncement.institute.label,
                class: editingAnnouncement.class.label,
                details: editingAnnouncement.details,
              }
            : announcement
        )
      );
      setShowEditPopup(false);
      setEditingAnnouncement(null);
    } else {
      alert("Please fill in all fields.");
    }
  };

  // Handle edit button click
  const handleEdit = (announcement) => {
    setEditingAnnouncement({
      ...announcement,
      institute: instituteOptions.find(
        (option) => option.label === announcement.institute
      ),
      class: classOptions.find((option) => option.label === announcement.class),
    });
    setShowEditPopup(true);
  };

  return (
    <div className="lg:flex-row min-h-screen md:ml-64 ml-0 p-5">
      <h1 className="text-2xl font-bold mb-4">Announcements</h1>

      {/* Add Announcement Button */}
      <button
        onClick={() => setShowAddPopup(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-full mb-4"
      >
        Add Announcement
      </button>

      {/* List of Announcements */}
      {announcements.map((announcement) => (
        <div key={announcement.id} className="p-4 border rounded mb-2">
          <h3 className="font-bold">{announcement.topic}</h3>
          <p>
            <strong>Institute:</strong> {announcement.institute}
          </p>
          <p>
            <strong>Class:</strong> {announcement.class}
          </p>
          <p>
            <strong>Details:</strong> {announcement.details}
          </p>
          <button
            onClick={() => handleEdit(announcement)}
            className="bg-green-500 text-white px-4 py-2 rounded mt-2"
          >
            Edit
          </button>
        </div>
      ))}

      {/* Add Announcement Popup */}
      {showAddPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add Announcement</h2>
            <label className="block mb-4">
              <span className="text-gray-700">Institute:</span>
              <Select
                options={instituteOptions}
                value={newAnnouncement.institute}
                onChange={(selectedOption) =>
                  setNewAnnouncement((prev) => ({
                    ...prev,
                    institute: selectedOption,
                  }))
                }
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Class:</span>
              <Select
                options={classOptions}
                value={newAnnouncement.class}
                onChange={(selectedOption) =>
                  setNewAnnouncement((prev) => ({
                    ...prev,
                    class: selectedOption,
                  }))
                }
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Topic:</span>
              <input
                type="text"
                value={newAnnouncement.topic}
                onChange={(e) =>
                  setNewAnnouncement((prev) => ({
                    ...prev,
                    topic: e.target.value,
                  }))
                }
                className="w-full p-2 border rounded"
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Details:</span>
              <textarea
                value={newAnnouncement.details}
                onChange={(e) =>
                  setNewAnnouncement((prev) => ({
                    ...prev,
                    details: e.target.value,
                  }))
                }
                className="w-full p-2 border rounded"
              />
            </label>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowAddPopup(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-full mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSave}
                className="bg-blue-500 text-white px-4 py-2 rounded-full"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Announcement Popup */}
      {showEditPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Announcement</h2>
            <label className="block mb-4">
              <span className="text-gray-700">Institute:</span>
              <Select
                options={instituteOptions}
                value={editingAnnouncement.institute}
                onChange={(selectedOption) =>
                  setEditingAnnouncement((prev) => ({
                    ...prev,
                    institute: selectedOption,
                  }))
                }
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Class:</span>
              <Select
                options={classOptions}
                value={editingAnnouncement.class}
                onChange={(selectedOption) =>
                  setEditingAnnouncement((prev) => ({
                    ...prev,
                    class: selectedOption,
                  }))
                }
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Topic:</span>
              <div className="w-full p-2 border rounded bg-gray-100">
                {editingAnnouncement.topic}
              </div>
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Details:</span>
              <textarea
                value={editingAnnouncement.details}
                onChange={(e) =>
                  setEditingAnnouncement((prev) => ({
                    ...prev,
                    details: e.target.value,
                  }))
                }
                className="w-full p-2 border rounded"
              />
            </label>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowEditPopup(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-full mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                className="bg-green-500 text-white px-4 py-2 rounded-full"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcement;
