<template>
  <el-container>
    <el-main>
      <el-row>
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-button 
              type="primary"
              @click="projectadd()"
            >add</el-button>
          </el-form-item>
          <el-form-item>
            <el-button 
              type="primary"
              @click="projectupload()"
            >upload</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table
          :data="projects"
          border
          stripe
          style="width: 100%">
          <el-table-column
            prop="projectname"
            label="projectname"
            width="200px"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.projectname"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="validvariants"
            label="validvariants"
            width="200px"
          >
            <template slot-scope="scope">
              <el-checkbox-group v-model="scope.row.validvariants" >
                <div v-for="onevariant in variants">
                  <el-checkbox  :label="onevariant.variantname" :key="onevariant">{{onevariant.variantname}}</el-checkbox>
                </div>
              </el-checkbox-group>
            </template>
          </el-table-column>
          <el-table-column
            prop="milestones"
            label="milestones"
          >
            <template slot-scope="scope">
              <el-row>
                <el-form :inline="true" class="demo-form-inline">
                  <el-form-item>
                    <el-button 
                      type="primary"
                      @click="milestoneadd(scope.row.milestones)"
                    >add</el-button>
                  </el-form-item>
                </el-form>
              </el-row>
              <el-row>
                <el-table :data="scope.row.milestones" width="100%">
                  <el-table-column 
                    property="milestonename" 
                    label="milestonename"
                  >
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.milestonename"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column 
                    property="droptime" 
                    label="droptime"
                    sortable
                  >
                    <template slot-scope="scope">
                      <div class="block">
                        <el-date-picker
                          v-model="scope.row.droptime"
                          type="date"
                          placeholder="dateselect">
                        </el-date-picker>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column 
                    property="integratetime" 
                    label="integratetime"
                  >
                    <template slot-scope="scope">
                      <div class="block">
                        <el-date-picker
                          v-model="scope.row.integratetime"
                          type="date"
                          placeholder="dateselect">
                        </el-date-picker>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed="right"
                    label="operation"
                    width="100">
                    <template slot-scope="scope1">
                      <el-button
                        @click.native.prevent="deleteRow(scope1.$index, scope.row.milestones)"
                        type="text"
                        size="small">
                        delete
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column
            prop="ownerships"
            label="ownerships"
          >
            <template slot-scope="scope">
              <el-table
                :data="scope.row.ownerships"
                border
                style="width: 100%">
                <el-table-column
                  prop="title"
                  label="title"
                >
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="name"
                >
                  <template slot-scope="scope1">
                    <el-select
                      v-model="scope1.row.name"
                      filterable
                      remote
                      reserve-keyword
                      placeholder="name contains"
                      :remote-method="remoteMethod"
                      :loading="loading">
                      <el-option
                        v-for="item in users"
                        :key="item.realname"
                        :label="item.realname"
                        :value="item.realname">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="operation"
            width="200">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, projects)"
                type="text"
                size="small">
                delete
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'ProjectsPage',
  props: {
  },
  data() {
    return {
      variants  : [],
      projects  : [],
      users     : [],
      loading   : false,
    }
  },
  methods : {
    remoteMethod(query){
      if(query !== ''){
        this.loading  = true;
        this.$http.post('/config/users/get',{
          kind  : 'search',
          query : query
        }).then(
          function(response){
            this.loading  = false;
            if(response.body.ok ==  'ok'){
              console.log(response.body);
              this.users  = JSON.parse(response.body.users);
            }
          },
          function(){}
        );
      }
      else{
        this.users  = [];
      }
    },
    getinfo (){
      this.$http.post('/config/variants/get',{
        kind  : 'all',
      }).then(
        function(response){
          if(response.body.ok ==  'ok'){
            this.variants = JSON.parse(response.body.variants);
            console.log('all variants successfully get from DB');
          }
        },
        function(){}
      );
      this.$http.post('/config/projects/get',{
        kind  : 'all',
      }).then(
        function(response){
          if(response.body.ok ==  'ok'){
            console.log(response.body.projects);
            console.log('all projects successfully get from DB');
            this.projects = JSON.parse(response.body.projects);
          }
        },
        function(){}
      );
    },
    deleteRow(index, rows) {
      console.log('index');
      console.log(index);
      console.log('rows');
      console.log(rows);
      rows.splice(index, 1);
    },
    milestoneadd(milestones){
      milestones.push({
        milestonename : 'LS?',
        droptime      : '',
        integratetime : ''
      });
      console.log(this.projects);
    },
    projectupload (){
      this.$http.post('/config/projects/upload',{
        kind  : 'all',
        projects  : JSON.stringify(this.projects)
      }).then(
        function(response){
          if(response.body.ok ==  'ok'){
            console.log(response.body);
            alert('projects uploaded');
          }
          else if(response.body.ok  ==  'notok'){
            console.log(response.body);
          }
        },
        function(){}
      );
    },
    projectadd (){
      let oneproject  = {
        projectname : 'new project',
        validvariants : [],
        milestones  : [
          {
            milestonename : 'LSA',
            droptime      : '',
            integratetime : ''
          },{
            milestonename : 'LSB',
            droptime      : '',
            integratetime : ''
          },{
            milestonename : 'LSC',
            droptime      : '',
            integratetime : ''
          },{
            milestonename : 'LSD',
            droptime      : '',
            integratetime : ''
          }
        ],
        ownerships  : [
          {
            title : 'PM',
            name  : ''
          },{
            title : 'DElead',
            name  : ''
          },{
            title : 'DVlead',
            name  : ''
          }
        ]
      };
      this.projects.unshift(oneproject);
    }
  },
  mounted  (){
    this.getinfo();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
