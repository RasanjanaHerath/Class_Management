// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import logo from '../assets/logo.png';


// const Drawer = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDrawer = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div>
      
//       <button className="md:hidden p-4" onClick={toggleDrawer}>
//         <svg
//           className="w-6 h-6"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M4 6h16M4 12h16m-7 6h7"
//           ></path>
//         </svg>
//       </button>
//       <div
//         className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white shadow-lg transform ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } transition-transform md:translate-x-0 md:block`}
//       >
//         <div className="p-4">
//           <div className="flex justify-between items-center">
//             <h2 className="text-xl font-semibold">Class Master</h2>
//             <button className="md:hidden p-2" onClick={toggleDrawer}>
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 ></path>
//               </svg>
//             </button>
//           </div>
//           <div className="flex-1">
//           <ul className="mt-4">
//             <li>
//               <NavLink
//                 to="/Dashboard"
//                 className={({ isActive }) =>
//                   `py-2 px-4 block hover:bg-gray-700 ${
//                     isActive ? "bg-gray-700" : ""
//                   }`
//                 }
//                 onClick={toggleDrawer}
//               >
//                 Dashboard
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/super_admin_profile"
//                 className={({ isActive }) =>
//                   `py-2 px-4 block hover:bg-gray-700 ${
//                     isActive ? "bg-gray-700" : ""
//                   }`
//                 }
//                 onClick={toggleDrawer}
//               >
//                 Super Admin Dashboard
//               </NavLink>
//             </li>
//             <li>
//             <NavLink
//                 to="/institutes"
//                 className={({ isActive }) =>
//                   `py-2 px-4 block hover:bg-gray-700 ${
//                     isActive ? "bg-gray-700" : ""
//                   }`
//                 }
//                 onClick={toggleDrawer}
//               >
//                 Institutes
//               </NavLink>
//               </li>
//             <li>
//               <NavLink
//                 to="/class_details"
//                 className={({ isActive }) =>
//                   `py-2 px-4 block hover:bg-gray-700 ${
//                     isActive ? "bg-gray-700" : ""
//                   }`
//                 }
//                 onClick={toggleDrawer}
//               >
//                 Class Details
//               </NavLink>
//             </li>

//             <li>
//               <NavLink
//                 to="/teacher_details"
//                 className={({ isActive }) =>
//                   `py-2 px-4 block hover:bg-gray-700 ${
//                     isActive ? "bg-gray-700" : ""
//                   }`
//                 }
//                 onClick={toggleDrawer}
//               >
//                 Teacher Details
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/student_details"
//                 className={({ isActive }) =>
//                   `py-2 px-4 block hover:bg-gray-700 ${
//                     isActive ? "bg-gray-700" : ""
//                   }`
//                 }
//                 onClick={toggleDrawer}
//               >
//                 Student Details
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/admin_notice"
//                 className={({ isActive }) =>
//                   `py-2 px-4 block hover:bg-gray-700 ${
//                     isActive ? "bg-gray-700" : ""
//                   }`
//                 }
//                 onClick={toggleDrawer}
//               >
//                 Notices
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/payment_details"
//                 className={({ isActive }) =>
//                   `py-2 px-4 block hover:bg-gray-700 ${
//                     isActive ? "bg-gray-700" : ""
//                   }`
//                 }
//                 onClick={toggleDrawer}
//               >
//                 Payment Details
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/reports"
//                 className={({ isActive }) =>
//                   `py-2 px-4 block hover:bg-gray-700 ${
//                     isActive ? "bg-gray-700" : ""
//                   }`
//                 }
//                 onClick={toggleDrawer}
//               >
//                 Analytics and Reports
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/notification"
//                 className={({ isActive }) =>
//                   `py-2 px-4 block hover:bg-gray-700 ${
//                     isActive ? "bg-gray-700" : ""
//                   }`
//                 }
//                 onClick={toggleDrawer}
//               >
//                 Notifications
//               </NavLink>
//             </li>
//           </ul>
//           </div>

          
//           <ul className="mt-56 flex-1 ">
//             <li>
//               <NavLink
//                 to="/add-property"
//                 className={({ isActive }) =>
//                   `py-2 px-4 block hover:bg-gray-700 ${
//                     isActive ? "bg-gray-700" : ""
//                   }`
//                 }
//                 onClick={toggleDrawer}
//               >
//                 Settings
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/add-property"
//                 className={({ isActive }) =>
//                   `py-2 px-4 block hover:bg-gray-700 ${
//                     isActive ? "bg-gray-700" : ""
//                   }`
//                 }
//                 onClick={toggleDrawer}
//               >
//                 Help & Support
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/t_class_management"
//                 className={({ isActive }) =>
//                   `py-2 px-4 block hover:bg-gray-700 ${
//                     isActive ? "bg-gray-700" : ""
//                   }`
//                 }
//                 onClick={toggleDrawer}
//               >
//                 class Management
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/"
//                 className={({ isActive }) =>
//                   `py-2 px-4 block hover:bg-gray-700 ${
//                     isActive ? "bg-gray-700" : ""
//                   }`
//                 }
//                 onClick={toggleDrawer}
//               >
                
//                 Logout
//               </NavLink>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Drawer;

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from '../assets/logo.png';

const Drawer = ({ role }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  // Define menu items based on roles
  const menuItems = {
    student: [
      { path: "/student_profile", label: "Dashboard" },
      { path: "/student_classes", label: "My Classes" },
      { path: "/messeging", label: "Messages" },
      { path: "/student_report", label: "Reports" },
    ],
    teacher: [
      { path: "/teacher_profile", label: "Dashboard" },
      { path: "/t_class_management", label: "Class Management" },
      { path: "/t_announcement", label: "Announcement" },
      { path: "/t_assignment_submission", label: "Assignments" },
      { path: "/t_student_report", label: "Student Reports" },
    ],
    admin: [
      { path: "/super_admin_profile", label: "Dashboard" },
      { path: "/institutes", label: "Institutes" },
      { path: "/admin_reports", label: "Analytics and Reports" },
    ],
    institute: [
      { path: "/admin_profile", label: "Dashboard" },
      { path: "/i_class_management", label: "Manage Classes" },
      { path: "/teacher_details", label: "Teacher Details" },
      { path: "/student_details", label: "Student Details" },
    ],
  };

  const commonItems = [
    { path: "/help_support", label: "Help & Support" },
    { path: "/settings", label: "Settings" },
    { path: "/", label: "Logout" },
  ];

  // Get items based on role
  const roleMenuItems = menuItems[role] || [];
 
  return (
    <div>
      <button className="md:hidden p-4" onClick={toggleDrawer}>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:translate-x-0 md:block`}
      >
        <div className="p-4">
          <h2 className="text-xl font-semibold">Class Master</h2>
          <div className="flex-1">
            <ul className="mt-4">
              {/* Render menu items dynamically */}
              {roleMenuItems.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `py-2 px-4 block hover:bg-gray-700 ${
                        isActive ? "bg-gray-700" : ""
                      }`
                    }
                    onClick={toggleDrawer}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              {/* Render common menu items */}
              {commonItems.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `py-2 px-4 block hover:bg-gray-700 ${
                        isActive ? "bg-gray-700" : ""
                      }`
                    }
                    onClick={toggleDrawer}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
