<template>
  <div class="Home">
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
          name: 'My songs',
          id: 0,
          routerName: 'MySongs'
        },
        {
          iconName: '',
          name: 'Favourite songs',
          id: 1,
          routerName: 'FavouriteSongs'
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

.homeContent{
  /* padding: 0.5cm;
  padding-top: 0.2cm; */
}


/* Small screens */
@media only screen and (max-width: 600px) {
  .homeContent{
    padding-bottom: 5rem;
  }
}
</style>