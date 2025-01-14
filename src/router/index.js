import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import UsersView from "../views/UsersView.vue";
import { runMiddlewares } from "../middleware/handler.js";
import { requireAuth, redirectIfAuthenticated } from "../middleware/auth.js";

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
    beforeEnter: (to, from, next) => {
      runMiddlewares([redirectIfAuthenticated], to, from, next);
    },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
    beforeEnter: (to, from, next) => {
      runMiddlewares([redirectIfAuthenticated], to, from, next);
    },
  },
  {
    path: "/users",
    name: "users",
    component: UsersView,
    beforeEnter: (to, from, next) => {
      runMiddlewares([requireAuth], to, from, next);
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
