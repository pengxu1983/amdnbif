<template>
  <el-tabs v-model="currentPrj" type="card" @tab-click="handleClickPrj" >
    <el-tab-pane 
      v-for="oneproject in projects"
      :label="oneproject.projectname" 
      :name="oneproject.projectname"
    >
      <el-tabs v-model="currentDVgroup" @tab-click="handleClickDVgrp" >
        <el-tab-pane 
          v-for="oneDVgroup in DVgroups"
          :label="oneDVgroup.groupname" 
          :name="oneDVgroup.groupname"
        >
          <el-container>
            <el-table
    :data="tableData"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
  </el-table>
          </el-container>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
let moment =require('moment');
export default {
  name: 'Byprj',
  props: {
  },
  data() {
    return {
      tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
      variants    : [],
      validvariants : [],
      DVgroups    : [
      {
        groupname : 'HOST',
      },{
        groupname : 'DMA',
      },{
        groupname : 'MISC',
      }],
      projects  : [{
        projectname : 'mi200'
      },{
        projectname : 'mero'
      }],
      currentPrj  : 'mi200',
      currentDVgroup  : 'HOST',
      DVgroupPRstatus : [{
        groupname : 'aer'
      },{
        groupname : 'haha'
      }]
    }
  },
  methods : {
    tableRowClassName({row, rowIndex}) {
        return 'success-row';
    },
    weekback  (num){
      let R = moment().day(-1-7*num).format('YYYY-MM-DD');
      return R;
    },
    handleClickPrj(tab, event) {
      console.log(tab, event);
      console.log(this.currentPrj);
    },
    handleClickDVgrp(tab, event) {
      console.log(tab, event);
      console.log(this.currentDVgroup);
    },
    getinfo (){
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
  },
  mounted (){
    this.getinfo();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
