import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus,  faEye } from "@fortawesome/free-solid-svg-icons";
import ClassForm from "../../component/ClassForm";

const ClassManagement = () => {
  const [classesVerfied, setClassesVerified] = useState([]);
  const [classesPending, setClassesPending] = useState([]);
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
      const token = localStorage.getItem("token")
      const response = await axios.get("http://localhost:3000/api/class/get-by-teacher",
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setClassesVerified(response.data.verifiedClasses);
      setClassesPending(response.data.pendingClasses);

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
      
      // Retrieve token from local storage
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error("No token found in local storage");
      }
      
      // Set token in request headers
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      
      await axios.post("http://localhost:3000/api/class/create", formData, config);
      fetchClasses();
      togglePopup();
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error response:", error.response.data);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error request:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
      }
      console.error("Error config:", error.config);
    }
  };

  const handleEdit = (classItem) => {
    setFormData(classItem);
    setIsEditing(true);
    togglePopup();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/class/delete/${id}`);
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
    <div className="container mx-auto p-4 md:ml-64 ml-0">
          <h1 className="text-2xl font-bold mb-4">Class Management</h1>
          <button
            onClick={togglePopup}
            className="bg-blue-500 text-white px-4 py-2 rounded-full mb-4"
          >
            <FontAwesomeIcon icon={faPlus} /> Add Class
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.isArray(classesVerfied) && classesVerfied.map((classItem) => (
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
                  Expected Number of Students: {classItem.numberOfStudents}
                </p>
                <button
                  onClick={() => handleOpen(classItem.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-full mt-2"
                >
                  <FontAwesomeIcon icon={faEye} /> Open
                </button>
              </div>
            ))}
          </div>
    
          <h2 className="text-2xl font-bold mt-8 mb-4">Pending Classes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.isArray(classesPending) && classesPending.map((classItem) => (
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
                  Expected Number of Students: {classItem.numberOfStudents}
                </p>
                <p className="text-red-500 font-bold">Pending Verification</p>
    
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

