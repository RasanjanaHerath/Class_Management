import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TeacherRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
    role: "teacher",
    qualification: "",
    designation: "",
    subjects: "",
    school: "",
    birthday: "",
    address: "",
    nic: "",
    telephone: "",
    captcha: false,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.userName) newErrors.userName = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.qualification) newErrors.qualification = "Qualification is required";
    if (!formData.designation) newErrors.designation = "Designation is required";
    if (!formData.subjects) newErrors.subjects = "Subjects are required";
    if (!formData.school) newErrors.school = "School is required";
    if (!formData.birthday) newErrors.birthday = "Birthday is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.nic) newErrors.nic = "NIC is required";
    if (!formData.telephone) newErrors.telephone = "Telephone number is required";
    if (!formData.captcha) newErrors.captcha = "Captcha is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/teacher-register",
          formData
        );
        console.log(response.data);
        navigate("/login");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="bg-gray-100 p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-3xl mb-6 text-center text-gray-800">Teacher Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-800">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded"
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-800">Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded"
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-800">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-800">Qualification:</label>
            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded"
            />
            {errors.qualification && <p className="text-red-500 text-sm">{errors.qualification}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-800">Designation:</label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded"
            />
            {errors.designation && <p className="text-red-500 text-sm">{errors.designation}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-800">Subjects:</label>
            <textarea
              name="subjects"
              value={formData.subjects}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded"
            />
            {errors.subjects && <p className="text-red-500 text-sm">{errors.subjects}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-800">School:</label>
            <input
              type="text"
              name="school"
              value={formData.school}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded"
            />
            {errors.school && <p className="text-red-500 text-sm">{errors.school}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-800">Birthday:</label>
            <input
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded"
            />
            {errors.birthday && <p className="text-red-500 text-sm">{errors.birthday}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-800">Address:</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded"
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-800">NIC:</label>
            <input
              type="text"
              name="nic"
              value={formData.nic}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded"
            />
            {errors.nic && <p className="text-red-500 text-sm">{errors.nic}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-800">Telephone:</label>
            <input
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded"
            />
            {errors.telephone && <p className="text-red-500 text-sm">{errors.telephone}</p>}
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="captcha"
              checked={formData.captcha}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-gray-800">I'm not a robot</label>
            {errors.captcha && <p className="text-red-500 text-sm">{errors.captcha}</p>}
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeacherRegister;
