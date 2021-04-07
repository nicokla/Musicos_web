<template>
  <div class="SearchSong paddedContainer">
    <div class="searchBar pb-5 px-5 pt-4">
      <div class="bg-white flex items-center rounded-full shadow-xl">
        <input class="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight border-0 focus:ring-transparent no-underline text-xl" id="search" type="text" placeholder="Search" v-model="myText" @keyup.enter="search(myText)">
        
        <div class="p-4">
          <button class="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center" @click="search(myText)">
            <!-- <i class="material-icons">search</i> -->
            <i-mdi-search/>
          </button>
        </div>
      </div>
    </div>
    
    <div class="my_container">
      <SongCell v-for="song in songs" :theSong="song" 
          @click="createSong(song)" :canBeDeleted="false"/>
    </div>
  </div>
</template>


<script>
import SongCell from '../components/SongCell.vue'
import { v4 as uuid } from 'uuid';
import axios from 'axios'
import {saveSongToStorage, defaultSongStorage,
        saveSongToFirestore, defaultSongFirestore,
        getCurrentUser, getUserName} from '../firebase/db'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration.js'
dayjs.extend(duration)

export default {
  data() {
    return {
      songs: [],
      myText: '',
      // myIds:[],
      // reducedIds:''
    }
  },
  async mounted(){
	},
  methods:{
    stringToSeconds(duration) {
      // P3Y6M4DT12H30M5S
      const a = dayjs.duration(duration).asSeconds()
      console.log('boubou', a) // a.$ms/1000
      return a
    },
    async search(myText){
      console.log(myText)
      const response1 = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?type=video&q=${this.myText}&maxResults=20&key=AIzaSyDkwZzpuw-7C2U-ZGUvBRGSUbdjtn0VrKo`)
      const data1 = response1.data
      const myIds = data1.items.map((el) => el.id.videoId)
      let reducedIds = ''
      for(const id of myIds){
        reducedIds = `${reducedIds}&id=${id}`
      }
      const response2 = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails${reducedIds}&key=AIzaSyDkwZzpuw-7C2U-ZGUvBRGSUbdjtn0VrKo`)
      const data2 = response2.data
      this.songs = data2.items.map((el)=>{
        return {
          title: el.snippet.title,
          duration: this.stringToSeconds(el.contentDetails.duration),
          ownerName: '',
          imageUrl: el.snippet.thumbnails.medium.url,
          videoID: el.id,
        }
      })
    },
    async createSong(song){
      let mySong = {...defaultSongFirestore}
      mySong.title = song.title
      mySong.duration = song.duration
      mySong.imageUrl = song.imageUrl
      mySong.videoID = song.videoID
      let myId = getCurrentUser().uid
      mySong.ownerID = myId
      mySong.ownerName = await getUserName(myId)
      console.log(mySong)

      let id = uuid()
      mySong.objectID = id
      mySong.datetime = Date.now()/1000
      console.log(mySong)
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


.SearchSong{
  display: flex;
  flex-flow: column;
  height: 100%;
  background-color: #FEF3C7;
}

.searchBar{
  flex: 0 1 auto;
}

.my_container{
  padding-left: 1rem;
  padding-right: 1rem;
  flex-flow: column;
  flex: 1 1 auto;
  overflow-y: auto;
	display: flex;
  flex-direction:column;
  flex-wrap:nowrap;
	justify-content:flex-start;
  align-items:stretch;
  align-content:stretch;
}
</style>