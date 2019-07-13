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
          v-bind:is="currentTab"
        ></component>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Byprj   from '@/components/MetricsPage_sub/Byprj.vue'
import Byusr   from '@/components/MetricsPage_sub/Byusr.vue'
import Bygrp   from '@/components/MetricsPage_sub/Bygrp.vue'

export default {
  name: 'MetricsPage',
  props: {
  },
  data() {
    return {
      projectinfo : {
        projectname : 'mi200'
      },
      projects : [],
      variants : [],
      users    : [],
      currentTab  : 'Bygrp',
      kinds     : [
        'Byprj',
        'Bygrp',
        'Byusr'
      ]
    }
  },
  components  : {
    Byprj,
    Bygrp,
    Byusr,
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
