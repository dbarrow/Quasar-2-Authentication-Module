import axios from "axios";
import authConfig from "./auth.config";
import authHeader from "../auth/auth.header";

const API_URL = authConfig.BASE_API_URL;

class AuthService {
  login(user) {
    return axios
      .post(API_URL + "login", {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        if (response.data.data.token) {
          localStorage.setItem(
            authConfig.USER_LOCAL_STORAGE_KEY,
            JSON.stringify(response.data.data)
          );
          if (response.data.data.user.forgot_password_timestamp != null) {
            localStorage.setItem(
              "PRR",
              JSON.stringify(response.data.data.user.forgot_password_timestamp)
            );
          }
        }
        return response.data.data;
      });
  }

  logout() {
    localStorage.removeItem(authConfig.USER_LOCAL_STORAGE_KEY);
  }

  register(user) {
    return axios.post(API_URL + "register", {
      name: user.name,
      email: user.email,
      password: user.password,
      password_confirmation: user.password_confirmation,
    });
  }

  forgotPassword(email) {
    return axios
      .post(API_URL + "forgotPassword", {
        email: email,
      })
      .then((response) => {
        console.log(response);
      });
  }

  resetPassword(user, passwords) {
    console.log("Passwords:: ", passwords);
    return axios
      .post(
        API_URL + "resetPassword",
        {
          user: user.id,
          password: passwords.password,
          password_confirmation: passwords.passwordConfirmation,
        },
        { headers: authHeader() }
      )
      .then((response) => {
        console.log("Response Payload: ", response.data.data);
        return response;
      });
  }

  emailExist(email) {
    return axios.post(API_URL + "emailExist", {
      email: email,
    });
  }
}

export default new AuthService();
