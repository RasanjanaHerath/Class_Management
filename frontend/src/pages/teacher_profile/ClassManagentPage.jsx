// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";

// const ClassManagement = () => {
//   const [classes, setClasses] = useState([]);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     id: null,
//     subject: "",
//     grade: "",
//     instituteName: "",
//     scheduleDay: "",
//     startTime: "",
//     endTime: "",
//     feePerMonth: "",
//     numerOnumberOfStudents: "",
//   });

//   const togglePopup = () => {
//     setIsPopupOpen(!isPopupOpen);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

  // const handleEdit = (classItem) => {
  //   setFormData(classItem);
  //   setIsEditing(true);
  //   togglePopup();
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (isEditing) {
  //     setClasses((prevClasses) =>
  //       prevClasses.map((c) => (c.id === formData.id ? formData : c))
  //     );
  //   } else {
  //     setClasses([...classes, { ...formData, id: Date.now() }]);
  //   }
  //   togglePopup();
  //   setFormData({
  //     id: null,
  //     subject: "",
  //     grade: "",
  //     instituteName: "",
  //     scheduleDay: "",
  //     startTime: "",
  //     endTime: "",
  //     feePerMonth: "",
  //   });
  //   setIsEditing(false);
  // };



//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen md:ml-64 ml-0">
//       <div className="flex-grow p-4">
//         <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
//           <h2 className="text-2xl font-bold mb-4">Class Management</h2>
//           <button
//             onClick={togglePopup}
//             className="bg-blue-500 text-white px-4 py-2 rounded-full mb-4 shadow-lg transition transform hover:scale-105"
//           >
//             <FontAwesomeIcon icon={faPlus} /> Add New Class
//           </button>
//           <div className="overflow-auto">
//             <table className="min-w-full bg-white">
//               <thead>
//                 <tr>
//                   <th className="py-2 px-4 border-b border-gray-200 text-left">Subject</th>
//                   <th className="py-2 px-4 border-b border-gray-200 text-left">Grade</th>
//                   <th className="py-2 px-4 border-b border-gray-200 text-left">Institute</th>
//                   <th className="py-2 px-4 border-b border-gray-200 text-left">Schedule Day</th>
//                   <th className="py-2 px-4 border-b border-gray-200 text-left">Start Time</th>
//                   <th className="py-2 px-4 border-b border-gray-200 text-left">End Time</th>
//                   <th className="py-2 px-4 border-b border-gray-200 text-left">Fee Per Month</th>
//                   <th className="py-2 px-4 border-b border-gray-200 text-left">Number Of Students</th>
//                   <th className="py-2 px-4 border-b border-gray-200 text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {classes.map((classItem) => (
//                   <tr key={classItem.id}>
//                     <td className="py-2 px-4 border-b border-gray-200">{classItem.subject}</td>
//                     <td className="py-2 px-4 border-b border-gray-200">{classItem.grade}</td>
//                     <td className="py-2 px-4 border-b border-gray-200">{classItem.instituteName}</td>
//                     <td className="py-2 px-4 border-b border-gray-200">{classItem.scheduleDay}</td>
//                     <td className="py-2 px-4 border-b border-gray-200">{classItem.startTime}</td>
//                     <td className="py-2 px-4 border-b border-gray-200">{classItem.endTime}</td>
//                     <td className="py-2 px-4 border-b border-gray-200">{classItem.feePerMonth}</td>
//                     <td className="py-2 px-4 border-b border-gray-200">{classItem.numerOnumberOfStudents}</td>
//                     <td className="py-2 px-4 border-b border-gray-200 text-right">
//                       <button
//                         onClick={() => handleEdit(classItem)}
//                         className="text-blue-500 hover:underline"
//                       >
//                         <FontAwesomeIcon icon={faEdit} /> Edit
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {isPopupOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
//             <h2 className="text-xl font-bold mb-4">
//               {isEditing ? "Edit Class" : "Add New Class"}
//             </h2>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Subject</label>
//                 <input
//                   type="text"
//                   name="subject"
//                   value={formData.subject}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded"
//                   required
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-700">Grade</label>
//                 <input
//                   type="text"
//                   name="grade"
//                   value={formData.grade}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded"
//                   required
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-700">Institute</label>
//                 <input
//                   type="text"
//                   name="instituteName"
//                   value={formData.instituteName}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded"
//                   required
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-700">Schedule Day</label>
//                 <select
//                   name="scheduleDay"
//                   value={formData.scheduleDay}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded"
//                   required
//                 >
//                   <option value="">Select Day</option>
//                   <option value="Monday">Monday</option>
//                   <option value="Tuesday">Tuesday</option>
//                   <option value="Wednesday">Wednesday</option>
//                   <option value="Thursday">Thursday</option>
//                   <option value="Friday">Friday</option>
//                   <option value="Saturday">Saturday</option>
//                   <option value="Sunday">Sunday</option>
//                 </select>
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Start Time</label>
//                 <input
//                   type="time"
//                   name="startTime"
//                   value={formData.startTime}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700">End Time</label>
//                 <input
//                   type="time"
//                   name="endTime"
//                   value={formData.endTime}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Fee Per Month</label>
//                 <input
//                   type="number"
//                   name="feePerMonth"
//                   value={formData.feePerMonth}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded"
//                   required
//                 />
//               </div>
              
//               <div className="flex justify-end">
//                 <button
//                   type="button"
//                   onClick={togglePopup}
//                   className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white px-4 py-2 rounded"
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ClassManagement;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";

// const ClassManagement = () => {
//   const [classes, setClasses] = useState([]); // Ensure initial state is an empty array
//   const [institutes, setInstitutes] = useState([]); // State to hold institutes
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     id: null,
//     subject: "",
//     grade: "",
//     instituteId: "", // Add instituteId to formData
//     scheduleDay: "",
//     startTime: "",
//     endTime: "",
//     feePerMonth: "",
//     numberOfStudents: "",
//   });

//   useEffect(() => {
//     fetchClasses();
//     fetchInstitutes(); // Fetch institutes when component mounts
//   }, []);

//   const fetchClasses = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/api/class/getAll");
//       if (Array.isArray(response.data)) {
//         setClasses(response.data); // Ensure the response data is an array
//       } else {
//         console.error("Error: Response data is not an array");
//       }
//     } catch (error) {
//       console.error("Error fetching classes:", error);
//     }
//   };

//   const fetchInstitutes = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/api/institute/getAll");
//       if (Array.isArray(response.data)) {
//         setInstitutes(response.data); // Ensure the response data is an array
//       } else {
//         console.error("Error: Response data is not an array");
//       }
//     } catch (error) {
//       console.error("Error fetching institutes:", error);
//     }
//   };

//   const handleSave = async () => {
//     try {
//       if (isEditing) {
//         await axios.put(`http://localhost:3000/api/class/updateClass/${formData.id}`, formData);
//       } else {
//         await axios.post("http://localhost:3000/api/class/createClass", formData);
//       }
//       fetchClasses();
//       togglePopup();
//     } catch (error) {
//       console.error("Error saving class:", error);
//     }
//   };

//   const handleEdit = (classItem) => {
//     setFormData(classItem);
//     setIsEditing(true);
//     togglePopup();
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3000/api/class/deleteClass/${id}`);
//       fetchClasses();
//     } catch (error) {
//       console.error("Error deleting class:", error);
//     }
//   };

//   const togglePopup = () => {
//     setIsPopupOpen(!isPopupOpen);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   return (
//     <div className="container mx-auto p-4 md:ml-64">
//       <h1 className="text-2xl font-bold mb-4">Class Management</h1>
//       <button
//         onClick={togglePopup}
//         className="bg-blue-500 text-white px-4 py-2 rounded-full mb-4"
//       >
//         <FontAwesomeIcon icon={faPlus} /> Add Class
//       </button>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {Array.isArray(classes) && classes.map((classItem) => (
//           <div
//             key={classItem.id}
//             className="bg-white p-4 rounded-lg shadow-md"
//           >
//             <h2 className="text-xl font-bold mb-2">{classItem.subject}</h2>
//             <p className="text-gray-700">Grade: {classItem.grade}</p>
//             <p className="text-gray-700">Institute: {classItem.instituteName}</p>
//             <p className="text-gray-700">Schedule: {classItem.scheduleDay}</p>
//             <p className="text-gray-700">
//               Time: {classItem.startTime} - {classItem.endTime}
//             </p>
//             <p className="text-gray-700">Fee: {classItem.feePerMonth}</p>
//             <p className="text-gray-700">
//               Number of Students: {classItem.numberOfStudents}
//             </p>
//             <button
//               onClick={() => handleEdit(classItem)}
//               className="bg-yellow-500 text-white px-4 py-2 rounded-full mt-2 mr-2"
//             >
//               <FontAwesomeIcon icon={faEdit} /> Edit
//             </button>
//             <button
//               onClick={() => handleDelete(classItem.id)}
//               className="bg-red-500 text-white px-4 py-2 rounded-full mt-2"
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>

//       {isPopupOpen && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h2 className="text-xl font-bold mb-4">
//               {isEditing ? "Edit Class" : "Add Class"}
//             </h2>
//             <form>
//               <label className="block mb-2">
//                 Subject:
//                 <input
//                   type="text"
//                   name="subject"
//                   value={formData.subject}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded"
//                 />
//               </label>
//               <label className="block mb-2">
//                 Grade:
//                 <input
//                   type="text"
//                   name="grade"
//                   value={formData.grade}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded"
//                 />
//               </label>
//               <label className="block mb-2">
//                 Institute:
//                 <select
//                   name="instituteId"
//                   value={formData.instituteId}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded"
//                 >
//                   <option value="">Select Institute</option>
//                   {institutes.map((institute) => (
//                     <option key={institute.id} value={institute.id}>
//                       {institute.user.firstName}
//                     </option>
//                   ))}
//                 </select>
//               </label>
//               <label className="block mb-2">
//                 Schedule Day:
//                 <input
//                   type="text"
//                   name="scheduleDay"
//                   value={formData.scheduleDay}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded"
//                 />
//               </label>
//               <label className="block mb-2">
//                 Start Time:
//                 <input
//                   type="time"
//                   name="startTime"
//                   value={formData.startTime}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded"
//                 />
//               </label>
//               <label className="block mb-2">
//                 End Time:
//                 <input
//                   type="time"
//                   name="endTime"
//                   value={formData.endTime}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded"
//                 />
//               </label>
//               <label className="block mb-2">
//                 Fee Per Month:
//                 <input
//                   type="number"
//                   name="feePerMonth"
//                   value={formData.feePerMonth}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded"
//                 />
//               </label>
//               <label className="block mb-2">
//                 Number of Students (You are expected):
//                 <input
//                   type="number"
//                   name="numberOfStudents"
//                   value={formData.numberOfStudents}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded"
//                 />
//               </label>
//               <button
//                 type="button"
//                 onClick={handleSave}
//                 className="bg-green-500 text-white px-4 py-2 rounded-full mt-4"
//               >
//                 Save
//               </button>
//               <button
//                 type="button"
//                 onClick={togglePopup}
//                 className="bg-red-500 text-white px-4 py-2 rounded-full mt-4 ml-2"
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

// export default ClassManagement;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import ClassForm from "../../component/ClassForm";

const ClassManagement = () => {
  const [classes, setClasses] = useState([]); // Ensure initial state is an empty array
  const [institutes, setInstitutes] = useState([]); // State to hold institutes
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    grade: "",
    // teacherId:"",
    instituteId: "", 
    scheduleDay: "",
    startTime: "",
    endTime: "",
    feePerMonth: "",
    numberOfStudents: "",
  });

  useEffect(() => {
    fetchClasses();
    fetchInstitutes(); // Fetch institutes when component mounts
  }, []);

  const fetchClasses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/class/get-all");
      if (Array.isArray(response.data)) {
        setClasses(response.data); // Ensure the response data is an array
        console.log("  response ,",response.data);
      } else {
        console.error("Error: Response data is not an array");
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const fetchInstitutes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/institute/getAll");
      if (Array.isArray(response.data)) {
        setInstitutes(response.data); // Ensure the response data is an array
      } else {
        console.error("Error: Response data is not an array");
      }
    } catch (error) {
      console.error("Error fetching institutes:", error);
    }
  };

  const handleSave = async () => {
    try {
      console.log("Saving class with data:", formData);
      if (isEditing) {
        await axios.put(`http://localhost:3000/api/class/updateClass/${formData.id}`, formData);
      } else {
        await axios.post(`http://localhost:3000/api/class/createClass/institute/`, formData);
      }
      fetchClasses();
      togglePopup();
    } catch (error) {
      console.error("Error saving class:", error);
    }
  };

  const handleEdit = (classItem) => {
    setFormData(classItem);
    setIsEditing(true);
    togglePopup();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/class/deleteClass/${id}`);
      fetchClasses();
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  console.log("Classes:", classes);

  return (
    <div className="container mx-auto p-4 md:ml-64 ml-0">
      <h1 className="text-2xl font-bold mb-4">Class Management</h1>
      <button
        onClick={togglePopup}
        className="bg-blue-500 text-white px-4 py-2 rounded-full mb-4"
      >
        <FontAwesomeIcon icon={faPlus} /> Add Class
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(classes) && classes.map((classItem) => (
          <div
            key={classItem.id}
            className="bg-white p-4 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-bold mb-2">{classItem.subject}</h2>
            <p className="text-gray-700">Grade: {classItem.grade}</p>
            <p className="text-gray-700">Institute: {classItem.userInstFirstName}</p>
            <p className="text-gray-700">Schedule: {classItem.scheduleDay}</p>
            <p className="text-gray-700">
              Time: {classItem.startTime} - {classItem.endTime}
            </p>
            <p className="text-gray-700">Fee: {classItem.feePerMonth}</p>
            <p className="text-gray-700">
              Number of Students: {classItem.numberOfStudents}
            </p>
            <button
              onClick={() => handleEdit(classItem)}
              className="bg-yellow-500 text-white px-4 py-2 rounded-full mt-2 mr-2"
            >
              <FontAwesomeIcon icon={faEdit} /> Edit
            </button>
            <button
              onClick={() => handleDelete(classItem.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-full mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {isPopupOpen && (
        <ClassForm
          formData={formData}
          handleChange={handleChange}
          handleSave={handleSave}
          togglePopup={togglePopup}
          isEditing={isEditing}
          institutes={institutes}
        />
      )}
    </div>
  );
};

export default ClassManagement;