import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/auth/Login';

const isLogged = !true;

export const Routes = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello world!</div>,
  },
  {
    path: '*',
    element: <div>404</div>,
  },
]);

export const AuthRoutes = createBrowserRouter([
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

export const AppRoutes = isLogged ? Routes : AuthRoutes;
