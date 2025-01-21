import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import UpdateClassForm from '../../component/UpdateClassForm';

const TClassDetailsPage = () => {
  const [classDetails, setClassDetails] = useState({});
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [institutes, setInstitutes] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { classId } = location.state;

  useEffect(() => {
    fetchClassDetails();
    fetchStudents();
    fetchAssignments();
    fetchInstitutes();
  }, []);

  const fetchClassDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/class/get-by-id/${classId}`);
      setClassDetails(response.data);
    } catch (error) {
      console.error("Error fetching class details:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/class/getStudents/${classId}`);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchAssignments = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/class/getAssignments/${classId}`);
      setAssignments(response.data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  const fetchInstitutes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/institute/get-all");
      setInstitutes(response.data);
    } catch (error) {
      console.error("Error fetching institutes:", error);
    }
  };

  const handleEdit = () => {
    setIsPopupOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/class/delete/${classId}`);
      navigate('/t_class_management');
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3000/api/class/update/${classId}`, formData);
      setIsPopupOpen(false);
      fetchClassDetails(); // Refresh class details after update
    } catch (error) {
      console.error("Error updating class:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

console.log("formData", formData);

  return (
    <div className="container mx-auto p-4  md:ml-64 ml-0">
      <h1 className="text-2xl font-bold mb-6">Class Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-bold">{classDetails.subject}</h3>
        <p>Grade: {classDetails.grade}</p>
        <p>Institute: {classDetails.institute?.name}</p>
        <p>Schedule: {classDetails.scheduleDay}</p>
        <p>Time: {classDetails.startTime} - {classDetails.endTime}</p>
        <p>Fee: {classDetails.feePerMonth}</p>
        <button
          onClick={handleEdit}
          className="bg-yellow-500 text-white px-4 py-2 rounded-full mt-4 mr-2"
        >
          <FontAwesomeIcon icon={faEdit} /> Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-full mt-4"
        >
          <FontAwesomeIcon icon={faTrash} /> Delete
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-bold mb-4">Assignments</h3>
        <ul>
          {assignments.map(assignment => (
            <li key={assignment.id}>{assignment.title}</li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-bold mb-4">Enrolled Students</h3>
        <ul>
          {students.map(student => (
            <li key={student.id}>{student.name}</li>
          ))}
        </ul>
      </div>

      {isPopupOpen && (
        <UpdateClassForm
          formData={formData}
          handleChange={handleChange}
          handleSave={handleSave}
          togglePopup={togglePopup}
          isEditing={true}
          institutes={institutes}
          classDetails ={classDetails}
        />
      )}
    </div>
  );
};

export default TClassDetailsPage;