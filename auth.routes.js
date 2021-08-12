const routes = [  
    {
        path: "/login",
        component: () => import("layouts/Landing.vue"),
        children: [{ path: "", component: () => import("src/modules/auth/pages/Login.vue") }],
      },   
      
      {
        path: "/register",
        component: () => import("layouts/Landing.vue"),
        children: [{ path: "", component: () => import("src/modules/auth/pages/Register.vue") }],
      },    
  ]
  
  export default routes
  
  