<template>
  <el-container>
    <el-header>
      <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="/">NBIF Main Page</a>
      </nav>
    </el-header>
    <el-main>
      <el-row>
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="Project">
            <el-select 
              v-model="projectinfo.projectname" 
              placeholder="projectname"
              @change="getinfo()"
            >
              <el-option 
                v-for="oneproject in projects"
                :label="oneproject.projectname" 
                :value="oneproject.projectname"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button 
              type="primary"
              @click="add()"
            >add</el-button>
          </el-form-item>
          <el-form-item>
            <el-button 
              type="primary"
              @click="upload()"
            >upload</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table
          :data="tasks"
          border
          style="width: 100%"
        >
          <el-table-column
            fixed
            prop="taskname"
            label="taskname"
            width="150"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.taskname"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="tasktype"
            label="tasktype"
            width="150"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.tasktype" placeholder="To Select">
                <el-option
                  v-for="item in tasktypes"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            prop="command"
            label="command"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.command"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="passkeyword"
            label="passkeyword"
            width="200"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.passkeyword"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="failkeyword"
            label="failkeyword"
            width="200"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.failkeyword"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="runtime"
            label="runtime"
            width="150"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.runtime"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="opt"
            width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tasks)"
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
  name: 'SanityPage',
  props: {
  },
  data() {
    return {
      tasktypes : [
        'testcase',
        'script'
      ],
      tasks : [],
      projectinfo : {
        projectname : 'mi200'
      },
      projects  : []
    }
  },
  methods : {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    add(){
      this.tasks.unshift({
        taskname  : '',
        tasktype  : 'testcase',
        command   : '',
        passkeyword : 'dj exited successfully',
        failkeyword : 'dj exited with errors',
        runtime     : '4',
        projectname : this.projectinfo.projectname
      });
    },
    upload(){
      let T = [];
      for(let t=0;t<this.tasks.length;t++){
        if(
          (this.tasks[t].taskname  ==  '') || 
          (this.tasks[t].tasktype  ==  '') ||
          (this.tasks[t].command   ==  '') ||
          (this.tasks[t].passkeyword ==  '') ||
          (this.tasks[t].failkeyword ==  '') ||
          (this.tasks[t].projectname ==  '')
        ){
          continue;
        }
        else{
          T.push(this.tasks[t]);
        }
      }
      this.$http.post('/sanity/tasksupload',{
        kind  : 'all',
        tasks : JSON.stringify(T)
      }).then(
        function(response){
          if(response.body.ok ==  'ok'){
            alert(response.body.msg);
          }
        },
        function(){}
      );
    },
    getinfo(){
      this.$http.post('/config/projects/get',{
        kind  : 'all',
      }).then(
        function(response){
          if(response.body.ok ==  'ok'){
            //console.log(response.body.projects);
            console.log('all projects successfully get from DB');
            this.projects = JSON.parse(response.body.projects);
          }
        },
        function(){}
      );
      this.$http.post('/sanity/getinfo',{
        kind  : 'sanity',
        projectname : this.projectinfo.projectname
      }).then(
        function(response){
          if(response.body.ok ==  'ok'){
            this.tasks  = JSON.parse(response.body.tasks);
          }
          else{
            console.log(response.body.msg);
          }
        },
        function(){}
      );
    }
  },
  mounted (){
    this.getinfo();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
