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
/* .content{
  width: 100%;
} */

body {
  color: black;
  background-color: white;
  margin: 0;
  padding: 0;
}

body::-webkit-scrollbar {
  width: 0.25rem;
}

body::-webkit-scrollbar-track {
  background: #1e1e24;
}

body::-webkit-scrollbar-thumb {
  background: #6649b8;
}

.content {
  margin-left: 5rem;
  padding: 1rem;
  /* margin: 0; */
}

@media only screen and (max-width: 600px) {
  .content {
    margin: 0;
  }
}

.theme-icon {
  display: none;
}

.dark #darkIcon {
  display: block;
}

.light #lightIcon {
  display: block;
}

.solar #solarIcon {
  display: block;
}
</style>