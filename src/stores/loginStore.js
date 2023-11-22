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

        const resetLoginState = () => {
          set({
            loggedIn: false,
            nickName: null,
            accessToken: null,
            userId: null,
          });
          console.log('로그아웃 후 상태:', useLoginStore.getState());
        };

        if (accessToken) {
          try {
            await axiosInstance.post(
              '/api/user/logout',
              {},
              {
                headers: { Authorization: `Bearer ${accessToken}` },
              },
            );
          } catch (error) {
            console.error('로그아웃 실패:', error);
            // 실패 메시지를 표시하거나 처리할 수 있습니다.
          } finally {
            // 성공 여부에 관계없이 로그아웃 상태로 변경
            resetLoginState();
          }
        } else {
          // 토큰이 없는 경우에도 로그아웃 상태로 변경
          resetLoginState();
        }
      },
    }),
    {
      name: 'login-storage',
      storage: createJSONStorage(() => localStorage),
    },
    {
      name: 'login-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useLoginStore;
