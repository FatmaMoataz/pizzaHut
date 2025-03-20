import React from 'react'
import Logo from '../../assets/images/logo.png'

export default function Footer() {
  return (
   
    <footer className="bg-[#ee3d40] shadow-sm dark:bg-gray-900 w-full ">
    <div className="container mx-auto p-4 md:py-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <a  className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
          <img src={Logo} alt="Logo" className='w-44'/>
        </a>
        <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white">
          <li><a href="#" className="hover:underline me-4 md:me-6">About</a></li>
          <li><a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a></li>
          <li><a href="#" className="hover:underline me-4 md:me-6">Licensing</a></li>
          <li><a href="#" className="hover:underline">Contact</a></li>
        </ul>
      </div>
      <hr className="my-6 border-white sm:mx-auto dark:border-white lg:my-8" />
      <span className="block text-sm text-white">
        © 2025 <a href="https://www.pizzahut.co.in/" className="hover:underline">Pizza Hut™</a>. All Rights Reserved.
      </span>
    </div>
  </footer>



  )
}
