import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { UserContext } from "../context/userContext.jsx";
import { DropDownProfile } from "./DropDownProfile";
import "./navbar.css";
import Logo from "../assets/SupportStreetLogo.png";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { isLoggedIn } = useContext(UserContext);
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => setMenuVisible(!menuVisible);

  return (
    <nav className={`navbar ${darkMode ? "dark-mode" : ""}`}>
      <div className="logo-and-title">
        {/* Platzhalter für ein Logo */}
        <img src={Logo} className="h-12 w-12" alt="logo" />
        <span>Support Street</span>
      </div>
      <div className="nav-items ">
        <button onClick={toggleDarkMode}>{darkMode ? "☀️" : "🌙"}</button>
        {isLoggedIn && <DropDownProfile />}{" "}
        {/* Nur anzeigen, wenn eingeloggt */}
        <button className="burger-menu m-4" onClick={toggleMenu}>
          &#9776;
        </button>
      </div>
      {menuVisible && (
        <div className="dropdown-menu">
          {isLoggedIn ? (
            <>
              <NavLink to="/" onClick={toggleMenu}>
                Home
              </NavLink>
              <NavLink to="/groups" onClick={toggleMenu}>
                Gruppen
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
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
