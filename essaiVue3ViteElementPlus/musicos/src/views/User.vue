<template>
  <div id="User" class="paddedContainer">
    <h1 class="subheading grey--text">User: {{userName}}</h1>
    <button v-if="!isFollowed" class="button" @click="follow">follow</button>
    <button v-else class="button" @click="unfollow">unfollow</button>
    
    <br><br>

    <h1 class="subheading grey--text">User songs</h1>
    <div class="listOfSongs">
      <SongCell v-for="song in songs" :theSong="song"
          @click="openSong(song)" :canBeDeleted="false"/>
    </div>
  </div>
</template>


<script>
import {db, getCurrentUser, getUserName, getMyId} from '../firebase/db'
import SongCell from '../components/SongCell.vue'

export default {
  data() {
    return {
      userId: this.$route.params.id,
      songs: [],
      userName:'',
      followStatus: '',
      unsubscribe: {},
      isMe: false
    }
  },

  async mounted(){
    this.listenToChanges()
    const answer = await db.collection("songs").where("ownerID", "==", this.userId).get();
    this.songs=[]
    answer.forEach((doc)=>{
      this.songs.push({
        id: doc.id,
        ...doc.data()
      })
    })
    this.userName = await getUserName(this.userId)
    // console.log(getMyId())
    // console.log(this.userId)
    this.isMe = (getMyId() === this.userId)
	},

  computed: {
    isFollowed(){
      return this.followStatus !== undefined
    }
  },

  methods:{
    // isMe(){
    //   return (getMyId() === this.userId)
    // },
    openSong(song){
      this.$router.push({name: 'Song', params: {id: song.id} })
    },
    async follow(){
      let myId = getCurrentUser().uid
      await db.collection("users").doc(myId).collection('followedUsers').doc(this.userId).set({
        name: this.userName,
        objectID: this.userId
      })
    },
    async unfollow(){
      let myId = getCurrentUser().uid
      await db.collection("users").doc(myId).collection('followedUsers').doc(this.userId).delete()
    },
    listenToChanges(e){
      let myId = getCurrentUser().uid
      this.unsubscribe = db.collection("users")
        .doc(myId).collection('followedUsers').doc(this.userId)
        .onSnapshot((doc) => {
          // console.log("Current data: ", doc.data());
          this.followStatus = doc.data()
        });
    },
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

@media only screen and (max-width: 600px) {
  #User{
    padding-bottom: 5rem;
  }
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