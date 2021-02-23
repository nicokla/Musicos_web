import { createWebHistory, createRouter } from "vue-router";
// import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

import Page from "../views/Page.vue";
import Home from "../views/Home.vue";
import MySongs from "../views/MySongs.vue";
import FavouriteSongs from "../views/FavouriteSongs.vue";
import Search from "../views/Search.vue";
import SearchSong from "../views/SearchSong.vue";
import SearchUser from "../views/SearchUser.vue";
import AddSong from "../views/AddSong.vue";
import Settings from "../views/Settings.vue";
import Song from '../views/Song.vue'
import User from '../views/User.vue'
import CreateWithVid from '../views/CreateWithVid.vue'
import CreateWithoutVid from '../views/CreateWithoutVid.vue'
import FollowedUsers from '../views/FollowedUsers.vue'
import Gems from '../views/Gems.vue'
import SongSettings from '../views/SongSettings.vue'

const routes = [
  { path: '/', redirect: { name: 'Login' }},
  {
    path: '/',
    component: Page,
    // name: 'Page',
    children: [
      {
        path: 'home',
        component: Home,
        name: 'Home',
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
        path: 'search',
        component: Search,
        name: 'Search',
        children: [
          {
            path: 'search_song',
            name: 'SearchSong',
            component: SearchSong
          },
          {
            path: 'search_user',
            name: 'SearchUser',
            component: SearchUser
          }
        ]
      },
      {
        path: 'add_song',
        component: AddSong,
        name: 'AddSong',
      },
      {
        path: 'settings',
        component: Settings,
        name: 'Settings',
      },
      {
        path: 'song/:id',
        name: 'Song',
        component: Song
      },
      {
        path: 'user/:id',
        name: 'User',
        component: User
      },
      {
        path: 'create_with',
        component: CreateWithVid,
        name: 'CreateWithVid',
      },
      {
        path: 'create_without',
        component: CreateWithoutVid,
        name: 'CreateWithoutVid',
      },
      {
        path: 'followed_users',
        component: FollowedUsers,
        name: 'FollowedUsers',
      },
      {
        path: 'gems',
        component: Gems,
        name: 'Gems',
      },
      {
        path: 'song_settings',
        component: SongSettings,
        name: 'SongSettings',
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
