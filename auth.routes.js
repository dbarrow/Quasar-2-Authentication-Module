const routes = [  
    {
        path: "/login",
        component: () => import("./layouts/default.vue"),
        children: [{ path: "", component: () => import("./pages/Login.vue") }],
      },   
      
      {
        path: "/register",
        component: () => import("./layouts/default.vue"),
        children: [{ path: "", component: () => import("./pages/Register.vue") }],
      },    

      {
        path: "/forgotpassword",
        component: () => import("./layouts/default.vue"),
        children: [{ path: "", component: () => import("./pages/ForgotPassword.vue") }],
      },   

      {
        path: "/resetpassword",
        component: () => import("./layouts/default.vue"),
        children: [{ path: "", component: () => import("./pages/ResetPassword.vue") }],
      },   


  ]
  
  export default routes
  
  