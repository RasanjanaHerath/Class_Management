// // import React from "react";
// // import { useFormik } from "formik";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import { toast, ToastContainer } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import logo from '../assets/logo.png';

// // const Login = () => {
// //   const navigate = useNavigate();

// //   const handleSignup = ()=>{
// //     navigate('/signin')
// //   }

// //   const formik = useFormik({
// //     initialValues: {
// //       email: "",
// //       password: "",
// //     },
// //     onSubmit: async (values) => {
// //       try {
// //         const response = await axios.post(
// //           "http://localhost:3000/api/login",
// //           values,
// //           {
// //             headers: {
// //               "Content-Type": "application/json",
// //             },
// //           }
// //         );

// //         const { user, token } = response.data;

// //         // Store token and user information in localStorage
// //         localStorage.setItem("user", JSON.stringify(user));
// //         localStorage.setItem("token", JSON.stringify(token));

// //         // Redirect based on user role
// //         switch (user.role) {
// //           case "student":
// //             navigate("/student_profile");
// //             break;
// //           case "teacher":
// //             navigate("/teacher_profile");
// //             break;
// //           case "institute":
// //             navigate("/admin_profile");
// //             break;
// //           case "admin":
// //             navigate("/super_admin_profile");
// //             break;
// //           default:
// //             navigate("/dashboard");
// //         }
// //       } catch (error) {
// //         console.error(error);
// //         toast.error("Login failed. Please check your credentials.");
// //       }
// //     },
// //   });

// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
// //       <ToastContainer />
// //       <div className="bg-blue-500 p-8 rounded-lg shadow-md w-full max-w-md hover:bg-blue-600 hover:shadow-lg transition-all duration-300">
// //         <img
// //           src={logo}
// //           alt="ClassMaster Logo"
// //           className="mb-4 mx-auto w-20"
// //         />
// //         <h2 className="text-3xl mb-6 text-center text-white">ClassMaster</h2>

// //         <form onSubmit={formik.handleSubmit} className="space-y-4">
// //           <div className="flex flex-col">
// //             <label className="block text-white">Email:</label>
// //             <input
// //               type="email"
// //               name="email"
// //               value={formik.values.email}
// //               onChange={formik.handleChange}
// //               className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
// //             />
// //           </div>

// //           <div className="flex flex-col">
// //             <label className="block text-white">Password:</label>
// //             <input
// //               type="password"
// //               name="password"
// //               value={formik.values.password}
// //               onChange={formik.handleChange}
// //               className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
// //             />
// //           </div>

// //           <div className="flex items-center mb-4">
// //             <input type="checkbox" className="mr-2" />
// //             <label className="text-white">Apply with the Terms and Conditions</label>
// //           </div>

// //           <div className="flex space-x-4">
// //             <button
// //               type="submit"
// //               className="w-full bg-blue-800 text-white py-2 rounded-full hover:bg-blue-900 transition-colors duration-200"
// //             >
// //               Login
// //             </button>

// //             <button
// //               type="button"
// //               className="w-full bg-pink-500 text-white py-2 rounded-full hover:bg-pink-600 transition-colors duration-200"
// //               onClick={handleSignup}
// //             >
// //               Sign Up
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;

// import React from "react";
// import { useFormik } from "formik";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import logo from '../assets/logo.png';
// import Drawer from '../component/Drawer'; // Import the Drawer component

// const Login = () => {
//   const navigate = useNavigate();

//   const handleSignup = () => {
//     navigate("/signin");
//   };

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     onSubmit: async (values) => {
//       try {
//         const response = await axios.post(
//           "http://localhost:3000/api/login",
//           values,
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         const { user, token } = response.data;

//         // Store token and user information in localStorage
//         localStorage.setItem("user", JSON.stringify(user));
//         localStorage.setItem("token", JSON.stringify(token));

//         // Redirect based on user role
//         switch (user.role) {
//           case "student":
//             navigate("/student_profile");
//             break;
//           case "teacher":
//             navigate("/teacher_profile");
//             break;
//           case "institute":
//             navigate("/admin_profile");
//             break;
//           case "admin":
//             navigate("/super_admin_profile");
//             break;
//           default:
//             navigate("/dashboard");
//         }
//       } catch (error) {
//         console.error(error);
//         toast.error("Login failed. Please check your credentials.");
//       }
//     },
//   });

//   return (
//     <div className="flex">

//       {/* Main login content */}
//       <div className="flex-grow flex items-center justify-center min-h-screen bg-gray-100">
//         <ToastContainer />
//         <div className="bg-blue-500 p-8 rounded-lg shadow-md w-full max-w-md hover:bg-blue-600 hover:shadow-lg transition-all duration-300">
//           <img src={logo} alt="ClassMaster Logo" className="mb-4 mx-auto w-20" />
//           <h2 className="text-3xl mb-6 text-center text-white">ClassMaster</h2>

//           <form onSubmit={formik.handleSubmit} className="space-y-4">
//             <div className="flex flex-col">
//               <label className="block text-white">Email:</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formik.values.email}
//                 onChange={formik.handleChange}
//                 className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>

//             <div className="flex flex-col">
//               <label className="block text-white">Password:</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formik.values.password}
//                 onChange={formik.handleChange}
//                 className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>

//             <div className="flex items-center mb-4">
//               <input type="checkbox" className="mr-2" />
//               <label className="text-white">Apply with the Terms and Conditions</label>
//             </div>

//             <div className="flex space-x-4">
//               <button
//                 type="submit"
//                 className="w-full bg-blue-800 text-white py-2 rounded-full hover:bg-blue-900 transition-colors duration-200"
//               >
//                 Login
//               </button>

//               <button
//                 type="button"
//                 className="w-full bg-pink-500 text-white py-2 rounded-full hover:bg-pink-600 transition-colors duration-200"
//                 onClick={handleSignup}
//               >
//                 Sign Up
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // Adjust the import path as necessary

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
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
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/login",
        formData
      );
      console.log(response.data);
      // Store token and user information in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate("/dashboard");
    } catch (error) {
      console.error('Error during login:', error);
      setErrors({ form: 'Login failed. Please check your credentials.' });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="h-24" />
        </div>
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-600">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          {errors.form && <p className="text-red-500 text-sm mb-4">{errors.form}</p>}
          <button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-600 text-white px-4 py-2 rounded-full shadow-lg transition transform hover:scale-105"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-700">Don't have an account?</p>
          <button
            onClick={() => navigate("/signin")}
            className="text-blue-700 hover:underline"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;