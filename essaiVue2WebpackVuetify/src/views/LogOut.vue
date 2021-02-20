<template>
  <div class="LogOut">
    <h1 class="subheading grey--text">Log out</h1>

    <v-container class="my-5">
      <p>Log out</p>
    </v-container>
    
  </div>
</template>

<script>
import {firebase, logOut, isLoggedIn, setupShouldStayLoggedIn} from '../firebase/db'

export default {
  data() {
    return {
      projects: []
    }
  },
  async mounted(){
    await logOut()
    this.$router.push('signIn')
  }
}
</script>
