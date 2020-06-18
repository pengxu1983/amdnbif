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
        >
          <el-menu-item 
            v-for="onekind in kinds"
            :key="onekind"
            :index="onekind"
            @click="currentTab=onekind"
          >
            <i class="el-icon-setting"></i>
            <span slot="title">{{ onekind}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <component
          v-bind:is="currentTabComponent"
          v-bind:variants="variants"
          v-bind:projects="projects"
          v-bind:projectinfo="projectinfo"
        ></component>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import OfficialRegression from '@/components/RegressionPage_sub/OfficialRegression.vue'
//import FunctionCoverage   from '@/components/RegressionPage_sub/FunctionCoverage.vue'
//import Neverpass          from '@/components/RegressionPage_sub/Neverpass.vue'

export default {
  name: 'RegressionPage',
  props: {
  },
  data() {
    return {
      projectinfo : {
        projectname : 'mi300',
        variantname : 'nbif_nv10_gpu',
      },
      projects    : [],
      variants    : [],
      testplans   : [],
      kinds       : [
        'OfficialRegression',
        'FunctionCoverage',
        //'Neverpass',
        //'ByDVgroup',
        //'Byfeature',
      ],
      currentTab  : 'OfficialRegression',
    }
  },
  components  : {
    //Overall,
    OfficialRegression,
    //FunctionCoverage,
    //Neverpass,
    //Byfeature,
    //ByDVgroup,
  },
  computed: {
    currentTabComponent: function () {
      return this.currentTab;
      //return 'tab-' + this.currentTab.toLowerCase()
    }
  },
  methods : {
    //kind_disp (name){
    //  return name;
    //},
    //handleOpen(key, keyPath) {
    //  //console.log(key, keyPath);
    //},
    //handleClose(key, keyPath) {
    //  //console.log(key, keyPath);
    //},
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
