import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md p-4 rounded-xl m-4">
      <div className="flex justify-between items-center max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold tracking-wide">PasteVault</h1>
        <div className="flex gap-5 text-lg font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-white pb-1"
                : "hover:text-yellow-300 transition-colors duration-200"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/pastes"
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-white pb-1"
                : "hover:text-yellow-300 transition-colors duration-200"
            }
          >
            Your Paste
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
