<template>
  <el-tabs v-model="activeTab" type="card" @tab-click="handleClick">
    <el-tab-pane 
      v-for="onetree in trees"
      :label="onetree.treename" name="onetree.treename"
    >
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
      activeTab   : 'commonSanity',
      sanityStatus : [],
      sanitys     : [],
      dcelabStatus:[],
      projectinfo : {
        projectname : 'MERO',
        variantname : 'nbif_al_gpu'
      },
      projects    : [],
      variants    : [],
      trees       : [
        {
          treename  : 'NV21'
        },
        {
          treename  : 'MAIN'
        }
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
      console.log(tab, event);
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
    getCommonSanityStatus (){
      this.$http.post('/sanitys/common-sanity/getcommonsanitystatus',{
        kind  : 'sanityStatus'
      }).then(
        function(response){
          if(response.body.ok == 'ok'){
            this.sanityStatus = [];
            let result;
            if(response.body.result == 'no'){
              result = 'PASS'
            }
            else if(response.body.result == 'yes'){
              result = 'FAIL'
            }
            let details = [];
            let respdetails = response.body.details;
            console.log(JSON.parse(respdetails));
            console.log(typeof(JSON.parse(respdetails)));
            let R = JSON.parse(respdetails);
            let tests = ['demo_test_0','demo_test_1','demo_test_2']
            for(let detailsvariant in R){
              let one = {};
              one['variantname']  = detailsvariant;
              for(let t=0;t<tests.length;t++){
                one[tests[t]] = R[detailsvariant][tests[t]];
              }
              details.push(one);
            }
            console.log(typeof(details));
            console.log(details);
            this.sanityStatus.push({
              lastcheckedCL : response.body.lastcheckedCL,
              result        : result,
              brokenCL      : response.body.brokenCL,
              brokenCLowner : response.body.brokenCLowner,
              dcelab        : response.body.dcelab,
              //details       : response.body.details
              details       : details
            });
            console.log(this.sanityStatus);
            let DCelabresult = [];
            console.log('aaa');
            console.log(response.body.dcelab);
            console.log(typeof(response.body.dcelab));
            if(response.body.dcelab == 'NA'){
              console.log('bbb');
              DCelabresult.push({
                variantname : 'Not Done',
                result  : 'NOT Done'
              });
            }
            else{
              console.log('ccc');
              R = JSON.parse(response.body.dcelab);
              for(let onevariant in R){
                let cmd = 'dj -v -l dc_elab.log -e \'releaseflow::dropflow(:rtl_drop).build(:rhea_drop,:rhea_dc)\' -DPUBLISH_BLKS=nbif_shub_wrap_';
                if(onevariant == 'nbif_al_gpu'){
                  cmd += 'algfx\n';
                }
                if(onevariant == 'nbif_oak_gpu'){
                  cmd += 'oakgfx\n';
                }
                if(onevariant == 'nbif_nv10_gpu'){
                  cmd += 'gfx -DDISABLE_VDCI2 -DDISABLE_REGSLICE\n';
                }
                if(onevariant == 'nbif_ssp_ntb'){
                  cmd += 'ntb\n';
                }
                if(onevariant == 'nbif_ssp_generic_a'){
                  cmd += 'rc_a\n';
                }
                DCelabresult.push({
                  variantname : onevariant,
                  result      : R[onevariant],
                  command     : cmd
                });
              }
            }
            this.dcelabStatus = DCelabresult;
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
    this.getCommonSanityStatus();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
