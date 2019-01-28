<template>
  <el-container>
      <el-header>
        <el-form :inline="true" :model="projectinfo" class="demo-form-inline">
          <el-form-item label="ProjectName">
            <el-select v-model="projectinfo.projectname" placeholder="ProjectName"
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
      <el-header>
        <el-form :inline="true" :model="projectinfo_source" class="demo-form-inline">
          <el-form-item>
            <el-button type="primary"
              @click="add()"
            >
            Add
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
              @click="upload()"
            >
            Upload
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">
            CloneFrom:
            </el-button>
          </el-form-item>
          <el-form-item label="ProjectName">
            <el-select v-model="projectinfo_source.projectname" placeholder="ProjectName">
              <el-option 
                v-for="oneproject in projects" 
                :label="oneproject.name" 
                :value="oneproject.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="VariantName">
            <el-select v-model="projectinfo_source.variantname" placeholder="VariantName">
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
          :data="sanitys_display"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="testname"
            label="TestName"
          >
            <template slot-scope="scope">
              <el-input
                placeholder="TestName"
                v-model="scope.row.testname"
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
              @click.native.prevent="deleteRow(scope.$index, sanitys_display)"
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
  name: 'SanityPage_config_main',
  props: {
  },
  data() {
    return {
      sanitys : [],
      projectinfo : {
        projectname : 'MERO',
        variantname : 'nbif_al_gpu'
      },
      projectinfo_source : {
        projectname : 'MERO',
        variantname : 'nbif_al_gpu'
      },
      projects    : [],
      variants    : [],
      testplans   : [],
    }
  },
  computed  : {
    sanitys_display () {
      console.log('sanitys_display computed');
      var items = [];
      console.log(this.sanitys);
      for(var i=0;i<this.sanitys.length;i++){
        if((this.sanitys[i].projectname  == this.projectinfo.projectname) && (this.sanitys[i].variantname == this.projectinfo.variantname)){
          items.push( this.sanitys[i]);
        }
      }
      console.log(items);
      return items;
    }
  },
  methods : {
    deleteRow(index, rows) {
      rows.splice(index, 1);
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
                variantname : response.body.sanitys[i].variantname
              });
            }
          }
        },
        function(){}
      );
    },
    add () {
      console.log(this.projectinfo.projectname);
      console.log(this.projectinfo.variantname);
      this.sanitys.unshift({
        variantname     : this.projectinfo.variantname,
        projectname     : this.projectinfo.projectname,
        testname        : ''
      });
    },
    upload () {
      console.log('upload');
      for(var i=0;i<this.sanitys_display.length;i++){
        console.log(this.sanitys_display[i].testname);
      }
      this.$http.post('/sanitys/upload',{
        kind    : 'sanity_test_upload',
        projectname : this.projectinfo.projectname,
        variantname : this.projectinfo.variantname,
        sanitys : JSON.stringify(this.sanitys_display)
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
  },
  mounted (){
    this.get();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
