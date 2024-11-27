import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Announcement = () => {
  const [showAddAnnouncementPopup, setShowAddAnnouncementPopup] = useState(false);
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      topic: "Upcoming Exam Schedule",
      institute: "Institute 1",
      class: "Class A",
    },
    {
      id: 2,
      topic: "Holiday Notice",
      institute: "Institute 2",
      class: "Class B",
    },
  ]);

  const navigate = useNavigate();

  const toggleAddAnnouncementPopup = () => setShowAddAnnouncementPopup(!showAddAnnouncementPopup);

  const handleAddAnnouncement = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newAnnouncement = {
      id: announcements.length + 1,
      topic: formData.get('topic'),
      institute: formData.get('institute'),
      class: formData.get('class'),
    };
    setAnnouncements([...announcements, newAnnouncement]);
    toggleAddAnnouncementPopup();
  };

  const viewAnnouncementDetails = (announcement) => {
    navigate(`/announcement-details/${announcement.id}`, { state: { announcement } });
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen md:ml-64 ml-0">
      <div className="flex-grow p-4">
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Announcements</h2>
          <button
            onClick={toggleAddAnnouncementPopup}
            className="bg-blue-500 text-white px-4 py-2 rounded-full mb-4 shadow-lg transition transform hover:scale-105"
          >
            <FontAwesomeIcon icon={faPlus} /> Add Announcement
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="bg-gray-100 p-4 rounded-lg shadow cursor-pointer hover:bg-gray-200"
                onClick={() => viewAnnouncementDetails(announcement)}
              >
                <h3 className="font-bold text-lg">{announcement.topic}</h3>
                <p className="text-sm text-gray-600">{announcement.institute}</p>
                <p className="text-sm text-gray-600">{announcement.class}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showAddAnnouncementPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add Announcement</h2>
            <form onSubmit={handleAddAnnouncement}>
              <div className="mb-4">
                <label className="block text-gray-700">Institute:</label>
                <select name="institute" className="w-full px-3 py-2 border rounded">
                  <option value="">Select Institute</option>
                  <option value="Institute 1">Institute 1</option>
                  <option value="Institute 2">Institute 2</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Class:</label>
                <select name="class" className="w-full px-3 py-2 border rounded">
                  <option value="">Select Class</option>
                  <option value="Class A">Class A</option>
                  <option value="Class B">Class B</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Topic:</label>
                <input
                  name="topic"
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Announcement:</label>
                <textarea
                  name="announcement"
                  className="w-full px-3 py-2 border rounded"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-full"
                >
                  Send
                </button>
                <button
                  type="button"
                  onClick={toggleAddAnnouncementPopup}
                  className="ml-4 bg-red-500 text-white px-4 py-2 rounded-full"
                >
                  Cancel
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