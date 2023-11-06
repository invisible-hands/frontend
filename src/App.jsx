import React from 'react';
// import axios from 'axios';
// import loginStore from './loginStore';
import MainPage from './pages/MainPage';

function App() {
  // const { logIn, logOut } = loginStore(state => ({
  //   logIn: state.logIn,
  //   logOut: state.logOut,
  // }));

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     axios
  //       .post('/verify-token', { token })
  //       .then(response => {
  //         if (response.data.valid) {
  //           logIn(response.data.user_name, response.data.token); // Zustand의 logIn 호출
  //         } else {
  //           logOut(); // Zustand LogOut 호출
  //           localStorage.removeItem('token');
  //         }
  //       })
  //       .catch(error => {
  //         console.log('Token verification failed:', error);
  //       });
  //   }
  // }, [logIn, logOut]);

  return <MainPage />;
}

export default App;
