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
          <PrjDVgrpVrntPage
            v-for="onevalidvariant in validvariants"
            v-bind:projectname="oneproject.projectname"
            v-bind:variantname="onevalidvariant"
            v-bind:DVgroup="oneDVgroup.groupname"
          ></PrjDVgrpVrntPage>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
let moment =require('moment');
import PrjDVgrpVrntPage from '@/components/MetricsPage_sub/Bygrp_sub/PrjDVgrpVrntPage.vue'
export default {
  name: 'Byprj',
  props: {
  },
  data() {
    return {
      variants    : [],
      validvariants : ['nbif_nv10_gpu','abc'],
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
      DVgroupPRstatus : [],
    }
  },
  components  : {
    PrjDVgrpVrntPage
  },
  methods : {
    getvalidvariants  (projectname){
      this.$http.post('/metrics/getvalidvariants',{
        kind  : 'Bygrp',
        projectname : projectname
      }).then(
        function(response){
          console.log(response.body.validvariants);
          console.log(typeof(response.body.validvariants));
          this.validvariants  = JSON.parse(response.body.validvariants);
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
      this.getvalidvariants(this.currentPrj);
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
            //console.log(response.body.projects);
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
