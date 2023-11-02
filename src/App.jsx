import React, { useEffect } from 'react';
import axios from 'axios';
import loginStore from './loginStore';
import MainPage from './pages/MainPage';

function App() {
  const { logIn, logOut } = loginStore(state => ({
    logIn: state.logIn,
    logOut: state.logOut,
  }));

  // URL에서 인가 코드를 가져오는 함수
  const getCodeFromURL = () => {
    return new URL(document.location.toString()).searchParams.get('code');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('localStorage의 토큰:', token);
    if (!token) {
      console.log('토큰이 없어!');
      // 인가 코드가 URL에 있는지 확인
      const code = getCodeFromURL();
      if (code) {
        axios
          .get(`${import.meta.env.VITE_APP_URL}kakaoLogin?code=${code}`)
          .then(r => {
            console.log('응답 데이터:', r.data);
            if (r.data && r.data.nickname && r.data.accessToken) {
              logIn(r.data.nickname, r.data.accessToken);
              localStorage.setItem('nickname', r.data.nickname);
              localStorage.setItem('token', r.data.accessToken);
              window.location.href = '/'; // 현재 페이지를 메인 페이지로 리디렉션
            } else {
              console.error('응답 데이터에 문제가 있습니다.');
              logOut();
            }
          })
          .catch(error => {
            console.error(
              '인가 코드로 토큰을 받는 과정에서 오류가 발생했습니다:',
              error,
            );
          });
      }
    }
  }, [logIn]);
  return <MainPage />;
}

export default App;
