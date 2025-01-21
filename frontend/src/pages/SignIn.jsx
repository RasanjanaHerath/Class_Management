import React from 'react'
import { useState } from 'react';
import axios from "axios";
import { UNSAFE_ErrorResponseImpl, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';
import { toast, Toaster } from 'sonner';

const SignIn = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      userName: '',
      password: '',
      role:'',
      captcha: false,
    });
  
    const [errors, setErrors] = useState({});
  
    const validateForm = () => {
      const newErrors = {};
      if (!formData.firstName) newErrors.firstName = 'First Name is required';
      if (!formData.lastName) newErrors.lastName = 'Last Name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.userName) newErrors.userName = 'Username is required';
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

    const handleSubmit = async (e) => {
      e.preventDefault();
    console.log(formData)
      try {
        const response = await axios.post(
          "http://localhost:3000/api/user/create",
          formData
        );
        console.log(response.data);
        toast.success('Registration successful. Please login to continue.');
        navigate("/login");
        // Handle successful registration here
      } catch (error) { console.error(error);
        toast.error(error.response.data.message);
        // Handle errors here
      }
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 ">
         <Toaster richColors closeButton position='top-right' />
        <div className="bg-sky-500 p-8 rounded-lg shadow-md w-full max-w-md hover:bg-blue-500 hover:shadow-2xl transform hover:scale-105 transition duration-300">
          <img src={logo} alt="ClassMaster Logo" className="mb-4 mx-auto w-20" />
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
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 border rounded"
              />
              {errors.userName && <p className="text-red-500 text-sm">{errors.userName}</p>}
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
  
  export default SignIn;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import logo from '../assets/logo.png'; // Adjust the import path as necessary

// const SignIn = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     userName: '',
//     password: '',
//     captcha: ''
//   });
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.firstName) newErrors.firstName = 'First Name is required';
//     if (!formData.lastName) newErrors.lastName = 'Last Name is required';
//     if (!formData.email) newErrors.email = 'Email is required';
//     if (!formData.userName) newErrors.userName = 'Username is required';
//     if (!formData.password) newErrors.password = 'Password is required';
//     if (!formData.captcha) newErrors.captcha = 'Captcha is required';
//     return newErrors;
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'checkbox' ? checked : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newErrors = validateForm();
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/user/create",
//         formData
//       );
//       console.log(response.data);
//       navigate("/login");
//     } catch (error) {
//       console.error('Error during sign-in:', error);
//       setErrors({ form: 'Sign-in failed. Please try again.' });
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl">
//         <div className="flex justify-center mb-6">
//           <img src={logo} alt="Logo" className="h-24" />
//         </div>
//         <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Register</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="firstName" className="block text-gray-700">First Name</label>
//             <input
//               type="text"
//               id="firstName"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
//           </div>
//           <div className="mb-4">
//             <label htmlFor="lastName" className="block text-gray-700">Last Name</label>
//             <input
//               type="text"
//               id="lastName"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
//           </div>
//           <div className="mb-4">
//             <label htmlFor="userName" className="block text-gray-700">Username</label>
//             <input
//               type="text"
//               id="userName"
//               name="userName"
//               value={formData.userName}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.userName && <p className="text-red-500 text-sm">{errors.userName}</p>}
//           </div>
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
//           </div>
          
//           <div className="mb-4">
//             <label htmlFor="password" className="block text-gray-700">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
//           </div>
//           <div className="mb-4">
//             <label htmlFor="password" className="block text-gray-700">Role</label>
//             <select
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               className="w-full px-3 py-2 mt-1 border rounded"
//             >
//               <option value="">Select Role</option>
//               <option value="student">Student</option>
//               <option value="teacher">Teacher</option>
//               <option value="institute">Institute</option>
//             </select>
//             {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
            
//           </div>
//           {errors.form && <p className="text-red-500 text-sm mb-4">{errors.form}</p>}
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg transition transform hover:scale-105"
//           >
//             Next
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignIn;
