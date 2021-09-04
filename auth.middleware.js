import authConfig from "./auth.config";
 
export function authGuard(to,from, next) {
    const publicPages = [
      '/login', 
      '/register', 
      '/home', 
      '/forgotpassword',
     
    ];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem(authConfig.USER_LOCAL_STORAGE_KEY);   
    const isPasswordRequired = localStorage.getItem('PRR'); 

    if(isPasswordRequired > 0 && loggedIn && authRequired) {
      console.log("isPasswordRequired: " ,isPasswordRequired != null)
      localStorage.setItem('PRR', null)
      return next('/resetpassword')
    }
  
    if (authRequired && !loggedIn ) {     
        return next('/login');        
    }       
    
    return next();
    
}