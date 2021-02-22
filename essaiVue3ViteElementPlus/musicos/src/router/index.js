import { createWebHistory, createRouter } from "vue-router";
// import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Page from "../views/Page.vue";
import Home from "../views/Home.vue";
import Users from "../views/Users.vue";
import MySongs from "../views/MySongs.vue";
import FavouriteSongs from "../views/FavouriteSongs.vue";

const routes = [
  { path: '/', redirect: { name: 'MySongs' }},
  {
    path: '/',
    component: Page,
    // name: 'Page',
    children: [
      {
        path: 'home',
        component: Home,
        children: [
          {
            path: 'my_songs',
            name: 'MySongs',
            component: MySongs
          },
          {
            path: 'favourite_songs',
            name: 'FavouriteSongs',
            component: FavouriteSongs
          }
        ]
      },
      {
        path: 'users',
        name: 'Users',
        component: Users,
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
