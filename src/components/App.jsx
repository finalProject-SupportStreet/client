// import { useEffect, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav.jsx";

import "../App.css";
// import MyDropdown from "./DropDown.jsx";
// import { UserContext } from "./context/userContext.jsx";

function App() {

  return (
    <>
      <Nav />
      <div className="h-screen flex items-center justify-center px-4 w-full">
        <Outlet />
      </div>
    </>
  );
}
export default App;
