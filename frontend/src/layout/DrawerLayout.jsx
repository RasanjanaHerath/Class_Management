import React from 'react'
import { Outlet } from "react-router-dom";
import Drawer from '../component/Drawer';
<<<<<<< HEAD
import Header from '../component/Header';
=======
import RightBar from '../component/RightBar';
>>>>>>> 0980bbb (create right bar)


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