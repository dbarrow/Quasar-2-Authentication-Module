const routes = [  
    {
        path: "/login",
        component: () => import("./layouts/defaultView.vue"),
        children: [{ path: "", component: () => import("./pages/LoginView.vue") }],
      },   
      
      {
        path: "/register",
        component: () => import("./layouts/defaultView.vue"),
        children: [{ path: "", component: () => import("./pages/RegisterView.vue") }],
      },    

      {
        path: "/forgotpassword",
        component: () => import("./layouts/defaultView.vue"),
        children: [{ path: "", component: () => import("./pages/ForgotPassword.vue") }],
      },   

      {
        path: "/resetpassword",
        component: () => import("./layouts/defaultView.vue"),
        children: [{ path: "", component: () => import("./pages/ResetPassword.vue") }],
      },   

      {
        path: "/logout",
        component: () => import("./layouts/defaultView.vue"),
        children: [{ path: "", component: () => import("./pages/LoginView.vue") }],
      },   



  ]
  
  export default routes
  
  