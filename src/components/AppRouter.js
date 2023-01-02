import React, { useEffect } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from '../pages/auth/Login';

export const AppRouter = () => {
  const Routes = createBrowserRouter([
    {
      path: '/',
      element: <div>Hello world!</div>,
    },
    {
      path: '*',
      element: <Navigate to='/' />,
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
      element: <Navigate to='/login' />,
    },
  ]);

  let isLogged = localStorage.getItem('user') ? true : false;

  return isLogged ? Routes : AuthRoutes;
};
