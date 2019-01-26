<template>
  <el-container>
    <el-header>
      <el-form :inline="true" :model="projectinfo" class="demo-form-inline">
        <el-form-item label="ProjectName">
          <el-select v-model="projectinfo.projectname" placeholder="ProjectName"
            @change="get()"
          >
            <el-option 
              v-for="oneproject in projects" 
              :label="oneproject.name" 
              :value="oneproject.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="VariantName">
          <el-select v-model="projectinfo.variantname" placeholder="VariantName"
            @change="get()"
          >
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
    <el-main>
      <el-table
        :data="sanityStatus"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="testname"
          label="Test Name"
        >
        </el-table-column>
        <el-table-column
          prop="lastCL"
          label="Last Changelist"
        >
        </el-table-column>
        <el-table-column
          prop="lastpassCL"
          label="Last Passing Changelist"
        >
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'SanityPage_status_main',
  props: {
  },
  data() {
    return {
      sanityStatus  : [],
      sanitys     : [],
      projectinfo : {
        projectname : 'NV21',
        variantname : 'nbif_nv10_gpu'
      },
      projects    : [],
      variants    : [],
    }
  },
  methods : {
    get () {
      //Sanitys get info
      this.$http.post('/sanitys/get',{
        kind  : 'allsanitysget'
      }).then(
        function(response){
          if(response.body.ok =='ok'){
            this.sanitys  =[];
            for(var i = 0; i<response.body.sanitys.length; i++){
              this.sanitys.push({
                testname    : response.body.sanitys[i].testname,
                projectname : response.body.sanitys[i].projectname,
                variantname : response.body.sanitys[i].variantname,
                lastCL      : response.body.sanitys[i].lastCL,
                lastpassCL  : response.body.sanitys[i].lastpassCL
              });
            }
            console.log(this.sanitys);
          }
        },
        function(){}
      );
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
              //console.log(allprojects[index].availablevariants);
              //console.log(typeof(allprojects[index].availablevariants));
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
  mounted : function(){
    //console.log('mounted');
    //console.log(this.projectinfo.projectname);
    //console.log(this.projectinfo.variantname);
    this.get();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
