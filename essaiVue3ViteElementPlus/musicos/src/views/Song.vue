<template>
  <div class="Song paddedContainer">
    <h1 class="subheading grey--text">Song</h1>
    <p>{{ $route.params.id }}</p>
  </div>
</template>


<script>
export default {
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

<style scoped>

</style>