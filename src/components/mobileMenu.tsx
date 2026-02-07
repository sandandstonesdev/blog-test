'use client'
    
import Link from 'next/link';
import { clsx } from 'clsx';
import { useState } from 'react';
import { navlinks } from '../config/navLinks'

const MobileMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  const closeMenu = () => {
    setMenuOpen(false);
  }

  return (
    <>
      {/* Hamburger button */}
      <button 
        onClick={toggleMenu}
        className="md:hidden flex flex-col justify-center items-center gap-1 p-2 hover:bg-gray-600 rounded"
        aria-label="Toggle menu"
      >
        <span className="w-6 h-0.5 bg-white block"></span>
        <span className="w-6 h-0.5 bg-white block"></span>
        <span className="w-6 h-0.5 bg-white block"></span>
      </button>

      {/* Menu overlay */}
      <div 
        className={clsx(
          "fixed top-0 left-0 w-full h-full bg-gray-800 text-white flex flex-col items-center justify-center z-50 transition-opacity duration-300",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Close button */}
        <button 
          onClick={toggleMenu}
          className="absolute top-4 right-4 text-3xl"
          aria-label="Close menu"
        >
          ✕
        </button>

        {/* Menu links */}
        <nav className="flex flex-col gap-6">
          {navlinks.map((link) => (
            <Link 
              key={link.id} 
              href={link.path}
              onClick={closeMenu}
              className="text-2xl hover:text-blue-400 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}

export default MobileMenu