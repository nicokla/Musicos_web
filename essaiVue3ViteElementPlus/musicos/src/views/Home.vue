<template>
  <div class="Home">
    <Tabs/>
    <div>
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
      projects: []
    }
  },
  async mounted(){
	},
  methods:{
  }
}
</script>

<style>
.content h1:not(:first-child) {
  margin-top: 3px;
}
</style>