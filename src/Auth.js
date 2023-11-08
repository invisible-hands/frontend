// Auth.js
import axios from 'axios';
import loginStore from './stores/loginStore';

// 앱이 시작될 때마다 상태 복원 or 새로운 로그인 처리
const useAuth = () => {
  const { logIn, logOut } = loginStore(state => ({
    logIn: state.logIn,
    logOut: state.logOut,
  }));

  const getCodeFromURL = () => {
    return new URL(window.location.toString()).searchParams.get('code');
  };

  const authenticateUser = async () => {
    const token = localStorage.getItem('token');
    // 사용자 인증 처리 저장 되어 있는 토큰 찾기,
    if (!token) {
      const code = getCodeFromURL();
      // 인가 코드 가져오기
      if (code) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_APP_URL}kakaoLogin?code=${code}`,
          );
          if (
            response.data &&
            response.data.nickname &&
            response.data.accessToken
          ) {
            logIn(response.data.nickname, response.data.accessToken);
            localStorage.setItem('nickname', response.data.nickname);
            localStorage.setItem('token', response.data.accessToken);
            window.location.href = '/';
          } else {
            console.error('응답 데이터에 문제가 있습니다.');
            logOut();
          }
        } catch (error) {
          console.error(
            '인가 코드로 토큰을 받는 과정에서 오류가 발생했습니다:',
            error,
          );
          logOut();
        }
      }
    }
  };

  return { authenticateUser };
};

export default useAuth;
