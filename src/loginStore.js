import create from 'zustand';

const useLoginStore = create(set => ({
  LoggedIn: false,
  nickName: null,
  token: null,

  logIn: (nickName, token) => {
    set({
      loggedIn: true,
      nickName,
      token,
    });
  },

  logOut: () => {
    set({
      loggedOut: false,
      nickName: null,
      token: null,
    });
  },
}));

export default useLoginStore;
