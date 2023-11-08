import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useLoginStore from '../stores/loginStore';

// 카카오 로그인 후 카카오 서버에서 앱으로
function Redirection() {
  const code = new URL(document.location.toString()).searchParams.get('code');
  const navigate = useNavigate();
  const logIn = useLoginStore(state => state.logIn);

  useEffect(() => {
    const login = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_URL}/user/login/kakao?code=${code}`,
        );
        logIn(response.data.data.nickname, response.data.data.accessToken);
        localStorage.setItem('nickname', response.data.data.nickname);
        localStorage.setItem('accessToken', response.data.data.accessToken);

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
    // 모달로 css 변경 필요
  );
}

export default Redirection;
