import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AssignmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [showUploadMarksPopup, setShowUploadMarksPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchAssignmentDetails();
    fetchSubmissions();
    fetchStudents();
  }, [id]);

  const fetchAssignmentDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/assignment/getById/${id}`);
      console.log('Assignment details:', response.data);
      setAssignment(response.data);
    } catch (error) {
      console.error('Error fetching assignment details:', error);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/submission/${id}`);
      console.log('Submissions:', response.data);
      setSubmissions(response.data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/student/get-all');
      console.log('Students:', response.data);
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const toggleUploadMarksPopup = () => {
    setShowUploadMarksPopup(!showUploadMarksPopup);
  };

  const handleStudentSelect = (student) => {
    setSelectedStudents((prev) =>
      prev.some((s) => s.id === student.id)
        ? prev
        : [...prev, { ...student, marks: '' }]
    );
    setShowDropdown(false); // Close dropdown after selecting a student
  };

  const handleMarkChange = (id, value) => {
    setSelectedStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, marks: value } : student
      )
    );
  };

  const handleSave = async () => {
    // Implement save functionality
    try {
      const response = await axios.post(`http://localhost:3000/api/result`, {
        results: selectedStudents.map(student => ({
          studentId: student.id,
          marks: student.marks,
          assignmentId: id
        }))
      });
      console.log('Results saved:', response.data);
      setShowUploadMarksPopup(false);
    } catch (error) {
      console.error('Error saving results:', error);
    }
  };

  const handleCancel = () => {
    setShowUploadMarksPopup(false);
  };

  return (
    <div className="container mx-auto p-4 md:ml-64 ml-0">
      {assignment ? (
        <>
          <h3 className="text-xl font-bold mb-4">{assignment.title}</h3>
          <button
            onClick={() => navigate(-1)}
            className="bg-red-500 text-white px-4 py-2 rounded-full mb-4"
          >
            Back to Assignments
          </button>

          <button
            onClick={toggleUploadMarksPopup}
            className="ml-5 bg-green-500 text-white px-4 py-2 rounded-full mt-4"
          >
            Upload Marks
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
      ) : (
        <p>Loading assignment details...</p>
      )}

      {showUploadMarksPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="mb-4 relative" ref={dropdownRef}>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded mb-2"
                placeholder="Search student by name or ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="absolute right-3 top-2 text-gray-500"
              >
                ▼
              </button>
              {showDropdown && (
                <ul className="absolute bg-white w-full shadow-lg max-h-40 overflow-y-auto border rounded">
                  {students
                    .filter(
                      (student) =>
                        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        student.id.toString().includes(searchTerm)
                    )
                    .map((student) => (
                      <li
                        key={student.id}
                        className="cursor-pointer p-2 hover:bg-gray-200"
                        onClick={() => handleStudentSelect(student)}
                      >
                        {student.name} (ID: {student.id})
                      </li>
                    ))}
                </ul>
              )}
            </div>
            <div>
                {selectedStudents.map((student) => (
                    <div key={student.id} className="flex items-center mb-2">
                        <span className="flex-grow">
                            {student.name} (ID: {student.id})
                        </span>
                        <input
                            type="number"
                            className="w-24 px-2 py-1 border rounded"
                            placeholder="Marks"
                            value={student.marks}
                            onChange={(e) => handleMarkChange(student.id, e.target.value)}
                            min="0"
                            max="100"
                        />
                    </div>
                ))}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="result">
                    Result
                </label>
                <input
                    type="number"
                    id="result"
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Enter result (0-100)"
                    min="0"
                    max="100"
                    value={selectedStudents.result}
                    onChange={(e) => handleMarkChange(selectedStudents.id, e.target.value)}
                />
            </div>
            <div>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded mr-2"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentDetails;