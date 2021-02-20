<template>
  <div class="main-wrapper">
    <!-- <div class="navbar-bg"></div> -->
    <!-- <TopNav />
    <SideBar /> -->

    <div>
      <div>
        <router-link :to="{ name: 'Dashboard' }" tag="button">dashboard</router-link>
        <p></p>
        <router-link :to="{ name: 'Users' }" tag="button">users</router-link>
      </div>
      <router-view></router-view>
    </div>

    <!-- <Footer /> -->
  </div>
</template>

<script>
export default {
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