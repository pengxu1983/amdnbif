<template>
  <el-container>
    <el-col :span="24">
      <el-row>
        <el-button type="primary" round @click='add()'>Add</el-button>
        <el-button type="primary" round @click='upload()'>Upload</el-button>
      </el-row>
      <el-table
        :data="projects"
        border
        style="width: 100%"
      >
        <el-table-column
          fixed
          prop="name"
          label="name"
        >
          <template slot-scope="scope">
            <el-input
              placeholder="name"
              v-model="scope.row.name"
              clearable>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="Projlead"
          label="Projlead"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.Projlead" placeholder="Project Lead">
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
          prop="DVlead"
          label="DVlead"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.DVlead" placeholder="DVlead">
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
          prop="DElead"
          label="DElead"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.DElead" placeholder="DElead">
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
          prop="variants"
          label="variants"
        >
          <template slot-scope="scope">
            <el-checkbox-group v-model="scope.row.variants">
              <div v-for="onevariant in variants">
                <el-checkbox label="onevariant.variantname"></el-checkbox>
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
              @click.native.prevent="deleteRow(scope.$index, projects)"
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
  name: 'ConfigPage_projects_main',
  props: {
  },
  data () {
    return {
      projects  : [],
      users     : []
    }
  },
  methods : {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    upload () {
      console.log('upload');
      for(var i=0;i<this.projects.length;i++){
        console.log(this.projects[i].name);
      }
      this.$http.post('/config/upload',{
        kind  : 'projectsupload',
        projects  : this.projects
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
      this.projects.push({
        name      : '',
        Projlead  : '',
        DVlead    : '',
        DElead    : '',
        variants  : ''
      });
    },
    get () {
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
