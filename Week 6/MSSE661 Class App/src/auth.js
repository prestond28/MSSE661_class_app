import { login, logout, register } from "./auth.service";
import { setStorage } from "./simple-storage";

export const doLogin = async (e, navigate) => {
  e.preventDefault();
  const username = document.getElementById('usernameLogin').value;
  const password = document.getElementById('passwordLogin').value;

  const res = await login({ username, password }).catch(() => {
    alert('Failed to login. Please try again later.');
  });

  const { auth, access_token, refresh_token } = res;

  setStorage('isAuth', auth);
  setStorage('access_token', access_token);
  setStorage('refresh_token', refresh_token);

  navigate('/home');
};

export const doRegister = async (e, navigate) => {
  e.preventDefault();
  const username = document.getElementById('usernameRegister').value;
  const email = document.getElementById('emailRegister').value;
  const password = document.getElementById('passwordRegister').value;

  const res = await register({
    username,
    email,
    password,
  });

  if (res) {
    navigate('/');
  }
};

export const doLogout = (e, navigate) => {
  e.preventDefault();
  logout();
  navigate('/');
};

// (() => {
//   if (storageHasData()) {
//     const isAuth = getStorage('isAuth');
//     if (!isAuth) {
//       document.getElementById('logout').style.display = 'none';
//     } else {
//       document.getElementById('logout').style.display = 'block';
//     }
//   }
// })();
