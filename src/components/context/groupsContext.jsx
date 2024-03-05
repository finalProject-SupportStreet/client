import { createContext, useEffect, useState } from "react";

export const GroupsContext = createContext();

/* WAS HIER PASSIERT:
 1) checke ob user bereits eingeloggt (localStorage.getItem)
 2) wenn eingeloggt (savedUser vorhanden) -> Initialwert = userData
 3) wenn nicht, Initialwert = null
 4) in UserLogin.jsx werden userdaten beim Login gesetzt (setUserData)
 5) useEffect speichert userDaten nur dann in localStorage, WENN  
    userData geändert wurde (zB. erster Login || neuer User Login || Login nachdem Cookie abgelaufen ist (30 Tage))


 ALLG: 
 - userDaten und Login-Status werden über useContext() für alle 
   Komponenten im Projekt verfügbar 
 - children sind alle Komponenten/Features im Projekt
*/

export const GroupsProvider = ({ children }) => {
  // Beim Laden aus dem localStorage die Daten parsen
  const savedGroups = JSON.parse(localStorage.getItem("groupsData"));

  const [groupsData, setGroupsData] = useState(savedGroups || null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log("groupData in userContext:", groupsData);

  useEffect(() => {
    if (groupsData !== null) {
      localStorage.setItem("groupData", JSON.stringify(groupsData));
    }
  }, [groupsData]);

  console.log({ groupsData });

  return (
    <GroupsContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, groupsData, setGroupsData }}
    >
      {children}
    </GroupsContext.Provider>
  );
};
