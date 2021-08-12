const routes = [  
    {
        path: "/login",
        component: () => import("layouts/Landing.vue"),
        children: [{ path: "", component: () => import("./pages/Login.vue") }],
      },   
      
      {
        path: "/register",
        component: () => import("layouts/Landing.vue"),
        children: [{ path: "", component: () => import("./pages/Register.vue") }],
      },    
  ]
  
  export default routes
  
  