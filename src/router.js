import Vue from 'vue'
import Router from 'vue-router'
// import Dashboard from './views/Dashboard.vue'
// import Projects from './views/Projects.vue'
// import Team from './views/Team.vue'
import CreateSong from './views/CreateSong.vue'
import FavouriteSongs from './views/FavouriteSongs.vue'
import FollowedUsers from './views/FollowedUsers.vue'
import Gems from './views/Gems.vue'
import LogOut from './views/LogOut.vue'
import MySongs from './views/MySongs.vue'
import SearchASong from './views/SearchASong.vue'
import SearchAUser from './views/SearchAUser.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/createSong',
      name: 'createSong',
      component: CreateSong
    },
    {
      path: '/mySongs',
      name: 'mySongs',
      component: MySongs
    },
    {
      path: '/favouriteSongs',
      name: 'favouriteSongs',
      component: FavouriteSongs
    },
    {
      path: '/searchASong',
      name: 'searchASong',
      component: SearchASong
    },
    {
      path: '/followedUsers',
      name: 'followedUsers',
      component: FollowedUsers
    },
    {
      path: '/searchAUser',
      name: 'searchAUser',
      component: SearchAUser
    },
    {
      path: '/gems',
      name: 'gems',
      component: Gems
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogOut
    }
  ]
})
