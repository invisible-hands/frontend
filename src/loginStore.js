import create from 'zustand';

const useLoginStore = create(set => ({
  loggedIn: false,
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
      loggedIn: false,
      nickName: null,
      token: null,
    });
  },
}));

export default useLoginStore;
