<template>
  <el-container>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="/main">MainPage</a>
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">SanityPage</a>
    </nav>
    <el-container style="height: 1000px; border: 1px solid #eee">
      <el-header>
        <el-form :inline="true" :model="projectinfo" class="demo-form-inline">
          <el-form-item label="ProjectName">
            <el-select v-model="projectinfo.projectname" placeholder="ProjectName">
              <el-option 
                v-for="oneproject in projects" 
                :label="oneproject.name" 
                :value="oneproject.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="VariantName">
            <el-select v-model="projectinfo.variantname" placeholder="VariantName">
              <el-option 
                v-for="onevariant in variants" 
                :label="onevariant.variantname" 
                :value="onevariant.variantname"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-header>
      <el-container style="border: 1px solid #eee">
        <el-aside width="300px">
          <el-menu
            default-active="status"
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
            v-bind:variants="variants"
            v-bind:testplans="testplans"
            v-bind:projects="projects"
            v-bind:projectinfo="projectinfo"
          ></component>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import SanityPage_status_main   from '@/components/SanityPage_sub/SanityPage_status_main.vue'
import SanityPage_config_main   from '@/components/SanityPage_sub/SanityPage_config_main.vue'

export default {
  name: 'SanityPage',
  props: {
  },
  data() {
    return {
      projectinfo : {
        projectname : 'NV21',
        variantname : 'nbif_nv10_gpu'
      },
      projects    : [],
      variants    : [],
      testplans   : [],
      kinds       : [
        'SanityPage_status_main',
        'SanityPage_config_main',
      ],
      currentTab  : 'SanityPage_config_main',
    }
  },
  components  : {
    SanityPage_status_main,
    SanityPage_config_main,
  },
  computed: {
    currentTabComponent: function () {
      console.log(this.currentTab);
      return this.currentTab;
      //return 'tab-' + this.currentTab.toLowerCase()
    }
  },
  methods : {
    kind_disp (name){
      if(name == 'SanityPage_status_main'){
        return 'Status';
      }
      else if(name == 'SanityPage_config_main'){
        return 'Config';
      }
      else if(name == 'SanityPage_machines_main'){
        return 'Machines';
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    get () {
      //Variants get info
      this.$http.post('/config/get',{
        kind  : 'allvariantsget'
      }).then(
        function(response){
          if(response.body.ok ==  'ok'){
            this.variants = [];
            for(var index = 0; index < response.body.variants.length; index++){
              this.variants.push({
                variantname : response.body.variants[index].variantname,
              });
            }
          }
        },
        function(){}
      );
      //Users get info
      this.$http.post('/config/get',{
        kind  : 'allusersget'
      }).then(
        function(response){
          if(response.body.ok ==  'ok'){
            this.users= [];
            for(var index = 0; index < response.body.users.length; index++){
              this.users.push({
                realname  : response.body.users[index].realname,
                email     : response.body.users[index].email,
                groupname : response.body.users[index].groupname
              });
            }
          }
        },
        function(){}
      );
      //Projects get info
      this.$http.post('/config/get',{
        kind  : 'allprojectsget'
      }).then(
        function(response){
          if(response.body.ok ==  'ok'){
            this.projects = [];
            var allprojects = JSON.parse(response.body.projects);
            for(var index = 0; index < allprojects.length; index++){
              this.projects.push({
                name              : allprojects[index].name,
                DVlead            : allprojects[index].DVlead,
                DElead            : allprojects[index].DElead,
                Projlead          : allprojects[index].Projlead,
                availablevariants : JSON.parse(allprojects[index].availablevariants)
              });
            console.log(allprojects[index].availablevariants);
            console.log(typeof(allprojects[index].availablevariants));
            }
          }
        },
        function(){}
      );
      //Testplans get info
      this.$http.post('/config/get',{
        kind  : 'alltestplansget'
      }).then(
        function(response){
          if(response.body.ok ==  'ok'){
            this.testplans  = [];
            for(var index = 0; index < response.body.testplans.length; index++){
              this.testplans.push({
                name            : response.body.testplans[index].name,
                DVowner         : response.body.testplans[index].DVowner,
                DEowner         : response.body.testplans[index].DEowner,
                testnameprefix  : response.body.testplans[index].testnameprefix,
                projectname     : response.body.testplans[index].projectname,
                variantname     : response.body.testplans[index].variantname,
              });
            }
          }
        },
        function(){}
      );
    }
  },
  mounted () {
    this.get();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
