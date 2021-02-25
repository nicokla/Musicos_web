<template>
  <div class="AddSong">
    <!-- <h1 class="subheading grey--text">Add song</h1> -->
    <div class="my_container">
      <div class='item'>
        <h2>Followed users</h2>
      </div>
      <div class='item'>
        <h2>Gems</h2>
      </div>
      <div @click="logout()" class='item'>
        <h2>Log out</h2>
      </div>
    </div>
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

.AddSong{
  height:100vh;
  /* padding-bottom: 5rem; */
}

.my_container{
  height:100%;
}

/* Small screens */
@media only screen and (max-width: 600px) {
  .AddSong{
    height:100vh - 5rem;
    padding-bottom: 5rem;
  }
}

.my_container{
  /* height: 100%;
  width: 100%; */
  /* padding-top: 0.2cm;
  padding-bottom: 0.2cm; */
  padding-left: 1rem;
  padding-right: 1rem;
  flex-flow: column;
  flex: 1 1 auto;
  /* overflow-y: auto; */
  /* margin: 0.2cm; */
	display: flex;
  flex-direction:column;
  flex-wrap:nowrap;
	/* flex-flow: row wrap; */
	justify-content:space-around;
  align-items:stretch;
  align-content:stretch;
  padding-top: 4px;
  padding-bottom: 4px;
  /* margin-top: 4px;
  margin-bottom: 4px; */
}

.item{
  flex-grow: 1;
  flex-shrink: 1;
  /* flex-basis: 0.333; */
  /* flex: 0 0 0.333; */
  /* width: 80%; */
  /* height: 1cm; */
  line-height: 1cm;

  margin-top: 4px;
  margin-bottom: 4px;
  /* margin-right: 2mm;
  margin-left: 2mm; */
	padding: 10px;

	opacity: 1;
	cursor: pointer;
	background-color: #ffd6a7;
	border: 5px solid #ffc527;
	border-radius: 8px;
	color: rgb(0, 0, 0);
	font-size: 24px;
	text-align: center;
  /* vertical-align: center; */

	display: flex;
  flex-direction:column;
	justify-content:center;
}
</style>