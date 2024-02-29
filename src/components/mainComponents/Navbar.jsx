import React, {  useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';
import { UserContext } from '../context/userContext.jsx';




function Navbar() {

  const { darkMode, toggleDarkMode } = useTheme();

     // ToggleMenu
 const [menuVisible, setMenuVisible] = useState(true);
 
 

 function toggleMenu() {
   setMenuVisible(!menuVisible);
     const {isLoggedIn, setIsLoggedIn} = useContext(UserContext);


  // Beim erstmaligen Rendern der Seite wird beim Server geprüft, ob der User eingeloggt ist. D.h., ob ein gültiges Session-Cookie vorhanden ist
  
   useEffect(() => {
    const checkLogin = async () => {
      const response = await fetch(
        'http://localhost:4000/users/check-logged-in',
        {
          method: 'POST',
          credentials: 'include',
        }
      );
      if (response.ok) {
        setIsLoggedIn(true);
      }
    };
    isLoggedIn ?? checkLogin();
  }, [isLoggedIn]);
 }
  return (
<nav className= {`fixed w-full top-0 right-0 px-2 py-2 z-50 ${darkMode ? 'bg-gray-800 text-white py-0' : 'bg-white text-gray-900'}`}>
        <div className="mobile:mobileNav desktop:hidden">
          <div>
          {menuVisible ? (
            // BurgerMenu
            <button className="  text-slate-700 text-4xl font-bold opacity-70  fixed right-2 hover:opacity-100 duration-300" onClick={toggleMenu}>
              &#9776;
            </button>
          ) : (
            // Close Icon
            <button className=" text-slate-700 text-4xl font-bold opacity-70 hover:opacity-200 hover:text-slate-100" onClick={toggleMenu}>&times;
            </button>
          )}
          </div>
            
          {!menuVisible && (
            <div className="mobileNavLi">
              <NavLink to="/" onClick={toggleMenu}>Home</NavLink>
              <NavLink to="/register" onClick={toggleMenu}>Register</NavLink>
              <NavLink to="/login"  onClick={toggleMenu}>Log In</NavLink>
              <NavLink to="/logout" onClick={toggleMenu}>Log Out</NavLink>
              <button className="dark:text-4xl top-3 right-3 fixed font-bold opacity-70 hover:opacity-100 duration-300" onClick={toggleDarkMode}>
            {darkMode ? '☀️' : '🌙'}
          </button>
            </div>
          )}
            
        </div>
        <div className="desktop:desktopNav mobile:hidden">
            <div className="desktopNavLi">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/register">Register</NavLink>
              <NavLink to="/login">Log In</NavLink>
              <NavLink to="/logout">Log Out</NavLink>
              <button className="dark:text-white text-2xl top-1 right-3 fixed font-bold opacity-70 hover:opacity-100 duration-300" onClick={toggleDarkMode}>
            {darkMode ? '☀️' : '🌙'}
          </button>
            </div>
        </div>
      </nav>
    
  )
}

export default Navbar


