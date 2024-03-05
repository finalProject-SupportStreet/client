import { useEffect, useContext, useState } from "react";
import {  Outlet } from "react-router-dom";

import "../App.css";
import Navbar from "./mainComponents/Navbar.jsx";
import { useTheme } from "./context/ThemeContext.jsx";
function App() {
  const { darkMode, toggleDarkMode } = useTheme();



  
/*   localStorage.removeItem("theme"); // Whenever the user explicitly chooses to respect the OS preference */
  
  



{/* <div className={`h-full  px-0 box-content ${darkMode ? 'dark' : ''}`}> */}
return (
  <div>
      
      <Nav></Nav>
    <div className={`h-screen flex items-center justify-center px-4 w-full ${darkMode ? 'dark darkThemeColor' : ''}`}>
    
      <Outlet />
    </div>
  </div>
);
}


export default App;
