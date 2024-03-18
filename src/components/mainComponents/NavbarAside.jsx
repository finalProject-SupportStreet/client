// NavBar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { DropDownProfile } from "./DropDownProfile";

function NavBar({ isLoggedIn, toggleMenu, toggleDarkMode, darkMode }) {
  return (
    <aside className="fixed top-0 left-0 h-full bg-gray-200 shadow-md">
      {/* Gemeinsame Navigationselemente hier */}
      <div className="p-5">
        <NavLink to="/" onClick={toggleMenu}>
          Home
        </NavLink>
        {isLoggedIn ? (
          <>
            <NavLink to="/dashboard" onClick={toggleMenu}>
              Mein Kiez
            </NavLink>
            <NavLink to="/groups" onClick={toggleMenu}>
              Gruppen
            </NavLink>
            {/* Weitere Links */}
          </>
        ) : (
          <>
            <NavLink to="/register" onClick={toggleMenu}>
              Register
            </NavLink>
            <NavLink to="/login" onClick={toggleMenu}>
              Log In
            </NavLink>
          </>
        )}
        <DropDownProfile />
        <button onClick={toggleDarkMode}>{darkMode ? "☀️" : "🌙"}</button>
      </div>
    </aside>
  );
}

export default NavBar;
