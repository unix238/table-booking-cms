import React, { useEffect } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/auth/Login';

export const AppRouter = () => {
  const Routes = createBrowserRouter([
    {
      path: '/',
      element: <div>Hello world!</div>,
    },
    {
      path: '*',
      element: <div>404</div>,
    },
  ]);

  const AuthRoutes = createBrowserRouter([
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/logout',
      element: <>Logout</>,
    },
    {
      path: '*',
      element: <div>404</div>,
    },
  ]);

  let isLogged = localStorage.getItem('user') ? true : false;

  return isLogged ? Routes : AuthRoutes;
};
