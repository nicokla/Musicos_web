
<template>
<!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
  <el-radio-button :label="false">expand</el-radio-button>
  <el-radio-button :label="true">collapse</el-radio-button>
</el-radio-group> -->
<el-menu default-active="2" class="el-menu-example" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
  <el-submenu index="1">
    <template #title>
      <i class="el-icon-location"></i>
      <span>Navigator One</span>
    </template>
      <el-menu-item index="1-1">
        <i class="el-icon-location"></i>
        item one
      </el-menu-item>
      <el-menu-item index="1-2">item two</el-menu-item>
  </el-submenu>
  <el-menu-item index="2">
    <i class="el-icon-menu"></i>
    <template #title>Navigator Two</template>
  </el-menu-item>
  <el-menu-item index="3" disabled>
    <i class="el-icon-document"></i>
    <template #title>Navigator Three</template>
  </el-menu-item>
  <el-menu-item index="4">
    <i class="el-icon-setting"></i>
    <template #title>Navigator Four</template>
  </el-menu-item>
</el-menu>
</template>

<script>
  export default {
    data() {
      return {
        isCollapse: false
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
  .el-menu-example .el-submenu > .el-menu {
    left: initial !important;
    right: 0;
  }

  .el-menu-example:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>

