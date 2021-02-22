<template>
  <div class="MySongs">
    <h1 class="subheading grey--text">My Songs</h1>
    <i-carbon-accessibility />
    <i-mdi-account-box style="font-size: 2em; color: red" />
    <div
      class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4"
    >
      <div class="flex-shrink-0">
        <img class="h-12 w-12" src="../img/image.png" alt="ChitChat Logo" />
      </div>
      <div>
        <div class="text-xl font-medium text-black">ChitChat</div>
        <p class="text-gray-500">You have a new message!</p>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      projects: [],
    };
  },
  async mounted() {},
  methods: {},
};
</script>

<style scoped>
.content h1:not(:first-child) {
  margin-top: 3px;
}
</style>