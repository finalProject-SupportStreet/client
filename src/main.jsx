import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/mainComponents/Home.jsx";
import UserRegister from "./components/profile/UserRegister.jsx";
import UserLogin from "./components/profile/UserLogin.jsx";
import UserLogout from "./components/profile/UserLogout.jsx";
import Neighbours from "./components/Neighbours.jsx";

import { UserProvider } from "./components/context/userContext.jsx";
import { ThemeProvider } from "./components/context/ThemeContext.jsx";
import Profile from "./components/profile/Profile.jsx";
import GroupForm from "./components/group/groupForm.jsx";
import GroupOverview from "./components/group/GroupOverview.jsx";
import { GroupsProvider } from "./components/context/groupsContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "dashboard",
        element:[
          <h1>Dashboard</h1>
    ],
    
      },
      {
        path: "register",
        element: <UserRegister />,
      },
      {
        path: "login",
        element: <UserLogin />,
      },
      {
        path: "logout",
        element: <UserLogout />,
      },

      {
        path: "Profile",
        element: <Profile />,
      },

      {
        path: "neighbours",
        element: <Neighbours />,
      },
      {
        path: "groupsForm",
        element: <GroupForm />,
      },
      {
        path: "groups",
        element: <GroupOverview />,
      },
      /*   {
        path: "style",
        element: <StyleExample />,
      }, */
    ],
  },
  // // path: "*" kann man hier als "alle anderen (ungültigen/nicht definierten) Pfaden" verstehen
  // {
  //   path: "*",
  //   /*
  //   Ich gehe zuerst auf einen ungültigen Pfad "/anton", dann werde ich zu "/" weitergeleitet
  //   ohne replace: Beide Schritte/Stationen werden im Browserverlauf gespeichert
  //   mit replace: Der Schritt "/anton" wird nicht gespeichert, sondern durch den weitergeleiteten Schritt "/" ersetzt
  //   */
  //   element: <Navigate to="/" replace />
  // }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <UserProvider>
        <GroupsProvider>
          <RouterProvider router={router} />
        </GroupsProvider>
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>
);
