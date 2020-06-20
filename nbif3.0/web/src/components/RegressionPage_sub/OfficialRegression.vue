<template>
  <el-container>
    <el-header>
    <el-form :inline="true" :model="regressionID" class="demo-form-inline">
      <el-form-item label="projectname">
        <el-select v-model="regressionID.projectname">
          <el-option label="floyd" value="floyd"></el-option>
          <el-option label="nv31" value="nv31"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="codeline">
        <el-select v-model="regressionID.codeline">
          <el-option label="nbif2_0" value="nbif2_0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="branch_name">
        <el-select v-model="regressionID.branch_name">
          <el-option label="nbif2_0_main" value="nbif2_0_main"></el-option>
          <el-option label="rmb_main" value="rmb_main"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="branch_name">
        <el-select v-model="regressionID.variantname">
          <el-option label="nbif_et_0" value="nbif_et_0"></el-option>
          <el-option label="nbif_et_1" value="nbif_et_1"></el-option>
          <el-option label="nbif_et_2" value="nbif_et_2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="text" @click="centerDialogVisible = true">Select group</el-button>
        <el-button type="primary" @click="getRegressionlist()">Check</el-button>
      </el-form-item>
    </el-form>
    </el-header>
    <el-main>
      <el-table
        :data="regressionlist"
        stripe
        style="width: 100%"
      >
        <el-table-column
          prop="kickoffdate"
          label="date"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="changelist"
          label="changelist"
        >
        </el-table-column>
        <el-table-column
          prop="shelve"
          label="shelve"
        >
        </el-table-column>
        <el-table-column
          prop="totalnum"
          label="total"
        >
        </el-table-column>
        <el-table-column
          prop="passnum"
          label="pass"
        >
        </el-table-column>
        <el-table-column
          prop="failnum"
          label="fail"
        >
        </el-table-column>
        <el-table-column
          prop="runningnum"
          label="running"
        >
        </el-table-column>
        <el-table-column
          prop="notstartednum"
          label="notstarted"
        >
        </el-table-column>
      </el-table>
    </el-main>
    <el-dialog
      title="Group Select"
      :visible.sync="centerDialogVisible"
      width="90%"
      center
    >
      <el-checkbox :indeterminate="isIndeterminateHost" v-model="checkAllHost" @change="handleCheckAllHostChange">Host</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedHostGroups" @change="handleCheckedHostGroupsChange">
        <el-checkbox v-for="hostgroup in hostgroups" :label="hostgroup" :key="hostgroup">{{hostgroup}}</el-checkbox>
      </el-checkbox-group>
    </el-dialog>
  </el-container>
</template>

<script>
//import OneprojPage  from '@/components/RegressionPage_sub/OfficialRegression_sub/OneprojPage.vue'
export default {
  name: 'OfficialRegression',
  props: {
  },
  components  : {
    //OneprojPage
  },
  data() {

    return {
      regressionID: {
        codeline    : 'nbif2_0',
        branch_name : 'nbif2_0_main',
        variantname : 'nbif_et_0',
        projectname : 'floyd'
      },
      regressionlist  :[],
      centerDialogVisible : false,
      checkAllHost: false,
      checkedHostGroups: ['aer', 'doorbell'],
      hostgroups:['aer', 'doorbell', 'generic'],
      isIndeterminateHost: true
    }
  },
  methods : {
    handleCheckAllHostChange(val) {
      this.checkedHostGroups = val ? this.hostgroups: [];
      this.isIndeterminateHost = false;
    },
    handleCheckedHostGroupsChange(value) {
      let checkedCount = value.length;
      this.checkAllHost = checkedCount === this.hostgroups.length;
      this.isIndeterminateHost = checkedCount > 0 && checkedCount < this.hostgroups.length;
    },
    getRegressionlist(){
      this.$http.post('/regression/getregressionlist',{
      }).then(
        function(response){
          window.console.log(response);
        },
        function(response){
          window.console.log(response); 
        }
      );
    },
  },
  mounted (){
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
