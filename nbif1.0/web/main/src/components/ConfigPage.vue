<template>
  <div>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="/main">MainPage</a>
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">ConfigPage</a>
    </nav>
    <div>
      <el-row class="tac">
        <el-col :span="4">
          <el-menu
            default-active="testplans"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose">
            <el-menu-item index="testplans"
              @click="currentTab = 'ConfigPage_testplans_main'"
            >
              <i class="el-icon-menu"></i>
              <span slot="title">Testplans</span>
            </el-menu-item>
            <el-menu-item index="users" 
              @click="currentTab = 'ConfigPage_users_main'">
              <i class="el-icon-menu"></i>
              <span slot="title">Users</span>
            </el-menu-item>
            <el-menu-item index="projects" 
              @click="currentTab = 'ConfigPage_projects_main'">
              <i class="el-icon-menu"></i>
              <span slot="title">Projects</span>
            </el-menu-item>
            <el-menu-item index="variants" 
              @click="currentTab = 'ConfigPage_variants_main'">
              <i class="el-icon-menu"></i>
              <span slot="title">Variants</span>
            </el-menu-item>
            <el-menu-item index="machines" 
              @click="currentTab = 'ConfigPage_machine_main'">
              <i class="el-icon-menu"></i>
              <span slot="title">Machine</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="20">
          <component
            v-bind:is="currentTabComponent"
          ></component>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

// @ is an alias to /src
import ConfigPage_projects_main   from '@/components/ConfigPage_sub/ConfigPage_projects_main.vue'
import ConfigPage_users_main      from '@/components/ConfigPage_sub/ConfigPage_users_main.vue'
import ConfigPage_testplans_main  from '@/components/ConfigPage_sub/ConfigPage_testplans_main.vue'
import ConfigPage_variants_main   from '@/components/ConfigPage_sub/ConfigPage_variants_main.vue'
import ConfigPage_machine_main    from '@/components/ConfigPage_sub/ConfigPage_machine_main.vue'

export default {
  name: 'ConfigPage',
  props: {
  },
  components  : {
    ConfigPage_projects_main,
    ConfigPage_users_main,
    ConfigPage_testplans_main,
    ConfigPage_variants_main,
    ConfigPage_machine_main,
  },
  data() {
    return {
      review_title  : [
        'projects',
        'users',
        'testplans',
        'variants'
      ],
      currentTab: 'ConfigPage_testplans_main',
      tabs: [
        'ConfigPage_projects_main',
        'ConfigPage_users_main',
        'ConfigPage_testplans_main',
        'ConfigPage_variants_main',
        'ConfigPage_machine_main',
      ],
    }
  },
  computed: {
    currentTabComponent: function () {
      console.log(this.currentTab);
      return this.currentTab;
      //return 'tab-' + this.currentTab.toLowerCase()
    }
  },
  methods : {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
