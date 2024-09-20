import React from 'react'
import { Outlet } from "react-router-dom";
import Drawer from '../component/Drawer';


const DrawerLayout = () => {
  return (
    <div>
        
        <Drawer/>
        <Outlet/>
        
    </div>
  )
}

export default DrawerLayout