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
                <el-form-item label="Tree">
                  <el-select v-model="shelveinfo.tree" placeholder="Tree Branch Select">
                    <el-option
                      label="NV21"
                      value="NV21"
                    >
                    </el-option>
                    <el-option
                      label="MAIN"
                      value="MAIN"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="addjob()">Submit</el-button>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="12">
              <el-form :inline="true" :model="searchvector" class="demo-form-inline">
                <el-form-item label="username">
                  <el-input v-model="searchvector.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item label="shelveID">
                  <el-input v-model="searchvector.shelveID" placeholder="shelveID"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="search">Search</el-button>
                </el-form-item>
                  <el-table
                    :data="searchresult"
                    border
                    style="width: 100%">
                    <el-table-column
                      prop="username"
                      label="username"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="shelveID"
                      label="shelveID"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="result"
                      label="result"
                    >
                    </el-table-column>
                  </el-table>
              </el-form>
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
      searchresult:[],
      searchvector:{
        username  : '',
        shelveID  : ''
      },
      shelveinfo  : {
        shelveID  : '',
        username  : '',
        password  : 'This Func Not Available',
        basechangelist  : 'TopChangelist',
        projectname : 'mero',
        variantname : 'nbif_al_gpu',
        tree      : 'MAIN'
      },
      projects    : [],
      variants    : [],
      sanitys     : [],
      tasks       : []
    }
  },
  methods : {
    search () {
      if((this.searchvector.username == '') && (this.searchvector.shelveID == '')){
        alert('nothing to search');
      }
      else{
        this.$http.post('/sanitys/checkbeforesubmit/search',{
          kind  : 'searchresult',
          username  : this.searchvector.username,
          shelveID  : this.searchvector.shelveID
        }).then(
          function(response){
            if(response.body.ok ==  'ok'){
              this.searchresult = JSON.parse(response.body.searchresult);
            }
          },
          function(){}
        );
      }
    },
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
