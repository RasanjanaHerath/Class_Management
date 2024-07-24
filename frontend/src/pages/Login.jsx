import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms and conditions';
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-stone-100">
      <img src="logo-url-here" alt="ClassMaster Logo" className="mb-4"/>
      <div className="bg-sky-500 p-8 rounded-lg shadow-md w-full max-w-md hover:bg-blue-500 hover:shadow-lg transition-all duration-300">
        <h2 className="text-3xl mb-6 text-center text-white">ClassMaster</h2>
        <form onSubmit={handleSubmit}>
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
            <label className="block text-white">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-white"> Apply with the <a href="/terms_and_conditions" className="text-white hover:underline">Terms and Conditions</a></label>
            {errors.termsAccepted && <p className="text-red-500 text-sm">{errors.termsAccepted}</p>}
          </div>
          <div className="flex justify-between">
            <button type="submit" className="w-1/2 bg-blue-800 text-white py-2 rounded-full hover:bg-blue-900">Login</button>
            <Link to="/signin" className="w-1/2 ml-4">
              <button type="button" className="w-full bg-pink-600 text-white py-2 rounded-full hover:bg-pink-700">Sign up</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
