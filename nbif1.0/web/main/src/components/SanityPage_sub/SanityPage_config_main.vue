<template>
  <el-tabs v-model="activeTab" type="card" @tab-click="handleClick">
    <el-tab-pane label="Common for All Variants" name="byVariant">
      <hr />
      <template>
        <el-container>
          <el-header>
            <el-row>
              <h3>MAIN Tests</h3>
              <el-button type="primary" round 
                @click="testadd('MAIN')"
              >Add</el-button>
              <el-button type="primary" round
                @click="testupload"
              >Upload</el-button>
            </el-row>
          </el-header>
          <el-main>
            <el-table
              :data="common_sanitys"
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
                prop="valid"
                label="Valid"
              >
                <template slot-scope="scope">
                  <el-checkbox-group v-model="scope.row.valid.MAIN" >
                    <div 
                      v-for="onevariant in variants" 
                    >
                      <el-checkbox :label="onevariant.variantname"></el-checkbox>           
                    </div>
                  </el-checkbox-group>
                </template>
              </el-table-column>
              <el-table-column
                fixed="right"
                label="operation"
                width="120"
              >
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="deleteRow(scope.$index, common_sanitys)"
                    type="text"
                    size="small"
                  >
                    Delete
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-main>
        </el-container>
      </template>
      <template>
        <el-container>
          <el-header>
            <el-row>
              <h3>MAIN tasks</h3>
              <el-button type="primary" round
                @click="taskadd('MAIN')"
              >Add</el-button>
              <el-button type="primary" round
                @click="taskupload"
              >Upload</el-button>
            </el-row>
          </el-header>
          <el-main>
            <el-table
              :data="common_tasks"
              border
              style="width: 100%"
            >
              <el-table-column
                prop="taskname"
                label="TaskName"
              >
                <template slot-scope="scope">
                  <el-input
                    placeholder="TaskName"
                    v-model="scope.row.taskname"
                    clearable>
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="valid"
                label="Valid"
              >
                <template slot-scope="scope">
                  <el-checkbox-group v-model="scope.row.valid.MAIN" >
                    <div 
                      v-for="onevariant in variants" 
                    >
                      <el-checkbox :label="onevariant.variantname"></el-checkbox>           
                    </div>
                  </el-checkbox-group>
                </template>
              </el-table-column>
              <el-table-column
                fixed="right"
                label="operation"
                width="120"
              >
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="deleteRow(scope.$index, common_tasks)"
                    type="text"
                    size="small"
                  >
                    Delete
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-main>
        </el-container>
      </template>
      <hr />
      <template>
        <el-container>
          <el-header>
            <el-row>
              <h3>NV21 Tests</h3>
              <el-button type="primary" round
                @click="testadd('NV21')"
              >Add</el-button>
              <el-button type="primary" round
                @click="testupload"
              >Upload</el-button>
            </el-row>
          </el-header>
          <el-main>
            <el-table
              :data="common_sanitys"
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
                prop="valid"
                label="Valid"
              >
                <template slot-scope="scope">
                  <el-checkbox-group v-model="scope.row.valid.NV21" >
                    <div 
                      v-for="onevariant in variants" 
                    >
                      <el-checkbox :label="onevariant.variantname"></el-checkbox>           
                    </div>
                  </el-checkbox-group>
                </template>
              </el-table-column>
              <el-table-column
                fixed="right"
                label="operation"
                width="120"
              >
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="deleteRow(scope.$index, common_sanitys)"
                    type="text"
                    size="small"
                  >
                    Delete
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-main>
        </el-container>
      </template>
      <template>
        <el-container>
          <el-header>
            <el-row>
              <h3>NV21 tasks</h3>
              <el-button type="primary" round
                @click="taskadd('NV21')"
              >Add</el-button>
              <el-button type="primary" round
                @click="taskupload"
              >Upload</el-button>
            </el-row>
          </el-header>
          <el-main>
            <el-table
              :data="common_tasks"
              border
              style="width: 100%"
            >
              <el-table-column
                prop="taskname"
                label="TaskName"
              >
                <template slot-scope="scope">
                  <el-input
                    placeholder="TaskName"
                    v-model="scope.row.taskname"
                    clearable>
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="valid"
                label="Valid"
              >
                <template slot-scope="scope">
                  <el-checkbox-group v-model="scope.row.valid.NV21" >
                    <div 
                      v-for="onevariant in variants" 
                    >
                      <el-checkbox :label="onevariant.variantname"></el-checkbox>           
                    </div>
                  </el-checkbox-group>
                </template>
              </el-table-column>
              <el-table-column
                fixed="right"
                label="operation"
                width="120"
              >
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="deleteRow(scope.$index, common_tasks)"
                    type="text"
                    size="small"
                  >
                    Delete
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-main>
        </el-container>
      </template>
      <hr />
    </el-tab-pane>
    <el-tab-pane label="Select by Project(TODO)" name="byProject">
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
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: 'SanityPage_config_main',
  props: {
  },
  data() {
    return {
      common_tasks  : [],
      //common_tasks  : [
      //  {
      //    taskname  : 'dcelab',
      //    valid     : {
      //    'NV21':[
      //      'nbif_al_gpu',
      //      'nbif_ssp_generic_a',
      //      'nbif_ssp_ntb',
      //      'nbif_oak_gpu',
      //      'nbif_nv10_gpu'
      //    ],
      //    'MAIN':[
      //      'nbif_al_gpu',
      //      'nbif_ssp_generic_a',
      //      'nbif_ssp_ntb',
      //      'nbif_oak_gpu',
      //      'nbif_nv10_gpu'
      //    ]}
      //  },
      //],

      common_sanitys  : [],
      //common_sanitys  : [
      //  {
      //    testname  : 'demo_test_0',
      //    valid     : {
      //    'NV21':[
      //      'nbif_al_gpu',
      //      'nbif_ssp_generic_a',
      //      'nbif_ssp_ntb',
      //      'nbif_oak_gpu',
      //      'nbif_nv10_gpu'
      //    ],
      //    'MAIN':[
      //      'nbif_al_gpu',
      //      'nbif_ssp_generic_a',
      //      'nbif_ssp_ntb',
      //      'nbif_oak_gpu',
      //      'nbif_nv10_gpu'
      //    ]}
      //  },
      //  {
      //    testname  : 'demo_test_1',
      //    valid     : {
      //    'NV21':[
      //      'nbif_al_gpu',
      //      'nbif_ssp_generic_a',
      //      'nbif_ssp_ntb',
      //      'nbif_oak_gpu',
      //      'nbif_nv10_gpu'
      //    ],
      //    'MAIN':[
      //      'nbif_al_gpu',
      //      'nbif_ssp_generic_a',
      //      'nbif_ssp_ntb',
      //      'nbif_oak_gpu',
      //      'nbif_nv10_gpu'
      //    ]}
      //  },
      //  {
      //    testname  : 'demo_test_2',
      //    valid     : {
      //    'NV21':[
      //      'nbif_al_gpu',
      //      'nbif_ssp_generic_a',
      //      'nbif_ssp_ntb',
      //      'nbif_oak_gpu',
      //      'nbif_nv10_gpu'
      //    ],
      //    'MAIN':[
      //      'nbif_al_gpu',
      //      'nbif_ssp_generic_a',
      //      'nbif_ssp_ntb',
      //      'nbif_oak_gpu',
      //      'nbif_nv10_gpu'
      //    ]}
      //  }
      //],
      activeTab : 'byVariant',
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
      //console.log('sanitys_display computed');
      var items = [];
      //console.log(this.sanitys);
      for(var i=0;i<this.sanitys.length;i++){
        if((this.sanitys[i].projectname  == this.projectinfo.projectname) && (this.sanitys[i].variantname == this.projectinfo.variantname)){
          items.push( this.sanitys[i]);
        }
      }
      //console.log(items);
      return items;
    }
  },
  methods : {
    testadd (tree)  {
      let newtest = {};
      newtest['testname']='';
      newtest['valid']={};
      newtest['valid'][tree]=[];
      this.common_sanitys.unshift(newtest);
    },
    testupload  ()  {
      for(let c=0;c<this.common_sanitys.length;c++){
        this.$http.post('/sanitys/config',{
          kind  : 'testupdate',
          testname  : this.common_sanitys[c].testname,
          valid : JSON.stringify(this.common_sanitys[c].valid)
        }).then(
          function(response){
            if(response.body.ok =='ok'){
            }
            else if(response.body.ok == 'notok'){
            }
          },
          function(){}
        );
      }
    },
    taskadd(tree)  {
      let newtask = {};
      newtask['taskname']='';
      newtask['valid']={};
      newtask['valid'][tree]=[];
      this.common_tasks.unshift(newtask);
    },
    taskupload()  {
      for(let c=0;c<this.common_tasks.length;c++){
        if(this.common_tasks[c].taskname == ''){
          continue;
        }
        this.$http.post('/sanitys/config',{
          kind  : 'taskupdate',
          testname  : this.common_tasks[c].taskname,
          valid : JSON.stringify(this.common_tasks[c].valid)
        }).then(
          function(response){
            if(response.body.ok =='ok'){
            }
            else if(response.body.ok == 'notok'){
            }
          },
          function(){}
        );
      }
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    handleClick(tab, event) {
      //console.log(tab, event);
    },
    get () {
      //common sanity
      this.$http.post('/config/get',{
        kind  : 'allsanitycfg'
      }).then(
        function(response){
          if(response.body.ok =='ok'){
            console.log(typeof(response.body.common_sanitys));
            console.log(typeof(response.body.common_sanitys));
            console.log(response.body.common_sanitys);
            console.log(response.body.common_sanitys);
            this.common_sanitys = JSON.parse(response.body.common_sanitys);
            this.common_tasks   = JSON.parse(response.body.common_tasks);
            console.log(typeof(this.common_sanitys.valid));
            console.log(typeof(this.common_sanitys.valid));
          }
          else if(response.body.ok  ==  'notok'){
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
      //console.log(this.projectinfo.projectname);
      //console.log(this.projectinfo.variantname);
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
