import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
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
      userId: null,

      logIn: (nickName, accessToken, userId) => {
        set({
          loggedIn: true,
          nickName,
          accessToken,
          userId,
        });
        console.log('상태 변경 후:', useLoginStore.getState());
      },

      updateNickname: newNickname => {
        set(state => ({
          ...state,
          nickName: newNickname,
        }));
      },

      updateRole: newRole => {
        set(state => ({
          ...state,
          role: newRole,
        }));
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
              accessToken: null,
              userId: null,
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
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useLoginStore;
