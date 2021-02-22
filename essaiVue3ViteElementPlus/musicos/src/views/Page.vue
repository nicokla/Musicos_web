<template>
  <div class="main-wrapper">
    <Navbar/>

    <div class=content>
      <!-- <div>
        <router-link :to="{ name: 'Dashboard' }" tag="button">dashboard</router-link>
        <p></p>
        <router-link :to="{ name: 'Users' }" tag="button">users</router-link>
      </div> -->
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
  components: { Navbar },
  name: "page",
  data() {
    return {
    }
  },
  async mounted(){
    // this.$router.push('Page')
    // if(isLoggedIn()){
    //   this.$router.push('mySongs')
    // } else {
    //   this.$router.push('signIn')
    // }
	},
}
</script>

<style>
.content{
  width: 100%;
}
</style>