import React, { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../../../src/App.css";

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
  window.addEventListener("click", (e) => {
    if(e.target.classList.contains("btn-profile") === true){
      console.log("btn profile click");
      setHideProfile(false);
    } else if(!e.target.classList.contains("btn-profile")) {
      if (imgRef.current !== null ){
        if(e.target.classList?.toString() !== imgRef.current?.classList?.toString()){
          setHideProfile(true);
        } else {
          setHideProfile(false);
        }
      }
      if (profileRef.current !== null ){
        if(e.target.classList.toString() !== profileRef.current.classList.toString()){
          setHideProfile(true);
        } else {
          setHideProfile(false);
        }
      }
    }
  });
}, [profileRef, imgRef])



  return  (
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
  
  { hideProfile ? (
        <div className="absolute w-fit top-4 right-14 lightThemeColor dark:darkThemeColor">
    </div>
  ) : (
    <div className="flex flex-col dropDownProfile" ref={profileRef}>
      <ul className="flex flex-col gap-4">
        <NavLink to="/profile">Profile</NavLink>
        <li>Settings</li>
        <NavLink to="/logout">Logout</NavLink>
        <li className="hide-profile" onClick={()=>setHideProfile(true)}>Close Dropdown</li>
      </ul>
    </div>
  )}
  </div>
)};
