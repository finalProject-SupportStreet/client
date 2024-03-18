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

  useEffect(() => {
    // Login-Check aus LS holen ? Damit sich useEffect updated
    const checkLogin = async () => {
      const response = await fetch(
        "http://localhost:4000/users/check-logged-in",
        {
          method: "POST",
          credentials: "include",
        }
      );
      // response -> immer undefined
      if (response.ok) {
        // wird nie ausgelöst, wenn dann egal für react weil bereits beim login -> true
        setIsLoggedIn(true);
      }
    };
    checkLogin();
  }, [setIsLoggedIn]);

  function toggleMenu() {
    setMenuVisible(!menuVisible);
  }

  //! HAB DAS LOGO ERSTMAL AUSGEBLENDET! Zeile 109

  return (
    <nav
      className={`fixed h-12 w-full top-0 right-0 px-2 py-2 ${
        darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Mobile-Ansicht */}
      <div className="mobile:mobileNav desktop:hidden">
        <div>
          {menuVisible ? (
            <button
              className="text-slate-400 text-4xl font-bold opacity-70 fixed right-2 hover:opacity-100 duration-300"
              onClick={toggleMenu}
            >
              &#9776;
            </button>
          ) : (
            <button
              className="text-slate-400 text-4xl font-bold opacity-70 hover:opacity-200 dark:hover:text-slate-100"
              onClick={toggleMenu}
            >
              &times;
            </button>
          )}
          <DropDownProfile />
        </div>

        {!menuVisible && (
          <div className="mobileNavLi">
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
                <NavLink to="/market" onClick={toggleMenu}>
                  Marktplatz
                </NavLink>
                <NavLink to="/neighbours" onClick={toggleMenu}>
                  Meine Nachbarschaft
                </NavLink>
                <NavLink to="/styles" onClick={toggleMenu}>
                  Meine Styles
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
              </>
            )}
            <button
              className="dark:text-4xl top-3 right-3 fixed font-bold opacity-70 hover:opacity-100 duration-300"
              onClick={toggleDarkMode}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
        )}
      </div>

      {/* Desktop-Ansicht */}
      <div className="desktop:desktopNav mobile:hidden">
        <div className="desktopNavLi">
          {/* <h1 className="underline absolute py-2 px-2 text-slate-700">Logo</h1> */}
          <NavLink to="/">Home</NavLink>
          {isLoggedIn && (
            <>
              <NavLink to="/dashboard" onClick={toggleMenu}>
                Mein Kiez
              </NavLink>
              <NavLink to="/groups" onClick={toggleMenu}>
                Gruppen
              </NavLink>
              <NavLink to="/market" onClick={toggleMenu}>
                Marktplatz
              </NavLink>
              <NavLink to="/neighbours" onClick={toggleMenu}>
                Meine Nachbarschaft
              </NavLink>
              <NavLink to="/styles" onClick={toggleMenu}>
                Meine Styles
              </NavLink>
            </>
          )}
          <DropDownProfile />
          <button
              className="dark:text-4xl top-3 right-3 fixed font-bold opacity-70 hover:opacity-100 duration-300"
              onClick={toggleDarkMode}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;