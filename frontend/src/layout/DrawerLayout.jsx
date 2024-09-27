import React from 'react'
import { Outlet } from "react-router-dom";
import Drawer from '../component/Drawer';
import Header from '../component/Header';
import RightBar from '../component/RightBar';


const DrawerLayout = () => {
  return (
    <div>

        <Drawer/>
        <Header />
        <Outlet/>
        <RightBar/>
        
    </div>
  )
}

export default DrawerLayout