<template>
  <el-container>
    <el-main>
      <el-row>
        <el-button 
          type="primary"
          @click="add()"
        >add</el-button>
        <el-button 
          type="primary"
          @click="upload()"
        >upload</el-button>
      </el-row>
      <el-row>
      <el-table
        border
        :data="agents"
        style="width: 100%"
      >
        <el-table-column
          fixed
          prop="agentID"
          label="agentID"
        >
        <template slot-scope="scope">
          <el-input v-model="scope.row.agentID"></el-input>
        </template>
        </el-table-column>
        <el-table-column
          prop="isbusy"
          label="isbusy"
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="operation"
          width="200">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, agents)"
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
let cronJob         = require("cron").CronJob;
export default {
  name: 'AgentsPage',
  props: {
  },
  data() {
    return {
      agents : [],
    }
  },
  methods : {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    add (){
      this.agents.unshift({
        agentID : '',
        isbusy  : 'no'
      });
    },
    upload  (){
      this.$http.post('/config/agents/upload',{
        kind  : 'all',
        agents  : JSON.stringify(this.agents)
      }).then(
        function(response){
          if(response.body.ok ==  'ok'){
            alert(response.body.msg);
          }
          else if(response.body.ok ==  'notok'){
            alert(response.body.msg);
          }
        },
        function(){}
      );
    },
    get (){
      //get agents
      this.$http.post('/config/agents/get',{
        kind  : 'all'
      }).then(
        function(response){
          if(response.body.ok == 'ok'){
            this.agents = JSON.parse(response.body.agents);
            console.log('all agents successfully get from DB');
          }
          else{
          }
        },
        function(){}
      );
    }
  },
  mounted  (){
    this.get();
    let cron_check_changelist= new cronJob('* * * * * *',function(){
      console.log('111');
    },null,true,'Asia/Chongqing');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
