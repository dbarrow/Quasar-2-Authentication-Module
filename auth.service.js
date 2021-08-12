import axios from 'axios';
import authConfig from './auth.config'

//const API_URL = 'http://147.182.210.32/api/auth/';
const API_URL = 'http://api.test/api/auth/';

class AuthService {
  login(user) {
    
    return axios
      .post(API_URL + 'login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.data.token) {
          localStorage.setItem(authConfig.userLocalStorageKey, JSON.stringify(response.data.data));
        }
        console.log(response.data.data.user)
        return response.data.data;
      });
  }

  logout() {
    localStorage.removeItem(authConfig.userLocalStorageKey);
  }

  register(user) {
    return axios.post(API_URL + 'register', {
    name: user.name,
      email: user.email,
      password: user.password,
      password_confirmation: user.password_confirmation
    });
  }


  emailExist(email) {
    return axios.post(API_URL + 'emailExist' , {
      email: email
    })

  }
}

export default new AuthService();