<template>
  <div class="SearchSong paddedContainer">
    <div class="searchBar pb-5 px-5 pt-4">
      <div class="bg-white flex items-center rounded-full shadow-xl">
        <input class="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight border-0 focus:ring-transparent no-underline" id="search" type="text" placeholder="Search" v-model="myText" @keyup.enter="search(myText)">
        
        <div class="p-4">
          <button class="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center" @click="search(myText)">
            <!-- <i class="material-icons">search</i> -->
            <i-mdi-search/>
          </button>
        </div>
      </div>
    </div>
    
    <div class="my_container">
      <ul>
        <li v-for="user in users">
          {{user.name}}
        </li>
      </ul>
      <!-- <UserCell v-for="user in users" :theUser="user" 
          @click="openUser(user)" :canBeDeleted="false"/> -->
    </div>
  </div>
</template>


<script>
// import UserCell from '../components/UserCell.vue'
import {indexUsers} from '../algolia/algolia.js'

export default {
  data() {
    return {
      users: [],
      myText: ''
    }
  },
  async mounted(){
	},
  methods:{
    async search(myText){
      console.log(myText)
      let {hits} = await indexUsers.search(myText)
      console.log(hits)
      this.users = hits.map((el)=>{
        return {
          id: el.objectID,
          name: el.name,
        }
      })
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