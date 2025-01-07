import React from 'react'
import { NavLink } from "react-router-dom"
import { FaLinkedin,FaInstagram,FaGithub } from "react-icons/fa";
const Footer = () => {
  return (
   <footer className='w-full text-center py-6  bg-gray-700 text-white'>
   <h2 className='text-xl'>Made by Developer Toheed</h2>
   <div className='w-full flex gap-4 justify-center mt-4'>
    <NavLink to="https://www.linkedin.com/in/toheed-qureshi-2a9741264">
   <FaLinkedin  className='text-3xl'/>
   </NavLink>
   <NavLink to="https://github.com/Toheed-qureshi21">
   <FaGithub  className='text-3xl'/>
   </NavLink>
   <NavLink to="https://www.instagram.com/techwhiz__03">
   <FaInstagram  className='text-3xl'/>
   </NavLink>
   </div>
   </footer>
  )
}

export default Footer
