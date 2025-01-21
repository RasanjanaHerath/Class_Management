// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
// import ClassForm from "../../component/ClassForm";

// const ClassManagement = () => {
//   const [classes, setClasses] = useState([]); // Ensure initial state is an empty array
//   const [institutes, setInstitutes] = useState([]); // State to hold institutes
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     subject: "",
//     grade: "",
//     // teacherId:"",
//     instituteId: "", 
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
//       try {
//         const response = await axios.get("http://localhost:3000/api/class/get-all");
//       if (Array.isArray(response.data)) {
//         setClasses(response.data); // Ensure the response data is an array
//         console.log("  response ,",response.data);
//       } else {
//         console.error("Error: Response data is not an array");
//       }
//     } catch (error) {
//       console.error("Error fetching classes:", error);
//     }
//   };

//   const fetchInstitutes = async () => {
//     try {
//       console.log("institutes... :")
//       const response = await axios.get("http://localhost:3000/api/institute/get-all");
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
//       console.log("Saving class with data:", formData);
//       if (isEditing) {
//         await axios.put(`http://localhost:3000/api/class/updateClass/${formData.id}`, formData);
//       } else {
//         await axios.post(`http://localhost:3000/api/class/create`, formData);
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
//       await axios.delete(`http://localhost:3000/api/class/delete/${id}`);
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

//   console.log("Classes:", classes);

//   return (
//     <div className="container mx-auto p-4 md:ml-64 ml-0">
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
//             <p className="text-gray-700">Institute: {classItem.institute?.name}</p>
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
//         <ClassForm
//           formData={formData}
//           handleChange={handleChange}
//           handleSave={handleSave}
//           togglePopup={togglePopup}
//           isEditing={isEditing}
//           institutes={institutes}
//         />
//       )}
//     </div>
//   );
// };

// export default ClassManagement;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import ClassForm from "../../component/ClassForm";

const ClassManagement = () => {
  const [classes, setClasses] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    grade: "",
    instituteId: "",
    scheduleDay: "",
    startTime: "",
    endTime: "",
    feePerMonth: "",
    numberOfStudents: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchClasses();
    fetchInstitutes();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/class/get-all");
      if (Array.isArray(response.data)) {
        setClasses(response.data);
      } else {
        console.error("Error: Response data is not an array");
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
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

  const handleSave = async () => {
    try {
      console.log("Saving class with data:", formData);
      if (isEditing) {
        await axios.put(`http://localhost:3000/api/class/updateClass/${formData.id}`, formData);
      } else {
        await axios.post("http://localhost:3000/api/class/createClass", formData);
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

  const handleOpen = (classId) => {
    navigate('/t_class_details', { state: { classId } });
  };

  return (
    <div className="container mx-auto p-4  md:ml-64 ml-0">
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
            <p className="text-gray-700">Institute: {classItem.institute?.name}</p>
            <p className="text-gray-700">Schedule: {classItem.scheduleDay}</p>
            <p className="text-gray-700">
              Time: {classItem.startTime} - {classItem.endTime}
            </p>
            <p className="text-gray-700">Fee: {classItem.feePerMonth}</p>
            <p className="text-gray-700">
              Number of Students: {classItem.numberOfStudents}
            </p>
            {/* <button
              onClick={() => handleEdit(classItem)}
              className="bg-yellow-500 text-white px-4 py-2 rounded-full mt-2 mr-2"
            >
              <FontAwesomeIcon icon={faEdit} /> Edit
            </button>
            <button
              onClick={() => handleDelete(classItem.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-full mt-2"
            >
              <FontAwesomeIcon icon={faTrash} /> Delete
            </button> */}
            <button
              onClick={() => handleOpen(classItem.id)}
              className="bg-green-500 text-white px-4 py-2 rounded-full mt-2"
            >
              <FontAwesomeIcon icon={faEye} /> Open
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