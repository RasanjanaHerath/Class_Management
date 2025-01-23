import React, { useState } from "react";

const Notifications = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [recipientType, setRecipientType] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const [errors, setErrors] = useState({
    title: "",
    message: "",
    recipientType: "",
  });

  const handleSendNotification = async () => {
    // Reset previous errors
    setErrors({
      title: "",
      message: "",
      recipientType: "",
    });

    // Validation
    let valid = true;
    const newErrors = { ...errors };

    if (!title) {
      newErrors.title = "Title is required.";
      valid = false;
    }

    if (!message) {
      newErrors.message = "Message is required.";
      valid = false;
    }

    if (!recipientType) {
      newErrors.recipientType = "Recipient type is required.";
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors); // Set the error messages
      return; // Stop form submission if validation fails
    }

    // Backend API call to send notification
    try {
      const response = await fetch("/api/notifications/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, message, recipientType }),
      });

      if (response.ok) {
        alert("Notification sent successfully!");
        fetchNotifications(); // Reload notification history
        setTitle("");
        setMessage("");
        setRecipientType("all");
      } else {
        alert("Failed to send notification.");
      }
    } catch (error) {
      console.error("Error sending notification:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await fetch("/api/notifications");
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  React.useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:ml-64">
      <h1 className="text-xl font-bold mb-6">Send Notifications</h1>

      {/* Notification Form */}
      <div className="bg-white rounded-lg p-6 shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4">Compose Notification</h2>
        <div className="mb-4">
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full border rounded p-2 ${errors.title ? "border-red-500" : ""}`}
            placeholder="Enter notification title"
          />
          {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`w-full border rounded p-2 ${errors.message ? "border-red-500" : ""}`}
            placeholder="Enter notification message"
            rows="4"
          ></textarea>
          {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Send To</label>
          <select
            value={recipientType}
            onChange={(e) => setRecipientType(e.target.value)}
            className={`w-full border rounded p-2 ${errors.recipientType ? "border-red-500" : ""}`}
          >
            <option value="all">All</option>
            <option value="institute">Institutes</option>
            <option value="teacher">Teachers</option>
            <option value="student">Students</option>
          </select>
          {errors.recipientType && (
            <p className="text-sm text-red-500">{errors.recipientType}</p>
          )}
        </div>
        <button
          onClick={handleSendNotification}
          className="bg-gray-800 text-white rounded px-4 py-2 hover:bg-gray-600 w-full md:w-auto"
        >
          Send Notification
        </button>
      </div>

      {/* Notification History */}
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-lg font-semibold mb-4">Notification History</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-200 p-2 text-left">Title</th>
                <th className="border border-gray-200 p-2 text-left">Message</th>
                <th className="border border-gray-200 p-2 text-left">Recipient</th>
                <th className="border border-gray-200 p-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((notification, index) => (
                <tr key={index}>
                  <td className="border border-gray-200 p-2">{notification.title}</td>
                  <td className="border border-gray-200 p-2">{notification.message}</td>
                  <td className="border border-gray-200 p-2 capitalize">
                    {notification.recipientType}
                  </td>
                  <td className="border border-gray-200 p-2">
                    {new Date(notification.date).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
