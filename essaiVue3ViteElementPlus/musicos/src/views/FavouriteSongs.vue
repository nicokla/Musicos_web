<template>
  <div class="FavouriteSongs">
    <h1 class="subheading grey--text">Favourite Songs</h1>
  </div>
</template>


<script>
import {db, firebase, getCurrentUser} from '../firebase/db'

export default {
  data() {
    return {
      songs: []
    }
  },
  methods:{
    async addItem(){
      await db.collection("songs").add({title: "truc"})
		},
		deleteSong(id){
			db.collection('songs').doc(id).delete()
		}
  },
  async mounted() {
    // console.log('userID', isLoggedIn().uid)
    // TypeError: Cannot read property 'uid' of null
    const answer = await db.collection("songs").where("ownerID", "==", getCurrentUser().uid).get();
    // console.log(answer)
    this.songs=[]
    answer.forEach((doc)=>{
      this.songs.push({id: doc.id, title: doc.data().title})//.data().name})
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
</style>