import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';

const AssignmentSubmissions = () => {
  const [showAddAssignmentPopup, setShowAddAssignmentPopup] = useState(false);
  const [showUploadMarksPopup, setShowUploadMarksPopup] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Math Homework",
      institute: "Institute 1",
      class: "Class A",
    },
    {
      id: 2,
      title: "Science Project",
      institute: "Institute 2",
      class: "Class B",
    },
  ]);

  const [submissions, setSubmissions] = useState([
    {
      studentName: "John Doe",
      dateSubmitted: "2023-12-01",
      answerFile: "answer1.pdf",
      grade: "A",
    },
    {
      studentName: "Jane Smith",
      dateSubmitted: "2023-12-02",
      answerFile: "answer2.pdf",
      grade: "B",
    },
  ]);

  const toggleAddAssignmentPopup = () => setShowAddAssignmentPopup(!showAddAssignmentPopup);
  const toggleUploadMarksPopup = () => setShowUploadMarksPopup(!showUploadMarksPopup);

  const selectAssignment = (assignment) => setSelectedAssignment(assignment);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen md:ml-64 ml-0">
      <div className="flex-grow p-4">
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Assignment Submissions</h2>

          {!selectedAssignment && (
            <>
              <button
                onClick={toggleAddAssignmentPopup}
                className="bg-blue-500 text-white px-4 py-2 rounded-full mb-4 shadow-lg transition transform hover:scale-105"
              >
                <FontAwesomeIcon icon={faPlus} /> Add Assignment
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {assignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="bg-gray-100 p-4 rounded-lg shadow cursor-pointer hover:bg-gray-200"
                    onClick={() => selectAssignment(assignment)}
                  >
                    <h3 className="font-bold text-lg">{assignment.title}</h3>
                    <p className="text-sm text-gray-600">{assignment.institute}</p>
                    <p className="text-sm text-gray-600">{assignment.class}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {selectedAssignment && (
            <>
              <h3 className="text-xl font-bold mb-4">{selectedAssignment.title}</h3>
              <button
                onClick={() => setSelectedAssignment(null)}
                className="bg-red-500 text-white px-4 py-2 rounded-full mb-4"
              >
                Back to Assignments
              </button>

              <button
                onClick={toggleUploadMarksPopup}
                className="ml-5 bg-green-500 text-white px-4 py-2 rounded-full mt-4"
              >
                <FontAwesomeIcon icon={faUpload} /> Upload Marks
              </button>

              <div className="overflow-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b border-gray-200 text-left">Student Name</th>
                      <th className="py-2 px-4 border-b border-gray-200 text-left">Date Submitted</th>
                      <th className="py-2 px-4 border-b border-gray-200 text-left">Answer File</th>
                      <th className="py-2 px-4 border-b border-gray-200 text-right">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((submission, index) => (
                      <tr key={index}>
                        <td className="py-2 px-4 border-b border-gray-200">{submission.studentName}</td>
                        <td className="py-2 px-4 border-b border-gray-200">{submission.dateSubmitted}</td>
                        <td className="py-2 px-4 border-b border-gray-200">
                          <a href={`/${submission.answerFile}`} className="text-blue-500 underline">
                            {submission.answerFile}
                          </a>
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200 text-right">{submission.grade}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              
            </>
          )}
        </div>
      </div>

      {/* Add Assignment Popup */}
      {showAddAssignmentPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add Assignment</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Institute:</label>
                <select className="w-full px-3 py-2 border rounded">
                  <option value="">Select Institute</option>
                  <option value="institute1">Institute 1</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Class:</label>
                <select className="w-full px-3 py-2 border rounded">
                  <option value="">Select Class</option>
                  <option value="class1">Class 1</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Assignment Title:</label>
                <input type="text" className="w-full px-3 py-2 border rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Due Date:</label>
                <input type="date" className="w-full px-3 py-2 border rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description:</label>
                <textarea className="w-full px-3 py-2 border rounded"></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Upload File:</label>
                <input type="file" className="w-full px-3 py-2 border rounded" />
              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-full">
                Save Assignment
              </button>
              <button
                type="button"
                onClick={toggleAddAssignmentPopup}
                className="ml-4 bg-red-500 text-white px-4 py-2 rounded-full"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Upload Marks Popup */}
      {showUploadMarksPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Upload Marks</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Upload Excel File:</label>
                <input type="file" className="w-full px-3 py-2 border rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Manually Add Marks:</label>
                <textarea className="w-full px-3 py-2 border rounded"></textarea>
              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-full">
                Save Marks
              </button>
              <button
                type="button"
                onClick={toggleUploadMarksPopup}
                className="ml-4 bg-red-500 text-white px-4 py-2 rounded-full"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentSubmissions;


