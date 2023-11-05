import React from 'react';
import 'tw-elements-react/dist/css/tw-elements-react.min.css';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProductPage from './pages/ProductPage';
import ProductRegistrationPage from './pages/ProductRegistrationPage';
import ProfilePage from './pages/ProfilePage';

import './index.css';
import ErrorPage from './pages/ErrorPage';
import HotDetailPage from './pages/HotDetailPage';
import DeadlineDetailPage from './pages/DeadlineDetailPage';
import NewDetailPage from './pages/NewDetailPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/product',
    element: <ProductPage />,
  },
  {
    path: '/product/registration',
    element: <ProductRegistrationPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/profile/:id',
    element: <ProfilePage />,
  },
  {
    path: '/hot',
    element: <HotDetailPage />,
  },
  {
    path: '/Deadline',
    element: <DeadlineDetailPage />,
  },
  {
    path: '/new',
    element: <NewDetailPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
