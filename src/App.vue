<template>
  <v-app class="grey lighten-4">

    <Navbar v-if="shouldShowNavbar()">
    </Navbar>

    <v-content class="mx-4 mb-4">
      <router-view></router-view>
    </v-content>
    
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'
import {firebase, logOut, setupShouldStayLoggedIn} from './firebase/db'

export default {
  components: { Navbar },
  name: 'App',
  data () {
    return {
      
    }
  },
  methods:{
    shouldShowNavbar(){
      // console.log(this.$route.name)
      return (! ['signIn', 'signUp', 'home'].includes(this.$route.name))
    },
    async handler(event) {
      let shouldStayLoggedIn = JSON.parse(localStorage.getItem("shouldStayLoggedIn"))
      if(!shouldStayLoggedIn){
        await logOut()
      }
    },
    
  },
  created(){
    window.addEventListener('beforeunload', this.handler)
  },
  beforeDestroy() {
    window.removeEventListener('beforeunload', this.handler)
  },
  destroyed: async function(){  
	}
}
</script>
