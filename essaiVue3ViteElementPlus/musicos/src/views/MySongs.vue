<template>
  <div id="MySongs" class="paddedContainer">
    <h1 class="subheading grey--text">My Songs</h1>
    <div class="listOfSongs">
      <SongCell v-for="song in songs" :theSong="song"
          @deleteEvent="deleteSong(song.id)"
          @click="openSong(song)"/>
    </div>
  </div>
</template>


<script>
import {db, getCurrentUser} from '../firebase/db'
import SongCell from '../components/SongCell.vue'

export default {
  components: { SongCell },
  data() {
    return {
      songs: []
    }
  },
  methods:{
    async addItem(){
      await db.collection("songs").add({title: "truc"})
		},
		async deleteSong(id){
      let result = confirm(`Want to delete the song ?`);
      if (result) {
        try{
          await db.collection('songs').doc(id).delete()
          this.songs = this.songs.filter(x => {
            return x.id != id;
          })
        }catch(err){
          window.alert(`Error: ${err}`)
        }
      }
		},
    openSong(song){
      this.$router.push({name: 'Song', params: {id: song.id} })
    }
  },
  async mounted() {
    // console.log('userID', isLoggedIn().uid)
    // TypeError: Cannot read property 'uid' of null
    const answer = await db.collection("songs").where("ownerID", "==", getCurrentUser().uid).get();
    // console.log(answer)
    this.songs=[]
    answer.forEach((doc)=>{
      this.songs.push({
        id: doc.id,
        ...doc.data()
      })//.data().name})
    })
    // this.songs = response.data
  },
  // firestore:{
	// 	songs: db.collection('songs').where("ownerID", "==", isLoggedIn().uid)
  //   // localStorage.getItem("userID"))
  //   // firebase.auth().currentUser.uid
  //    //"FSlyGRJXj4RYgElBAib7oRran642")
	// }
}
</script>

<style scoped>
.content h1:not(:first-child) {
  margin-top: 3px;
}

#MySongs{
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