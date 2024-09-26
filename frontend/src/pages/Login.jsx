// import React from "react";
// import { useFormik } from "formik";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Login = () => {
//   const navigate = useNavigate();

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
//           case "admin":
//             navigate("/admin_profile");
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
//     <div className="flex items-center justify-center h-screen bg-stone-100">
//       <ToastContainer />
//       <form
//         autoComplete="off"
//         onSubmit={formik.handleSubmit}
//         className="flex flex-col items-center w-full"
//       >
//         <img
//           src="logo-url-here"
//           alt="ClassMaster Logo"
//           className="mb-4"
//         />
//         <h2 className="text-3xl mb-6 text-center text-white">ClassMaster</h2>

//         <div className="mb-4">
//           <label className="block text-white">Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={formik.values.email}
//             onChange={formik.handleChange}
//             className="w-full px-3 py-2 mt-1 border rounded"
//           />
//         </div>

//         <div className="mb-4">
//           <label className=" text-white">Password:</label>
//           <input
//             type="password"
//             name="password"
//             value={formik.values.password}
//             onChange={formik.handleChange}
//             className="w-full px-3 py-2 mt-1 border rounded"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-1/2 bg-blue-800 text-white py-2 rounded-full hover:bg-blue-900"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;


import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();

  const handleSignup = ()=>{
    navigate('/signin')
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/login",
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const { user, token } = response.data;

        // Store token and user information in localStorage
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", JSON.stringify(token));

        // Redirect based on user role
        switch (user.role) {
          case "student":
            navigate("/student_profile");
            break;
          case "teacher":
            navigate("/teacher_profile");
            break;
          case "admin":
            navigate("/admin_profile");
            break;
          default:
            navigate("/dashboard");
        }
      } catch (error) {
        console.error(error);
        toast.error("Login failed. Please check your credentials.");
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="bg-blue-500 p-8 rounded-lg shadow-md w-full max-w-md hover:bg-blue-600 hover:shadow-lg transition-all duration-300">
        <img
          src="logo-url-here"
          alt="ClassMaster Logo"
          className="mb-4 mx-auto w-20"
        />
        <h2 className="text-3xl mb-6 text-center text-white">ClassMaster</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="block text-white">Email:</label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="block text-white">Password:</label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center mb-4">
            <input type="checkbox" className="mr-2" />
            <label className="text-white">Apply with the Terms and Conditions</label>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-2 rounded-full hover:bg-blue-900 transition-colors duration-200"
            >
              Login
            </button>

            <button
              type="button"
              className="w-full bg-pink-500 text-white py-2 rounded-full hover:bg-pink-600 transition-colors duration-200"
              onClick={handleSignup}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
