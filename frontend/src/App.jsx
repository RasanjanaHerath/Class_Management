import "./App.css";
import BaseLayout from "./layout/BaseLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import TermsAndConditions from "./pages/TermsAndConditions";
import SignIn from "./pages/SignIn";
import StudentProfile from "./pages/studentProfile";
import TeacherProfile from "./pages/teacher_profile/TeacherProfile";
import AdminProfile from "./pages/AdminProfile";
import DrawerLayout from "./layout/DrawerLayout";
import SuperAdminProfile from "./pages/SuperAdminProfile/SuperAdminDashboard";
import Institutes from "./pages/SuperAdminProfile/Institutes";
import Drawer from "./component/Drawer";
import AdminNotices from "./pages/dashboard_buttons/AdminNotices";
import Dashboard from "./pages/AdminProfile";
import ClassDetails from "./pages/admin_profile/ClassDetails";
import AssignmentSubmissions from "./pages/teacher_profile/AssignmentSubmisson";
import ClassManagement from "./pages/teacher_profile/ClassManagentPage";
import Announcement from "./pages/teacher_profile/Announcement";
import StudentReport from "./pages/teacher_profile/StudentReport";
import Messege from "./pages/teacher_profile/Messege";
import StudentClass from "./pages/studentClass";
import TeacherDetails from "./pages/admin_profile/TeacherDetails";
import StudentDetails from "./pages/admin_profile/StudentDetails";
import PaymentDetails from "./pages/admin_profile/PaymentDetails";
import StudentRegister from "./pages/studentRegister";
import TeacherRegister from "./pages/TeacherRegister";
import Teachers from "./pages/SuperAdminProfile/Teachers";
import Students from "./pages/SuperAdminProfile/Students";
import AnalyticsAndReports from "./pages/SuperAdminProfile/AnalyticsAndReports";
import Notifications from "./pages/SuperAdminProfile/Notifications";
import SuperAdminDashboard from "./pages/SuperAdminProfile/SuperAdminDashboard";
import TClassDetailsPage from "./pages/teacher_profile/TClassDetailsPage";
import UpdateClassForm from "./component/UpdateClassForm";
import AssignmentDetails from "./pages/teacher_profile/AssignmentDetails";
import Ins_Notifications from "./pages/admin_profile/Ins_Notifications";
import HelpSupport from "./pages/HelpSupport";
import Create_Notice from "./pages/admin_profile/Create_Notice";
import InstituteRegistration from "./pages/InstituteRegistration";
import StudentMesseges from "./pages/StudentNotices";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/about",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <About />,
      },
    ],
  },
  {
    path: "/contact",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <Contact />,
      },
    ],
  },
  {
    path: "/login",
    // element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    path: "/terms_and_conditions",
    // element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <TermsAndConditions />,
      },
    ],
  },
  {
    path: "/signin",
    // element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <SignIn />,
      },
    ],
  },
  {
    path: "/student_profile",
    element: <DrawerLayout/>,
    children: [
      {
        index: true,
        element: <StudentProfile />,
      },
    ],
  },
  {
    path: "/help_support",
    element: <DrawerLayout/>,
    children: [
      {
        index: true,
        element: <HelpSupport/>,
      },
    ],
  },

  {
    path: "/student_class",
    element: <DrawerLayout/>,
    children: [
      {
        index: true,
        element: <StudentClass />,
      },
    ],
  },
  {
    path: "/teacher_profile",
    element: <DrawerLayout />,
    children: [
      {
        index: true,
        element: <TeacherProfile />,
      },
    ],
  },
  {
    path: "/notice_creater",
    element: <DrawerLayout />,
    children: [
      {
        index: true,
        element: <Create_Notice/>,
      },
    ],
  },
  {
    path: "/admin_profile",
    element: <DrawerLayout/>,
    children: [
      {
        index: true,
        element: <AdminProfile />,
      },
    ],
  },
  {
    path: "/class_details",
    element: <DrawerLayout/>,
    children: [
      {
        index: true,
        element: <ClassDetails/>,
      },
    ],
  },
  {
    path: "/teacher_details",
    element: <DrawerLayout/>,
    children: [
      {
        index: true,
        element: <TeacherDetails/>,
      },
    ],
  },
  {
    path: "/student_details",
    element: <DrawerLayout/>,
    children: [
      {
        index: true,
        element: <StudentDetails/>,
      },
    ],
  },
  {
    path: "/reports",
    element: <DrawerLayout/>,
    children: [
      {
        index: true,
        element: <reports/>,
      },
    ],
  },
  {
    path: "/notification",
    element: <DrawerLayout/>,
    children: [
      {
        index: true,
        element: <Ins_Notifications/>,
      },
    ],
  },
  {
    path: "/payment_details",
    element: <DrawerLayout/>,
    children: [
      {
        index: true,
        element: <PaymentDetails/>,
      },
    ],
  },
  {
    path: "/admin_notice",
    element: <DrawerLayout/>,
    children: [
      {
        index: true,
        element: <AdminNotices/>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DrawerLayout/>,
    children: [
      {
        index: true,
        element: <Dashboard/>,
      },
    ],
  },
  {
    path: "/super_admin_profile",
    element: <DrawerLayout/>,
    children: [
      {
        index: true,
        element: 
        <SuperAdminDashboard />,
      },
    ],
  },
  {
    path: "/InstituteRegistration",
    // element: <DrawerLayout/>,
    children: [
      {
        index: true,
        element: 
        <InstituteRegistration />,
      },
    ],
  },
  {
    path: "/institutes",
    element: <DrawerLayout/>,
    children: [
      {
        index: true,
        element: 
        <Institutes />,
      },
    ],
  },
  {
    path: "/admin_teachers",
    element: <DrawerLayout/>,
    children: [
      {
        index: true,
        element: 
        <Teachers />,
      },
    ],
  },
  {
    path: "/admin_students",
    element: <DrawerLayout/>,
    children: [
      {
        index: true,
        element: 
        <Students />,
      },
    ],
  },
  {
    path: "/admin_reports",
    element: <DrawerLayout/>,
    children: [
      {
        index: true,
        element: 
        <AnalyticsAndReports />,
      },
    ],
  },
  {
    path: "/admin_notifications",
    element: <DrawerLayout/>,
    children: [
      {
        index: true,
        element: 
        <AdminNotices />,
      },
    ],
  },
  {
    path: "/t_assignment_submission",
    element: <DrawerLayout/>,
    children: [
      {
        index: true,
        element:
         <AssignmentSubmissions/>,
      },
    ],
  },

  {
    path: "/t_assignment_submission/:id",
    element: <DrawerLayout/>,
    children: [
      {
        index: true,
        element:
         <AssignmentDetails/>
        
      },
    ],
  },


  {
    path: "/t_class_management",
    element: <DrawerLayout/>,
    children: [
      {
        index: true,
        element: 
        <ClassManagement/>,
      },
    ],
  },
  {
    path: "/t_announcement",
    element: <DrawerLayout/>,
    children: [
      {
        index: true,
        element: <Announcement/>,
      },
    ],
  },
  {
    path: "/student_registation",
    //element: <DrawerLayout/>,
    children: [
      {
        index: true,
        element: <StudentRegister/>,
      },
    ],
  },

  {
    path: "/teacher_registation",
    //element: <DrawerLayout/>,
    children: [
      {
        index: true,
        element: <TeacherRegister/>,
      },
    ],
  },


  {
    path: "/t_student_report",
    element: <DrawerLayout/>,
    children: [
      {
        index: true,
        element: <StudentReport/>,
      },
    ],
  },
  {
    path: "/t_messege",
    element: <DrawerLayout/>,
    children: [
      {
        index: true,
        element: <Messege/>,
      },
    ],
  },
  {
  path: "/student_messeges",
  element: <DrawerLayout/>,
  children: [
    {
      index: true,
      element: <StudentMesseges/>,
    },
  ],
},
  {
    path: "/t_class_details",
    element: <DrawerLayout />,
    children: [
      {
        index: true,
        element: <TClassDetailsPage />,
      },
    ],
  },
  // {
  //   path: "/t_assignment_details",
  //   element: <DrawerLayout />,
  //   children: [
  //     {
  //       index: true,
  //       element: <AssignmentDetails />,
  //     },
  //   ],
  // },



]);


function App() {
  return (
    <div>
        <RouterProvider router={router} />
    </div>
  );
}

export default App;
