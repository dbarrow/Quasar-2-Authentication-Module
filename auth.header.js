import authConfig from "./auth.config";

export default function authHeader() {
    let user = JSON.parse(localStorage.getItem(authConfig.USER_LOCAL_STORAGE_KEY));
    if (user) {
      return { Authorization: 'Bearer ' + user.token };
    } else {
      return {};
    }
  }
