### This repository is in active initial development. Breaking changes WILL occur. Stay tuned for stable version.

# Quasar 2 Authentication Module
Quasar 2 based authentication module that handles login, logout, routing and auth middleware.

This repository provides an opinionated implematation of authenitication for Quasar/Vue3 applications. The module was created to consume a Laravel 8 REST API powered by Sanctum Token based Authentication. The module should be adapatable to other backends. It is at the descretion of the user to modify the module to interact with other backends.


## Motivation
The module was created to have reusable authentication for Quasar/Vue 3 frontend apps & Laravel backend API's with minimal wiring.  This module does not provide dynamic abilities. It is bare bones scaffolding that is meant to serve as a starting point for authentication.  Feel free to modify any file to provide desired styling and functionality.

## Dependencies

Quasar's built in validation is used for forms.  A rules extension provided by https://github.com/cuatromedios/quasar-app-extension-vuelidate-rules is required.

Install per repository instructions.


## Installation
* Create Quasar 2 app with quasar-cli. See https://quasar.dev/quasar-cli/installation
* Create directory in src folder named modules
* cd to modules and run command:

   ```git clone https://github.com/dbarrow/Quasar-2-Authentication-Module.git auth```

File structure example post installation

![post_install_results](https://user-images.githubusercontent.com/1625395/129212395-0d2ba8b8-1b3a-41b5-b90b-bcc2ec9b1fd8.PNG)

Other methods may be used to install, such as copy/paste.  Ensure file paths resolve.


## Configuration
Configuration is contained in the auth.config.js file.  

* USER_LOCAL_STORAGE_KEY - The local storage key that the API authentication token will be stored
* BASE_API_URL - The base url to authentication routes
* SUCCESSFUL_LOGIN_ROUTE - Once successfully logged in, the route to be redirected to.

## Wiring up to Quasar 

Mininmal wire up is required.  

In the Quasar-CLI generated router directory, open the index.js file.

The following should replace all content in the file.
```
import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import baseRoutes from './routes'  //renamed quasar default from routes to baseRoutes
import authRoutes  from  'src/modules/auth/auth.routes'  //authentication routes from auth module
import { authGuard } from 'src/modules/auth/auth.middleware'  //authentication middleware from auth module

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
const routes = [...authRoutes, ...baseRoutes]  //spread to routes array
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    
    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
  });

  Router.beforeEach((to, from, next) => {    
    authGuard(to, from, next);    
  });

  return Router
})
   ```
   
   
   
   






