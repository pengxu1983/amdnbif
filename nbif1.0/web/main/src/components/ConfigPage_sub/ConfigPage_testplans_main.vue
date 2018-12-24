<template>
  <el-container>
    <el-col :span="24">
      <el-container>
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
      </el-container>
      <el-table
        :data="testplans"
        border
        style="width: 100%"
      >
        <el-table-column
          fixed
          prop="name"
          label="testplan name"
        >
          <template slot-scope="scope">
            <el-input
              placeholder="testplan name"
              v-model="scope.row.name"
              clearable>
            </el-input>
          </template>
        </el-table-column>
        <!-- <el-table-column
          fixed
          prop="projectname"
          label="project name"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.projectname" placeholder="projectname">
              <el-option 
                v-for="oneproject in projects" 
                :label="oneproject.name" 
                :value="oneproject.name"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          fixed
          prop="variantname"
          label="variantname"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.variantname" placeholder="variantname">
              <el-option 
                v-for="onevariant in variants" 
                :label="onevariant.variantname" 
                :value="onevariant.variantname"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column> -->
        <el-table-column
          fixed
          prop="DVowner"
          label="DVowner"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.DVowner" placeholder="DVowner">
              <el-option 
                v-for="oneuser in users" 
                :label="oneuser.realname" 
                :value="oneuser.realname"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          fixed
          prop="DEowner"
          label="DEowner"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.DEowner" placeholder="DEowner">
              <el-option 
                v-for="oneuser in users" 
                :label="oneuser.realname" 
                :value="oneuser.realname"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="operation"
          width="120"
        >
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, testplan)"
              type="text"
              size="small">
              Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-container>
</template>

<script>
export default {
  name: 'ConfigPage_testplans_main',
  props: {
  },
  data () {
    return {
      variants  : [],
      users     : [],
      projects  : [],
      testplans : [],
      projectinfo : {
        projectname : 'NV21',
        variantname : 'nbif_nv10_gpu',
      }
    }
  },
  methods : {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    upload () {
      console.log('upload');
      for(var i=0;i<this.testplans.length;i++){
        console.log(this.testplans[i].name);
      }
      this.$http.post('/config/upload',{
        kind      : 'testplansupload',
        testplans : this.testplans
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
      this.testplans.push({
        variantname     : this.projectinfo.variantname,
        projectname     : this.projectinfo.projectname,
        DVowner         : '',
        DEowner         : '',
        name            : '',
        testnameprefix  : ''
      });
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
            for(var index = 0; index < response.body.projects.length; index++){
              this.projects.push({
                name      : response.body.projects[index].name,
                DVlead    : response.body.projects[index].DVlead,
                DElead    : response.body.projects[index].DElead,
                Projlead  : response.body.projects[index].Projlead,
                variants  : response.body.projects[index].variants
              });
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
            this.projects = [];
            for(var index = 0; index < response.body.testplans.length; index++){
              this.projects.push({
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
  mounted  () {
    this.get();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
