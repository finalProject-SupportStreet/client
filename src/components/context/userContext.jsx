import { createContext, useState } from "react";
import Cookies from 'js-cookie';


export const UserContext = createContext();




export const UserProvider = ({children}) => {
  

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = loadToken();
  const [frontendToken, setFrontendToken] = useState(token || null);

  function loadToken() {
    if(isLoggedIn) {
      return Cookies.get('token');
    } else {
      return null
    }
  }
    console.log(token, frontendToken);
  
  

  return (
    <UserContext.Provider value={{isLoggedIn, setIsLoggedIn}} >
      {children}
    </UserContext.Provider >
  )
};