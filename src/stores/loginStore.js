import { create } from 'zustand';

const useLoginStore = create(set => ({
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

  logOut: () => {
    set({
      loggedIn: false,
      nickName: null,
      accessToken: null,
    });
  },
}));

export default useLoginStore;
