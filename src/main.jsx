import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home.jsx";
import UserRegister from "./components/UserRegister.jsx";
import UserLogin from "./components/UserLogin.jsx";
import UserLogout from "./components/UserLogout.jsx";
import Neighbours from "./components/Neighbours.jsx";
import { UserProvider } from "./components/context/userContext.jsx";
import GroupForm from "./components/group/groupForm.jsx";
import GroupOverview from "./components/group/GroupOverview.jsx";
import { GroupsProvider } from "./components/context/groupsContext.jsx";
// import StyleExample from "./components/group/StyleExample.jsx";
// import TodoApp from './components/ToDoApp.jsx';

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
    <UserProvider>
      <GroupsProvider>
        <RouterProvider router={router} />
      </GroupsProvider>
    </UserProvider>
  </React.StrictMode>
);
