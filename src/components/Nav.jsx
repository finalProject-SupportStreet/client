import { NavLink } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "./context/userContext.jsx";

const Nav = () => {
  
  const [menuVisible, setMenuVisible] = useState(true);

  const {isLoggedIn, setIsLoggedIn} = useContext(UserContext);
  
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


  localStorage.removeItem("theme");


  function toggleMenu() {
    setMenuVisible(!menuVisible);

  }
  return (
    <>
        <div className="h-full relative px-0 box-content bg-slate-100 text-slate-200 dark:bg-gray-900">
 
      <h1 className="underline absolute py-2 px-2 text-slate-700">Logo</h1>
      <nav className="border-slate-700 border-2 text-right">
        <div className="mobile:mobileNav desktop:hidden">
          <div>
          {menuVisible ? (
            //* BurgerMenu
            <button className="  text-slate-700 text-4xl font-bold opacity-70 hover:opacity-100 duration-300" onClick={toggleMenu}>
              &#9776;
            </button>
          ) : (
            // Close Icon
            <button className=" text-slate-700 text-4xl font-bold opacity-70 hover:opacity-100" onClick={toggleMenu}>&times;
            </button>
          )}
          </div>
            
          {!menuVisible && (
            <div className="mobileNavLi">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/register">Register</NavLink>
              <NavLink to="/login">Log In</NavLink>
              <NavLink to="/logout">Log Out</NavLink>
            </div>
          )}
            
        </div>
        <div className="desktop:desktopNav mobile:hidden">
            <div className="desktopNavLi">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/register">Register</NavLink>
              <NavLink to="/login">Log In</NavLink>
              <NavLink to="/logout">Log Out</NavLink>
            </div>
        </div>
      </nav>
  </div>
    </>
  );
};

export default Nav;
