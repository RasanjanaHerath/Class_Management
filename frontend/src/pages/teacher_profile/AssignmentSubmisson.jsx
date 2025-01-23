// import React, { useState, useEffect, useRef } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFileAlt, faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';

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
//   const [assignments, setAssignments] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [institutes, setInstitutes] = useState([]);
//   const [classes, setClasses] = useState([]);
//   const [filteredClasses, setFilteredClasses] = useState([]);
//   const [formData, setFormData] = useState({
//     instituteId: '',
//     class: '',
//     title: '',
//     dueDate: '',
//     description: '',
//     file: null,
//   });
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     fetchAssignments();
//     fetchStudents();
//     fetchClasses();
//   }, []);

//   useEffect(() => {
//     if (classes.length > 0) {
//       fetchInstitutes();
//     }
//   }, [classes]);

//   const fetchAssignments = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/api/assignment/get-all');
//       setAssignments(response.data);
//     } catch (error) {
//       console.error('Error fetching assignments:', error);
//     }
//   };

//   const fetchStudents = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/api/student/get-all');
//       setStudents(response.data);
//     } catch (error) {
//       console.error('Error fetching students:', error);
//     }
//   };

//   const fetchInstitutes = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/api/institute/get-all");
//       if (Array.isArray(response.data)) {
//         setInstitutes(response.data);
//       } else {
//         console.error("Error: Response data is not an array");
//       }
//     } catch (error) {
//       console.error("Error fetching institutes:", error);
//     }
//   };
  
//   const fetchClasses = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/api/class/get-all');
//       setClasses(response.data);
//     } catch (error) {
//       console.error('Error fetching classes:', error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };


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

//   const handleSubmitMarks = async () => {
//     try {
//       const response = await axios.post('http://localhost:3000/api/assignment/submit-marks', {
//         assignmentId: selectedAssignment.id,
//         marks: selectedStudents.map(student => ({
//           studentId: student.id,
//           marks: student.marks
//         }))
//       });
//       console.log('Marks submitted successfully:', response.data);
//     } catch (error) {
//       console.error('Error submitting marks:', error);
//     }
//   };

//   const toggleAddAssignmentPopup = () => {
//     setShowAddAssignmentPopup(!showAddAssignmentPopup);
//   };

//   const selectAssignment = (assignment) => {
//     setSelectedAssignment(assignment);
//   };

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     if (name === 'institute') {
//       const filtered = classes.filter(classItem => classItem.instituteId === value);
//       setFilteredClasses(filtered);
//     }
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, file: e.target.files[0] });
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     const formDataToSend = new FormData();
//     formDataToSend.append('institute', formData.institute);
//     formDataToSend.append('class', formData.class);
//     formDataToSend.append('title', formData.title);
//     formDataToSend.append('dueDate', formData.dueDate);
//     formDataToSend.append('description', formData.description);
//     formDataToSend.append('file', formData.file);

//     try {
//       const response = await axios.post('http://localhost:3000/api/assignment/add', formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log('Assignment added successfully:', response.data);
//       toggleAddAssignmentPopup();
//       fetchAssignments(); // Refresh the assignments list
//     } catch (error) {
//       console.error('Error adding assignment:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 md:ml-64 ml-0" >
//       <h1 className="text-2xl font-bold mb-4">Assignment Management</h1>
//       <button
//         onClick={toggleAddAssignmentPopup}
//         className="bg-blue-500 text-white px-4 py-2 rounded-full mb-4"
//       >
//         <FontAwesomeIcon icon={faPlus} /> Add Assignment
//       </button>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {Array.isArray(assignments) && assignments.map((assignment) => (
//           <div
//             key={assignment.id}
//             className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-200"
//             onClick={() => selectAssignment(assignment)}
//           >
//             <h2 className="text-xl font-bold mb-2">{assignment.title}</h2>
//             <p className="text-gray-700">Institute: {assignment.institute}</p>
//             <p className="text-gray-700">Class: {assignment.class}</p>
//           </div>
//         ))}
//       </div>

//       {selectedAssignment && (
//         <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
//           <h2 className="text-2xl font-bold mb-4">{selectedAssignment.title}</h2>
//           <button
//             onClick={handleSubmitMarks}
//             className="bg-green-500 text-white px-4 py-2 rounded-full mb-4"
//           >
//             Submit Marks
//           </button>
//           {/* Add more details and functionalities as needed */}
//         </div>
//       )}

