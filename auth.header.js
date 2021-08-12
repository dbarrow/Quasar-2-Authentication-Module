import authConfig from "./auth.config";

export default function authHeader() {
    let user = JSON.parse(localStorage.getItem(authConfig.userLocalStorageKey));
    console.log(user)
    if (user.user && user.token) {
      return { Authorization: 'Bearer ' + user.token };
    } else {
      return {};
    }
  }
