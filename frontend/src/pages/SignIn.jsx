import React from 'react'
import { useState } from 'react';

const SignIn = () => {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      captcha: false,
    });
  
    const [errors, setErrors] = useState({});
  
    const validateForm = () => {
      const newErrors = {};
      if (!formData.firstName) newErrors.firstName = 'First Name is required';
      if (!formData.lastName) newErrors.lastName = 'Last Name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.username) newErrors.username = 'Username is required';
      if (!formData.password) newErrors.password = 'Password is required';
      if (!formData.captcha) newErrors.captcha = 'Captcha is required';
      return newErrors;
    };
  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const newErrors = validateForm();
      setErrors(newErrors);
  
      if (Object.keys(newErrors).length === 0) {
        
        console.log('Form submitted successfully:', formData);
      }
    };
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 ">
        <img src="logo-url-here" alt="ClassMaster Logo" className="mb-4" />
        <div className="bg-sky-500 p-8 rounded-lg shadow-md w-full max-w-md hover:bg-blue-500 hover:shadow-2xl transform hover:scale-105 transition duration-300">
          <h2 className="text-3xl mb-6 text-center text-white">ClassMaster</h2>
          <p className="text-center text-white mb-6">Already have an account? <a href="/login" className="underline">Login</a></p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-white">First Name:</label>
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
              <label className="block text-white">Last Name:</label>
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
              <label className="block text-white">Email:</label>
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
              <label className="block text-white">Username (only letters, numbers and underscores):</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 border rounded"
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-white">Password (min. 8 char):</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 border rounded"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <div className="mb-4">
            <label className="block text-white">Role:</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded"
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="institute">Institute</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
          </div>



            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                name="captcha"
                checked={formData.captcha}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="text-white">I'm not a robot</label>
              {errors.captcha && <p className="text-red-500 text-sm">{errors.captcha}</p>}
            </div>
            <button type="submit" className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-900">Register</button>
          </form>
        </div>
      </div>
    );
  };
  
  export default SignIn;