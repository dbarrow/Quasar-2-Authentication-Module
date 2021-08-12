import authConfig from "./auth.config";

export function authGuard(to,from, next) {
    const publicPages = [
      '/login', 
      '/register', 
      '/home'
    ];
    
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem(authConfig.userLocalStorageKey);
    
    if (authRequired && !loggedIn) {
      return next('/login');
    } else {
      return next();
    }
}