import { defineStore } from "pinia";
import AuthService from "./auth.service";
import authConfig from "./auth.config";

const user = JSON.parse(
  localStorage.getItem(authConfig.USER_LOCAL_STORAGE_KEY)
);

const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const useAuthStore = defineStore("auth", {
  state: () => ({
    initialState,
  }),

  getters: {},

  actions: {
    async login(user) {
      return await AuthService.login(user);
    },

    async logout() {
      AuthService.logout();
      this.router.push();
    },

    async register(user) {
      return await AuthService.register(user);
    },

    resetPassword({ state }, passwords) {
      return AuthService.resetPassword(state.user.user, passwords).then(
        (response) => {
          return Promise.resolve(response.data);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
  },
});
