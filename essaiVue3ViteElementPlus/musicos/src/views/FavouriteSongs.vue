<template>
  <div id="FavouriteSongs">
    <h1 class="subheading grey--text">Favourite Songs</h1>
    <div class="listOfSongs">
      <SongCell v-for="song in songs" :theSong="song" 
          @click="openSong(song)" :canBeDeleted="false"/>
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
    openSong(song){
      this.$router.push({name: 'Song', params: {id: song.id} })
    }
  },
  async mounted() {
    // console.log('userID', isLoggedIn().uid)
    // TypeError: Cannot read property 'uid' of null
    //  
    const answer = await db.collection("users")
                           .doc(getCurrentUser().uid)
                           .collection('likedSongs')
                           .get();
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

#FavouriteSongs{
  padding: 4mm;
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
  align-content:center;
	align-items:center;
}
</style>