import axios from 'axios';
import authConfig from './auth.config'

const API_URL = authConfig.BASE_API_URL;  //

class AuthService {
  login(user) {
    
    return axios
      .post(API_URL + 'login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.data.token) {
          localStorage.setItem(authConfig.USER_LOCAL_STORAGE_KEY, JSON.stringify(response.data.data.token));
        }
        console.log(response.data.data.user)
        return response.data.data;
      });
  }

  logout() {
    localStorage.removeItem(authConfig.USER_LOCAL_STORAGE_KEY);
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
