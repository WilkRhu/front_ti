const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "allUsers",
        name: "allUsers",
        component: () => import("pages/AllUser.vue"),
      },
      {
        path: "/user/:id",
        name: "oneUser",
        component: () => import("pages/OneUser.vue"),
      },
      {
        path: "register",
        name: "registerUser",
        component: () => import("pages/UsersCreate.vue"),
      },
      {
        path: "login",
        name: "login",
        component: () => import("pages/LoginUser.vue"),
      },
      {
        path: "/user/update/:id",
        name: "updateUser",
        component: () => import("pages/UpdateUser.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
