import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Redirection() {
  const code = new URL(document.location.toString()).searchParams.get('code');
  const navigate = useNavigate();

  useEffect(() => {
    console.log(import.meta.env.VITE_APP_URL);
    axios.post(`${import.meta.env.VITE_APP_URL}kakaoLogin${code}`).then(r => {
      console.log(r.data);

      // 토큰을 받아서 localStorage같은 곳에 저장하는 코드를 여기에 쓴다.
      localStorage.setItem('name', r.data.user_name); // 일단 이름만 저장했다.

      navigate('/');
    });
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
