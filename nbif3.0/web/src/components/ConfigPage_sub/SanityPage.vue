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
              <el-input v-model="scope.row.taskname"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="passkeyword"
            label="passkeyword"
            width="200"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.taskname"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="failkeyword"
            label="failkeyword"
            width="200"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.taskname"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="opt"
            width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
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
      tasks : []
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
        passkeyword : '',
        failkeyword : ''
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
            (this.tasks[t].failkeyword ==  '')
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
