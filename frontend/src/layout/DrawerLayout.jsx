import React from 'react'
import { Outlet } from "react-router-dom";
import Drawer from '../component/Drawer';
import Header from '../component/Header';


const DrawerLayout = () => {
  return (
    <div>

        <Drawer/>
        <Header />
        <Outlet/>
        
    </div>
  )
}

export default DrawerLayout