import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import 'tw-elements-react/dist/css/tw-elements-react.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginModal from './components/LoginModal';
import SignupPage from './pages/SignupPage';
import ProductPage from './pages/ProductPage';
import ProductRegistrationPage from './pages/ProductRegistrationPage';
import ProfilePage from './pages/ProfilePage';
import './index.css';
import Main from './main.jsx';
import ErrorPage from './pages/ErrorPage';
import Redirection from './pages/Redirection';
import useAuth from './Auth';
import ProtectedRoute from './ProtectedRoute';
import MainPage from './pages/MainPage.jsx';

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
        path: '/login',
        element: <LoginModal />,
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
    ],
  },
]);

// 로그인 해야되는 페이지: 마이 페이지, 입찰 페이지, 상품 등록 페이지 (++)

export default function App() {
  const { authenticateUser } = useAuth();

  useEffect(() => {
    authenticateUser();
  }, [authenticateUser]);

  return <RouterProvider router={router} />;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
