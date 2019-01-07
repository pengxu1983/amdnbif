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
          <el-button type="primary" @click="add()">Add</el-button>
          <el-button type="primary" @click="upload()">Upload</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <el-table
        :data="regressionsettings_display"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="kind"
          label="kind"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.kind" placeholder="kind">
              <el-option 
                v-for="onekind in regressionkinds" 
                :label="onekind" 
                :value="onekind"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="daysperround"
          label="Days Needed per Round"
        >
        </el-table-column>
        <el-table-column
          prop="regressionstatus"
          label="RegressionStatus"
        >
        </el-table-column>
        <el-table-column
          prop="control"
          label="control"
          width="200"
        >
          <template slot-scope="scope">
            <el-switch
              style="display: block"
              v-model="scope.row.control"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="enabled"
              inactive-text="disabled"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="operation"
          width="120"
        >
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, regressionsettings_display)"
              type="text"
              size="small">
              Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'ConfigPage_regression_main',
  props: {
  },
  data () {
    return {
      projectinfo : {
        projectname : 'NV21',
        variantname : 'nbif_nv10_gpu',
      },
      regressionsettings : [],
      projects  : [],
      variants  : [],
      regressionkinds : [
        'long',
        'normal',
        'baco',
        'pg'
      ]
    }
  },
  computed  : {
    regressionsettings_display  () {
      var result = [];
      for(var i = 0; i< this.regressionsettings.length; i++){
        if((this.regressionsettings[i].projectname == this.projectinfo.projectname) && (this.regressionsettings[i].variantname == this.projectinfo.variantname)){
          result.push(this.regressionsettings[i]);
        }
      }
      return result;
    }
  },
  methods : {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    upload () {
      console.log('upload');
      console.log(this.regressionsettings_display);
      this.$http.post('/config/upload',{
        kind  : 'regressionsettingsupload',
        projectname : this.projectinfo.projectname,
        variantname : this.projectinfo.variantname,
        regressionsettings : JSON.stringify(this.regressionsettings_display)
      }).then(
        function(response){
          if(response.body.ok ==  'ok'){
            console.log('ok');
          }
          this.get();
          alert('uploaded');
        },
        function(){}
      );
    },
    add () {
      this.regressionsettings.push({
        variantname     : this.projectinfo.variantname,
        projectname     : this.projectinfo.projectname,
        kind            : '',
        daysperround    : 1,
        control         : true,
      });
    },
    get () {
      //regressionstatus info
      console.log('get');
      this.$http.post('/config/get',{
        kind  : 'allregressionsettingsget'
      }).then(
        function(response){
          if(response.body.ok ==  'ok'){
            this.regressionsettings = [];
            for(var index = 0; index < response.body.regressionsettings.length; index++){
              this.regressionsettings.push({
                kind              : response.body.regressionsettings[index].kind,
                daysperround      : response.body.regressionsettings[index].daysperround,
                regressionstatus  : response.body.regressionsettings[index].regressionstatus,
                variantname       : response.body.regressionsettings[index].variantname,
                projectname       : response.body.regressionsettings[index].projectname,
                control           : response.body.regressionsettings[index].control
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
  mounted  () {
    this.get();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
