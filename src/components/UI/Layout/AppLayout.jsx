import React, { useContext } from 'react'
import {Outlet} from "react-router-dom"
import Header from '../Header'
import "../../../index.css"
import { OurContext } from '../../Context/OurContext'
import Footer from '../Footer'
const AppLayout = () => {
    const {theme} = useContext(OurContext);
  return (
    <div className={` bg-gradient-to-br from-background to-muted `}>
    <Header/>
    <main className={`min-h-dvh mx-auto  py-8 ${theme===false?"bg-zinc-800 text-white":"bg-white text-black"} transition-all ease-linear`}>
      <Outlet />
    </main>
   <Footer/>
  </div>
  )
}

export default AppLayout
