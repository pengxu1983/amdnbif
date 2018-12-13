<template>
  <div>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">ReviewPage</a>
    </nav>
    <div>
      <el-row class="tac">
        <el-col :span="4">
          <h5>NV21</h5>
          <el-menu
            default-active="PA"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose">
            <el-menu-item index="Coverage"
              @click="currentTab = 'ReviewPage_Coverage_main'"
            >
              <i class="el-icon-menu"></i>
              <span slot="title">Coverage</span>
            </el-menu-item>
            <el-menu-item index="PA" 
              @click="currentTab = 'ReviewPage_PA_main'">
              <i class="el-icon-menu"></i>
              <span slot="title">PA</span>
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
import ReviewPage_Coverage_main from '@/components/ReviewPage_sub/ReviewPage_Coverage_main.vue'
import ReviewPage_PA_main from '@/components/ReviewPage_sub/ReviewPage_PA_main.vue'

export default {
  name: 'ReviewPage',
  props: {
  },
  components  : {
    ReviewPage_PA_main,
    ReviewPage_Coverage_main
  },
  data() {
    return {
      review_title  : [
        'PA',
        'Coverage'
      ],
      currentTab: 'ReviewPage_PA_main',
      tabs: [
        'ReviewPage_PA_main', 
        'ReviewPage_Coverage_main', 
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
