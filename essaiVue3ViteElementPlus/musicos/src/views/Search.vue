<template>
  <div class="Search">
    <Tabs :theTabs="myTabs" :theIndexActive="0"/>
    <div class="homeContent">
      <router-view></router-view>
    </div>
  </div>
</template>


<script>
import Tabs from '../components/Tabs.vue'

export default {
  components: { Tabs },
  data() {
    return {
      projects: [],
      myTabs: [
        {
          iconName: '', // fa-music
          name: 'Search a song',
          id: 0,
          routerName: 'SearchSong'
        },
        {
          iconName: '',
          name: 'Search a user',
          id: 1,
          routerName: 'SearchUser'
        },
      ]
    }
  },
  async mounted(){
	},
  methods:{
  }
}
</script>

<style scoped>
.content h1:not(:first-child) {
  margin-top: 3px;
}

/* Small screens */
@media only screen and (max-width: 600px) {
  .Search{
    padding-bottom: 5rem;
  }
}
</style>