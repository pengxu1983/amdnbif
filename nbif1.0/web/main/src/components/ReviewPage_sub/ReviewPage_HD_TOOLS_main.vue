<template>
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
        <el-form-item>
          <a target="abc" 
            :href="'http://srdcws704:1337/static/trees/nbif_main_sanity_mero/out/linux_2.6.32_64.VCS/nbif_al_gpu/config/nbif_all_rtl/pub/sim/mixed.msg_sort.html'"
          >
           <el-button>Confirm</el-button>
          </a>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <iframe name="abc" width=100% height=1000px></iframe>
    </el-main>
  </el-container>
</template>

<script>
var moment = require('moment');
export default {
  name: 'ReviewPage_Coverage_main',
  props: {
  },
  data () {
    return {
      projectinfo : {
        projectname : 'MERO',
        variantname : 'nbif_al_gpu'
      },
      projects  : [],
      variants  : [],
      users     : []
    }
  },
  computed  : {
  },
  methods : {
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
    }
  },
  mounted : function (){
    this.get();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
