import { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../../../src/App.css";
import UserLogout from "../user/UserLogout.jsx";
// import { buttonStyle } from "../reuseable/styles/reuseableComponents.jsx";

export const DropDownProfile = () => {
  const [hideProfile, setHideProfile] = useState(true);

  // close menu  when clicking outside of it
  const profileRef = useRef();
  const imgRef = useRef();

  const handleDrop = () => {
    //console.log("hideProfile", hideProfile);
    setHideProfile((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      // Überprüfe, ob der Klick innerhalb des Profilbereichs erfolgt ist
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target) &&
        imgRef.current &&
        !imgRef.current.contains(e.target)
      ) {
        // Wenn außerhalb geklickt wurde, verstecke das Profil-Dropdown
        setHideProfile(true);
      }
    };

    window.addEventListener("click", handleClickOutside);

    // Cleanup-Funktion, um den Event-Listener zu entfernen
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []); // Abhängigkeiten array ist leer, da wir nur beim Mounten/Unmounten handeln wollen

  return (
    <div className="btn-profile" onClick={handleDrop}>
      <button ref={imgRef} onClick={handleDrop} className="btn-profile">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 btn-profile"
          onClick={handleDrop}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={handleDrop}
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </button>

      {hideProfile ? (
        <div className="absolute w-fit top-4 right-14 lightThemeColor dark:darkThemeColor"></div>
      ) : (
        <div className="flex flex-col dropDownProfile" ref={profileRef}>
          <ul className="flex flex-col gap-4">
            <NavLink to="/profile">Profile</NavLink>
            <li>Settings</li>
            <NavLink to="/logout" onClick={UserLogout}>
              Logout
            </NavLink>
            {/*  <li className="hide-profile" onClick={()=>setHideProfile(true)}>Close Dropdown</li> */}
            {/*  <button onClick={UserLogout} className={buttonStyle}>Log Out</button> */}
          </ul>
        </div>
      )}
    </div>
  );
};
