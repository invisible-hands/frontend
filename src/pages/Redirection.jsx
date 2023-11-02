import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import loginStore from '../loginStore';

function Redirection() {
  const code = new URL(document.location.toString()).searchParams.get('code');
  const navigate = useNavigate();
  const { logIn } = loginStore(state => ({ logIn: state.logIn }));

  useEffect(() => {
    const login = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_URL}?code=${code}`,
        );

        logIn(response.data.nickName, response.data.accessToken);
        localStorage.setItem('nickname', response.data.nickname);
        localStorage.setItem('accessToken', response.data.accessToken);

        navigate('/');
      } catch (error) {
        console.error('로그인 중 오류 발생:', error);
      }
    };

    login();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-center text-2xl font-bold mb-6">LOGIN</h2>

        <div className="mb-8" />
        <p className="text-center text-sm font-['Apple SD Gothic Neo'] text-gray-400">
          로그인 중입니다. 잠시만 기다려주세요!
        </p>
      </div>
    </div>
  );
}

export default Redirection;
