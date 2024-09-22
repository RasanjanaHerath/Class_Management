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
<<<<<<< HEAD
import SuperAdminProfile from "./pages/SuperAdminProfile/SuperAdminProfile";
import Institutes from "./pages/SuperAdminProfile/Institutes";
import Drawer from "./component/Drawer";
import AdminNotices from "./pages/dashboard_buttons/AdminNotices";
=======
import Dashboard from "./pages/AdminProfile";
>>>>>>> ddac3ab (feat:create right bar mobile responsive)


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
    path: "/admin_notice",
    //element: <Drawer />,
    children: [
      {
        index: true,
        element: <AdminNotices />,
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
        element: <class_details/>,
      },
    ],
  },
  {
    path: "/teacher_details",
    element: <DrawerLayout/>,
    children: [
      {
        index: true,
        element: <teacher_details/>,
      },
    ],
  },
  {
    path: "/student_details",
    element: <DrawerLayout/>,
    children: [
      {
        index: true,
        element: <student_details/>,
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
        element: <notification/>,
      },
    ],
  },
  {
    path: "/payment_details",
    element: <DrawerLayout/>,
    children: [
      {
        index: true,
        element: <payment_details/>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DrawerLayout/>,
    children: [
      {
        index: true,
        element: <dashboard/>,
      },
    ],
  },

]);


function App() {
  return (
    <div>
        <RouterProvider router={router} />
    </div>
  );
}

export default App;
