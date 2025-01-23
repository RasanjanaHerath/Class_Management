// import React, { useState, useEffect, useRef } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFileAlt, faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';

// const AssignmentSubmissions = () => {
//   const [showAddAssignmentPopup, setShowAddAssignmentPopup] = useState(false);
//   const [showUploadMarksPopup, setShowUploadMarksPopup] = useState(false);
//   const [selectedAssignment, setSelectedAssignment] = useState(null);
//   const [selectedStudents, setSelectedStudents] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [marks, setMarks] = useState({});
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [isExcelUpload, setIsExcelUpload] = useState(false);
//   const [excelFile, setExcelFile] = useState(null);
//   const dropdownRef = useRef(null);

//   const handleStudentSelect = (student) => {
//     setSelectedStudents((prev) =>
//       prev.some((s) => s.id === student.id)
//         ? prev
//         : [...prev, { ...student, marks: "" }]
//     );
//     setShowDropdown(false); // Close dropdown after selecting a student
//   };

//   const handleMarkChange = (id, value) => {
//     setSelectedStudents((prev) =>
//       prev.map((student) =>
//         student.id === id ? { ...student, marks: value } : student
//       )
//     );
//   };

//   const handleSave = () => {
//     if (isExcelUpload) {
//       console.log("Excel file uploaded:", excelFile);
//     } else {
//       console.log("Manual marks entered:", selectedStudents);
//     }
//     alert("Marks saved!");
//   };

//   const handleCancel = () => {
//     setSelectedStudents([]);
//     setExcelFile(null);
//     setIsExcelUpload(false);
//     setShowUploadMarksPopup(false); // Close the popup
//   };

//   const handleClickOutside = (event) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       setShowDropdown(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const [students] = useState([
//     { id: 1, name: "John Doe" },
//     { id: 2, name: "Jane Smith" },
//     { id: 3, name: "Alice Johnson" },
//   ]);

//   const [assignments, setAssignments] = useState([
//     {
//       id: 1,
//       title: "Math Homework",
//       institute: "Institute 1",
//       class: "Class A",
//     },
//     {
//       id: 2,
//       title: "Science Project",
//       institute: "Institute 2",
//       class: "Class B",
//     },
//   ]);

//   const [submissions, setSubmissions] = useState([
//     {
//       studentName: "John Doe",
//       dateSubmitted: "2023-12-01",
//       answerFile: "answer1.pdf",
//       grade: "A",
//     },
//     {
//       studentName: "Jane Smith",
//       dateSubmitted: "2023-12-02",
//       answerFile: "answer2.pdf",
//       grade: "B",
//     },
//   ]);

//   const toggleAddAssignmentPopup = () => setShowAddAssignmentPopup(!showAddAssignmentPopup);
//   const toggleUploadMarksPopup = () => setShowUploadMarksPopup(!showUploadMarksPopup);

//   const selectAssignment = (assignment) => setSelectedAssignment(assignment);

//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen md:ml-64 ml-0">
//       <div className="flex-grow p-4">
//         <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
//           <h2 className="text-2xl font-bold mb-4">Assignments</h2>

//           {!selectedAssignment && (
//             <>
//               <button
//                 onClick={toggleAddAssignmentPopup}
//                 className="bg-blue-500 text-white px-4 py-2 rounded-full mb-4 shadow-lg transition transform hover:scale-105"
//               >
//                 <FontAwesomeIcon icon={faPlus} /> Add Assignment
//               </button>

//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {assignments.map((assignment) => (
//                   <div
//                     key={assignment.id}
//                     className="bg-gray-100 p-4 rounded-lg shadow cursor-pointer hover:bg-gray-200"
//                     onClick={() => selectAssignment(assignment)}
//                   >
//                     <h3 className="font-bold text-lg">{assignment.title}</h3>
//                     <p className="text-sm text-gray-600">{assignment.institute}</p>
//                     <p className="text-sm text-gray-600">{assignment.class}</p>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}
//         </div>
//       </div>

      // {/* Add Assignment Popup */}
      // {showAddAssignmentPopup && (
      //   <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      //     <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      //       <h2 className="text-xl font-bold mb-4">Add Assignment</h2>
      //       <form>
      //         <div className="mb-4">
      //           <label className="block text-gray-700">Institute:</label>
      //           <select className="w-full px-3 py-2 border rounded">
      //             <option value="">Select Institute</option>
      //             <option value="institute1">Institute 1</option>
      //           </select>
      //         </div>
      //         <div className="mb-4">
      //           <label className="block text-gray-700">Class:</label>
      //           <select className="w-full px-3 py-2 border rounded">
      //             <option value="">Select Class</option>
      //             <option value="class1">Class 1</option>
      //           </select>
      //         </div>
      //         <div className="mb-4">
      //           <label className="block text-gray-700">Assignment Title:</label>
      //           <input type="text" className="w-full px-3 py-2 border rounded" />
      //         </div>
      //         <div className="mb-4">
      //           <label className="block text-gray-700">Due Date:</label>
      //           <input type="date" className="w-full px-3 py-2 border rounded" />
      //         </div>
      //         <div className="mb-4">
      //           <label className="block text-gray-700">Description:</label>
      //           <textarea className="w-full px-3 py-2 border rounded"></textarea>
      //         </div>
      //         <div className="mb-4">
      //           <label className="block text-gray-700">Upload File:</label>
      //           <input type="file" className="w-full px-3 py-2 border rounded" />
      //         </div>
      //         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-full">
      //           Save Assignment
      //         </button>
      //         <button
      //           type="button"
      //           onClick={toggleAddAssignmentPopup}
      //           className="ml-4 bg-red-500 text-white px-4 py-2 rounded-full"
      //         >
      //           Cancel
      //         </button>
      //       </form>
      //     </div>
      //   </div>
      // )}
