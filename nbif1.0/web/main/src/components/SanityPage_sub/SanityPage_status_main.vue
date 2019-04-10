<template>
  <el-tabs v-model="activeTab" type="card" @tab-click="handleClick">
    <el-tab-pane 
      v-for="onetree in trees"
      :label="onetree.treename" :name="onetree.treename"
    >
      <template>
        <el-container>
          <el-main>
            <el-row>
              <el-col :span="24">
                <h3>{{ onetree.treename }} : sanity</h3>
              </el-col>
            </el-row>
            <el-row>
              <el-table
                :data="sanityStatus"
                border
                style="width: 100%"
              >
                <el-table-column
                  prop="sanity_lastcheckedCL"
                  label="lastcheckedCL"
                >
                </el-table-column>
                <el-table-column
                  prop="sanity_result"
                  label="status"
                >
                </el-table-column>
                <el-table-column
                  prop="sanity_lastpassCL"
                  label="lastpassCL"
                >
                </el-table-column>
                <el-table-column
                  prop="sanity_brokenCL"
                  label="brokenCL"
                >
                </el-table-column>
                <el-table-column
                  prop="sanity_brokenCLowner"
                  label="brokenCLowner"
                >
                </el-table-column>
              </el-table>
              <hr />
              <el-table
                :data="sanity_details"
                border
                style="width: 100%"
              >
                <el-table-column
                  prop="variantname"
                  label="variantname"
                >
                </el-table-column>
                <el-table-column
                  prop="demo_test_0"
                  label="demo_test_0"
                >
                </el-table-column>
                <el-table-column
                  prop="demo_test_1"
                  label="demo_test_1"
                >
                </el-table-column>
                <el-table-column
                  prop="demo_test_2"
                  label="demo_test_2"
                >
                </el-table-column>
              </el-table>
            </el-row>
          </el-main>
        </el-container>
        <el-container>
          <el-main>
            <el-row>
              <el-col :span="24">
                <h3>{{ onetree.treename }} : dcelab</h3>
              </el-col>
            </el-row>
            <el-row>
              <el-table
                :data="sanityStatus"
                border
                style="width: 100%"
              >
                <el-table-column
                  prop="dcelab_lastcheckedCL"
                  label="lastcheckedCL"
                >
                </el-table-column>
                <el-table-column
                  prop="dcelab_result"
                  label="status"
                >
                </el-table-column>
                <el-table-column
                  prop="dcelab_lastpassCL"
                  label="lastpassCL"
                >
                </el-table-column>
                <el-table-column
                  prop="dcelab_brokenCL"
                  label="brokenCL"
                >
                </el-table-column>
                <el-table-column
                  prop="dcelab_brokenCLowner"
                  label="brokenCLowner"
                >
                </el-table-column>
              </el-table>
            </el-row>
          </el-main>
        </el-container>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>


<script>
export default {
  name: 'SanityPage_status_main',
  props: {
  },
  data() {
    return {
      activeTab   : 'MAIN',
      sanityStatus: [],
      sanity_details:[],
      dcelab_details:[],
      sanitys     : [],
      dcelabStatus: [],
      projectinfo : {
        projectname : 'MERO',
        variantname : 'nbif_al_gpu'
      },
      projects    : [],
      variants    : [],
      trees       : [
        {
          treename  : 'MAIN',
          kind      : 'common'
        },
        {
          treename  : 'NV21',
          kind      : 'common'
        },
      ]
    }
  },
  computed:{
    
    sanitys_display : function(){
      var result  = [];
      for(var k=0;k<this.sanitys.length;k++){
        if((this.sanitys[k].projectname == this.projectinfo.projectname)&&(this.sanitys[k].variantname == this.projectinfo.variantname)){
          result.push(this.sanitys[k]);
        }
      }
      return result;
    }
  },
  methods : {
    handleClick(tab, event) {
      //console.log(tab, event);
      console.log(this.activeTab);
      this.getCommonSanityStatus(this.activeTab);
    },
    commonSanityStatus(variantname){
      var items=[];
      for(var k=0;k<this.common_sanitys.length;k++){
        if(this.common_sanitys[k].variantname == variantname){
          items.push(this.common_sanitys[k]);
        }
      }
      return items;
    },
    getCommonSanityStatus (tree){
      this.sanityStatus=[];
      this.$http.post('/sanitys/common-sanity/getcommonsanitystatus',{
        tree  : tree
      }).then(
        function(response){
          if(response.body.ok ==  'ok'){
            console.log(response.body);
            this.sanityStatus.push({
              sanity_lastcheckedCL  : response.body.sanity_lastcheckedCL ,
              sanity_result         : response.body.sanity_result        ,
              sanity_lastpassCL     : response.body.sanity_lastpassCL    ,
              sanity_brokenCL       : response.body.sanity_brokenCL      ,
              sanity_brokenCLowner  : response.body.sanity_brokenCLowner ,
              sanity_details        : response.body.sanity_details       ,
              dcelab_lastcheckedCL  : response.body.dcelab_lastcheckedCL ,
              dcelab_result         : response.body.dcelab_result        ,
              dcelab_lastpassCL     : response.body.dcelab_lastpassCL    ,
              dcelab_brokenCL       : response.body.dcelab_brokenCL      ,
              dcelab_brokenCLowner  : response.body.dcelab_brokenCLowner ,
              dcelab_details        : response.body.dcelab_details        
            });
            let sanityDetails = JSON.parse(response.body.sanity_details);
            this.sanity_details=[];
            for(let onevariant in sanityDetails){
              console.log(onevariant);
              let oneR = {};
              oneR['variantname'] = onevariant;
              oneR['demo_test_0'] = sanityDetails[onevariant]['demo_test_0'];
              oneR['demo_test_1'] = sanityDetails[onevariant]['demo_test_1'];
              oneR['demo_test_2'] = sanityDetails[onevariant]['demo_test_2'];
              this.sanity_details.push(oneR);
            }
          }
          else if(response.body.ok ==  'notok'){
            console.log(tree+' sanityStatus route is notok');
          }
        },
        function(){}
      );
    },
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
              console.log('testname');
              console.log(response.body.sanitys[i].testname)
            }
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
              console.log('variantname : '+response.body.variants[index].variantname);
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
    //this.get();
    this.getCommonSanityStatus(this.activeTab);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
