import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from '../pages/auth/Login';
import { Restaurants } from '../pages/main/Restaurants';

export const AppRouter = () => {
  const Routes = createBrowserRouter([
    {
      path: '/',
      element: <Restaurants />,
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
