import React, { useState, useEffect } from "react";
import axios from "axios";

const Ins_Notifications = () => {
  const [classRequests, setClassRequests] = useState([]);
  const [reload, setReload] = useState(false);

  // Fetch classes from the backend
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/api/class/get-all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Class requests:", response.data);
        setClassRequests(response.data);
      } catch (error) {
        console.error("Error fetching class requests:", error);
      }
    };

    fetchClasses();
  }, [reload]);

  const handleApproveClass = async (classId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/api/class/verify/${classId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReload(!reload); // Refresh the list
    } catch (error) {
      console.error("Error approving class:", error);
      alert("Failed to approve class.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10 md:ml-64">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Classes Approval Requests
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4 text-blue-500">Class Requests</h2>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-400 text-white">
            <tr>
              <th className="p-2">Class ID</th>
              <th className="p-2">Subject</th>
              <th className="p-2">Teacher</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {classRequests.filter((classItem) => !classItem.isverify).length >
            0 ? (
              classRequests
                .filter((classItem) => !classItem.isverify)
                .map((classItem) => (
                  <tr key={classItem.id} className="text-center border-t">
                    <td className="p-2">{classItem.id}</td>
                    <td className="p-2">{classItem.subject || "N/A"}</td>
                    <td className="p-2">{classItem.teacher?.name || "N/A"}</td>
                    <td className="p-2 space-x-2">
                      <button
                        onClick={() => handleApproveClass(classItem.id)}
                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                      >
                        Approve
                      </button>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No pending class requests available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ins_Notifications;
