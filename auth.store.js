import AuthService from './auth.service';
import authConfig from './auth.config';

const user = JSON.parse(localStorage.getItem(authConfig.USER_LOCAL_STORAGE_KEY));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          console.log("user at loigin:",user)
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },  
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    },

    resetPassword({state}, passwords){
      console.log("Passwords ;" ,passwords)

      return AuthService.resetPassword( state.user.user ,  passwords).then(
        response => {
          console.log(response.data.data)
          return Promise.resolve(response.data)
        }, 
        error => {
          return Promise.reject(error)
        }
      )

    }    
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
      console.log("Logged in User: ", state.user)
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    }
  }
};