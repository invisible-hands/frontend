import React from 'react';

function LoginPage() {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_JS_KEY;
  const REDIRECT_URI = 'http://localhost:5173/redirection';
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const handleLoginLink = () => {
    window.location.href = link;
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-center text-2xl font-bold mb-6">LOGIN</h2>
        <button
          type="button"
          onClick={handleLoginLink}
          className="flex items-center justify-center bg-yellow-400 text-blackish w-full py-2 rounded font-['Apple SD Gothic Neo'] hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
        >
          <img
            src="/images/size-medium.svg"
            alt="카카오 로고"
            className="w-10 h-5 mr-2"
          />
          카카오로 로그인하기
        </button>
        <div className="mb-8" />
        <p className="text-center text-sm font-['Apple SD Gothic Neo'] text-gray-400">
          카카오로 바로 만나보세요!
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
