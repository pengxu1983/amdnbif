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
      <el-aside>
        <el-menu
          default-active="Groups"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item 
            v-for="onekind in kinds"
            :index="onekind"
            @click="currentTab  = onekind"
          >
            <i class="el-icon-setting"></i>
            <span slot="title">{{ kind_disp(onekind)}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <component
          v-bind:is="currentTabComponent"
        ></component>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SanityPage from '@/components/ConfigPage_sub/SanityPage.vue'
import VariantsPage from '@/components/ConfigPage_sub/VariantsPage.vue'
import GroupsPage from '@/components/ConfigPage_sub/GroupsPage.vue'
import ProjectsPage from '@/components/ConfigPage_sub/ProjectsPage.vue'
import TreePage from '@/components/ConfigPage_sub/TreePage.vue'
import AgentsPage from '@/components/ConfigPage_sub/AgentsPage.vue'

export default {
  name: 'ConfigPage',
  props: {
  },
  data() {
    return {
      projectinfo : {
        projectname : 'mi200',
        variantname : 'nbif_nv10_gpu',
        modename    : 'rc'
      },
      projects    : [],
      variants    : [],
      testplans   : [],
      kinds       : [
        'Sanity',
        'Users',
        'Projects',
        'Variants',
        'Groups',
        'Tree',
        'Agents'
      ],
      currentTab  : 'Groups',
    }
  },
  components  : {
    SanityPage,
    VariantsPage,
    GroupsPage,
    ProjectsPage,
    TreePage,
    AgentsPage
  },
  computed: {
    currentTabComponent: function () {
      //console.log(this.currentTab);
      return this.currentTab +'Page';
      //return 'tab-' + this.currentTab.toLowerCase()
    }
  },
  methods : {
    kind_disp (name){
      return name;
    },
    handleOpen(key, keyPath) {
      //console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      //console.log(key, keyPath);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
