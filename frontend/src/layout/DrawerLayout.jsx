import React from 'react'
import { Outlet } from "react-router-dom";
import Drawer from '../component/Drawer';
import Header from '../component/Header';
import RightBar from '../component/RightBar';



const DrawerLayout = () => {
  const user = localStorage.getItem("user");
  const parsedUser = JSON.parse(user); // Convert JSON string to object
  const role = parsedUser.role;
  console.log("Parsed User", parsedUser); // This will display the object
  console.log("User Role", parsedUser.role); // Access the role property
  

  return (
    <div>

        <Drawer role={role}/>
        <Header />
        <Outlet/>
        {/* <RightBar/> */}
        
    </div>
  )
}

export default DrawerLayout