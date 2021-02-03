<template>
  <div class="projects">
    <h1 class="subheading grey--text">Projects</h1>

    <v-container class="my-5">
      <p>projects</p>
    </v-container>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      projects: []
    }
  },
  // computed: {
  //   myProjects() {
  //     return this.projects.filter(project => {
  //       return project.person === 'The Net Ninja' && project.status != 'complete'
  //     })
  //   }
  // }
}
</script>
