import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaDownload, FaUpload, FaCheck } from "react-icons/fa";

const BASE_URL = "http://localhost:3000/api/";

const AssignmentsPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [uploadedAssignments, setUploadedAssignments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const cardColors = [
    "bg-yellow-200",
    "bg-blue-300",
    "bg-green-300",
    "bg-red-200",
    "bg-purple-300",
  ]; // Color palette for assignment cards

  useEffect(() => {
    // Fetch assignments list
    const fetchAssignments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}assignments`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAssignments(response.data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchAssignments();
  }, []);

  const handleDownload = (assignmentId, fileName) => {
    const token = localStorage.getItem("token");
    axios
      .get(`${BASE_URL}assignments/download/${assignmentId}`, {
        responseType: "blob", // Important to handle file downloads
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Create a URL for the file and trigger download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName); // Download with the original filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => console.error("Error downloading assignment:", error));
  };

  const handleUpload = (assignmentId) => {
    if (!selectedFile) {
      alert("Please select a file to upload!");
      return;
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", selectedFile);

    axios
      .post(`${BASE_URL}assignments/upload/${assignmentId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setUploadedAssignments((prev) => [...prev, assignmentId]); // Add the assignment ID to uploaded list
        alert("Assignment uploaded successfully!");
        setSelectedFile(null); // Clear selected file
      })
      .catch((error) => {
        console.error("Error uploading assignment:", error);
        alert("Failed to upload the assignment.");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Assignments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {assignments.map((assignment, index) => (
          <div
            key={assignment.id}
            className={`p-4 rounded-lg shadow-md text-gray-700 font-medium ${
              cardColors[index % cardColors.length]
            }`}
          >
            <h3 className="text-xl font-semibold mb-2">{assignment.title}</h3>
            <p className="mb-4">Due Date: {assignment.dueDate}</p>
            <div className="flex justify-between items-center mt-4">
              {/* Download Button */}
              <button
                onClick={() => handleDownload(assignment.id, assignment.fileName)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center"
              >
                <FaDownload className="mr-2" /> Download
              </button>

              {/* Upload Section */}
              <div className="flex items-center gap-2">
                <label
                  htmlFor={`upload-${assignment.id}`}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center cursor-pointer"
                >
                  <FaUpload className="mr-2" /> Upload
                </label>
                <input
                  type="file"
                  id={`upload-${assignment.id}`}
                  style={{ display: "none" }}
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />

                {/* Confirmation Tick */}
                {uploadedAssignments.includes(assignment.id) && (
                  <FaCheck className="text-green-600 text-2xl" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignmentsPage;
