<template>
  <el-container>
    <el-header>
      {{variantname}}
    </el-header>
    <el-main>
      <el-table
        :data="DVgroupPRstatus"
        style="width: 100%"
      >
        <el-table-column
          prop="groupname"
          label="feature group"
        >
        </el-table-column>
        <el-table-column
          prop="isBACO"
          label="isBACO"
        >
        </el-table-column>
        <el-table-column
          prop="isBAPU"
          label="isBAPU"
        >
        </el-table-column>
        <el-table-column 
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
            <template slot-scope="scope">
              <el-input v-model="scope.row.TargetPR1"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="Comment"
            label="Comment"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.Comment"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
let moment =require('moment');
export default {
  name: 'PrjDVgrpVrntPage',
  props: {
    variantname : '',
    projectname : '',
    DVgroup     : ''
  },
  data() {
    return {
      DVgroupPRstatus : []
    }
  },
  methods : {
    weekback  (num){
      let R = moment().day(1-7*num).format('YYYY-MM-DD');
      return R;
    },
    getstatus (){
      console.log('getstatus');
      this.$http.post('/metrics/getdvgroupprstatus',{
        kind  : 'Bygrp',
        projectname : this.projectname,
        variantname : this.variantname,
        DVgroup     : this.DVgroup
      }).then(
        function(response){
          console.log(response.body.featuregroups);
          console.log(typeof(response.body.featuregroups));
          this.DVgroupPRstatus  = JSON.parse(response.body.featuregroups);
        },
        function(){}
      );
    }

  },
  mounted (){
    this.getstatus();
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
