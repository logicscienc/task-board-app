import React from 'react';
import { FiPlus, FiMenu } from "react-icons/fi";

export default function Navbar({ onMenuClick, onNewTask }) {
  return (
    <div className="h-16 flex items-center justify-between px-4 sm:px-6 
                    bg-white/5 backdrop-blur-md border-b border-white/10">

      {/* Left side */}
      <div className="flex items-center gap-6">

        {/* Hamburger (mobile only) */}
        <button 
          onClick={onMenuClick}
          className="md:hidden"
        >
          <FiMenu size={20} />
        </button>

        <h1 className="text-lg font-semibold">TaskBoard</h1>
      </div>

      {/* Right side */}
      <button 
      onClick={onNewTask}
      className="flex items-center gap-2 bg-blue-500 px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition hover: cursor-pointer">

        <FiPlus size={16} />
        New Task

      </button>

    </div>
  );
}
