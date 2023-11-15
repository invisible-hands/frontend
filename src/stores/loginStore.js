import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const useLoginStore = create(
  persist(
    set => ({
      loggedIn: false,
      nickName: null,
      accessToken: null,

      logIn: (nickName, accessToken) => {
        set({
          loggedIn: true,
          nickName,
          accessToken,
        });
      },

      logOut: async () => {
        console.log('logOut 함수 시작');
        const { accessToken } = useLoginStore.getState(); // 현재 토큰 가져오기

        if (accessToken) {
          console.log('토큰 존재:', accessToken);
          try {
            await axios.post(
              '/api/user/logout',
              {},
              {
                headers: { Authorization: `Bearer ${accessToken}` },
              },
            );

            console.log('되니?');
            // API 호출 성공 후 상태 초기화
            set({
              loggedIn: false,
              nickName: null,
              accessToken: null,
            });
          } catch (error) {
            console.error('로그아웃 실패:', error);
          }
        }
      },
    }),
    {
      name: 'login-storage',
      getStorage: () => localStorage,
    },
  ),
);

export default useLoginStore;
