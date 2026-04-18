import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiFolder, FiMenu, FiX } from "react-icons/fi";

export default function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Hamburger (Mobile Only) */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 
                   bg-white/10 p-2 rounded-lg backdrop-blur-md"
      >
        <FiMenu size={20} />
      </button>

      {/*  Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/*  Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-screen w-60 p-4 
        bg-white/5 backdrop-blur-md border-r border-white/10
        transform transition-transform duration-300 z-50
        
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Close button (mobile) */}
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button onClick={() => setIsOpen(false)}>
            <FiX size={20} />
          </button>
        </div>

        {/* Title (desktop) */}
        <h2 className="text-xl font-semibold mb-6 hidden md:block">Menu</h2>

        <nav className="space-y-3">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 p-2 rounded-lg transition
              ${isActive("/") ? "bg-white/10 text-blue-400" : "hover:bg-white/10"}`}
          >
            <FiHome size={18} />
            Dashboard
          </Link>

          <Link
            to="/projects"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 p-2 rounded-lg transition
              ${isActive("/projects") ? "bg-white/10 text-blue-400" : "hover:bg-white/10"}`}
          >
            <FiFolder size={18} />
            Projects
          </Link>
        </nav>
      </div>
    </>
  );
}

