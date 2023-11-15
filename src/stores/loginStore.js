import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'https://ka1425de5708ea.user-app.krampoline.com',
});

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
        console.log('상태 변경 후:', useLoginStore.getState());
      },

      logOut: async () => {
        const { accessToken } = useLoginStore.getState(); // 현재 토큰 가져오기

        if (accessToken) {
          try {
            await axiosInstance.post(
              '/api/user/logout',
              {},
              {
                headers: { Authorization: `Bearer ${accessToken}` },
              },
            );

            // API 호출 성공 후 상태 초기화
            set({
              loggedIn: false,
              nickName: null,
              token: null,
              accessToken: null,
            });
            console.log('상태 변경 후:', useLoginStore.getState());
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
