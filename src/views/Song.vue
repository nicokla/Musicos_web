<template>
  <div class="Song">
    <h1 class="subheading grey--text">Song</h1>

    <v-container class="my-5">
      <p>song {{ $route.params.id }}</p>

    </v-container>
    
  </div>
</template>

<script>
// Will be a modal later
export default {
  data() {
    return {
      projects: []
    }
  },
}
</script>
