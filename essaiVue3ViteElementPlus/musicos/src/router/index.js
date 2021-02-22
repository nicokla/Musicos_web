import { createWebHistory, createRouter } from "vue-router";
// import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Page from "../views/Page.vue";
import Dashboard from "../views/Dashboard.vue";
import Users from "../views/Users.vue";

const routes = [
  { path: '/', redirect: { name: 'Dashboard' }},
  {
    path: '/',
    component: Page,
    // name: 'Page',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
        auth: true
      },
      {
        path: 'users',
        name: 'Users',
        component: Users,
        auth: true
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
