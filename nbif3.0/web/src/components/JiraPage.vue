<template>
  <el-container style="border: 1px solid #eee">
    <el-header>
      <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="/">NBIF Main Page</a>
        <ul class="navbar-nav px-3">
          <li class="nav-item text-nowrap">
          </li>
        </ul>
      </nav>
    </el-header>
    <el-container style="border: 1px solid #eee">
      <el-aside width="15%">
        <el-menu
          :default-active="currentTab"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item 
            v-for="onekind in kinds"
            :key="onekind"
            :index="onekind"
            @click="currentTab  = onekind"
          >
            <i class="el-icon-setting"></i>
            <span slot="title">{{ kind_disp(onekind)}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <OneProjJira
          v-bind:projectname="currentTab"
        >
        </OneProjJira>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import OneProjJira from '@/components/JiraPage_sub/OneProjJira.vue'

export default {
  name: 'JiraPage',
  props: {
  },
  data() {
    return {
      currentTab  : 'MI200',
      kinds : [
        'MI200',
        'Floyd',
        'Rembrandt'
      ]
    }
  },
  components  : {
    OneProjJira,
  },
  methods : {
    kind_disp (name){
      return name;
    },
    handleOpen(key, keyPath) {
      window.console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      window.console.log(key, keyPath);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
