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
          <el-container v-for="onevalidvariant in validvariants">
            <el-table
              :data="DVgroupPRstatus"
              style="width: 100%"
              :cell-class-name="tableCellClassName"
            >
              <el-table-column
                prop="groupname"
                label="feature group"
              >
              </el-table-column>
              <el-table-column slot
                :label="weekback(2)"
              >
                <el-table-column
                  prop="ActPRm2"
                  label="actual passrate"
                >
                </el-table-column>
                <el-table-column
                  prop="TargetPRm2"
                  label="target passrate"
                >
                </el-table-column>
              </el-table-column>
              <el-table-column
                :label="weekback(1)"
              >
                <el-table-column
                  prop="ActPRm1"
                  label="actual passrate"
                >
                </el-table-column>
                <el-table-column
                  prop="TargetPRm1"
                  label="target passrate"
                >
                </el-table-column>
              </el-table-column>
              <el-table-column
                :label="weekback(0)"
              >
                <el-table-column
                  prop="ActPR0"
                  label="actual passrate"
                >
                </el-table-column>
                <el-table-column
                  prop="TargetPR0"
                  label="target passrate"
                >
                </el-table-column>
              </el-table-column>
              <el-table-column
                :label="weekback(-1)"
              >
                <el-table-column
                  prop="ActPR1"
                  label="actual passrate"
                >
                </el-table-column>
                <el-table-column
                  prop="TargetPR1"
                  label="target passrate"
                >
                </el-table-column>
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
      variants    : [],
      //validvariants : [],
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
      //DVgroupPRstatus : [{
      //  groupname : 'aer'
      //},{
      //  groupname : 'haha'
      //}]
    }
  },
  computed: {
    validvariants (){
      this.$http.post('/metrics/getvalidvariants',{
        kind  : 'Bygrp',
        projectname : this.currentPrj
      }).then(
        function(response){
          console.log(response.body);
        },
        function(){}
      );
      return [];
    },
    DVgroupPRstatus (){
      this.$http.post('/metrics/getDVgroupPRstatus',{
        kind  : 'Bygrp',
        DVgroup : this.currentDVgroup,
        projectname : this.currentPrj
      }).then(
        function(response){
          console.log(response.body);
          return response.body.DVgroupPRstatus;
        },
        function(){}
      );
    }
  },
  methods : {
    getvalidvariants  (projectname){
      this.$http.post('/metrics/getvalidvariants',{
        kind  : 'Bygrp',
        projectname : this.currentPrj
      }).then(
        function(response){
          console.log('abc');
          console.log(response.body);
        },
        function(){}
      );
    },
    tableCellClassName({row, column, rowIndex, columnIndex}) {
      //console.log(row.groupname);
    },
    weekback  (num){
      let R = moment().day(1-7*num).format('YYYY-MM-DD');
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
      this.getvalidvariants(this.currentPrj);
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
