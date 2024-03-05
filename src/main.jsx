import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/mainComponents/Home.jsx';
import UserRegister from './components/profile/UserRegister.jsx';
import UserLogin from './components/profile/UserLogin.jsx';
import UserLogout from './components/profile/UserLogout.jsx';
import Neighbours from './components/Neighbours.jsx';

import { UserProvider } from './components/context/userContext.jsx';
import { ThemeProvider } from './components/context/ThemeContext.jsx';
import Profile from './components/profile/Profile.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'register',
        element: <UserRegister />,
      },
      {
        path: 'login',
        element: <UserLogin />,
      },
      {
        path: 'logout',
        element: <UserLogout />,
      },
      {
        path: 'neighbours',
        element: <Neighbours />
      },
      {
        path: 'Profile',
        element: <Profile />
      }
    ],
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <ThemeProvider>
    <UserProvider >
      <RouterProvider router={router} />
    </UserProvider>
    </ThemeProvider>
  </React.StrictMode>
);