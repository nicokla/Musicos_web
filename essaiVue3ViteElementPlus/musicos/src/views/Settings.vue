<template>
  <div class="AddSong paddedContainer">
    <h1 class="subheading grey--text">Settings</h1>
    <button @click="logout()" class="button">logout</button>
  </div>
</template>


<script>
import {logOut} from '../firebase/db'

export default {
  data() {
    return {
      projects: []
    }
  },
  async mounted(){
	},
  methods:{
    async logout(){
      await logOut()
      this.$router.push({name: 'Login'})
    }
  }
}
</script>

<style scoped>
.content h1:not(:first-child) {
  margin-top: 3px;
}
/* button{
  width: 30px;
  height: 30px;
  background-color: tomato;
} */
</style>