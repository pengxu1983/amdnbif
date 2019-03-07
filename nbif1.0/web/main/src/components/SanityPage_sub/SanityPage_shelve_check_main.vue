<template>
  <el-container>
    <el-main>
      <el-container >
        <el-main>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form ref="form" :model="shelveinfo" label-width="120px">
                <el-form-item label="shelveID">
                  <el-input v-model="shelveinfo.shelveID"></el-input>
                </el-form-item>
                <el-form-item label="username">
                  <el-input v-model="shelveinfo.username"></el-input>
                </el-form-item>
                <el-form-item label="password">
                  <el-input type="password" v-model="shelveinfo.password" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="baseCL">
                  <el-input v-model="shelveinfo.basechangelist"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="addjob()">Submit</el-button>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="12">
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'SanityPage_shelve_check_main',
  props: {
  },
  data () {
    return {
      shelveinfo  : {
        shelveID  : '',
        username  : '',
        password  : 'This Func Not Available',
        basechangelist  : 'TopChangelist',
        projectname : 'MERO',
        variantname : 'nbif_al_gpu'
      },
      projects    : [],
      variants    : []
    }
  },
  methods : {
    addjob () {
      if(this.shelveinfo.username == ''){
        alert('username is blank');
        return;
      }
      if(this.shelveinfo.shelveID == ''){
        alert('shelveID is blank');
        return;
      }
      if(this.shelveinfo.basechangelist == ''){
        alert('base changelist is blank');
        return;
      }
      this.$http.post('/sanitys/checkbeforesubmit/addjob',{
        kind  : 'oneshelve',
        data  : JSON.stringify(this.shelveinfo)
      }).then(
        function(response){
          if(response.body.ok ==  'ok'){
            alert('job added');
          }
        },
        function(){}
      );
    },
    get () {
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
                projectname       : allprojects[index].name,
                DVlead            : allprojects[index].DVlead,
                DElead            : allprojects[index].DElead,
                Projlead          : allprojects[index].Projlead,
                availablevariants : JSON.parse(allprojects[index].availablevariants)
              });
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
    },
  },
  mounted  () {
    this.get();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-main{
    text-align: left
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: left;
    font-size: 14px;
    height: 60px;
  }
</style>
