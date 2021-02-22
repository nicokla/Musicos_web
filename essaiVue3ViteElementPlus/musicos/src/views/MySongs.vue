<template>
  <div class="MySongs">
    <h1 class="subheading grey--text">My Songs</h1>
    <i-carbon-accessibility/>
    <i-mdi-account-box style="font-size: 2em; color: red"/>
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

<style>
.content h1:not(:first-child) {
  margin-top: 3px;
}
</style>