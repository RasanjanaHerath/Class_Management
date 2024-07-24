import React from 'react'
import { Outlet } from "react-router-dom";
import NavBar from '../component/NavBar'
import Footer from '../component/Footer';


const BaseLayout = () => {
  return (
    <div>
        <NavBar />
        <Outlet/>
        <Footer />
    </div>
  )
}

export default BaseLayout