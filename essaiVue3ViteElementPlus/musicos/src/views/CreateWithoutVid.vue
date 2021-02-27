<template>
  <div class="CreateWithoutVid paddedContainer">
    <h1 class="subheading grey--text">Create song without video</h1>
    <div class="w-full flex flex-col justify-center md:justify-start my-auto">
      <h3 class="mt-8">Song title</h3>
      <input type="text" placeholder="Choose title" v-model="title"/>
      <h3>Song duration (in minutes):</h3>
      <input type="number" placeholder="Choose duration" min="1" v-model="duration"/>
      <br>
      <button class=button @click="submit">Create new song</button>
    </div>
  </div>
</template>


<script>
import { v4 as uuid } from 'uuid';
// uuid(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
import {db, saveSongToStorage, defaultSongStorage,
        saveSongToFirestore, defaultSongFirestore,
        getCurrentUser, getUserName} from '../firebase/db'

export default {
  data() {
    return {
      duration: 1,
      title: ''
    }
  },
  async mounted(){
	},
  methods:{
    async submit(){
      if(! (this.duration >= 1)){
        alert('The duration should be 1 minute or greater.')
        return;
      }
      if(title.length > 30){
        alert('The title should not be more than 30 characters.')
        return;
      }
      if(title == ''){
        alert('The title should not be an empty string.')
        return;
      }
      // let id = uuid()

      let mySong = {...defaultSongFirestore}
      mySong.title = this.title
      mySong.duration = 60 * this.duration
      let myId = getCurrentUser().uid
      mySong.ownerID = myId
      mySong.ownerName = await getUserName(myId)
      console.log(mySong)

      let id = uuid()
      // docRef = await db.collection("songs").add(mySong)
      // let id = docRef.id // uuid()
      mySong.objectID = id
      mySong.datetime = Date.now()/1000
      console.log('id', id)
      await saveSongToFirestore(mySong, id)
      await saveSongToStorage(defaultSongStorage, id)

      this.$router.push({name: 'Song', params: {id: id} })
    }
  }
}
</script>

<style scoped>
.content h1:not(:first-child) {
  margin-top: 3px;
}
</style>