//     </div>
//   );
// };

// export default AssignmentSubmissions;

import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const AssignmentSubmissions = () => {
  const [showAddAssignmentPopup, setShowAddAssignmentPopup] = useState(false);
  const [showUploadMarksPopup, setShowUploadMarksPopup] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [marks, setMarks] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);
  const [isExcelUpload, setIsExcelUpload] = useState(false);
  const [excelFile, setExcelFile] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [students, setStudents] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [formData, setFormData] = useState({
    instituteId: '',
    class: '',
    title: '',
    dueDate: '',
    description: '',
    file: null,
  });
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchAssignments();
    fetchStudents();
    fetchClasses();
  }, []);

  useEffect(() => {
    if (classes.length > 0) {
      fetchInstitutes();
    }
  }, [classes]);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/assignment/get-all');
      setAssignments(response.data);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/student/get-all');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchInstitutes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/institute/get-all");
      if (Array.isArray(response.data)) {
        setInstitutes(response.data);
      } else {
        console.error("Error: Response data is not an array");
      }
    } catch (error) {
      console.error("Error fetching institutes:", error);
    }
  };
  
  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/class/get-all');
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleStudentSelect = (student) => {
    setSelectedStudents((prev) =>
      prev.some((s) => s.id === student.id)
        ? prev
        : [...prev, { ...student, marks: "" }]
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

  const handleSubmitMarks = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/assignment/submit-marks', {
        assignmentId: selectedAssignment.id,
        marks: selectedStudents.map(student => ({
          studentId: student.id,
          marks: student.marks
        }))
      });
      console.log('Marks submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting marks:', error);
    }
  };

  const toggleAddAssignmentPopup = () => {
    setShowAddAssignmentPopup(!showAddAssignmentPopup);
  };

  const selectAssignment = (assignment) => {
    setSelectedAssignment(assignment);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'institute') {
      const filtered = classes.filter(classItem => classItem.instituteId === value);
      setFilteredClasses(filtered);
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('institute', formData.institute);
    formDataToSend.append('class', formData.class);
    formDataToSend.append('title', formData.title);
    formDataToSend.append('dueDate', formData.dueDate);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('file', formData.file);

    try {
      const response = await axios.post('http://localhost:3000/api/assignment/add', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Assignment added successfully:', response.data);
      toggleAddAssignmentPopup();
      fetchAssignments(); // Refresh the assignments list
    } catch (error) {
      console.error('Error adding assignment:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 md:ml-64 ml-0" >
      <h1 className="text-2xl font-bold mb-4">Assignment Management</h1>
      <button
        onClick={toggleAddAssignmentPopup}
        className="bg-blue-500 text-white px-4 py-2 rounded-full mb-4"
      >
        <FontAwesomeIcon icon={faPlus} /> Add Assignment
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(assignments) && assignments.map((assignment) => (
          <div
            key={assignment.id}
            className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-200"
            onClick={() => selectAssignment(assignment)}
          >
            <h2 className="text-xl font-bold mb-2">{assignment.title}</h2>
            <p className="text-gray-700">Institute: {assignment.institute}</p>
            <p className="text-gray-700">Class: {assignment.class}</p>
          </div>
        ))}
      </div>

      {selectedAssignment && (
        <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
          <h2 className="text-2xl font-bold mb-4">{selectedAssignment.title}</h2>
          <button
            onClick={handleSubmitMarks}
            className="bg-green-500 text-white px-4 py-2 rounded-full mb-4"
          >
            Submit Marks
          </button>
          {/* Add more details and functionalities as needed */}
        </div>
      )}

      {/* Add Assignment Popup */}
      {showAddAssignmentPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add Assignment</h2>
            <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700">Institute:</label>
                  <select
                    name="instituteId"
                    value={formData.instituteId}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                  >
                    <option value="">Select Institute</option>
                    {institutes.map((institute) => (
                      <option key={institute.id} value={institute.id}>
                        {institute.user.firstName}
                      </option>
                    ))}
                  </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Class:</label>
                <select
                  name="class"
                  value={formData.class}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="">Select Class</option>
                  {Array.isArray(filteredClasses) && filteredClasses.map((classItem) => (
                    <option key={classItem.id} value={classItem.id}>
                      {classItem.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Assignment Title:</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Due Date:</label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Upload File:</label>
                <input
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border rounded"
                />
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
    </div>
  );
};

export default AssignmentSubmissions;