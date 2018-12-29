<template>
  <el-container>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="/main">MainPage</a>
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">TestplanDetailPage</a>
    </nav>
    <el-container>
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
          <el-form-item label="TimeWindow">
            <el-select v-model="projectinfo.timewindow" placeholder="TimeWindow">
              <el-option label="week" value="week"></el-option>
              <el-option label="month" value="month"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-menu-item 
              v-for="onetestplan in testplans_display"
              :index="onetestplan.name"
            >
              <i class="el-icon-setting"></i>
              <span slot="title">{{onetestplan.name}}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'TestplanDetailPage',
  props: {
  },
  data() {
    return {
      projects  : [],
      variants  : [],
      users     : [],
      testplans : [],
      projectinfo : {
        projectname : 'NV21',
        variantname : 'nbif_nv10_gpu',
        timewindow  : 'week'
      }
    }
  },
  methods : {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    get(){
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
  computed  : {
    testplans_display () {
      var result = [];
      for(var i = 0; i< this.testplans.length; i++){
        if((this.testplans[i].projectname == this.projectinfo.projectname) && (this.testplans[i].variantname == this.projectinfo.variantname)){
          result.push(this.testplans[i]);
        }
      }
      return result;
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
