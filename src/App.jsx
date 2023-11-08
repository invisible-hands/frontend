import React from 'react';
import ReactDOM from 'react-dom/client';
import 'tw-elements-react/dist/css/tw-elements-react.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SignupPage from './pages/SignupPage';
import ProductPage from './pages/ProductPage';
import ProductRegistrationPage from './pages/ProductRegistrationPage';
import ProfilePage from './pages/ProfilePage';
import './index.css';
import Main from './main';
import ErrorPage from './pages/ErrorPage';
import Redirection from './pages/Redirection';
// import useAuth from './Auth';
import ProtectedRoute from './ProtectedRoute';
import MainPage from './pages/MainPage';
import BidPage from './pages/BidPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: '/signup',
        element: <SignupPage />,
      },
      {
        path: '/product/:productId',
        element: <ProductPage />,
      },
      {
        path: '/product/registration',
        element: (
          <ProtectedRoute>
            <ProductRegistrationPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/profile',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/profile/:id',
        element: <ProfilePage />,
      },
      {
        path: '/redirection',
        element: <Redirection />,
      },
      {
        path: '/bid/:productId',
        element: <BidPage />,
      },
    ],
  },
]);

// 로그인 해야되는 페이지: 마이 페이지, 입찰 페이지, 상품 등록 페이지 (++)

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
