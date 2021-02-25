<template>
  <div class="SearchSong paddedContainer">
    <div class="searchBar pb-5 px-5 pt-4">
      <div class="bg-white flex items-center rounded-full shadow-xl">
        <input class="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight border-0 focus:ring-transparent no-underline" id="search" type="text" placeholder="Search">
        
        <div class="p-4">
          <button class="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center">
            <!-- <i class="material-icons">search</i> -->
            <i-mdi-search/>
          </button>
        </div>
      </div>
    </div>
    
    <div class="my_container">
      <SongCell v-for="song in songs" :theSong="song" 
          @click="openSong(song)" :canBeDeleted="false"/>
      <!-- <div class='item'>1</div>
      <div class='item'>2</div>
      <div class='item'>3</div>
      <div class='item'>4</div>
      <div class='item'>5</div>
      <div class='item'>1</div>
      <div class='item'>2</div>
      <div class='item'>3</div>
      <div class='item'>4</div>
      <div class='item'>5</div>
      <div class='item'>1</div>
      <div class='item'>2</div>
      <div class='item'>3</div>
      <div class='item'>4</div>
      <div class='item'>5</div>
      <div class='item'>1</div>
      <div class='item'>2</div>
      <div class='item'>3</div>
      <div class='item'>4</div>
      <div class='item'>5</div> -->

    </div>
  </div>
</template>


<script>
import SongCell from '../components/SongCell.vue'
import {client, indexUsers, indexSongs} from '../algolia/algolia.js'

export default {
  data() {
    return {
      songs: [
        { id: 0, title: 'a', imageUrl: '', ownerName: 'b' },
        { id: 1, title: 'a', imageUrl: '', ownerName: 'b' },
        { id: 2, title: 'a', imageUrl: '', ownerName: 'b' },
        { id: 3, title: 'a', imageUrl: '', ownerName: 'b' },
        { id: 4, title: 'a', imageUrl: '', ownerName: 'b' },
        { id: 5, title: 'a', imageUrl: '', ownerName: 'b' },
        { id: 6, title: 'a', imageUrl: '', ownerName: 'b' },
        { id: 7, title: 'a', imageUrl: '', ownerName: 'b' },
        { id: 8, title: 'a', imageUrl: '', ownerName: 'b' },
        { id: 9, title: 'a', imageUrl: '', ownerName: 'b' },
        { id: 10, title: 'a', imageUrl: '', ownerName: 'b' },
        { id: 11, title: 'a', imageUrl: '', ownerName: 'b' },
        { id: 12, title: 'a', imageUrl: '', ownerName: 'b' },
        { id: 13, title: 'a', imageUrl: '', ownerName: 'b' },
        { id: 14, title: 'a', imageUrl: '', ownerName: 'b' },
      ]
    }
  },
  async mounted(){
    indexSongs.search('ga').then(({ hits }) => {
      this.songs = hits.map((el)=>{
        return {
          id: el.objectID,
          imageUrl: el.imageUrl,
          ownerName: el.ownerName,
          title: el.title,
        }
      })
    });
	},
  methods:{
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
  /* height: 100%;
  width: 100%; */
  /* padding-top: 0.2cm;
  padding-bottom: 0.2cm; */
  padding-left: 1rem;
  padding-right: 1rem;
  flex-flow: column;
  flex: 1 1 auto;
  overflow-y: auto;
  /* margin: 0.2cm; */
	display: flex;
  flex-direction:column;
  flex-wrap:nowrap;
	/* flex-flow: row wrap; */
	justify-content:flex-start;
  align-items:stretch;
  align-content:stretch;
}

/* .item{
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 0.333;
  line-height: 1cm;

  margin-top: 4px;
  margin-bottom: 4px;
	padding: 10px;

	opacity: 1;
	cursor: pointer;
	background-color: #ffd6a7;
	border: 5px solid #ffc527;
	border-radius: 8px;
	color: rgb(0, 0, 0);
	font-size: 24px;
	text-align: center;
} */
</style>