//       {/* Add Assignment Popup */}
//       {showAddAssignmentPopup && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h2 className="text-xl font-bold mb-4">Add Assignment</h2>
//             <form onSubmit={handleFormSubmit}>
//             <div className="mb-4">
//                 <label className="block text-gray-700">Institute:</label>
//                   <select
//                     name="instituteId"
//                     value={formData.instituteId}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border rounded"
//                   >
//                     <option value="">Select Institute</option>
//                     {institutes.map((institute) => (
//                       <option key={institute.id} value={institute.id}>
//                         {institute.user.firstName}
//                       </option>
//                     ))}
//                   </select>
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Class:</label>
//                 <select
//                   name="class"
//                   value={formData.class}
//                   onChange={handleFormChange}
//                   className="w-full px-3 py-2 border rounded"
//                 >
//                   <option value="">Select Class</option>
//                   {Array.isArray(filteredClasses) && filteredClasses.map((classItem) => (
//                     <option key={classItem.id} value={classItem.id}>
//                       {classItem.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Assignment Title:</label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleFormChange}
//                   className="w-full px-3 py-2 border rounded"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Due Date:</label>
//                 <input
//                   type="date"
//                   name="dueDate"
//                   value={formData.dueDate}
//                   onChange={handleFormChange}
//                   className="w-full px-3 py-2 border rounded"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Description:</label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleFormChange}
//                   className="w-full px-3 py-2 border rounded"
//                 ></textarea>
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Upload File:</label>
//                 <input
//                   type="file"
//                   name="file"
//                   onChange={handleFileChange}
//                   className="w-full px-3 py-2 border rounded"
//                 />
//               </div>
//               <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-full">
//                 Save Assignment
//               </button>
//               <button
//                 type="button"
//                 onClick={toggleAddAssignmentPopup}
//                 className="ml-4 bg-red-500 text-white px-4 py-2 rounded-full"
//               >
//                 Cancel
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AssignmentSubmissions;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AssignmentSubmission = () => {
  const BASE_URL = 'http://localhost:3000/api';
  const [showAddAssignmentPopup, setShowAddAssignmentPopup] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [classesVerified, setClassesVerified] = useState([]);
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [formData, setFormData] = useState({
    instituteId: '',
    classId: '',
    title: '',
    dueDate: '',
    description: '',
    file: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchAssignments();
    fetchInstitutes();
    fetchClasses();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/assignment/getAll`);
      setAssignments(response.data);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const fetchInstitutes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/institute/get-all`);
      console.log("institute data: ",response.data);
      setInstitutes(response.data);
    } catch (error) {
      console.error('Error fetching institutes:', error);
    }
  };

  const fetchClasses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/class/get-by-teacher`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      console.log("verified class: ",(response.data.verifiedClasses));

      setClassesVerified(response.data.verifiedClasses);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  // const handleFormChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });

  //   if (name === 'instituteId') {
  //     const filtered = classes.filter(classItem => classItem.instituteId === parseInt(value, 10));
  //     setFilteredClasses(filtered);
  //   }
  // };

  // const handleFileChange = (e) => {
  //   setFormData({ ...formData, file: e.target.files[0] });
  // };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    console.log("inst: ",classesVerified);
    if (name === 'instituteId') {
      const filtered = [
        // ...classes.filter(classItem => classItem.institute.id === parseInt(value, 10)),s
        ...classesVerified.filter(classItem => classItem.institute.id === parseInt(value, 10))
      ];
      console.log(filtered)
      setFilteredClasses(filtered);
    }
  };
  
  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    console.log("form data: ",formData);
    formDataToSend.append('instituteId', formData.instituteId);
    formDataToSend.append('classId', formData.classId);
    formDataToSend.append('title', formData.title);
    formDataToSend.append('dueDate', formData.dueDate);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('file', formData.file);

    try {
      const token = localStorage.getItem("token");
      console.log(formDataToSend);
      const response = await axios.post(`http://localhost:3000/api/assignment/create`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
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

  const toggleAddAssignmentPopup = () => {
    setShowAddAssignmentPopup(!showAddAssignmentPopup);
  };



  return (
    <div className="container mx-auto p-4 md:ml-64 ml-0">
      <h1 className="text-2xl font-bold mb-4">Assignment Management</h1>
      <button
        onClick={toggleAddAssignmentPopup}
        className="bg-blue-500 text-white px-4 py-2 rounded-full mb-4"
      >
        Add Assignment
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(assignments) && assignments.map((assignment) => (
          <div
            key={assignment.id}
            onClick={() => navigate(`/t_assignment_submission/${assignment.id}`)}
            className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-200"
          >
            <h2 className="text-xl font-bold mb-2">{assignment.title}</h2>
            <p className="text-gray-700">Institute: {assignment.institute?.name}</p>
            <p className="text-gray-700">Class: {assignment.classes?.subject}</p>
          </div>
        ))}
      </div>

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
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="">Select Institute</option>
                  {institutes.map((institute) => (
                    <option key={institute.id} value={institute.id}>
                      {institute.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-1">Class</label>
                <select
                  name="classId"
                  value={formData.classId}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-md focus:outline-blue-500"
                >
                  <option value="">Select class</option>
                  {Array.isArray(filteredClasses) && filteredClasses.map((classItem) => (
                    <option key={classItem.id} value={classItem.id}>
                      {`${classItem.subject} - Grade ${classItem.grade}`}
                    </option>
                  ))}
                </select>
               \
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

export default AssignmentSubmission;