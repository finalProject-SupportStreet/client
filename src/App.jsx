import { Outlet } from "react-router-dom";

import "./App.css";
import Navbar from "./components/mainComponents/Navbar.jsx";
import { useTheme } from "./components/context/ThemeContext.jsx";
function App() {
  const { darkMode } = useTheme();

  /*   localStorage.removeItem("theme"); // Whenever the user explicitly chooses to respect the OS preference */

  {
    /* <div className={`h-full  px-0 box-content ${darkMode ? 'dark' : ''}`}> */
  }
  return (
    <div
      className={`flex pt-14 flex-col min-h-screen ${
        darkMode ? "dark darkThemeColor" : ""
      }`}
    >
      <Navbar />
      <div className="flex-grow flex-col min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
