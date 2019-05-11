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
      <el-container>
        <el-form :inline="true" :model="clonetarget" class="demo-form-inline">
          <el-form-item>
            <el-button type="primary" @click="clone()">CloneFrom</el-button>
          </el-form-item>
          <el-form-item label="ProjectName">
            <el-select v-model="clonetarget.projectname" placeholder="ProjectName">
              <el-option 
                v-for="oneproject in projects" 
                :label="oneproject.name" 
                :value="oneproject.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="VariantName">
            <el-select v-model="clonetarget.variantname" placeholder="VariantName">
              <el-option 
                v-for="onevariant in variants" 
                :label="onevariant.variantname" 
                :value="onevariant.variantname"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-container>
      <el-table
        :data="testplans_display"
        border
        height="800"
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
          fixed
          prop="testnameprefix"
          label="Test Name Prefix"
        >
          <template slot-scope="scope">
            <el-input
              placeholder="Test Name Prefix"
              v-model="scope.row.testnameprefix"
              clearable>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="operation"
          width="120"
        >
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, testplans_display)"
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
        projectname : 'mero',
        variantname : 'nbif_al_gpu',
      },
      clonetarget : {
        projectname : '',
	      variantname : ''
      }
    }
  },
  computed  : {
    testplans_display : function (){
      var result = [];
      for(var i = 0; i< this.testplans.length; i++){
        if((this.testplans[i].projectname == this.projectinfo.projectname) && (this.testplans[i].variantname == this.projectinfo.variantname)){
          result.push(this.testplans[i]);
        }
      }
      return result;
    },
  },
  methods : {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    clone(){
      console.log('clone');
      var cloneitems = [];
      if((this.clonetarget.projectname == '') || (this.clonetarget.variantname == '')){
        //Doing nothing
      }
      else {
        console.log(this.testplans.length);
        this.$http.post('/config/clone',{
          kind : 'testplanclone',
          projectname : this.projectinfo.projectname,
          variantname : this.projectinfo.variantname,
          clonetarget : JSON.stringify(this.clonetarget),
	      }).then(
          function(response){
            if(response.body.ok	=='ok'){
              this.get();
	          }
	        },
          function(){}
	      );
      }
    },
    upload () {
      console.log('upload');
      for(var i=0;i<this.testplans.length;i++){
        console.log(this.testplans[i].name);
      }
      this.$http.post('/config/upload',{
        kind      : 'testplansupload',
        projectname : this.projectinfo.projectname,
        variantname : this.projectinfo.variantname,
        testplans : this.testplans_display
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
  mounted  () {
    this.get();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
