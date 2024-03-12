import { Outlet } from "react-router-dom";

import "./App.css";
import Navbar from "./components/mainComponents/Navbar.jsx";
import { useTheme } from "./components/context/ThemeContext.jsx";
function App() {
  const { darkMode, toggleDarkMode } = useTheme();

  /*   localStorage.removeItem("theme"); // Whenever the user explicitly chooses to respect the OS preference */

  {
    /* <div className={`h-full  px-0 box-content ${darkMode ? 'dark' : ''}`}> */
  }
  return (
    <div>
      <Navbar />
<<<<<<< HEAD
    <div className={`h-full flex items-center justify-center px-4 w-full ${darkMode ? 'dark darkThemeColor' : ''}`}>
    
      <Outlet />
=======
      <div
        className={`flex items-center justify-center px-4 w-full ${
          darkMode ? "dark darkThemeColor" : ""
        }`}
      >
        <Outlet />
      </div>
>>>>>>> dev
    </div>
  );
}

export default App;
