<template>
<div class="tabs is-toggle is-fullwidth">
  <ul>
    <li v-for="tab in theTabs" :key="tab.id" v-bind:class="{ 'is-active': indexActive === tab.id }" @click="openTab(tab)">
      <a>
        <span v-if="tab.iconName !== ''" class="icon">
          <i class="fas" :class="tab.iconName" aria-hidden="true"></i>
        </span>
        <span>
          {{ tab.name }}
        </span>
      </a>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  methods:{
    openTab(tab){
      this.indexActive = tab.id
      this.$router.push({name:tab.routerName})
    }
  },
  mounted(){
    this.$router.push({name:this.theTabs[this.indexActive].routerName})
  },
  props: ["theTabs", "theIndexActive"],
  data() {
    return {
      indexActive: this.theIndexActive
    }
  },
};
</script>

<style scoped>
ul {
  margin: 0;
}

.tabs {
  height: 4rem;
  margin-bottom: 10px;
}

li {
  height: 100%;
}

li a {
  height: 100%;
}
</style>