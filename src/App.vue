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
      return (! ['signIn', 'signUp'].includes(this.$route.name))
    }
  }
}
</script>
