import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#ee3d40] border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3">
          <img src={Logo} alt="Logo" className="w-40" />
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden focus:outline-none"
          aria-controls="navbar-default"
          aria-expanded={menuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className={`${menuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg bg-[#ee3d40] md:flex-row md:space-x-8 md:mt-0">
            {['Home', 'Menu', 'Contact', 'About'].map((item) => (
              <li key={item}>
                <NavLink
                  to={`/${item.toLowerCase()}`}
                  className={({ isActive }) =>
                    `block px-3 py-1 rounded transition ${
                      isActive
                        ? 'bg-white text-[#ee3d40]'  
                        : 'text-white hover:bg-white hover:text-[#ee3d40]'
                    }`
                  }
                >
                  {item}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap gap-6 items-center">
          <Link to="/favorites">
            <i className="fa-regular fa-heart text-2xl text-white"></i>
          </Link>
          <Link to="/cart">
            <i className="fa-solid fa-cart-shopping text-2xl text-white"></i>
          </Link>

          <Link to="/login" className="text-white border border-white px-3 py-1 rounded hover:bg-white hover:text-[#ee3d40] transition">
            Login
          </Link>
          <Link to="/register" className="bg-white text-[#ee3d40] px-3 py-1 rounded hover:bg-gray-200 transition">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}