import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.jsx";
import { UserContext } from "../context/userContext.jsx";
import { DropDownProfile } from "./DropDownProfile.jsx";

function Navbar() {
  const { darkMode, toggleDarkMode } = useTheme();
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  // ToggleMenu
  const [menuVisible, setMenuVisible] = useState(true);

  function toggleMenu() {
    setMenuVisible(!menuVisible);
  }

  useEffect(() => {
    const checkLogin = async () => {
      const response = await fetch(
        "http://localhost:4000/users/check-logged-in",
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (response.ok) {
        setIsLoggedIn(true);
      }
    };

    // Beim erstmaligen Rendern der Seite wird beim Server geprüft, ob der User eingeloggt ist. D.h., ob ein gültiges Session-Cookie vorhanden ist
    if (isLoggedIn === null || isLoggedIn === undefined) {
      checkLogin();
    }
  }, [isLoggedIn]);

  return (
    <nav
      className={`fixed h-12 w-full top-0 right-0 px-2 py-2 ${
        darkMode ? "bg-gray-700 text-white py-2 " : "bg-white text-gray-900"
      }`}
    >
      <div className="mobile:mobileNav desktop:hidden">
        <div>
          {menuVisible ? (
            // BurgerMenu
            <button
              className="  text-slate-400 text-4xl font-bold  opacity-70  fixed right-2 hover:opacity-100 duration-300"
              onClick={toggleMenu}
            >
              &#9776;
            </button>
          ) : (
            // Close Icon
            <button
              className=" text-slate-400 text-4xl font-bold opacity-70 hover:opacity-200 dark:hover:text-slate-100"
              onClick={toggleMenu}
            >
              &times;
            </button>
          )}
          <DropDownProfile />
        </div>

        {!menuVisible && (
          <div className="mobileNavLi">
            {isLoggedIn ? (
              <>
                <NavLink to="/" onClick={toggleMenu}>
                  Home
                </NavLink>
                <NavLink to="/groupsForm" onClick={toggleMenu}>
                  groupsForm
                </NavLink>
                <NavLink to="/groups" onClick={toggleMenu}>
                  groups
                </NavLink>
                <NavLink to="/marketForm" onClick={toggleMenu}>
                  marketForm
                </NavLink>
                <NavLink to="/market" onClick={toggleMenu}>
                  market
                </NavLink>
                <NavLink to="/neighbours" onClick={toggleMenu}>
                  neighbours
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/register" onClick={toggleMenu}>
                  Register
                </NavLink>
                <NavLink to="/login" onClick={toggleMenu}>
                  Log In
                </NavLink>
            <button
              className="dark:text-4xl top-3 right-3 fixed font-bold opacity-70 hover:opacity-100 duration-300"
              onClick={toggleDarkMode}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
              </>
            )}
          </div>
        )}
      </div>
      
      {isLoggedIn ? (
        // Display these navigation links if the user is logged in
        <div className="desktop:desktopNav mobile:hidden ">
          <div className="desktopNavLi">
            {/* <h1 className="underline absolute py-2 px-2 text-slate-700">Logo</h1> */}
            <NavLink to="/">Home</NavLink>
            <NavLink to="/groupsForm">groupsForm</NavLink>
            <NavLink to="/groups">groups</NavLink>
            <NavLink to="/marketForm">marketForm</NavLink>
            <NavLink to="/market">market</NavLink>
            <NavLink to="/neighbours">neighbours</NavLink>
            <button
              className="dark: px-2 opacity-70 hover:opacity-100 duration-300"
              onClick={toggleDarkMode}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
          <DropDownProfile />
        </div>
      ) : (
        // Display these navigation links if the user is not logged in
        <div className="desktop:desktopNav border-2 mobile:hidden ">
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/login">Log In</NavLink>
          
          <button
            className="relative right-4 border-2 dark: px-2 opacity-70 hover:opacity-100 duration-300"
            onClick={toggleDarkMode}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
          <DropDownProfile />
        </div>
      )}
    </nav>
  );
}

export default Navbar;
