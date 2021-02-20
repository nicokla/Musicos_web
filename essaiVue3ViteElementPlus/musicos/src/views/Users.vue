<template>
  <div class="Users">
    <h1 class="subheading grey--text">Users</h1>

    <el-row>
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
    </el-row>
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
