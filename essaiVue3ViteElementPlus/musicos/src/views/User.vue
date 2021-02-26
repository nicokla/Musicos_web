<template>
  <div id="User" class="paddedContainer">
    <h1 class="subheading grey--text">User songs</h1>
    <div class="listOfSongs">
      <SongCell v-for="song in songs" :theSong="song"
          @click="openSong(song)"/>
    </div>
  </div>
</template>


<script>
import {db, getCurrentUser} from '../firebase/db'
import SongCell from '../components/SongCell.vue'

export default {
  data() {
    return {
      userId: this.$route.params.id,
      songs: []
    }
  },

  async mounted(){
    const answer = await db.collection("songs").where("ownerID", "==", this.userId).get();
    this.songs=[]
    answer.forEach((doc)=>{
      this.songs.push({
        id: doc.id,
        ...doc.data()
      })
    })
	},
  
  methods:{
    openSong(song){
      this.$router.push({name: 'Song', params: {id: song.id} })
    }
  }
}
</script>

<style scoped>

.content h1:not(:first-child) {
  margin-top: 3px;
}

#User{
  --tw-bg-opacity: 1;
  background-color: rgba(254, 243, 199, var(--tw-bg-opacity));	
}

.listOfSongs {
  padding-top: 2mm;
  padding-bottom: 2mm;

	display: flex;
  flex-direction:column;
  flex-wrap:nowrap;
	/* flex-flow: row wrap; */
	justify-content:flex-start;
  align-items:stretch;
  align-content:center;
}
</style>